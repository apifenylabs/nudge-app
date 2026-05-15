# Cognee ECL Pipeline Deep Dive — May 2026

Source: Chris research, shared 2026-05-15 23:15 HKT
Status: 🗄 Reference only — no action required yet
Relevant to: OmniMind architectural pivot

---

## The Core: ECL + Memify = Memory Control Plane

Cognee replaces naive "chunk-embed-store" RAG with **modular ECL pipeline** (Extract → Cognify → Load) + **Memify** post-processing. Everything is composable async Tasks orchestrated by `run_pipeline()`.

### Core API

| Operation | Function | What it does |
|-----------|----------|-------------|
| Ingest | `add()` | Extract/ingest content |
| Build | `cognify()` or `remember()` | Build graph + embeddings |
| Evolve | `memify()` or `improve()` | Refine/evolve memory graph |
| Retrieve | `search()` / `recall()` | Hybrid: vector + graph traversal + temporal |

### Data Model: DataPoint

Atomic unit = `DataPoint` (Pydantic). Every chunk, entity, summary, relationship is one. Custom subclasses control embedding fields and provenance.

---

## Poly-Store Backend Architecture

| Layer | Default | Alt Options |
|-------|---------|-------------|
| Relational | SQLite | PostgreSQL |
| Vector | LanceDB | Qdrant, pgvector, etc. |
| Graph | Kuzu | Neo4j, Memgraph, etc. |

Defaults are **100% embedded/local-first** — zero infra, matches OpenClaw's sovereign vibe. Multi-tenancy via dataset-level ownership/permissions.

---

## The 3 Pipeline Phases

### 1. Extract (`add()`)
- Ingests 38+ formats: files, dirs, raw text, URLs, S3, APIs, DBs, audio, images, code
- Normalizes → plain text
- Content-hash dedup + dataset organization
- Incremental: only new/updated content
- **OpenClaw relevance**: This is where MEMORY.md + daily notes + workspace files plug in natively

### 2. Cognify (`cognify()` / `remember()`) — 6-Stage Heart
1. **Classify documents** — Wrap raw data as Document objects
2. **Access check** — Enforce permissions
3. **Extract chunks** — Auto-size: `min(embedding_max_tokens, llm_max_tokens / 2)`
4. **Extract graph** — LLM call (Instructor/Pydantic structured output) → entities + relationships (subject-relation-object triplets). **~1 LLM call per chunk**
5. **Summarize text** — LLM generates TextSummary per chunk. **~1 LLM call per chunk**
6. **Add data points** — Embed → vector store, commit edges → graph store, update metadata

Total: **~2 LLM calls per chunk**. Only delta processed on re-runs. Temporal extension via `temporal_cognify` flag.

### 3. Memify (`memify()` / `improve()`) — Self-Evolution
Post-cognify enrichment. Runs on existing graph without re-ingestion.

3 sub-stages:
1. **Data Access** — Read from graph + vector + metastore
2. **Business Logic & Computation** — Custom rules/ML/LLM:
   - Prune stale nodes
   - Strengthen frequent connections
   - Reweight edges via usage signals
   - Add derived facts/inferences
3. **Persistence** — Commit updates to all three stores

**Benefits**: No full rebuilds, continuous optimization, memory evolves from agent usage.

---

## Pipeline Architecture

- **Tasks** = composable async functions (classify_documents, extract_graph_from_data, add_data_points)
- `run_pipeline(tasks, data, datasets, pipeline_name, use_pipeline_cache=True)` — layered execution with crash recovery
- Pipeline status tracking: INITIATED → STARTED → COMPLETED/ERRORED
- `PipelineContext` auto-injected (user, dataset, data_item, extras)
- Custom pipelines: mix your own Tasks

---

## Implications for OmniMind Pivot

### Stack Recommendation
| Component | Choice | Why |
|-----------|--------|-----|
| Vector | **LanceDB** | Embedded, zero-infra, Apache-2.0 |
| Graph | **Kuzu** | Lightweight, embedded, property-graph |
| Relational | **SQLite** | Zero-infra, good enough for single-instance |
| LLM | **DeepSeek-chat / Ollama** | Cost-effective, local option |

### Key Differences OmniMind Needs To Offer
- Ingest from **OpenClaw Markdown/workspace** (our non-replicable edge)
- Multi-episodic (conversation IDs + timestamps) → native in temporal_cognify
- Semantic/procedural → graph extraction + Memify derived facts
- Self-evolution → Memify worker (background DeepSeek/Ollama)
- Zero-cost/local sovereignty → defaults match perfectly

### Current OmniMind vs Cognee
| Capability | OmniMind (current) | Cognee |
|------------|-------------------|--------|
| Embeddings | ✅ Qdrant | ✅ Multi-backend |
| Semantic search | ✅ | ✅ Hybrid + graph |
| Graph relationships | ❌ | ✅ Built-in |
| Self-evolution | ❌ | ✅ Memify |
| Temporal awareness | ❌ | ✅ temporal_cognify |
| Incremental pipeline | ❌ | ✅ Pipeline status tracking |
| OpenClaw integration | ✅ Plugin | ✅ Official hook |
| Local-first | ✅ Qdrant local | ✅ LanceDB + Kuzu embedded |

---

## Verdict (Chris, May 2026)

This blueprint makes the "complete memory stack" actually executable and defensible. No one has shipped the seamless OpenClaw-first version yet. High-conviction path: native-ify Cognee's best patterns for the OpenClaw runtime, not copy — **adapt + specialize**.

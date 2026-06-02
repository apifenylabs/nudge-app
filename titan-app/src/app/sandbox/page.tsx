'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Settings2,
  BookOpen,
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  Wand2,
  Brain,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/ScrollReveal';

// ─── Types ────────────────────────────────────────────────────────────────────

type SkillTier = 'core' | 'advanced' | 'experimental';
type AgentState = 'idle' | 'running' | 'success' | 'error';

interface Tool {
  id: string;
  name: string;
  description: string;
  tier: SkillTier;
  icon: string;
}

interface Message {
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
}

interface PresetConfig {
  name: string;
  description: string;
  skills: string[];
  systemPrompt: string;
}

// ─── Preset Configurations ────────────────────────────────────────────────────

const PRESETS: PresetConfig[] = [
  {
    name: 'Research Agent',
    description: 'Deep-research personality with web-search and analysis skills',
    skills: ['web_scrape', 'semantic_search', 'text_analyze', 'summarize'],
    systemPrompt: 'You are a thorough research assistant. Always cite sources, cross-reference claims, and flag uncertainty.',
  },
  {
    name: 'Creative Writer',
    description: 'Creative writing specialist with tone adaptation',
    skills: ['text_generate', 'tone_adapt', 'story_weave', 'rewrite'],
    systemPrompt: 'You are a creative writing partner. Adapt your tone to the user\'s preference. Be vivid and engaging.',
  },
  {
    name: 'Data Analyst',
    description: 'Structured data analysis with visualization skills',
    skills: ['code_python', 'data_plot', 'stat_analyze', 'table_format'],
    systemPrompt: 'You are a data analyst. Present findings with clear numbers, tables, and visualizations when possible.',
  },
];

// ─── Available Skills ─────────────────────────────────────────────────────────

const AVAILABLE_SKILLS: Tool[] = [
  { id: 'web_scrape', name: 'Web Scrape', description: 'Fetch and extract content from URLs', tier: 'core', icon: '🌐' },
  { id: 'semantic_search', name: 'Semantic Search', description: 'Vector-based memory and knowledge retrieval', tier: 'core', icon: '🔍' },
  { id: 'text_generate', name: 'Text Generation', description: 'Generate coherent text from prompts', tier: 'core', icon: '✍️' },
  { id: 'summarize', name: 'Summarize', description: 'Condense long content into key points', tier: 'core', icon: '📝' },
  { id: 'code_python', name: 'Code (Python)', description: 'Execute Python code in sandbox', tier: 'advanced', icon: '🐍' },
  { id: 'tone_adapt', name: 'Tone Adaptation', description: 'Rewrite content in specified tone/style', tier: 'advanced', icon: '🎭' },
  { id: 'data_plot', name: 'Data Plotting', description: 'Generate charts and visualizations', tier: 'advanced', icon: '📊' },
  { id: 'text_analyze', name: 'Text Analysis', description: 'Sentiment, entities, and pattern extraction', tier: 'core', icon: '🔬' },
  { id: 'story_weave', name: 'Story Weave', description: 'Multi-paragraph narrative construction', tier: 'advanced', icon: '📖' },
  { id: 'stat_analyze', name: 'Statistical Analysis', description: 'Descriptive and inferential statistics', tier: 'advanced', icon: '📈' },
  { id: 'rewrite', name: 'Rewrite', description: 'Rephrase content while preserving meaning', tier: 'core', icon: '🔄' },
  { id: 'table_format', name: 'Table Formatting', description: 'Format data into structured tables', tier: 'experimental', icon: '📋' },
  { id: 'image_describe', name: 'Image Describe', description: 'Generate alt-text and image descriptions', tier: 'experimental', icon: '🖼️' },
  { id: 'memory_store', name: 'Memory Store', description: 'Persist agent memories across sessions', tier: 'experimental', icon: '💾' },
];

// ─── Tier Badge Styling ───────────────────────────────────────────────────────

const TIER_STYLES: Record<SkillTier, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  core: { label: 'Core', variant: 'default' },
  advanced: { label: 'Advanced', variant: 'secondary' },
  experimental: { label: 'Experimental', variant: 'outline' },
};

// ─── Simulated Agent Response ─────────────────────────────────────────────────

function simulateAgentResponse(userMessage: string, skills: string[], systemPrompt: string): string {
  const skillsUsed = skills.map(id => AVAILABLE_SKILLS.find(s => s.id === id)).filter(Boolean) as Tool[];
  const skillNames = skillsUsed.map(s => s.name).join(', ') || 'no skills';

  const responses: Record<string, string> = {
    web_scrape: `📄 **Web Scrape result**\n\nI fetched the content and extracted the key sections. Here's a structured breakdown:\n\n1. **Title**: [Extracted from page]\n2. **Key Points**: 3-5 main takeaways identified\n3. **Metadata**: Author, date, source URL\n\n_The full extraction is available in the analysis panel._`,
    text_generate: `✨ **Generated Output**\n\nBased on your request, here's what I produced:\n\n> "${userMessage.slice(0, 60)}..."\n\nI applied the configured tone and style guidelines. The output balances clarity with engagement while respecting the system prompt constraints.`,
    code_python: `🐍 **Python Execution**\n\n\`\`\`python\n# Simulated execution\nresult = analyze_data()\nprint(f"Completed in 0.42s")\n\`\`\`\n\n**Stdout:**\n\`\`\`\nAnalysis complete. Found 3 patterns matching your criteria.\nProcessing time: 0.42s\n\`\`\`\n\n**Return value:** \`{"patterns": 3, "confidence": 0.87, "anomalies": []}\``,
    default: `🤖 **Agent Response**\n\nUsing skills: **${skillNames}**\n\nSystem context: _${systemPrompt.slice(0, 80)}..._\n\nYour message was received and processed through the agent pipeline. The response incorporates the selected skill set and personality configuration.\n\n_This is a simulated environment. In production, this would execute against live models and APIs._`,
  };

  const primarySkill = skills[0];
  return responses[primarySkill] || responses.default;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SandboxPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['web_scrape', 'text_generate']);
  const [systemPrompt, setSystemPrompt] = useState(PRESETS[0].systemPrompt);
  const [activePreset, setActivePreset] = useState(PRESETS[0].name);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: '👋 Welcome to the Titan Agent Sandbox. Configure your agent below, then send a message to test it.',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [showSkillPanel, setShowSkillPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePresetSelect = (preset: PresetConfig) => {
    setActivePreset(preset.name);
    setSelectedSkills(preset.skills);
    setSystemPrompt(preset.systemPrompt);
    setMessages(prev => [...prev, {
      role: 'system',
      content: `🔄 Switched to **${preset.name}** preset — ${preset.description}`,
      timestamp: Date.now(),
    }]);
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async () => {
    if (!input.trim() || agentState === 'running') return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAgentState('running');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const response = simulateAgentResponse(userMsg.content, selectedSkills, systemPrompt);
    const agentMsg: Message = { role: 'agent', content: response, timestamp: Date.now() };
    setMessages(prev => [...prev, agentMsg]);
    setAgentState('success');
    setTimeout(() => setAgentState('idle'), 1500);
  };

  const handleReset = () => {
    setMessages([{
      role: 'system',
      content: '🔄 Sandbox reset. Configure your agent and start fresh.',
      timestamp: Date.now(),
    }]);
    setAgentState('idle');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative border-b border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Agent Sandbox</h1>
                <p className="text-sm text-slate-400">
                  Configure, test, and experiment with agent behaviors
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Left Panel — Config */}
          <ScrollReveal delay={100}>
            <div className="space-y-4">
              {/* Presets */}
              <Card className="border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Wand2 className="h-4 w-4 text-cyan-400" />
                    Quick Presets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetSelect(preset)}
                      className={`w-full rounded-lg border p-3 text-left transition-all ${
                        activePreset === preset.name
                          ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-medium text-white">{preset.name}</div>
                      <div className="mt-0.5 text-xs text-slate-400">{preset.description}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* System Prompt */}
              <Card className="border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Brain className="h-4 w-4 text-violet-400" />
                    System Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[80px] w-full rounded-lg border border-white/10 bg-slate-800/50 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                    placeholder="Enter system prompt..."
                  />
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Settings2 className="h-4 w-4 text-cyan-400" />
                    Skills ({selectedSkills.length}/14)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {(['core', 'advanced', 'experimental'] as SkillTier[]).map((tier) => (
                    <div key={tier} className="mb-2">
                      <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                        {tier}
                      </div>
                      {AVAILABLE_SKILLS.filter(s => s.tier === tier).map(skill => (
                        <button
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all ${
                            selectedSkills.includes(skill.id)
                              ? 'bg-cyan-500/10 text-cyan-300'
                              : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'
                          }`}
                        >
                          <span>{skill.icon}</span>
                          <span className="flex-1">{skill.name}</span>
                          <div className={`h-2 w-2 rounded-full ${
                            selectedSkills.includes(skill.id) ? 'bg-cyan-400' : 'bg-slate-600'
                          }`} />
                        </button>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="rounded-lg bg-white/5 p-2">
                      <div className="text-lg font-bold text-cyan-400">{messages.length - 1}</div>
                      <div className="text-slate-400">Messages</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <div className="text-lg font-bold text-violet-400">{selectedSkills.length}</div>
                      <div className="text-slate-400">Skills Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          {/* Right Panel — Chat */}
          <ScrollReveal delay={200}>
            <Card className="flex h-[calc(100vh-12rem)] flex-col border-white/5 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="flex-shrink-0 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Terminal className="h-4 w-4 text-cyan-400" />
                    Agent Console
                    {agentState === 'running' && (
                      <Badge variant="secondary" className="ml-2 animate-pulse bg-amber-500/20 text-amber-300 text-[10px]">
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Processing
                      </Badge>
                    )}
                    {agentState === 'success' && (
                      <Badge variant="default" className="ml-2 bg-emerald-500/20 text-emerald-300 text-[10px]">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Response Ready
                      </Badge>
                    )}
                    {agentState === 'error' && (
                      <Badge variant="outline" className="ml-2 border-red-500/30 bg-red-500/10 text-red-300 text-[10px]">
                        <XCircle className="mr-1 h-3 w-3" />
                        Error
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowSkillPanel(!showSkillPanel)}
                      className="rounded-md border border-white/10 bg-white/5 p-1.5 text-xs text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    >
                      {showSkillPanel ? 'Hide All Skills' : 'Show All Skills'}
                    </button>
                    <button
                      onClick={handleReset}
                      className="rounded-md border border-white/10 bg-white/5 p-1.5 text-xs text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-3 p-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'agent' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20">
                        <Bot className="h-4 w-4 text-cyan-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-cyan-500/10 text-slate-200 border border-cyan-500/20'
                          : msg.role === 'system'
                          ? 'bg-slate-800/50 text-slate-300 border border-white/5'
                          : 'bg-slate-800/50 text-slate-200 border border-white/5'
                      }`}
                    >
                      <div className="prose prose-invert prose-sm max-w-none [&_code]:text-cyan-300 [&_pre]:bg-slate-900 [&_pre]:border [&_pre]:border-white/5">
                        {msg.content}
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    {msg.role === 'user' && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                        <MessageSquare className="h-4 w-4 text-violet-400" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="flex-shrink-0 border-t border-white/5 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message to your agent..."
                    className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || agentState === 'running'}
                    className="flex items-center gap-2 self-end rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-cyan-400 hover:to-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {agentState === 'running' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-slate-500">
                  Press Enter to send · Shift+Enter for new line · Skills: {selectedSkills.map(id => AVAILABLE_SKILLS.find(s => s.id === id)?.icon).join(' ')}
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

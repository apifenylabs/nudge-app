# Skill: source-build-in-public

**Goal:** Generate "build in public" milestone posts (lessons learned, revenue, tech choices).

**Input:**
- `milestone` (object): Milestone data
  - `type` (string): Type of milestone — `revenue`, `launch`, `users`, `lesson`, `tech`
  - `title` (string): Milestone title
  - `details` (string): Description/details
  - `date` (string): Date of milestone (ISO string)
- `projects` (object[], optional): List of active projects with their status

**Steps:**
1. Accept milestone data from the pipeline config or generate from defaults
2. If no milestone provided, create a "today in building" generic post
3. Format into a DataSource item with type `milestone`
4. Include lessons learned angle (personal brand hook)

**Output:**
- `items` (DataSource[]): Single DataSource item of type `milestone`

**Dependencies:**
- schemas.md (DataSource interface)

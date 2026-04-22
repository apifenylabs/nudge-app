# Shared Component Library Plan

## Purpose
Create reusable UI components across all projects (Nudge, Agent HQ, SocialOS, future apps) to ensure consistency and speed up development.

## Design Principles
1. **Apple-level polish** - From existing standards
2. **Consistency** - Same components, same behavior
3. **Accessibility** - WCAG 2.1 AA compliant
4. **Dark/light mode** - Full support
5. **Responsive** - Mobile-first design

## Tech Stack
- **React 18 + TypeScript** (consistent)
- **Tailwind CSS** (consistent)
- **Framer Motion** (for animations)
- **Radix UI** (for accessible primitives)
- **Class Variance Authority** (for variant management)

## Component Categories

### 1. Foundation
- `Button` - Primary, secondary, ghost, destructive variants
- `Input` - Text, email, password, textarea
- `Select` - Dropdown, combobox
- `Checkbox` / `Radio` / `Toggle`
- `Label` / `HelperText` / `ErrorText`

### 2. Data Display
- `Card` - Multiple variants (elevated, outlined, filled)
- `Table` - Sortable, paginated
- `Badge` - Status, count, label
- `Avatar` - User, team, project
- `Progress` - Linear, circular

### 3. Feedback
- `Toast` / `Alert` - Success, error, warning, info
- `Modal` / `Dialog` - Centered, side, fullscreen
- `Tooltip` / `Popover`
- `Skeleton` - Loading states
- `EmptyState` - No data views

### 4. Navigation
- `Sidebar` - Collapsible, nested
- `Header` / `Navbar`
- `Tabs` / `Pills`
- `Breadcrumb`
- `Pagination`

### 5. Layout
- `Container` - Responsive width constraints
- `Grid` / `Stack` / `Box`
- `Divider` / `Spacer`
- `Section` / `Panel`

## Implementation Strategy

### Phase 1: Core Components (Week 1)
1. `Button` with all variants
2. `Input` and form controls
3. `Card` component
4. `Badge` and `Avatar`

### Phase 2: Feedback & Navigation (Week 2)
1. `Toast` notification system
2. `Modal` and `Dialog`
3. `Tabs` and navigation
4. `Table` basic implementation

### Phase 3: Advanced (Week 3)
1. `DataTable` with sorting/filtering
2. `Chart` components (simple)
3. `DatePicker` / `Calendar`
4. `RichTextEditor`

## Integration with Projects

### Agent HQ
- Use existing components where possible
- Replace custom buttons with library buttons
- Standardize card designs

### Nudge
- Family member avatars
- Task cards
- Form inputs

### SocialOS
- Content cards
- Analytics charts
- Scheduling calendar

## File Structure
```
shared-components/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── cn.ts (classNames utility)
└── .npmrc
```

## Development Workflow
1. **Local development** - Storybook for isolation
2. **Versioning** - Semantic versioning
3. **Publishing** - Private npm package or monorepo
4. **Consumption** - `npm install @openclaw/components`

## "Paper" Tech Stack Integration
If "Paper" refers to a specific design system:
1. Analyze Paper's component API
2. Match or adapt patterns
3. Ensure compatibility
4. Document differences

## Next Actions
1. **Research "Paper" reference** - Critical for alignment
2. **Create prototype component** - Button with all variants
3. **Test integration** - With Agent HQ first
4. **Documentation** - Storybook + usage guidelines

## Benefits
1. **Faster development** - Reuse instead of rebuild
2. **Consistent UX** - Same patterns across apps
3. **Easier maintenance** - Fix once, update everywhere
4. **Better onboarding** - Developers learn once
5. **Brand consistency** - Unified look and feel

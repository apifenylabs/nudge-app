# Frontend Tech Stack - Shared Across Orchestras

## Current Standard Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite (web) / React Native (mobile)
- **State Management:** React Context + Zustand (simple cases)

## Component Library (In Development)
- **Base:** Radix UI primitives
- **Animations:** Framer Motion
- **Charts:** Recharts (simple) / Chart.js (complex)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Design Principles
1. **Apple-level polish** - 8px grid, consistent spacing
2. **Dark/light mode** - Full support with system detection
3. **Mobile-first** - Responsive from 320px upwards
4. **Accessibility** - WCAG 2.1 AA compliance
5. **Performance** - Code splitting, lazy loading

## Shared Components (Planned)
1. **Button** - Primary, secondary, ghost, destructive variants
2. **Card** - Multiple elevation levels
3. **Input** - Text, select, checkbox, radio
4. **Modal/Dialog** - Accessible, animated
5. **Toast/Alert** - Notification system
6. **Table** - Sortable, paginated
7. **Avatar** - User/profile images
8. **Badge** - Status indicators
9. **Progress** - Loading, completion
10. **EmptyState** - No data views

## "Paper-like" UI Research
**Reference from Greg Isenberg:** Need to investigate what "Paper" tech stack refers to. Possibly:
- Material Design's paper metaphor (elevation, shadows)
- Dropbox Paper's collaborative feel
- Actual paper-like tactile interactions
- Simple, focused writing experience

## Performance Targets
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Bundle Size:** < 200KB initial load
- **Lighthouse Score:** > 90 all categories

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari/Chrome (last 2 versions)

## Development Tools
- **Editor:** VS Code with standardized extensions
- **Linting:** ESLint + Prettier (shared config)
- **Testing:** Jest + React Testing Library
- **E2E:** Playwright (for critical paths)
- **CI/CD:** GitHub Actions

## Learning Resources
- React Documentation (beta.reactjs.org)
- Tailwind CSS Documentation
- TypeScript Handbook
- Accessibility (webaim.org)
- Performance (web.dev)

## Updates & Changes
All tech stack changes must be:
1. Documented here with rationale
2. Tested in one orchestra first
3. Approved by Reviewer role
4. Rolled out to all orchestras systematically
5. Backward compatible where possible

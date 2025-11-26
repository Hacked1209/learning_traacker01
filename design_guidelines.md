# Design Guidelines: Progress Tracking Dashboard

## Design Approach
**System-Based Approach** inspired by **Linear** and **Notion** aesthetics
- Rationale: Productivity tool requiring clarity, efficiency, and sophisticated interactions
- Key Principles: Clean minimalism, purposeful spacing, subtle depth, smooth micro-interactions

## Typography System
- **Primary Font**: Inter (via Google Fonts CDN)
- **Hierarchy**:
  - Page Title/Header: text-3xl, font-semibold
  - Section Headers: text-xl, font-semibold
  - Topic Titles: text-lg, font-medium
  - Subtopic Items: text-base, font-normal
  - Body/Descriptions: text-sm, font-normal
  - Metadata/Stats: text-xs, font-medium, uppercase tracking-wide

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Card padding: p-6
- Section gaps: gap-6 to gap-8
- Component margins: mb-4, mb-6, mb-8
- Grid gaps: gap-4 for topic grids

**Container Structure**:
- Max-width: max-w-7xl for main container
- Three-column dashboard layout (desktop): Common Topics (left 1/3) | Chayan's Section (middle 1/3) | Divyam's Section (right 1/3)
- Mobile: Stack vertically with full-width sections

## Component Library

### Navigation/Header
- Top navigation bar with app title and user controls
- Progress summary cards showing each person's completion percentage
- Quick stats: total topics, completed topics, in-progress topics

### Topic Cards
- Rounded borders (rounded-lg)
- Subtle elevation with border and shadow
- Hover state: Slight lift effect, enhanced shadow
- Drag handle icon on left side
- Expand/collapse arrow for subtopics
- Status badge in top-right corner (Not Started | In Progress | Completed)
- Card structure:
  - Topic title (bold)
  - Brief description (muted text)
  - Subtopic count indicator
  - Action buttons (move to section, edit, delete)

### Draggable Interactions
- Visual feedback during drag: reduce opacity to 0.5, add dashed border
- Drop zones: highlight with border when draggable hovers over
- Smooth transition animations (200ms duration)

### Subtopic Sections (Nested)
- Collapsible accordion within topic cards
- Indented list with checkbox-style completion indicators
- Add subtopic button at bottom of expanded section
- Each subtopic: checkbox + title + optional description

### Progress Indicators
- Circular progress rings showing percentage completion
- Linear progress bars below section headers
- Color-coded progress states

### Action Buttons
- Primary: Add Topic, Move to Section (prominent, filled)
- Secondary: Edit, Expand/Collapse (outlined or ghost style)
- Destructive: Delete (red accent, outlined)
- Icon buttons for quick actions (16x16 icons)

### Empty States
- Centered illustration placeholders for empty sections
- Encouraging copy: "Add your first topic to start tracking progress"
- Prominent CTA button

### Modals/Forms
- Add/Edit Topic Modal:
  - Title input field
  - Description textarea
  - Subtopics dynamic list with add/remove
  - Save/Cancel actions
- Overlay backdrop with blur effect
- Smooth fade-in animation

## Icons
**Library**: Heroicons (via CDN)
- Drag handle: bars-3
- Expand/collapse: chevron-down/chevron-up
- Add: plus
- Edit: pencil
- Delete: trash
- Check: check-circle
- Progress: chart-bar

## Animations
**Minimal, Purposeful Only**:
- Card drag: opacity + slight rotation
- Expand/collapse: smooth height transition (300ms)
- Hover effects: subtle scale (1.02) and shadow change
- Topic movement: slide-in animation when added to section (400ms ease-out)

## Accessibility
- All interactive elements keyboard accessible
- Focus states: visible outline ring
- ARIA labels for drag-drop regions
- Semantic HTML for sections and cards
- High contrast for status badges

## Images
**No hero images or marketing imagery** - This is a functional dashboard focused on content and interaction. All visual interest comes from layout, typography, and component design.
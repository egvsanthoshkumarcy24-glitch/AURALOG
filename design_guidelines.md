# AuraLog Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Drawing inspiration from wellness apps (Calm, Headspace) combined with productivity tools (Notion) to create a calming yet functional emotional wellness experience.

**Core Principles:**
- Emotional safety through soft, rounded aesthetics
- Clarity in data visualization without overwhelming users
- Breathing room to reduce anxiety and promote reflection
- Gentle transitions that support emotional awareness

---

## Typography

**Font System:**
- Primary: Inter (via Google Fonts) - clean, readable, modern
- Display/Headings: Poppins (via Google Fonts) - softer, friendlier feel
- Monospace: JetBrains Mono (for data/metrics)

**Hierarchy:**
- H1 (App name, page titles): Poppins, 3xl-4xl, font-semibold
- H2 (Section headers): Poppins, 2xl-3xl, font-medium
- H3 (Card titles): Poppins, xl, font-medium
- Body text: Inter, base-lg, font-normal
- Small text (metadata): Inter, sm, font-normal
- Buttons/CTAs: Inter, base, font-medium
- Data labels: JetBrains Mono, sm, font-medium

---

## Layout System

**Spacing Primitives:**
Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm throughout the app.

**Container Widths:**
- Auth pages: max-w-md (centered)
- Dashboard: max-w-6xl (centered with generous padding)
- Session pages (video/voice): max-w-5xl
- Logs/Insights: max-w-7xl (wider for data tables)
- Profile: max-w-2xl

**Responsive Breakpoints:**
- Mobile-first approach
- Key breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## Component Library

### Cards
- Rounded-3xl corners for main content cards
- Rounded-2xl for nested or smaller cards
- Padding: p-6 on mobile, p-8 on desktop
- Shadow: shadow-lg with subtle blur
- Backdrop: backdrop-blur-sm for glass-morphism effect on overlays

### Buttons
**Primary Actions:**
- Rounded-full (pill shape)
- Padding: px-8 py-4
- Font: font-medium
- Size: text-base to text-lg
- Include subtle shadow

**Secondary Actions:**
- Rounded-xl
- Padding: px-6 py-3
- Border: border-2
- Font: font-medium

**Icon Buttons (Record, Stop, etc.):**
- Circular: w-16 h-16 or w-20 h-20
- Rounded-full
- Center icon with p-4

### Navigation
**Top Navigation Bar:**
- Fixed position with backdrop-blur
- Height: h-16 on mobile, h-20 on desktop
- Padding: px-4 md:px-8
- Links: Flexbox with gap-6 to gap-8
- Active state: Underline with rounded ends

**Mobile Navigation:**
- Bottom tab bar (h-16) with 4 icons
- Icons from Heroicons (outline style)
- Active state: filled icon variant

### Forms & Inputs
**Text Inputs:**
- Rounded-xl borders
- Padding: px-4 py-3
- Focus ring with offset
- Placeholder: text-sm, reduced opacity

**Textareas (Journal Entry):**
- Rounded-xl
- Padding: p-4
- Min height: min-h-[200px]
- Resize: resize-y

### Data Visualization
**Emotion Chart (Line Chart):**
- Library: Recharts (via CDN)
- Height: h-64 on mobile, h-80 on desktop
- Smooth curves with area fill
- Grid: subtle, dashed lines
- Labels: rotate for readability

**Emotion Indicators:**
- Circular progress rings for confidence %
- Horizontal bars for stress levels
- Badge-style labels for emotion states (rounded-full, px-4 py-2)

### Status Indicators
**Live Session Indicators:**
- Pulsing dot animation (w-3 h-3, rounded-full)
- "LIVE" badge with subtle animation
- Positioned: top-right of video preview

**Emotion Badges:**
- Rounded-full, px-4 py-2
- Font: text-sm, font-medium
- Icons: Small emoji or Heroicons

---

## Page-Specific Layouts

### Auth Pages (Login/Signup)
- Centered card layout on full viewport
- Card: max-w-md, rounded-3xl, p-8
- Logo/App name at top (text-4xl, Poppins, font-semibold)
- Tagline below (text-lg, opacity-80)
- Form fields: stack with gap-4
- CTA button: full width, mt-6
- Secondary action (switch to login/signup): text-center, mt-4

### Dashboard (Home)
**Layout:**
- Welcome section at top: mb-8 to mb-12
  - User name: text-3xl, font-semibold
  - Greeting message: text-lg, opacity-80
- Two-column grid on desktop (grid-cols-1 md:grid-cols-2, gap-6)
- Cards for Video Session and Voice Journal:
  - Equal height (aspect-square on desktop)
  - Large icon at top (w-16 h-16)
  - Title: text-2xl, font-semibold, mt-4
  - Description: text-base, mt-2, opacity-70
  - Arrow/chevron at bottom-right

### Video Session Page
**Layout:**
- Header with back button and session status: mb-6
- Main content: Grid on large screens (grid-cols-1 lg:grid-cols-3, gap-6)
  
**Left Column (2 spans):**
- Video preview card:
  - Aspect ratio: aspect-video
  - Rounded-2xl with overflow-hidden
  - Live indicator in top-right corner
  - Controls overlay at bottom (backdrop-blur, rounded-b-2xl)
  
**Right Column (1 span):**
- Emotion metrics stack (gap-4):
  - Current emotion badge (large, text-center)
  - Confidence ring (circular progress)
  - Stress level bar

**Below:** 
- Emotion trend chart (full width, mt-8, h-80)

### Voice Journal Page
**Layout:**
- Single column, max-w-3xl, centered
- Record button: Large, centered, circular (w-24 h-24, mb-8)
- Emotion display card: rounded-2xl, p-6, mb-6
  - Detected emotion and confidence
- Journal entry section:
  - Title input: mb-4, text-xl
  - Text area: Full width, min-h-[300px]
  - Save button: bottom-right, sticky (bottom-8, right-8)

### Insights/Logs Page
**Layout:**
- Page header with title "Insights": mb-8
- Tab navigation: mb-6
  - Inline tabs (flex, gap-4)
  - Active tab: border-b-2, font-semibold
- Content area:
  - Table/list view with cards
  - Each log entry: rounded-xl card, p-4 to p-6, mb-4
  - Grid on desktop for compact view: grid-cols-1 md:grid-cols-2, gap-4

**Log Card Structure:**
- Date/time badge at top-left
- Dominant emotion badge at top-right
- Duration/word count below
- Snippet or preview (2 lines, ellipsis)
- "View Details" link at bottom

### Profile/Settings Page
**Layout:**
- Single column, max-w-2xl
- Sections separated with mb-12
- Section headers: text-xl, font-semibold, mb-4

**Settings Cards:**
- Each setting group in rounded-2xl card, p-6
- Label on left, control on right (flex justify-between)
- Stack on mobile

---

## Icons
**Library:** Heroicons (outline and solid variants)
**Usage:**
- Navigation: outline style, w-6 h-6
- Buttons: solid style, w-5 h-5
- Status indicators: solid style, w-4 h-4
- Feature icons: outline style, w-12 h-12 to w-16 h-16

---

## Images

### Dashboard Feature Cards
- **Video Session Card:** Abstract illustration of person with calm expression, soft focus bokeh background (place as background image with overlay)
- **Voice Journal Card:** Minimalist microphone or sound wave visualization (place as background image with overlay)
- Images should have subtle opacity (60-70%) so text remains readable

### Auth Pages
- **Optional hero element:** Soft abstract gradient sphere or emotional color flow (place above or beside the auth card)

### Profile Page
- **Avatar placeholder:** Circular, w-24 h-24, centered at top of profile section

**Note:** No large hero images needed for this app - focus is on calm, functional interface rather than marketing-style landing.

---

## Animations (Minimal & Purposeful)

Use Framer Motion sparingly:
- Page transitions: Fade in with slight upward motion (y: 20 to y: 0)
- Card hover: Subtle lift (scale: 1.02, shadow increase)
- Button press: Slight scale down (scale: 0.98)
- Emotion changes: Smooth number count-up for confidence %
- Live indicator: Gentle pulse (opacity 0.5 to 1, repeat)
- Recording button: Pulse during active recording

**Transition durations:** 200-300ms for interactions, 400-500ms for page transitions
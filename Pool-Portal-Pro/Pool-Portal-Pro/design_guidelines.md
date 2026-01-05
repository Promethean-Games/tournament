# Design Guidelines: Par for the Course Pool Tournament Registration

## Design Approach

**Reference-Based Approach: Sports Event Flyer Aesthetic**
Drawing from traditional pool tournament flyers with modern digital execution. Think sports event posters meets contemporary web design - bold, immediately scannable, with strong visual hierarchy and authentic venue/table photography.

## Images

**Hero Background Image:**
- Full-width background image of pool table setup at Betsy's Billiards
- Suggested: Close-up of 8-foot Diamond table with balls racked, overhead dramatic lighting, slight depth of field
- Treatment: Dark overlay (40-50% opacity) to ensure text readability
- Position: Cover the entire hero section background
- Alternative angles: Side angle of table with Austin venue atmosphere visible

**Supporting Images:**
- Venue photo in "What you're walking into" section: Interior shot of Betsy's Billiards showing multiple tables
- Optional tournament action shot: Players competing, mid-shot composition

## Layout System

**Spacing Primitives:**
Use Tailwind units of **4, 6, 8, 12, 16, 20** for consistent rhythm
- Section padding: py-12 to py-20
- Card padding: p-6 to p-8
- Component gaps: gap-4 to gap-8
- Micro-spacing: space-2 to space-4

**Flyer-Inspired Grid:**
- Hero: Two-column split (content left, quick facts card right) - maintain current structure but enhance
- Event details: Asymmetric grid (7-5 column split as currently implemented)
- Registration form: Single column, centered max-w-2xl for focused conversion

## Typography

**Hierarchy:**
- H1 (Tournament Title): Ultra-bold, 48-56px desktop, tight letter-spacing (-0.02em), 1.05 line-height
- H2 (Section Headers): Bold, 24-28px, slight negative tracking
- Body: 16px, 1.65 line-height for readability
- Small/Meta Text: 13-14px for tags, pills, navigation
- Hero Subhead: 18px, medium weight, increased line-height (1.6)

**Font Treatment:**
- Primary: System font stack (clean, readable)
- Weight variation: 700-900 for headers, 400-500 for body, 600 for emphasis
- Uppercase sparingly: Only for small tags/labels (location, format indicators)

## Core Components

**Hero Section:**
- Background: Full-width pool table photo with dark overlay
- Content: Left-aligned within contained max-width
- Tag row: Horizontal pills with icons (location, table specs, entry fee)
- CTA buttons: Primary action + secondary ghost button, grouped together
- Highlight pills: Stacked row beneath CTAs showing key tournament details
- Quick Facts card: Floating card overlay on right side (desktop), stacks below on mobile

**Quick Facts Card:**
- Elevated treatment: Enhanced shadow, subtle backdrop blur
- Stat rows: Icon + label + value pattern
- Vertical rhythm: Consistent 12-16px spacing between stats
- Note section at bottom: Smaller text, reduced opacity

**Registration Form:**
- Two-column field layout (desktop): Name fields, contact info
- Full-width: Email, phone, additional notes
- Clear field labels: Above inputs, 12px, reduced opacity
- Input styling: Ample padding (14-16px), rounded corners (12-14px)
- Submit button: Full-width, prominent, gradient treatment

**Information Cards:**
- Rounded corners: 16-20px border-radius
- Internal padding: 20-24px
- Nested lists: Proper indentation (20px), bullet styling
- Pill badges: Inline throughout content to highlight key terms

**Banner/Alert:**
- Inline dot indicator: Animated pulse effect
- Horizontal layout: Icon + message
- Reduced visual weight: Muted styling to avoid alarm

## Component Structure

**Navigation:**
- Sticky header: Logo + event name left, nav links + CTA button right
- Compact height: 60-70px
- Links: Smooth scroll to anchor sections
- Mobile: Hamburger menu or stacked layout

**Footer:**
- Minimal: Single row, legal text + contact link
- Restrained spacing: 16-20px top padding

**FAQ Section:**
- Accordion pattern: Collapsible details elements
- Question styling: Bold, 16px, increased tap target
- Answer reveal: Smooth expansion, padded content

## Mobile Adaptations

- Hero: Stack to single column, image visible behind content
- Quick Facts: Move below hero content, full-width
- Form: Single column throughout
- Stats grid: Stack vertically with full-width rows
- Reduce font sizes: H1 to 36-42px, proportional scaling

## Interaction Patterns

**Buttons:**
- Hover: Subtle lift (translateY -1-2px) + brightness increase
- Primary CTA: Prominent gradient, strong shadow
- Ghost buttons: Border + subtle fill on hover
- Disabled state: Reduced opacity, no pointer events

**Form Validation:**
- Real-time: Inline error messages below fields
- Success state: Green border + checkmark icon
- Error state: Red border + error text
- Toast notifications: Slide in from top for payment status

**Scrolling:**
- Smooth scroll: CSS scroll-behavior for anchor links
- Minimal animations: Fade-in on scroll for sections (subtle, fast)

## Content Density

- Hero: Concentrated information, clear hierarchy, breathable spacing
- Details sections: Generous padding (py-16 to py-20) between major sections
- Within cards: Tight grouping (8-12px) for related items, larger gaps (20-24px) between groups
- Form: Adequate breathing room between fields (16-20px) to reduce cognitive load

This event needs immediate visual impact with flyer-style boldness while maintaining professional tournament credibility through clean execution and authentic photography.
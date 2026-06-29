---
name: SummitQuest Maharashtra
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#414844'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#3b2000'
  on-tertiary: '#ffffff'
  tertiary-container: '#593300'
  on-tertiary-container: '#ed9101'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffdcbc'
  tertiary-fixed-dim: '#ffb86b'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#683d00'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
  accent-gold: '#FFBF69'
  surface-off-white: '#F8F9FA'
  text-dark: '#1E293B'
  brand-coral: '#FF5A5F'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is built for a premium adventure tourism marketplace that bridges the rugged beauty of Maharashtra’s landscapes with a sophisticated, high-end digital experience. The brand personality is **authoritative yet inviting**, catering to explorers who value professional curation and safety without sacrificing the thrill of discovery.

The design style is **Modern Minimalism with Tactile Depth**. It draws heavily from the "Apple/Airbnb" aesthetic, prioritizing high-quality photography as the primary narrative tool. The interface utilizes generous whitespace (negative space) to create a sense of "breathability" and calm, contrasting the intense nature of outdoor activities. Subtle glassmorphism is employed for persistent UI elements to maintain context of the underlying scenery, while soft, diffused shadows provide a sense of physical layering and premium craftsmanship.

## Colors

The color strategy is rooted in the natural palette of the Western Ghats. **Forest Green (#1B4332)** serves as the primary anchor, used for high-level branding, primary buttons, and navigation headers to establish trust and environmental connection. **Emerald** is used for interactive states and success indicators.

**Warm Orange (#FF9F1C)** provides a high-energy accent for CTAs and "Book Now" actions, ensuring high conversion through contrast while maintaining WCAG AA compliance against white backgrounds. **Slate and Dark Gray** are reserved for typography to ensure soft legibility that is less harsh than pure black. Backgrounds are kept predominantly **Pure White** to maintain a clean, gallery-like feel, with **Off-white** used to differentiate content sections or card containers.

## Typography

The system utilizes a dual-font approach. **Montserrat** is the headline face; its geometric structure conveys modernity and strength. Headlines should use tight letter-spacing and bold weights to command attention on hero sections.

**Inter** is the workhorse for body copy and UI labels. It was selected for its exceptional legibility at small sizes and its neutral, "systematic" feel that doesn't distract from the photography. Line heights are kept generous (1.5x for body) to ensure a comfortable reading experience for long-form itinerary descriptions.

## Layout & Spacing

The design system employs a **12-column fixed grid** for desktop, centering the content within a 1280px container to ensure readability on ultra-wide monitors. On mobile, the system transitions to a fluid 4-column layout.

Spacing follows an **8px linear scale**. Use larger increments (64px, 80px, 96px) between major sections to emphasize the minimalist aesthetic. Grid gutters are fixed at 24px to provide clear breathing room between cards and content modules. Padding within cards and modals should favor the "Generous" end of the scale (minimum 24px) to reinforce the premium positioning.

## Elevation & Depth

Depth is established through three distinct layers:

1.  **Base Layer:** Pure white or #F8F9FA background.
2.  **Surface Layer:** Cards and containers using **Ambient Shadows**. Shadows should be ultra-soft: `0 12px 32px rgba(30, 41, 59, 0.08)`. Hover states should increase this elevation slightly to simulate the element lifting toward the user.
3.  **Overlay Layer:** Navigation bars and booking widgets use **Glassmorphism**. Apply a `backdrop-filter: blur(12px)` with a semi-transparent white fill (`rgba(255, 255, 255, 0.8)`). This ensures the UI feels integrated with the high-resolution nature photography behind it.

## Shapes

The shape language is defined by large, friendly radii. A **standard radius of 16px** is applied to primary cards and input fields. Feature hero images and "Surface Layer" containers use a **24px radius** (`rounded-xl`) to create a soft, contemporary silhouette. Small UI elements like chips or badges utilize a **fully rounded (pill)** shape to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Forest Green background, White text, 16px radius. On hover, transition to Emerald.
- **Secondary:** Transparent background, Forest Green 1.5px border.
- **CTA:** Warm Orange background with bold Montserrat text for maximum visibility.

### Premium Cards
Cards are the core of the marketplace. They feature a 24px radius, hidden overflow for images, and a subtle 1px border (`#E2E8F0`) to define edges on white backgrounds. The title is always `headline-sm`. On hover, the card should scale slightly (1.02x) and the shadow depth should double.

### Sticky Navigation
The top navigation bar is a persistent glassmorphic strip. It uses a 1px bottom border of `rgba(0,0,0,0.05)` for definition. Links use `label-md` in Dark Gray, shifting to Forest Green on active/hover states.

### Inputs & Widgets
Form inputs use the Off-white (#F8F9FA) background with a 16px radius. The booking widget should be treated as a "floating" glassmorphic card on mobile, docked to the bottom of the screen to remain accessible during scrolling.

### Chips & Badges
Used for difficulty levels (e.g., "Easy", "Moderate", "Hard"). Use pill shapes with low-opacity background tints of the secondary green or accent orange.
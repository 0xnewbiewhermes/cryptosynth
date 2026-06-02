---
name: CryptoSynth
description: Catatan crypto personal — terminal aesthetic, dark mode, monospace-first
colors:
  bg-deep: "#0c0c0c"
  bg-elevated: "#161616"
  bg-surface: "#1a1a1a"
  text-primary: "#d4d4d4"
  text-secondary: "rgba(212, 212, 212, 0.65)"
  text-muted: "rgba(212, 212, 212, 0.50)"
  text-dim: "rgba(212, 212, 212, 0.40)"
  accent-blue: "#3b82f6"
  accent-blue-light: "#60a5fa"
  accent-blue-dark: "#2563eb"
  accent-indigo: "#6366f1"
  accent-emerald: "#10b981"
  accent-amber: "#f59e0b"
  accent-red: "#ef4444"
  accent-orange: "#e0a060"
  border-subtle: "rgba(255, 255, 255, 0.04)"
  border-light: "rgba(255, 255, 255, 0.02)"
typography:
  body:
    fontFamily: "'Source Code Pro', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  display:
    fontFamily: "'Source Code Pro', 'SF Mono', 'Menlo', monospace"
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  label:
    fontFamily: "'Source Code Pro', 'SF Mono', monospace"
    fontSize: "0.6rem"
    fontWeight: 600
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.65rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.65rem"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "0"
    padding: "0.85rem 0"
  chip:
    backgroundColor: "rgba(255, 255, 255, 0.02)"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.5rem"
---

# Design System: CryptoSynth

## 1. Overview

**Creative North Star: "The Terminal Practitioner"**

CryptoSynth's design system is built from the command line outward. Every visual decision traces back to one question: would a crypto practitioner who lives in the terminal find this authentic? The aesthetic is not a costume layered over a blog; it IS the blog. Dark backgrounds, monospace typography, syntax-highlighted accents, and the structural rhythm of a terminal interface. This is a system that treats its audience as peers, not prospects.

The system explicitly rejects the visual language of its anti-references: no SaaS landing-page polish (gradients, glassmorphism, hero-metric templates), no crypto-influencer flash (emoji overload, rocket-emoji hype, countdown timers), no traditional-finance stiffness (corporate blue, formal disclaimers, institutional tone). It also rejects the saturated AI-default patterns: no cream/sand body backgrounds, no editorial-typographic display-serif layouts, no identical card grids with icon-heading-text repetition.

**Key Characteristics:**
- Monochrome-first with syntax-inspired accent colors (blue for links, emerald for success, amber for warnings, red for errors)
- Terminal chrome as structural element (topbar with window dots, status bar, command prompt)
- Flat elevation by default; depth through tonal layering (bg → elevated → surface), not shadows
- Single font family (Source Code Pro) across all roles; hierarchy through weight and size contrast
- Dark mode as native state, not a toggle; the system is born dark

## 2. Colors

The palette is a dark terminal with syntax-highlighting accents. Five neutral tones define the depth stack; five accent colors map to terminal syntax roles.

### Primary
- **Electric Blue** (#3b82f6): The primary accent. Used for links, active navigation indicators, interactive element highlights. Appears on ≤15% of any screen; its rarity signals interactivity.

### Secondary
- **Indigo** (#6366f1): Command prompt color. Reserved for the terminal prompt indicator (`gideon@cryptosynth:~$`) and structural chrome. Not used for general interactive elements.

### Tertiary
- **Emerald** (#10b981): Success states, cursor color, connection status dot. Maps to terminal success output.
- **Amber** (#f59e0b): Warning states, tag chips, filter labels. Maps to terminal warning output.
- **Red** (#ef4444): Error states, scam/danger indicators. Maps to terminal error output.
- **Warm Orange** (#e0a060): Inline code highlights, string literals. Maps to terminal string syntax.

### Neutral
- **Deep Black** (#0c0c0c): Body background. The deepest layer.
- **Elevated Surface** (#161616): Topbar, status bar, cards, modal backgrounds. One step above body.
- **Surface** (#1a1a1a): Input backgrounds, secondary containers. One step above elevated.
- **Primary Text** (#d4d4d4): Main body text, headings. High contrast against deep black.
- **Secondary Text** (rgba(212, 212, 212, 0.65)): Supporting copy, descriptions.
- **Muted Text** (rgba(212, 212, 212, 0.50)): Labels, timestamps, metadata.
- **Dim Text** (rgba(212, 212, 212, 0.40)): De-emphasized content, placeholders.
- **Subtle Border** (rgba(255, 255, 255, 0.04)): Card borders, dividers, section separators.

### Named Rules

**The Syntax Rule.** Accent colors map 1:1 to terminal syntax roles (blue=link, emerald=success, amber=warning, red=error, orange=string). Never use an accent color outside its syntax role. Blue is never a "brand color" plastered across heroes; it's the color of clickable things.

**The Depth Stack Rule.** Backgrounds use exactly three tonal layers: `--bg` (0c0c0c) → `--bg-elevated` (161616) → `--bg-surface` (1a1a1a). No additional depth layers. Depth is conveyed through tonal separation, never through shadows or blur.

**The Muted Hierarchy Rule.** Text uses exactly four opacity levels of the same base color (#d4d4d4): primary (100%) → secondary (65%) → muted (50%) → dim (40%). Never introduce a fifth level or a different hue for text.

## 3. Typography

**Display Font:** Source Code Pro (with SF Mono, Menlo fallback)
**Body Font:** Source Code Pro (with SF Mono, Menlo, Monaco, Consolas fallback)
**Label Font:** Same family, different weight/size

**Character:** A single monospace family carries the entire system. This is not a compromise; it's a commitment. The terminal practitioner reads monospace as native, not as "developer aesthetic." Hierarchy comes entirely from weight contrast (400 → 500 → 600 → 700 → 900) and size scaling, not from font-family switching.

### Hierarchy
- **Display** (900, clamp(1.6rem, 4vw, 2.4rem), line-height 1.1): Article titles, page headings. `text-wrap: balance` applied. Maximum one per page view.
- **Headline** (700, 1.35rem, line-height 1.2): Section headings within article body (h1, h2, h3). `text-wrap: balance` applied.
- **Body** (400, 14px/0.88rem, line-height 1.75): Main content. Max line length: 75ch.
- **Label** (600, 0.6rem, letter-spacing 0.1em, uppercase): Section labels, metadata, badge text. Maximum 4 words.
- **Mono Caption** (400, 0.65-0.75rem): Topbar path, status bar, timestamps. The structural chrome layer.

### Named Rules

**The One-Family Rule.** Source Code Pro is the only font family. No display serif, no body sans-serif, no "contrast pairing." The monospace IS the voice. If the system ever needs a second family, the entire identity needs rethinking, not just the typography.

**The Weight-Ladder Rule.** Hierarchy steps use weight contrast of at least 200 between adjacent levels. Body (400) → Label (600) → Headline (700) → Display (900). Never two adjacent steps at the same weight.

## 4. Elevation

The system is flat by default. There are no box-shadows in the design vocabulary. Depth is conveyed entirely through the three-layer tonal background stack (`bg` → `bg-elevated` → `bg-surface`) and through border opacity (0.02 → 0.04 → 0.06 → 0.12 for increasing emphasis).

The only exception is the subtle `0 1px 2px rgba(0, 0, 0, 0.3)` on elevated cards, used sparingly to lift interactive elements above their container.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat. No ambient shadows, no glassmorphism, no backdrop-filter blur. If an element needs to appear elevated, it moves up the tonal stack, not into shadow space.

**The Border-Opacity Rule.** Borders use white at varying opacities: `rgba(255, 255, 255, 0.02)` for subtle dividers, `0.04` for card borders, `0.06` for emphasized borders, `0.12` for hover states. Never use a solid colored border.

## 5. Components

### Buttons
- **Shape:** Sharp corners (4px radius). Buttons are rectangular, not pill-shaped.
- **Primary:** Blue background (#3b82f6), white text, 0.25rem 0.65rem padding. Used for primary actions (submit, save).
- **Ghost:** Transparent background, muted text, same padding. Used for secondary actions (cancel, dismiss).
- **Hover:** Primary buttons shift to darker blue (#2563eb). Ghost buttons show subtle border highlight.
- **Focus:** Visible focus ring via `:focus-visible`, never removed without replacement.

### Chips / Tags
- **Style:** Near-transparent background (rgba(255, 255, 255, 0.02)), subtle border (0.04 opacity), muted text. 0.58rem font-size, uppercase, 0.08em letter-spacing.
- **State:** Hover shifts border to primary blue, text to primary-light blue.
- **Variants:** Status badges use syntax colors (emerald=active, amber=upcoming, red=ended).

### Cards / Containers
- **Corner Style:** Gently curved (4px radius, 8px for large containers).
- **Background:** Elevated surface (#161616) or transparent with subtle border.
- **Border:** 1px solid rgba(255, 255, 255, 0.04). Hover increases to 0.10.
- **Internal Padding:** 0.85rem 1rem for compact cards, 1.5rem for content containers.
- **Expandable:** Cards use max-height transition for detail panels. One card open at a time.

### Inputs / Fields
- **Style:** Transparent background, no border by default. Monospace font. Sharp corners (0 radius).
- **Focus:** Bottom border or wrap-border shifts to primary blue via `:focus-within` on parent.
- **Placeholder:** Dim text (40% opacity). Ends with ellipsis character (…).
- **Terminal Input:** Special case with emerald cursor (`caret-color: var(--accent-success)`).

### Navigation (Topbar)
- **Style:** Fixed top, 40px height, elevated background. Contains window dots (decorative), path label, nav links, and utility buttons.
- **Typography:** 0.72rem monospace, muted text.
- **Default:** Muted text, transparent background.
- **Hover:** Primary text, subtle hover background.
- **Active:** Primary text, elevated background, left border accent (2px blue).
- **Mobile:** Hamburger menu, full-width dropdown.

### Status Bar
- **Style:** Fixed bottom, 24px height, elevated background. Shows connection status, article count, categories, clock.
- **Dot:** Emerald pulsing dot for "connected" status.

### Scroll-to-Top
- **Style:** Fixed position, 32px square, elevated background, subtle border.
- **State:** Hidden by default, visible after 300px scroll.
- **Hover:** Border shifts to primary, text to primary-light.

## 6. Do's and Don'ts

### Do:
- **Do** use the three-layer tonal depth stack (bg → elevated → surface) for all elevation. No shadows, no blur.
- **Do** map accent colors to their syntax roles: blue for links, emerald for success, amber for warnings, red for errors.
- **Do** use `text-wrap: balance` on all headings (h1–h3) for even line lengths.
- **Do** use `tabular-nums` on all number columns and timestamps for alignment.
- **Do** use non-breaking spaces before units (`min`, `WIB`) and abbreviations.
- **Do** use `…` (U+2026 ellipsis character) in all placeholders, never three periods.
- **Do** guard all keyframe animations with `@media (prefers-reduced-motion: no-preference)`.
- **Do** use explicit transition properties, never `transition: all`.
- **Do** add `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` to interactive elements.
- **Do** use `viewport-fit=cover` and `env(safe-area-inset-*)` for notched devices.

### Don't:
- **Don't** use gradients, glassmorphism, or backdrop-filter blur. The system is flat. *"No SaaS landing-page polish."*
- **Don't** use box-shadow for elevation. Depth is tonal, not shadowed.
- **Don't** use a second font family. Source Code Pro is the only voice. *"No display serif, no body sans-serif."*
- **Don't** use border-radius above 8px on cards or containers. 4px is the default; 8px is the maximum. *"No 24/28/32/40px rounding."*
- **Don't** use hero-metric templates (big number + small label + gradient accent). *"No crypto-influencer flash."*
- **Don't** use emoji as decorative elements in headings or section markers. SVG icons only.
- **Don't** use cream, sand, beige, or warm-tinted body backgrounds. The body is #0c0c0c. *"No AI-default warm neutrals."*
- **Don't** use editorial-typographic patterns (display serif + italic drop caps + ruled separators). *"No magazine affectation."*
- **Don't** use identical card grids with icon + heading + text repeated endlessly. *"No template card grids."*
- **Don't** use tiny uppercase tracked eyebrows above every section heading. *"No AI scaffolding."*
- **Don't** use `transition: all`. Always specify explicit properties.
- **Don't** remove focus outlines without providing a visible `:focus-visible` alternative.

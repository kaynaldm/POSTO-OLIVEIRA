---
name: PostoRH Executive Operations
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a1700'
  on-tertiary-container: '#b87500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-display:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

### Personality & Purpose
The brand embodies operational rigor, trust, and absolute administrative clarity. Built specifically for high-turnover, shift-heavy retail operations across fuel station networks, it communicates stability, speed, and precision. It replaces chaotic paperwork and clunky legacy desktop software with a contemporary, razor-sharp enterprise workflow.

### Target Audience
- Operational HR Managers & Payroll Coordinators managing multiple station branches.
- Station Supervisors monitoring shift turnouts, pump operator rosters, and daily attendance logs.
- Executive Leadership auditing wage disbursements, advances, fuel allowances, and labor compliance.

### Emotional Response
Users must feel immediate confidence, control, and zero cognitive fatigue. Dense operational data (schedules, cash advances, employee statuses) must feel light, structured, and instantly actionable.

### Visual Style: Corporate Modern (shadcn/Tailwind Architectural Precision)
The visual grammar merges disciplined Corporate Modernism with the sleek utility of modern engineering frameworks:
- **Monochromatic Grounding:** Deep petrol slate anchors the shell and structural framing.
- **Crisp Surfaces:** Pure white workspace containers set over soft, neutral off-white canvases.
- **Functional Accents:** Surgical application of operational blue for decisive actions and warm amber for operational states and safety metrics.
- **Micro-Delight via Utility:** Border-driven depth, dense tabular layouts, high-legibility typography, and keyboard-first accessibility.

## Colors

### Color Strategy
Color serves operational hierarchy and status signaling, avoiding decorative bloat.

- **Primary (`#0F172A` - Slate 900):** Represents structural authority. Used for navigation sidebars, high-level headers, primary buttons, and critical metric labels.
- **Secondary (`#2563EB` - Blue 600):** Communicates interactive intent, active tab states, selection rings, primary links, and progressive disclosures.
- **Tertiary (`#F59E0B` - Amber 500):** Represents the fuel/energy heritage; serves strictly as an operational signal for pending advances, shift warnings, and mid-tier thresholds.
- **Neutral (`#64748B` - Slate 500):** Anchors secondary labels, muted icons, tabular metadata, and helper text.

### Surface Tones & Tokens
- **Canvas Base:** `#F8FAFC` (Slate 50) - Neutral background maintaining soft contrast without screen glare.
- **Surface Elevation (Cards/Sheets):** `#FFFFFF` - Crisp foreground container for data segregation.
- **Subtle Surface:** `#F1F5F9` (Slate 100) - Table headers, alternating zebra rows, disabled controls, and segmented control backgrounds.
- **Border Tokens:** `#E2E8F0` (Slate 200) for standard layout and input borders; `#CBD5E1` (Slate 300) for active dividers and hover borders.

### Functional Status Indicators
- **Success / Active:** `#059669` (Emerald 600) / Tint `#ECFDF5`
- **Warning / Pending Advance:** `#D97706` (Amber 600) / Tint `#FFFBEB`
- **Danger / Absent / Blocked:** `#DC2626` (Red 600) / Tint `#FEF2F2`
- **Info / Off-Duty:** `#475569` (Slate 600) / Tint `#F1F5F9`

## Typography

### Structural Selection
Geist provides typographic precision suited for dense administrative systems. Its geometric construction and neutral demeanor maximize horizontal data packing without compromising legibility across tabular records, identity codes (CPF, CNPJ), and financial sums.

### Typographic Hierarchy Guidelines
- **Metric Display:** Reserved exclusively for top-line numeric values in KPI overview panels (e.g., "98.4%", "R$ 42.850").
- **Headline Ranks:** `headline-xl` is restricted to core module landing headers; `headline-md` titles cards and modal overlays.
- **Tabular Figures:** All numeric representations (currencies, shift dates, hours, and employee counts) must utilize tabular numbers (`font-variant-numeric: tabular-nums`) to ensure strict vertical alignment in tables and summaries.
- **Labels:** `label-sm` is consistently rendered in uppercase styling when defining status pill badges and table column headers.

## Layout & Spacing

### System Architecture
The layout uses a multi-pane operational structure:
- **Persistent Side Rail / Navigation Drawer:** Fixed 260px desktop width, collapsible into an icon rail (64px) for wide tabular exploration.
- **Top Utility Header:** Fixed 56px height, containing branch selectors, quick shift switchers, and session controls.
- **Fluid Work Canvas:** Adapts horizontally to fill the remainder of the viewport up to 1920px max bounded width, preventing unreadable line lengths on ultra-wide screens.

### Grid Rhythm & Adapters
- **12-Column Responsive Fluid Grid:** For analytical views and dashboard configurations.
  - Desktop (>1024px): 12 columns, 24px gutters (`gutter-lg`), 32px canvas margins (`margin-desktop`).
  - Tablet (768px - 1023px): 6 columns, 16px gutters (`gutter`), 24px canvas margins (`margin`).
  - Mobile (<768px): 2 columns or stack, 12px gutters (`gutter-sm`), 16px margins (`margin-mobile`).
- **Data Densification:** Tables, filter blocks, and master-detail splits maintain a compact rhythm based on multi-steps of `4px` (`0.25rem`), prioritizing dense content display.

## Elevation & Depth

### Philosophy: Low-Contrast Precision
This design system avoids heavy shadows, using crisp architectural borders with delicate ambient light scattering. Elements achieve separation through defined line borders (`#E2E8F0`) augmented by micro-shadows.

### Layer Stack

- **Level 0 (Base Canvas):** `#F8FAFC`. Flat background plane. No shadow, no border.
- **Level 1 (Cards, KPI Blocks, Table Shells):** `#FFFFFF`. Surface layer bounded by a `1px solid #E2E8F0` border and an ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Dropdowns, Cascading Filter Menus, Hover Cards):** `#FFFFFF`. Floating elements framed with `1px solid #CBD5E1` and distinct soft elevation: `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modals, Overlays, Slide-over Drawers):** `#FFFFFF`. Structural dialogs hovering above a backdrop overlay (`rgba(15, 23, 42, 0.5)` with `backdrop-filter: blur(2px)`). Elevation: `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

### Border Interactions
Interactive borders react dynamically: form controls transition from `#E2E8F0` to `#2563EB` on focus, paired with a focus ring (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`).

## Shapes

### Shape Character: Disciplined Soft Geometric
The shape scale uses subtle edge rounding to keep the layout clean and technical:
- **Base Components (Inputs, Table Badges, Buttons):** `rounded-md` (`6px` / `0.375rem`) provides a modern cut without feeling playful.
- **Container Surfaces (Cards, Modals, Flyouts):** `rounded-lg` (`8px` / `0.5rem`) delivers structural containment.
- **Pill Badges (Status Indicators only):** `rounded-full` (`9999px`) creates high contrast against angular inputs and cards.

## Components

### Buttons
- **Primary:** Background `#0F172A`, text `#FFFFFF`, border none. Hover: `#1E293B`. Focus: ring 2px `#2563EB` offset 2px. Height 36px (compact) or 40px (default), font size `label-lg`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. Hover: `#F1F5F9`.
- **Accent (Action/New Entry):** Background `#2563EB`, text `#FFFFFF`. Hover: `#1D4ED8`.
- **Destructive:** Background `#DC2626`, text `#FFFFFF`. Hover: `#B91C1C`.

### Form Inputs & Cascading Selectors
- **Input Fields:** Background `#FFFFFF`, border `1px solid #E2E8F0`, padding `0.5rem 0.75rem`, text `body-md`. Placeholder color `#94A3B8`.
- **Cascading Filter Bar:** Grouped inputs connected horizontally. Select Branch > Select Shift > Select Role > Search Collaborator. Active selections render a light tint background (`#EFF6FF`) with blue highlight accents.

### Status Badges (Pills)
- Rendered in uppercase, font size `label-sm`, horizontal padding `0.625rem`, vertical padding `0.125rem`.
- **Ativo (Active):** `#ECFDF5`, text `#047857`, border `1px solid #A7F3D0`.
- **Inativo / Demitido:** `#F1F5F9`, text `#475569`, border `1px solid #CBD5E1`.
- **Presença Confirmada:** `#EFF6FF`, text `#1D4ED8`, border `1px solid #BFDBFE`.
- **Falta / Inconsistência:** `#FEF2F2`, text `#B91C1C`, border `1px solid #FECACA`.
- **Vale Pendente / Em Análise:** `#FFFBEB`, text `#B45309`, border `1px solid #FDE68A`.

### Tables (Data Grid)
- Fixed header with background `#F8FAFC`, border bottom `1px solid #E2E8F0`, uppercase column titles (`label-sm`).
- Cell padding: vertical 10px, horizontal 16px. Border bottom `1px solid #F1F5F9`.
- Hover state: row transitions to `#F8FAFC`. Selected row: `#EFF6FF`.
- Right-aligned tabular numeric data for monetary amounts and hours worked.

### KPI Cards (Daily Shift & Roster Metrics)
- Container: Level 1 elevation, padding `1.25rem`.
- Top: Category title (`label-md`, `#64748B`) paired with a functional contextual badge (e.g., "+3.2% vs ontem").
- Center: `metric-display` in `#0F172A`.
- Bottom: Descriptive subtext or split mini-bar indicating shift progress (e.g., "Turno Manhã: 18/18 presentes").

### Map & Network Controls
- Map viewports embedded with inset borders (`1px solid #E2E8F0`).
- Station marker cards: Minimalist popups with branch ID, operational manager contact, and real-time active staff counter.
- Quick layer controls: Floating segment control anchored at the top-right corner to toggle between "Frequência ao Vivo", "Vales do Dia", and "Turnos Críticos".
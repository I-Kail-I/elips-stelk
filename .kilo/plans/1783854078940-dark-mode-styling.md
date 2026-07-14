# Dark Mode Styling Improvements

## Design Decisions (Confirmed)

- **Navbar**: `bg-primary` in light, `bg-primary/80` (top state) /
  `bg-primary/30` (scrolled state) in dark
- **Footer**: Use CSS variables (`bg-muted`) instead of custom
  `dark:bg-[#0b1120]`

## Files to modify

### 1. `frontend/src/components/layout/navbar.tsx`

- Replace hardcoded `bg-orange-400` → `bg-primary dark:bg-primary/80` (top
  state, non-scrolled)
- Replace `bg-orange-400/40 backdrop-blur-2xl` →
  `bg-primary/40 dark:bg-primary/30 dark:backdrop-blur-2xl` (scrolled state)
- Add `text-foreground` to the "Elips ORG" span for explicit variable-based
  color
- Add margin-block-start to nav item buttons for better vertical centering,
  ensure `text-foreground` is applied on ghost button text

### 2. `frontend/src/components/layout/footer.tsx`

- Fix `:bg-[#fafafa]` typo → remove entirely (unnecessary, `bg-muted` handles
  it)
- Replace `dark:bg-[#0b1120]` → `bg-muted` (works in both themes via CSS var)
- Replace `border-slate-800` → `border-border/20`
- Replace `text-slate-300` (p tag) → `text-muted-foreground`
- Replace `text-slate-500` (bottom bar) → `text-muted-foreground`
- Replace `border-slate-800/80` → `border-border/10`
- Replace `border-slate-800 bg-slate-900` (map container) →
  `border-border/20 bg-card`
- Replace `hover:text-slate-300` → `hover:text-foreground`
- Nav links: `text-muted-foreground hover:text-accent` already uses variables —
  unchanged

### 3. `frontend/src/app/(user)/(home)/_sections/latest-section.tsx`

- Add dark mode grid pattern variant alongside the existing one:
  ```tsx
  className =
    'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]';
  ```
  White dots (7% opacity) in dark mode replace gray dots for visibility.

### 4. `frontend/src/app/(user)/(home)/_sections/hero-section.tsx`

- Stats section border: currently `border-y` → add `border-border/30` for
  subtler lines in both modes (current `border-border` gives pure black/white
  which may be too harsh)

### 5. `frontend/src/app/(user)/(home)/_sections/about-section.tsx`

- Stats `border-t` → add `border-border/30` for same reason as hero

### 6. `frontend/src/app/(user)/(home)/_components/features.tsx`

- Icon container: change `bg-secondary/10` → `bg-primary/10` so the icon
  background matches the brand orange primary instead of the green secondary,
  which looks inconsistent in dark mode

## Files NOT modified (already correct)

- `layout.tsx` — only structural wrapper, no visual styling
- `hero-slider.tsx` — images only, no theme concerns
- `latest-activity.tsx` — uses `bg-card`, `text-muted-foreground`,
  `hover:text-primary` (all CSS variables, fine)
- `features-section.tsx` — uses `bg-muted` (maps to CSS variable, fine for both
  modes)
- `mode-toggle.tsx`, `button.tsx`, `theme-provider.tsx` — shadcn/ui components,
  already handle dark mode

## Verification

- Toggle dark mode via the `ModeToggle` button in navbar
- Visual check: navbar text visibility on both orange and orange+blur
  backgrounds in both modes
- Visual check: footer background/text contrast in both modes
- Visual check: grid pattern visibility in latest section in dark mode
- Visual check: feature card icon backgrounds in dark mode

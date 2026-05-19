# Dhivya Bharathi — Portfolio

## Project Overview

Build a personal portfolio website for **Dhivya Bharathi** — student, creative, builder, maker.
Tagline: **"I love Tinkering."**

The design is editorial, minimal, and monospaced — like a terminal that went to art school.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Font:** Intel One Mono (via Google Fonts)
- **Animations:** Framer Motion
- **Deployment:** Vercel

### Setup Commands

```bash
npx create-next-app@latest dhivya-portfolio --typescript --tailwind --app
cd dhivya-portfolio
npm install framer-motion
```

Add to `app/layout.tsx`:
```tsx
import { Intel_One_Mono } from 'next/font/google'

const mono = Intel_One_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})
```

---

## Color Palette

Use these exact hex values. Define as CSS variables in `globals.css`.

```css
:root {
  /* Light Mode */
  --cream:     #EDE8D0;   /* main background */
  --white:     #FFFFFF;
  --sidebar:   #4F4D46;   /* dark sidebar bg */
  --sidebar-2: #787569;   /* sidebar secondary / borders */
  --text-dark: #1a1916;   /* primary text on cream */
  --text-muted:#4F4D46;   /* muted text */
  --text-light:#C9C5B1;   /* watermark / very subtle text */

  /* Accent colors */
  --lavender:  #A5AED7;
  --mint:      #D0EDDA;
  --pink:      #CC89B7;

  /* Dark Mode overrides */
  --cream-dark: #C9C5B1;  /* slightly muted cream for dark bg */
}
```

---

## Typography

**Font:** Intel One Mono — monospaced, clean, characterful.

| Use case         | Weight | Size (desktop) |
|------------------|--------|----------------|
| Hero name        | 500    | 5–6rem         |
| Section titles   | 500    | 2.5–3rem       |
| Nav links        | 400    | 1.25rem        |
| Body text        | 300    | 1rem           |
| Watermark (D.B.) | 300    | 0.75rem        |

**Key rule:** Every nav item ends with a period. `About.` `Projects.` `Experience.`

---

## Layout & Pages

### Page 1 — Hero / Splash (`/`)

**Full viewport, cream background.**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│   Dhivya Bharathi.          (bold, left)│
│   I love Tinkering.         (light)     │
│                                         │
│                                         │
│                                    D.B. │  ← bottom right, very muted
└─────────────────────────────────────────┘
```

- Background: `var(--cream)`
- Name: `font-weight: 500`, large (~5rem), dark text
- Tagline: `font-weight: 300`, smaller (~1.2rem), muted
- `D.B.` watermark: bottom-right, `font-weight: 300`, color `var(--text-light)`
- On scroll (or click), transition into the split layout below

---

### Page 2 — Split Layout (all other sections)

**Persistent split: sidebar left + content right.**

```
┌──────────────────┬──────────────────────┐
│                  │                      │
│   About.         │                      │
│   Projects.      │   [Section content]  │
│   Experience.    │                      │
│   Blog.          │   Hello World.       │
│   Contact.       │                      │
│                  │                      │
│            D.B.  │                      │
└──────────────────┴──────────────────────┘
```

- Sidebar width: ~35% of viewport, background `var(--sidebar)` (`#4F4D46`)
- Content area: ~65%, background `var(--cream)`
- Sidebar nav links: cream/white text, `font-weight: 400`
- Active nav link: highlighted with `var(--lavender)` or slightly brighter
- `D.B.` in sidebar bottom-right corner, muted
- Sidebar is **fixed/sticky** — stays visible while content scrolls on the right

---

## Sections & Content

### About
```
Hello World.

I'm Dhivya Bharathi — a student who loves tinkering.
I build things, break things, and learn from both.
Currently exploring the intersection of hardware, software,
and whatever catches my curiosity next.

Based in Tamil Nadu, India.
```

### Projects

Three projects to start (replace with real ones):

| Title              | Type       | Stack                          | Description                                              |
|--------------------|------------|--------------------------------|----------------------------------------------------------|
| Tinkr              | Hardware   | C++, Arduino, MQTT, Python     | Modular IoT prototyping toolkit. Built out of frustration.|
| Campus Connect     | Web App    | Next.js, Supabase, Tailwind    | Peer skill exchange platform. 48h hackathon → production. |
| Plantbot           | Automation | Raspberry Pi, Python, TF Lite  | Self-watering plant system with ML moisture prediction.  |

Each project card:
- Title + period (`Tinkr.`)
- Type tag (small, muted)
- 1–2 line description
- Stack pills — use accent colors (`--lavender`, `--mint`, `--pink`) for pills

### Experience

```
2024 — Present
Club Lead — Maker Space
[Your College Name]
Running weekly build sessions, mentoring juniors,
organizing the annual hardware hackathon.
Grew membership from 12 to 60+.

Summer 2024
Intern — Product Engineering
[Startup/Company Name]
Embedded firmware + dashboard UI for consumer IoT.
Shipped two features to production.

2023
Hackathon Winner — Smart India Hackathon
1st place for Campus Connect. Built in 36 hours.
```

### Blog

Placeholder for now:
```
Coming soon.
Writing about things I'm building and learning.
```

### Contact

```
Say hello.

dhivya@example.com
github.com/dhivyabharathi
linkedin.com/in/dhivyabharathi
```

---

## Interactions & Animations

Use **Framer Motion** for all transitions.

| Interaction              | Animation                                        |
|--------------------------|--------------------------------------------------|
| Initial page load        | Name fades up, tagline follows with 150ms delay  |
| Hero → split layout      | Sidebar slides in from left, content fades in    |
| Nav link hover           | Subtle underline or color shift, no jump         |
| Section change           | Content area fades out → fades in (200ms)        |
| Project card hover       | Border appears (1px, lavender), slight translateY(-2px) |

Keep animations **subtle and fast** — this is a minimal design, not a showcase of motion.

---

## File Structure

```
dhivya-portfolio/
├── app/
│   ├── layout.tsx          # font, metadata
│   ├── page.tsx            # hero splash
│   └── globals.css         # CSS variables, base styles
├── components/
│   ├── HeroScreen.tsx      # splash page
│   ├── SplitLayout.tsx     # sidebar + content wrapper
│   ├── Sidebar.tsx         # nav links, D.B. watermark
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   └── ProjectCard.tsx
├── public/
│   └── (images if any)
└── CLAUDE.md               # this file
```

---

## Key Rules for Claude Code

1. **Every nav item has a period.** `About.` not `About`
2. **Intel One Mono everywhere.** No fallback to system fonts in display text.
3. **No gradients, no shadows, no glow.** Flat and clean.
4. **Cream is the canvas.** The sidebar dark color is the only heavy element.
5. **Accent colors (lavender, mint, pink) are used sparingly** — pills, hover states, active links only.
6. **Mobile:** Stack layout — sidebar becomes a top nav bar, content fills viewport.
7. **Periods.** Did I mention the periods? Every heading, every nav item ends with `.`

---

## What to Build First

Start here in order:

1. `globals.css` — CSS variables, base reset, font import
2. `HeroScreen.tsx` — static layout first, then add fade-in animation
3. `SplitLayout.tsx` + `Sidebar.tsx` — the core split view
4. `About.tsx` — simplest section, get the layout right
5. `Projects.tsx` + `ProjectCard.tsx` — with accent pill colors
6. `Experience.tsx` — timeline style
7. `Contact.tsx`
8. Wire up navigation + section switching in `SplitLayout`
9. Add Framer Motion transitions last

---

## Deployment

```bash
npm run build     # check for errors
vercel            # deploy
```

Add to `vercel.json` if needed:
```json
{
  "framework": "nextjs"
}
```

---

*Built with Intel One Mono and a love for tinkering. — D.B.*

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm start                 # Runs on http://localhost:3000

# Build for production
npm run build            # Creates optimized build in /build folder

# Deploy to GitHub Pages
npm run deploy           # Builds and deploys to https://dorcohen777.github.io/new-portfolio

# Run tests
npm test                 # Interactive test runner (no custom tests implemented yet)
```

## Architecture Overview

This is a single-page React portfolio website with heavy emphasis on animations and visual effects. The project uses multiple animation libraries (GSAP, Framer Motion, Anime.js) and includes a 2D physics simulation powered by Matter.js.

### Key Architecture Patterns

1. **Single Route Application**: The app uses React Router but only has one route (`/new-portfolio`). All content is rendered on a single page with scroll-based navigation.

2. **Component Structure**:
   - `RootCmp` → Main app container with routing
   - `Header` → Navigation component
   - `Hero` → Landing section with animated text and physics demo
   - `About` → About section with scroll-triggered animations
   - `Projects` → Portfolio showcase with project cards

3. **Animation Architecture**:
   - **GSAP**: Used for scroll-triggered animations via ScrollTrigger plugin
   - **Anime.js + SplitJS**: Text reveal animations on hero section
   - **Matter.js**: Interactive 2D physics simulation in PhysicsDemo component
   - **CSS Animations**: Additional styling effects

4. **Data Management**:
   - All project data is stored in `src/services/main-service.js` as a static array
   - No state management library - uses React hooks for local state
   - Images are organized by project in `src/assets/imgs/[project-name]/`

### Critical Implementation Details

1. **Animation Initialization**: Animations are tied to IntersectionObserver and scroll events. When modifying animated components, ensure proper cleanup in useEffect returns.

2. **Matter.js Physics**: The PhysicsDemo component creates floating elements. Be careful with performance - Matter.js engine runs continuously when active.

3. **Image Paths**: Project images are referenced by name only (e.g., 'trell1'). The actual import/require logic needs to be implemented in the Projects component.

4. **Deployment**: The site deploys to GitHub Pages. The homepage in package.json must match the repository name for proper routing.

### Project Structure

```
src/
├── services/
│   ├── gsap.js           # GSAP animation utilities
│   └── main-service.js   # Projects data array
├── views/                # React components
│   ├── PhysicsDemo.jsx   # Matter.js simulation
│   ├── hero.jsx          # Landing with animations
│   ├── about.jsx         # About section
│   └── projects.jsx      # Portfolio showcase
└── assets/
    ├── imgs/             # Project screenshots organized by folder
    └── styles/           # CSS files (imported via main.css)
```

### Performance Considerations

- Multiple animation libraries are loaded (GSAP, Anime.js, Framer Motion, Matter.js) which impacts bundle size
- No lazy loading implemented for images or components
- Physics simulation runs continuously when visible
- Consider consolidating animation libraries or implementing code splitting
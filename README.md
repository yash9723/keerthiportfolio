# Petla Keerthi — Developer Portfolio

[![CD - Deploy Portfolio](https://github.com/yash9723/keerthiportfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/yash9723/keerthiportfolio/actions/workflows/deploy.yml)
[![CI - Quality & Build Check](https://github.com/yash9723/keerthiportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/yash9723/keerthiportfolio/actions/workflows/ci.yml)

Personal portfolio website for **Petla Keerthi** (Software Developer).

---

## Live Deployments

- **GitHub Pages:** [https://yash9723.github.io/keerthiportfolio/](https://yash9723.github.io/keerthiportfolio/)
- **Cloudflare Pages:** [https://keerthiportfolio-5tu.pages.dev](https://keerthiportfolio-5tu.pages.dev)
- **Custom Domain:** [https://keerthipetla.dev](https://keerthipetla.dev)

---

## Tech Stack

- **Framework:** React 18 / 19
- **Bundler:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS3, Google Fonts (*Almarai*, *Instrument Serif*)
- **Deployment & CI/CD:** GitHub Actions, GitHub Pages, Cloudflare Pages

---

## Repository Structure

```
keerthiportfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # PR & feature branch validation (typecheck & build)
│       └── deploy.yml              # Production deployment to GitHub Pages & Cloudflare

├── dist/                           # Compiled production distribution (ready to deploy)
│   ├── assets/
│   │   ├── index-Bzmgc9oW.css      # Production stylesheet
│   │   └── index-BFlf-ip-.js       # Production application bundle
│   ├── favicon.svg                 # Production favicon
│   ├── icons.svg                   # Production SVG icons set
│   └── index.html                  # Production HTML document
├── public/                         # Static assets served as-is
│   ├── favicon.svg                 # SVG favicon
│   └── icons.svg                   # SVG icon definitions
├── src/                            # Modular TypeScript & React application source
│   ├── components/                 # Reusable UI component modules
│   │   ├── About.tsx               # About Me narrative & philosophy
│   │   ├── AcademicFocus.tsx       # Coursework accordion (DBMS, OS, IoT, Cloud)
│   │   ├── Certifications.tsx      # Verified credentials showcase
│   │   ├── Contact.tsx             # Interactive contact form & social links
│   │   ├── ExperienceEducation.tsx # Timeline for work history & degrees
│   │   ├── Footer.tsx              # Minimalist bottom signature & location
│   │   ├── Hero.tsx                # High-impact typography & key statistics
│   │   ├── Navbar.tsx              # Fixed floating navigation capsule
│   │   ├── ProjectModal.tsx        # In-depth project case study modal
│   │   └── Skills.tsx              # Categorized skills grid with interactive filter
│   ├── data/                       # Type-safe structured content & data models
│   │   ├── academicFocus.ts        # Computer science core subjects
│   │   ├── certifications.ts       # NPTEL, Google Cloud, Oracle & Infosys certs
│   │   ├── education.ts            # B.Tech degree & intermediate academics
│   │   ├── experience.ts           # Web Development internship record
│   │   ├── profile.ts              # Bio, headline, contact coordinates & metrics
│   │   ├── projects.ts             # Legal Lens AI, EduFeedback ERP, RapidAid, etc.
│   │   └── skills.ts               # Languages, Web Tech, Concepts & Platforms
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces and entity types
│   ├── App.tsx                     # Main layout & section orchestrator
│   ├── index.css                   # Tailwind directives & typography fonts
│   └── main.tsx                    # React DOM client entry point
├── .gitignore                      # Git ignored files & directories
├── index.html                      # Development HTML template for Vite
├── package.json                    # Project metadata, dependencies & scripts
├── postcss.config.js               # PostCSS styling pipeline config
├── tailwind.config.js              # Tailwind custom colors & typography tokens
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build tool configuration
```

---

## Projects

1. **Legal Lens AI** (`React`, `Vite`, `MongoDB`, `Express.js`, `Python / NLP`, `Tailwind CSS`)  
   *AI-Powered Legal Document Analyzer and Clause Vulnerability Scanner.*  
   [Repository](https://github.com/keerthipetla/legallens-ai) &middot; [Live Demo](https://legallens-ai-onhd.onrender.com/)

2. **EduFeedback ERP** (`React`, `Recharts`, `Socket.IO`, `Node.js`, `Express.js`, `MongoDB`)  
   *Automated Educational Feedback Dashboard with Real-Time Analytics.*  
   [Repository](https://github.com/keerthipetla/edufeedback-erp) &middot; [Live Demo](https://edufeedback-erp.onrender.com)

3. **RapidAid** (`React`, `Vite`, `TypeScript`, `Leaflet API`, `PWA`, `Tailwind CSS`)  
   *Smart Rural Emergency Response & Volunteer Dispatch System.*  
   [Repository](https://github.com/keerthipetla/rapidaid_-smart-rural-emergency-response) &middot; [Live Demo](https://rapidaid.pages.dev)

4. **Music Player App** (`HTML5 Audio`, `CSS3`, `JavaScript`, `Framer Motion`)  
   *Responsive Web-Based Audio Streamer with dynamic seek and playlist controls.*  
   [Repository](https://github.com/keerthipetla/music-player)

---

## Local Development

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm**

### 2. Installation
```bash
git clone https://github.com/yash9723/keerthiportfolio.git
cd keerthiportfolio
npm install
```

### 3. Running Development Server
```bash
npm run dev
```

### 4. Building for Production
```bash
npm run build
```

### 5. Type Checking
```bash
npm run typecheck
```

---

## CI / CD Pipelines

The repository features enterprise-grade GitHub Actions CI/CD pipelines:

### 1. Continuous Integration (`.github/workflows/ci.yml`)
- **Triggers**: Pull requests targeting `main` and pushes to feature branches.
- **Jobs**:
  - Sets up Node.js 22 with npm dependency caching.
  - Runs clean install (`npm ci`).
  - Executes static type check (`npm run typecheck`).
  - Executes production build test (`npm run build`).
  - Verifies presence and integrity of build output (`dist/index.html`).

### 2. Continuous Deployment (`.github/workflows/deploy.yml`)
- **Triggers**: Pushes to `main` branch or manual invocation via `workflow_dispatch`.
- **Jobs**:
  - **Build**: Compiles production bundles, runs TypeScript checks, and packages artifacts.
  - **Deploy to GitHub Pages**: Deploys the built portfolio to [GitHub Pages](https://yash9723.github.io/keerthiportfolio/) using GitHub's modern OIDC token-based deployment.
  - **Deploy to Cloudflare Pages (Optional)**: Automatically deploys to [Cloudflare Pages](https://keerthiportfolio-5tu.pages.dev) when repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured.

#### Setting up Cloudflare Pages Auto-Deploy (Optional)
If you wish to enable dual automated deployments to Cloudflare Pages:
1. Go to repository **Settings** &gt; **Secrets and variables** &gt; **Actions**.
2. Add `CLOUDFLARE_API_TOKEN` (API token with Cloudflare Pages write permissions).
3. Add `CLOUDFLARE_ACCOUNT_ID` (Your Cloudflare Account ID).

---

## License
This project is open source and available under the [MIT License](LICENSE).


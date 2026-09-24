# Petla Keerthi — Developer Portfolio

Personal portfolio website **Petla Keerthi** (Software Developer).

---

## Live Deployments

- **Custom Domain:** [https://keerthipetla.dev](https://keerthipetla.dev)
- **Cloudflare Pages:** [https://keerthiportfolio-5tu.pages.dev](https://keerthiportfolio-5tu.pages.dev)

---

## Tech Stack

- **Framework:** React 18 / 19
- **Bundler:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS3, Google Fonts (*Almarai*, *Instrument Serif*)
- **Deployment:** Cloudflare Pages, GitHub Pages

---

## Repository Structure

```
keerthiportfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions automated CI/CD deployment
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
   [Repository](https://github.com/keerthipetla/legallens-ai)

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

---

## License
This project is open source and available under the [MIT License](LICENSE).

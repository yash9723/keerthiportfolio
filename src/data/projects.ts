import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'legal-lens',
    title: 'Legal Lens AI',
    tagline: 'AI-Powered Legal Document Analyzer',
    category: 'P-01 / Featured',
    emoji: '⚖️',
    description: 'An AI-powered platform that helps users understand, analyze, and work with legal documents easily.',
    longDescription: 'Legal Lens AI is designed to demystify complex legal texts. Traditional contracts are filled with dense jargon that is hard for non-experts to digest. Using Natural Language Processing (NLP) models, this application reads PDF contracts, translates legal terminology into plain language, flags potentially risky clauses (e.g., auto-renewals, non-competes, and liabilities), and generates structured summaries. Built with a fast React frontend and MongoDB to persist parsed analyses.',
    role: 'Designed the entire React frontend structure, implemented document parsing APIs, integrated NLP extraction hooks, and managed database schemas for user accounts and document histories.',
    features: [
      'Document summarization engine',
      'Clause vulnerability scanner',
      'Custom definitions hovercards',
      'Full text search & tag filters',
      'Exportable PDFs & contract sheets'
    ],
    technologies: ['React', 'Vite', 'MongoDB', 'Express.js', 'Python / NLP', 'Tailwind CSS'],
    githubUrl: 'https://github.com/keerthipetla/legallens-ai',
    liveUrl: '#'
  },
  {
    id: 'edufeedback-erp',
    title: 'EduFeedback ERP',
    tagline: 'Automated Educational Feedback Dashboard',
    category: 'P-02 / Management',
    emoji: '📊',
    description: 'A comprehensive educational dashboard providing automated feedback systems and real-time data visualization for students and teachers.',
    longDescription: 'EduFeedback ERP is a dashboard system tailored for academic institutions. It automates the collection of student performance metrics, generates analytical summaries, and provides teachers with actionable feedback on curriculum effectiveness. It facilitates drag-and-drop course builders, visual progression charts, and real-time alerts. It simplifies administrative oversight by tracking grades, attendance, and feedback loops.',
    role: 'Implemented interactive charts using Recharts, configured real-time web-socket alerts for new feedback submissions, and created a responsive dashboard layout with customizable widget positioning.',
    features: [
      'Real-time analytics graphs',
      'Drag-and-drop widget layout',
      'Automated feedback generation',
      'Multi-role dashboards',
      'CSV exports & grading tables'
    ],
    technologies: ['React', 'Recharts', 'Socket.IO', 'Node.js', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/keerthipetla/edufeedback-erp',
    liveUrl: 'https://edufeedback-erp.onrender.com'
  },
  {
    id: 'rapidaid',
    title: 'RapidAid',
    tagline: 'Smart Rural Emergency Response System',
    category: 'P-03 / Social Good',
    emoji: '🚑',
    description: 'A smart rural emergency response system designed to connect emergency responders with real-time location mapping and incident reporting.',
    longDescription: 'RapidAid addresses the critical delays in rural medical and disaster responses. In remote areas, emergency routing and dispatch face major coordinate mapping gaps. RapidAid allows local volunteers and dispatchers to register incidents with exact geo-coordinates, tracks volunteer proximity, and calculates optimal routes using open-source mapping APIs. Designed to work on low-bandwidth networks.',
    role: 'Authored the application core using Vite and TypeScript. Built responsive mapping panels, designed caching mechanisms for offline operations, and handled UI/UX optimizations for field responders.',
    features: [
      'Real-time location sharing',
      'Offline-first local storage',
      'Incident mapping & routing',
      'Volunteer dispatch alerts',
      'Multi-language support'
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'Leaflet API', 'PWA / Workbox', 'Tailwind CSS'],
    githubUrl: 'https://github.com/keerthipetla/rapidaid_-smart-rural-emergency-response',
    liveUrl: 'https://rapidaid.pages.dev'
  },
  {
    id: 'music-player',
    title: 'Music Player App',
    tagline: 'Responsive Web-Based Audio Streamer',
    category: 'P-04 / Media',
    emoji: '🎵',
    description: 'A fully responsive web-based audio player with interactive controls, dynamic progress bar, and enhanced UX.',
    longDescription: 'Built during a web development internship at Hie-Tech Solutions, the Music Player App is a lightweight, responsive web-based audio platform. It provides instant track loading, interactive controls (play, pause, skip, shuffle, repeat), visual progress tracking, volume slider controls, playlist management, and visual equalizer simulations. The app focuses on clean, cross-browser audio API compatibility and smooth interactions.',
    role: 'Lead web development intern. Managed core Javascript Audio API lifecycle events, structured HTML5 semantic layouts, and styled custom range sliders and transitions.',
    features: [
      'HTML5 Audio context controller',
      'Interactive queue & playlist',
      'Volume & seek control nodes',
      'Custom CSS animations',
      'Lightweight performance'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Framer Motion'],
    githubUrl: 'https://github.com/keerthipetla/music-player',
    liveUrl: '#'
  }
];

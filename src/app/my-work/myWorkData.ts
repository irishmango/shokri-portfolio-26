export type ProjectCategory = "all" | "web-apps" | "mobile" | "websites";

export interface ProjectLink {
  type: "live" | "demo" | "case-study" | "github";
  url: string;
  label?: string;
}

export interface ProjectMeta {
  subtitle?: string;
  tools?: string[];
  highlights?: string[];
  lessons?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  thumbnail: string;
  demoVideo?: string; // Optional video that autoplays on hover
  demoUrl?: string; // URL for iframe demo embed
  meta?: ProjectMeta; // Extended metadata for demo page
  tags: string[];
  category: Exclude<ProjectCategory, "all">;
  links: ProjectLink[];
  featured?: boolean;
}

export const categories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-apps", label: "Web Apps" },
  { id: "mobile", label: "Mobile (Flutter)" },
  { id: "websites", label: "Websites" },
];

export const projects: Project[] = [
  // Featured Projects
  {
    id: "docnotes",
    title: "DocNotes",
    description: "Clinical documentation platform that reduced note completion time while maintaining audit compliance.",
    bullets: [
      "Owned product strategy for AI-assisted documentation workflow",
      "Designed audit trail that satisfied healthcare compliance without adding friction",
      "Balanced clinician speed with regulatory requirements",
    ],
    thumbnail: "/docnotes_screenshot.webp",
    demoVideo: "/doc_notes_marketing_recording.mp4",
    tags: ["Client", "Web App", "React"],
    category: "web-apps",
    links: [
      { type: "live", url: "https://www.docnotes.app/" },
      { type: "case-study", url: "/case-studies/docnotes" },
    ],
    featured: true,
  },
  // Regular Projects
  {
    id: "jose-cortes",
    title: "Jose Cortes – Opera Director",
    description: "Portfolio that led to multiple festival bookings through clear production showcasing.",
    bullets: [
      "Prioritized visual-first layout for production photography",
      "Optimized for mobile—80% of traffic came from social links",
      "Simplified inquiry flow for theater programmers",
    ],
    thumbnail: "/jose_cortes_screenshot.webp",
    demoVideo: "/jose_screen_recording.mp4",
    tags: ["Client", "Website"],
    category: "websites",
    links: [
      { type: "live", url: "https://www.josecortes.de/" },
    ],
  },
  {
    id: "ana-fonell",
    title: "Ana Fonell – Tango Singer",
    description: "Career relaunch site that established credibility for an artist returning after hiatus.",
    bullets: [
      "Built narrative positioning around artistic journey",
      "Integrated press coverage and media to reinforce legitimacy",
      "Designed for emotional resonance over feature lists",
    ],
    thumbnail: "/ana_fonell_screenshot.webp",
    demoVideo: "/ana_screen_recording.mp4",
    tags: ["Client", "Website"],
    category: "websites",
    links: [
      { type: "live", url: "https://www.anafonell.de/?lang=en" },
    ],
  },
  {
    id: "answering-machine-film",
    title: "The Answering Machine – Feature Film",
    description: "Showcase site for an award-winning feature film, built to convey the film's tone and display festival accolades.",
    bullets: [
      "Designed to match the film's visual identity and emotional tone",
      "Prominent trailer playback with laurels showcasing 15+ festival awards",
      "Supported festival submission season with press kit and contact flow",
    ],
    thumbnail: "/answering_machine_screenshot.webp",
    demoVideo: "/answering_machine_screen_recording.mp4",
    tags: ["Client", "Website"],
    category: "websites",
    links: [
      { type: "live", url: "https://theansweringmachinefilm.com/" },
    ],
  },
  {
    id: "andrew-gavin",
    title: "Andrew Gavin – Tenor",
    description: "Dual-purpose site serving concert programmers and prospective voice students.",
    bullets: [
      "Separated performance portfolio from teaching section",
      "Built on Webflow for client self-management",
      "Designed inquiry flows for two distinct audiences",
    ],
    thumbnail: "/andrew_gavin_screenshot.webp",
    demoVideo: "/andrew_gavin_screen_recording.mp4",
    tags: ["Client", "Website", "Webflow"],
    category: "websites",
    links: [
      { type: "live", url: "https://andrewgavintenor.com/" },
    ],
  },
  {
    id: "orbit",
    title: "Orbit",
    description: "Team coordination app that keeps distributed groups aligned without constant check-ins.",
    bullets: [
      "Defined shared task ownership model for multi-person accountability",
      "Prioritized real-time sync to eliminate manual status updates",
      "Scoped MVP to core coordination pain points",
    ],
    thumbnail: "/orbit_screenshot.webp",
    demoUrl: "https://my-task-manager-app-2dcaa.web.app",
    meta: {
      subtitle: "Portfolio project",
      tools: [
        "Flutter", "Dart", "Firebase", "Firestore", "Google Auth",
        "Provider", "State Management", "Responsive Design",
        "Custom Widgets", "REST APIs", "JSON Serialization",
        "Asset Management",
      ],
      highlights: [
        "Centralized theming with custom theme.dart for colors, text, and decorations",
        "Modular architecture: features, domain, presentation, shared",
        "Authentication: Email/password, Google & anonymous sign-in via Firebase",
        "Project, task, and collaboration management with Firestore backend",
        "Dynamic dashboards with progress tracking and grid/list UIs",
        "Reusable custom widgets (cards, buttons, avatars, etc.)",
        "Profile system with settings, FAQ, and account management",
        "Adaptive layouts for mobile and web",
        "Navigation with custom AppBars, FABs, and bottom navigation",
        "Chat feature with real-time messaging UI",
      ],
      lessons: [
        "Designing scalable folder structure for large Flutter apps",
        "Integrating Firebase Auth and Firestore with custom repositories",
        "Building responsive UIs and adaptive layouts",
        "Managing state and navigation in complex flows",
        "Creating and testing custom widgets for maintainability",
        "Handling async data, error states, and loading indicators",
        "Organizing assets and localization for production apps",
        "Implementing modular, testable code with clear separation of concerns",
        "Debugging Dart/Flutter import and analysis issues",
      ],
    },
    tags: ["Side Project", "Mobile", "Flutter"],
    category: "mobile",
    links: [
      { type: "demo", url: "/demo/orbit" },
      { type: "github", url: "https://github.com/irishmango/orbit-portfolio" },
    ],
    featured: false,
  },
  {
    id: "moza",
    title: "Moza",
    description: "Music theory app that helps music students learn music theory.",
    bullets: [
      "Structured learning progression to prevent beginner overwhelm",
      "Designed feedback loops that reinforce habit formation",
      "Constrained scope to theory fundamentals for focused value",
    ],
    thumbnail: "/moza_screenshot.webp",
    demoUrl: "https://moza-972f4.web.app/",
    meta: {
      subtitle: "Portfolio project",
      tools: [
        "Flutter", "Dart", "Firebase", "Google Auth",
        "Provider / State Management",
        "Responsive Design", "Custom Widgets",
        "Platform Channels", "REST APIs",
        "JSON Serialization", "Asset Management",
      ],
      highlights: [
        "Modular architecture: features, domain, presentation, shared",
        "Authentication: Email/password & Google sign-in via Firebase",
        "Dynamic dashboard with progress tracking and XP system",
        "Interactive quizzes, lessons, and chapters with custom UI",
        "Profile system with avatars and badges",
        "Theming and adaptive layouts for mobile and web",
        "Reusable custom widgets (cards, progress bars, toggles)",
        "Asset management for images, icons, backgrounds",
      ],
      lessons: [
        "Scalable folder structure for large Flutter apps",
        "Integrating Firebase Auth and Firestore with custom repos",
        "Building responsive UIs for multiple platforms",
        "Managing state and navigation in complex flows",
        "Creating and testing custom widgets for maintainability",
        "Handling async data and error states gracefully",
        "Organizing assets and localization for production apps",
      ],
    },
    tags: ["Side Project", "Mobile", "Flutter"],
    category: "mobile",
    links: [
      { type: "demo", url: "/demo/moza" },
      { type: "github", url: "https://github.com/irishmango/moza-portfolio" },
    ],
    featured: false,
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description: "Personal site structured for recruiter scanning and quick context extraction.",
    bullets: [
      "Information architecture optimized for 30-second evaluation",
      "Separated case studies from shipped work for clarity",
      "Mobile-first layout for on-the-go review",
    ],
    thumbnail: "/portfolio_screenshot.webp",
    tags: ["Personal", "Website", "Next.js"],
    category: "websites",
    links: [
      { type: "github", url: "https://github.com/irishmango/shokri-portfolio-26" },
    ],
  },
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getFilteredProjects = (category: ProjectCategory): Project[] => {
  if (category === "all") {
    return projects.filter((p) => !p.featured);
  }
  // When filtering by category, include all projects (featured and non-featured)
  return projects.filter((p) => p.category === category);
};

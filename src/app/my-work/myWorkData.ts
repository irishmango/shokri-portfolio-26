export type ProjectCategory = "all" | "web-apps" | "mobile" | "websites";

export interface ProjectLink {
  type: "live" | "demo" | "case-study" | "github";
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  thumbnail: string;
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
    tags: ["Client", "Web App", "React"],
    category: "web-apps",
    links: [
      { type: "live", url: "https://www.docnotes.app/" },
      { type: "case-study", url: "/case-studies/docnotes" },
    ],
    featured: true,
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
    tags: ["Side Project", "Mobile", "Flutter"],
    category: "mobile",
    links: [
      { type: "demo", url: "#" },
    ],
    featured: true,
  },
  {
    id: "moza",
    title: "Moza",
    description: "Music theory app that turns overwhelming content into daily 2-minute practice sessions.",
    bullets: [
      "Structured learning progression to prevent beginner overwhelm",
      "Designed feedback loops that reinforce habit formation",
      "Constrained scope to theory fundamentals for focused value",
    ],
    thumbnail: "/moza_screenshot.webp",
    tags: ["Side Project", "Mobile", "Flutter"],
    category: "mobile",
    links: [
      { type: "demo", url: "#" },
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
    tags: ["Client", "Website", "Webflow"],
    category: "websites",
    links: [
      { type: "live", url: "https://andrewgavintenor.com/" },
    ],
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

"use client";

import styles from "./CaseStudyDetail.module.css";

// Case study content data
const caseStudyContent: Record<string, CaseStudyData> = {
  docnotes: {
    title: "DocNotes",
    subtitle: "AI Clinical Documentation",
    overview: "Revolutionizing clinical workflows with AI-powered documentation that saves physicians hours of administrative work daily.",
    role: "Technical Product Owner",
    duration: "2023 - Present",
    team: "Cross-functional team of 8",
    sections: [
      {
        title: "The Challenge",
        content: "Healthcare providers spend an average of 2 hours per day on documentation, leading to burnout and reduced patient care time. We needed to create a solution that could understand medical conversations and generate accurate clinical notes automatically."
      },
      {
        title: "The Solution",
        content: "We developed an AI-powered documentation system that listens to patient-physician conversations in real-time, extracts relevant medical information, and generates structured clinical notes that comply with healthcare standards."
      },
      {
        title: "Key Features",
        content: "Real-time transcription with medical terminology recognition, automatic ICD-10 code suggestions, seamless EHR integration, and a review workflow for physician approval."
      },
      {
        title: "Results",
        content: "Reduced documentation time by 60%, increased physician satisfaction scores by 40%, and improved note accuracy compared to manual entry."
      }
    ],
    technologies: ["React", "TypeScript", "Node.js", "AWS", "OpenAI", "FHIR"]
  },
  arfin: {
    title: "Arfin",
    subtitle: "Financial Analytics Platform",
    overview: "A comprehensive financial analytics platform providing real-time insights and data visualization for informed decision-making.",
    role: "Technical Product Owner",
    duration: "2022 - 2023",
    team: "Cross-functional team of 6",
    sections: [
      {
        title: "The Challenge",
        content: "Financial institutions needed a unified platform to analyze market data, track portfolio performance, and generate actionable insights without switching between multiple tools."
      },
      {
        title: "The Solution",
        content: "We built a comprehensive analytics dashboard that aggregates data from multiple sources, provides real-time market analysis, and offers customizable reporting features."
      },
      {
        title: "Key Features",
        content: "Real-time market data integration, customizable dashboards, automated report generation, risk assessment tools, and collaborative annotation features."
      },
      {
        title: "Results",
        content: "Increased analyst productivity by 35%, reduced report generation time from hours to minutes, and improved decision-making accuracy through better data visualization."
      }
    ],
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Redis", "Docker"]
  },
  medcred: {
    title: "MedCred",
    subtitle: "Medical Credentialing Platform",
    overview: "Streamlining medical credentialing with a secure, efficient platform that reduces verification time by 60%.",
    role: "Technical Product Owner",
    duration: "2021 - 2022",
    team: "Cross-functional team of 5",
    sections: [
      {
        title: "The Challenge",
        content: "Medical credentialing is a complex, time-consuming process that often takes months to complete. Healthcare organizations needed a way to streamline verification while maintaining compliance."
      },
      {
        title: "The Solution",
        content: "We created a digital credentialing platform that automates document collection, verification workflows, and compliance tracking, while providing real-time status updates to all stakeholders."
      },
      {
        title: "Key Features",
        content: "Automated document verification, blockchain-based credential storage, real-time status tracking, compliance monitoring, and integration with primary source verification databases."
      },
      {
        title: "Results",
        content: "Reduced credentialing time by 60%, decreased administrative costs by 45%, and achieved 99.9% verification accuracy."
      }
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Blockchain", "AWS"]
  }
};

interface CaseStudySection {
  title: string;
  content: string;
}

interface CaseStudyData {
  title: string;
  subtitle: string;
  overview: string;
  role: string;
  duration: string;
  team: string;
  sections: CaseStudySection[];
  technologies: string[];
}

const caseStudyList = [
  { id: "docnotes", name: "DocNotes" },
  { id: "arfin", name: "Arfin" },
  { id: "medcred", name: "MedCred" },
];

interface CaseStudyDetailProps {
  studyId: string;
  onStudyChange?: (studyId: string) => void;
}

export default function CaseStudyDetail({ studyId, onStudyChange }: CaseStudyDetailProps) {
  const study = caseStudyContent[studyId];

  const handleStudyClick = (id: string) => {
    if (onStudyChange) {
      onStudyChange(id);
    }
  };

  if (!study) {
    return (
      <div className={styles.caseStudyDetail}>
        <div className={styles.studyNav}>
          {caseStudyList.map((s) => (
            <button
              key={s.id}
              className={styles.studyNavItem}
              onClick={() => handleStudyClick(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <p>Case study not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.caseStudyDetail}>
      <div className={styles.studyNav}>
        {caseStudyList.map((s) => (
          <button
            key={s.id}
            className={`${styles.studyNavItem} ${s.id === studyId ? styles.studyNavItemActive : ""}`}
            onClick={() => handleStudyClick(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <header className={styles.header}>
        <h2 className={styles.title}>{study.title}</h2>
        <p className={styles.subtitle}>{study.subtitle}</p>
      </header>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>{study.role}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Duration</span>
          <span className={styles.metaValue}>{study.duration}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Team</span>
          <span className={styles.metaValue}>{study.team}</span>
        </div>
      </div>

      <p className={styles.overview}>{study.overview}</p>

      <div className={styles.sections}>
        {study.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <p className={styles.sectionContent}>{section.content}</p>
          </div>
        ))}
      </div>

      <div className={styles.technologies}>
        <h3 className={styles.techTitle}>Technologies</h3>
        <div className={styles.techList}>
          {study.technologies.map((tech, index) => (
            <span key={index} className={styles.techTag}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

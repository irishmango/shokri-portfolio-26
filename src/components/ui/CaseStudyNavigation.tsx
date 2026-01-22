"use client";

import { useState } from "react";
import styles from "./CaseStudyNavigation.module.css";

interface CaseStudy {
  id: string;
  name: string;
  subtitle?: string;
  icon: React.ReactNode;
  previewDescription: string;
}

const DocNotesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16v16H4z" />
    <path d="M4 8h16" />
    <path d="M8 4v4" />
  </svg>
);

const ArfinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 20h4v-8H4v8z" />
    <path d="M10 20h4v-12h-4v12z" />
    <path d="M16 20h4v-16h-4v16z" />
  </svg>
);

const MedCredIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const caseStudies: CaseStudy[] = [
  {
    id: "docnotes",
    name: "DocNotes",
    subtitle: "AI clinical documentation",
    icon: <DocNotesIcon />,
    previewDescription: "Revolutionizing clinical workflows with AI-powered documentation that saves physicians hours of administrative work daily.",
  },
  {
    id: "medcred",
    name: "MedCred",
    subtitle: "Medical credentialing",
    icon: <MedCredIcon />,
    previewDescription: "Streamlining medical credentialing with a secure, efficient platform that reduces verification time by 60%.",
  },
  {
    id: "arfin",
    name: "Arfin",
    subtitle: "Financial analytics platform",
    icon: <ArfinIcon />,
    previewDescription: "A comprehensive financial analytics platform providing real-time insights and data visualization for informed decision-making.",
  },
];

interface CaseStudyNavigationProps {
  isExpanded: boolean;
  activeStudy: string | null;
  onStudySelect: (studyId: string) => void;
}

export default function CaseStudyNavigation({ isExpanded, activeStudy, onStudySelect }: CaseStudyNavigationProps) {
  const [hoveredStudy, setHoveredStudy] = useState<string | null>(null);

  return (
    <nav
      className={`${styles.nav} ${isExpanded ? styles.expanded : styles.collapsed}`}
      aria-label="Case studies navigation"
    >
      <ul className={styles.navItems}>
        {caseStudies.map((study) => {
          const isActive = activeStudy === study.id;
          const isHovered = hoveredStudy === study.id && isExpanded;

          return (
            <li key={study.id} className={`${styles.navItemWrapper} ${isExpanded ? styles.wrapperExpanded : styles.wrapperCollapsed}`}>
              <button
                className={`${styles.navItem} ${isExpanded ? styles.itemExpanded : styles.itemCollapsed} ${isActive ? styles.itemActive : ""}`}
                onClick={() => onStudySelect(study.id)}
                onMouseEnter={() => setHoveredStudy(study.id)}
                onMouseLeave={() => setHoveredStudy(null)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={`${styles.defaultContent} ${isHovered ? styles.contentHidden : ""}`}>
                  <span className={`${styles.icon} ${isExpanded ? "" : styles.iconHidden}`}>
                    {study.icon}
                  </span>
                  <span className={styles.name}>{study.name}</span>
                  <span className={`${styles.subtitle} ${isExpanded ? "" : styles.subtitleHidden}`}>
                    {study.subtitle}
                  </span>
                </div>
                {isExpanded && (
                  <div className={`${styles.previewContent} ${isHovered ? styles.previewVisible : ""}`}>
                    <p className={styles.previewDescription}>{study.previewDescription}</p>
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

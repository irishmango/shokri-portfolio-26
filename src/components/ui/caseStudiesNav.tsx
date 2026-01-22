"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./CaseStudiesNav.module.css";

interface CaseStudy {
  id: string;
  name: string;
  subtitle?: string;
  icon: React.ReactNode;
  path: string;
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
    path: "/case-studies/docnotes",
    previewDescription: "Revolutionizing clinical workflows with AI-powered documentation that saves physicians hours of administrative work daily.",
  },
  {
    id: "medcred",
    name: "MedCred",
    icon: <MedCredIcon />,
    path: "/case-studies/medcred",
    previewDescription: "Streamlining medical credentialing with a secure, efficient platform that reduces verification time by 60%.",
  },
  {
    id: "arfin",
    name: "Arfin",
    icon: <ArfinIcon />,
    path: "/case-studies/arfin",
    previewDescription: "A comprehensive financial analytics platform providing real-time insights and data visualization for informed decision-making.",
  },
];

interface CaseStudiesNavProps {
  activeStudy?: string;
  onStudyChange?: (studyId: string) => void;
}

export default function CaseStudiesNav({ activeStudy, onStudyChange }: CaseStudiesNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredStudy, setHoveredStudy] = useState<string | null>(null);

  const getActiveStudy = (): string => {
    if (activeStudy) return activeStudy;
    const match = pathname?.match(/\/case-studies\/(\w+)/);
    return match ? match[1] : caseStudies[0].id;
  };

  const currentStudy = getActiveStudy();

  const handleStudyClick = (study: CaseStudy) => {
    if (onStudyChange) {
      onStudyChange(study.id);
    } else {
      router.push(study.path);
    }
  };

  return (
    <nav className={styles.caseStudiesNav} aria-label="Case studies navigation">
      <ul className={styles.navItems}>
        {caseStudies.map((study) => {
          const isActive = currentStudy === study.id;
          const isHovered = hoveredStudy === study.id;
          return (
            <li key={study.id} className={styles.navItemWrapper}>
              <button
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                onClick={() => handleStudyClick(study)}
                onMouseEnter={() => setHoveredStudy(study.id)}
                onMouseLeave={() => setHoveredStudy(null)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={`${styles.defaultContent} ${isHovered ? styles.hidden : ""}`}>
                  <span className={styles.icon}>{study.icon}</span>
                  <span className={styles.name}>{study.name}</span>
                  {study.subtitle && (
                    <span className={styles.subtitle}>{study.subtitle}</span>
                  )}
                </div>
                <div className={`${styles.previewContent} ${isHovered ? styles.visible : ""}`}>
                  <p className={styles.previewDescription}>{study.previewDescription}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

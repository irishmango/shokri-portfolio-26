"use client";

import Link from "next/link";
import posthog from "posthog-js";
import styles from "./CaseStudiesPage.module.css";

interface CaseStudy {
  id: string;
  name: string;
}

interface CaseStudySwitcherProps {
  caseStudies: CaseStudy[];
  currentStudyId: string;
}

export default function CaseStudySwitcher({
  caseStudies,
  currentStudyId,
}: CaseStudySwitcherProps) {
  const handleSwitchClick = (study: CaseStudy) => {
    if (study.id !== currentStudyId) {
      posthog.capture("case_study_switched", {
        from_case_study: currentStudyId,
        to_case_study: study.id,
        to_case_study_name: study.name,
      });
    }
  };

  return (
    <nav className={styles.studySwitcher}>
      {caseStudies.map((study) => (
        <Link
          key={study.id}
          href={`/case-studies/${study.id}`}
          className={`${styles.switcherButton} ${currentStudyId === study.id ? styles.switcherButtonActive : ""}`}
          aria-current={currentStudyId === study.id ? "page" : undefined}
          onClick={() => handleSwitchClick(study)}
        >
          {study.name}
        </Link>
      ))}
    </nav>
  );
}

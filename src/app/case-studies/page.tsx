"use client";

import styles from "./CaseStudiesPage.module.css";
import CaseStudyNavigation from '../../components/ui/CaseStudyNavigation';
import CaseStudyContent from './CaseStudyContent';

interface CaseStudiesPageProps {
    selectedStudy?: string | null;
    onStudySelect?: (studyId: string | null) => void;
}

export default function CaseStudiesPage({ selectedStudy, onStudySelect }: CaseStudiesPageProps) {
    const handleStudySelect = (studyId: string) => {
        if (onStudySelect) {
            onStudySelect(studyId);
        }
    };

    return (
        <div className={styles.caseStudiesPage}>
            <CaseStudyNavigation
                isExpanded={!selectedStudy}
                activeStudy={selectedStudy ?? null}
                onStudySelect={handleStudySelect}
            />
            {selectedStudy && (
                <CaseStudyContent studyId={selectedStudy} />
            )}
        </div>
    )
}

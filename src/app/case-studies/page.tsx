"use client";

import React from 'react'
import styles from "./CaseStudiesPage.module.css";
import CaseStudiesNav from '../../components/ui/caseStudiesNav';
import CaseStudyDetail from './CaseStudyDetail';

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
            {selectedStudy ? (
                <CaseStudyDetail studyId={selectedStudy} onStudyChange={handleStudySelect} />
            ) : (
                <CaseStudiesNav onStudyChange={handleStudySelect} />
            )}
        </div>
    )
}

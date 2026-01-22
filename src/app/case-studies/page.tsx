import React from 'react'
import styles from "./CaseStudiesPage.module.css";
import CaseStudiesNav from '../../components/ui/caseStudiesNav';

export default function CaseStudiesPage() {
    return (
        <div className={styles.caseStudiesPage}>
            <CaseStudiesNav />
        </div>
    )
}

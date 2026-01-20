import React from 'react'
import styles from "./CaseStudiesNav.module.css";

export default function CaseStudiesNav() {
    return (
        <div className={styles.caseStudiesNav}>
            <div className={styles.navTitle}>Case Studies</div>
            <div className={styles.navItems}>
                <a href="#case-study-1" className={styles.navItem}>Case Study 1</a>
                <a href="#case-study-2" className={styles.navItem}>Case Study 2</a>
                <a href="#case-study-3" className={styles.navItem}>Case Study 3</a>
            </div>
        </div>
    )
}

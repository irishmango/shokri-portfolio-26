import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyContent from "../CaseStudyContent";
import { caseStudyIds } from "../caseStudyData";
import styles from "../CaseStudiesPage.module.css";

interface CaseStudyPageProps {
  params: Promise<{
    studyId: string;
  }>;
}

const caseStudies = [
  { id: "docnotes", name: "DocNotes" },
  { id: "medcred", name: "MedCred" },
  { id: "arfin", name: "Arfin" },
];

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { studyId } = await params;

  if (!caseStudyIds.includes(studyId)) {
    notFound();
  }

  return (
    <div className={styles.caseStudiesPage}>
      <nav className={styles.studySwitcher}>
        {caseStudies.map((study) => (
          <Link
            key={study.id}
            href={`/case-studies/${study.id}`}
            className={`${styles.switcherButton} ${studyId === study.id ? styles.switcherButtonActive : ""}`}
            aria-current={studyId === study.id ? "page" : undefined}
          >
            {study.name}
          </Link>
        ))}
      </nav>
      <CaseStudyContent studyId={studyId} />
    </div>
  );
}

export function generateStaticParams() {
  return caseStudyIds.map((studyId) => ({
    studyId,
  }));
}

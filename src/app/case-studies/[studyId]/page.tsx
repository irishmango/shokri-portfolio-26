import { notFound } from "next/navigation";
import CaseStudyContent from "../CaseStudyContent";
import CaseStudySwitcher from "../CaseStudySwitcher";
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
      <CaseStudySwitcher caseStudies={caseStudies} currentStudyId={studyId} />
      <CaseStudyContent studyId={studyId} />
    </div>
  );
}

export function generateStaticParams() {
  return caseStudyIds.map((studyId) => ({
    studyId,
  }));
}

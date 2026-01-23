"use client";

import Link from "next/link";
import styles from "./CVPage.module.css";

interface SkillCategory {
  label: string;
  skills: string[];
}

interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  bullets: string[];
  caseStudyLink?: string;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade?: string;
  bullets?: string[];
}

const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "Dart", "HTML", "CSS", "Python", "TypeScript"]
  },
  {
    label: "Databases & Cloud",
    skills: ["MongoDB", "Firebase", "Supabase", "POSTGRES", "REST API Integration", "MySQL"]
  },
  {
    label: "Frameworks & Libraries",
    skills: ["Flutter", "React", "Bootstrap 5", "Node.js/Express", "Next.js"]
  },
  {
    label: "Core Concepts",
    skills: ["OOP", "TDD", "State Management", "AI-Agents"]
  },
  {
    label: "Tools & Platforms",
    skills: ["Git/GitHub", "GitHub Copilot", "Claude Code", "n8n", "Figma", "VSCode"]
  }
];

const workExperience: WorkExperience[] = [
  {
    title: "Technical Product Owner / Developer",
    company: "DocNotes - Healthcare Documentation SaaS (In Beta)",
    duration: "July 2025 – Present",
    bullets: [
      "Own the end-to-end product definition and delivery of DocNotes, a clinical documentation workspace currently in private beta with GPs and doctors across Ireland.",
      "Defined product scope and guardrails to support AI-assisted clinical documentation without introducing diagnostic, regulatory, or patient-safety risk.",
      "Worked directly with clinicians to understand real documentation workflows, constraints, and failure modes, shaping features around review, approval, and auditability.",
      "Designed human-in-the-loop AI workflows where clinicians retain full control over drafting, approval, and amendments.",
      "Made deliberate trade-offs to prioritize auditability, data minimization, and GDPR-aligned behavior over feature breadth or automation.",
      "Own ongoing iteration based on clinician feedback during beta testing, balancing usability improvements with compliance and safety considerations."
    ],
    caseStudyLink: "/case-studies/docnotes"
  },
  {
    title: "Freelance Web Developer",
    company: "Software Development Projects",
    duration: "Dec 2024 – Present",
    bullets: [
      "Designed and built portfolio websites for clients using HTML, CSS, JavaScript, React and Webflow.",
      "Focused on clean, accessible design and user-centered interfaces for creative professionals.",
      "Built full-stack applications with React, Node.js, Dart, Flutter Firebase, integrating auth, REST APIs, and real-time databases.",
      "Designed reusable UI components and responsive interfaces, applying UX best practices."
    ]
  },
  {
    title: "Product Specialist",
    company: "MedCred",
    duration: "Jan 2022 – Jan 2024",
    bullets: [
      "Acted as the primary interface between prospective customers and the product team, owning product demonstrations and early discovery conversations.",
      "Presented the MedCred platform end-to-end, explaining both frontend workflows and backend system behavior to technical and non-technical stakeholders.",
      "Translated complex technical and compliance-related concepts into clear, decision-relevant explanations for clinicians, hospital staff, and buyers.",
      "Collected structured feedback from sales conversations and demos, feeding insights back into the product team to inform prioritization and iteration.",
      "Helped shape product positioning by identifying recurring objections, misunderstandings, and unmet needs during customer interactions.",
      "Built a strong working understanding of a healthcare SaaS platform operating in regulated, high-trust environments."
    ],
    caseStudyLink: "/case-studies/medcred"
  },
  {
    title: "Library Assistant",
    company: "Hochschule für Musik \"Hanns Eisler\" (Part Time)",
    duration: "Oct 2017 – Nov 2022",
    bullets: [
      "Helped manage day-to-day operations, including cataloging, shelving, and circulation tasks.",
      "Cataloguing and cleaning the digital database using WINIBW, ensuring consistency across records.",
      "Took on leadership responsibilities in the absence of the head librarian, overseeing workflow distribution and ensuring continuity of operations."
    ]
  },
  {
    title: "Laboratory Researcher & Science Gallery Educator",
    company: "CRANN, Trinity College Dublin",
    duration: "Sept 2013 – Apr 2015",
    bullets: [
      "Conducted nanoscience laboratory research, supporting experimental design and data collection in materials, spectroscopy and dynamic light scattering.",
      "Developed protocols for student demonstrations and workshops, translating complex nanoscience concepts into accessible activities.",
      "Co-authored internal reports and presented findings to supervisors and peers."
    ]
  },
  {
    title: "Student Intern - UK Sales Team",
    company: "DotCom / IBM",
    duration: "July 2011 – Sept 2011",
    bullets: [
      "Shadowed senior account managers during client calls and product presentations, gaining insight into solution-based sales and customer relationship management.",
      "Updated CRM records and maintained client documentation to support team operations."
    ]
  }
];

const education: Education[] = [
  {
    degree: "Software/App Developer Bootcamp",
    institution: "App Akademie, Berlin",
    duration: "Oct 2024 – Aug 2025",
    bullets: [
      "Earned Certified Flutter Developer status, specializing in Dart & Flutter for mobile and web apps.",
      "Built full-stack apps with Firebase (Auth & Firestore), REST APIs, and state management (Provider).",
      "Designed responsive UIs and custom reusable widgets, applying scalable folder structures."
    ]
  },
  {
    degree: "Bachelor of Science - Nanoscience",
    institution: "Trinity College, Dublin, Ireland",
    duration: "Sept 2010 – July 2013",
    grade: "2,0",
    bullets: [
      "Interdisciplinary degree covering physics, chemistry, and materials science.",
      "Gained early experience with Python for data analysis and experimental automation."
    ]
  },
  {
    degree: "Master of Music",
    institution: "Hochschule für Musik \"Hanns Eisler\", Berlin",
    duration: "Sept 2019 – Jul 2022",
    grade: "1,3"
  },
  {
    degree: "Bachelor of Music",
    institution: "Hochschule für Musik \"Hanns Eisler\", Berlin",
    duration: "Sept 2015 – Jul 2019",
    grade: "1,3"
  }
];

const additionalInfo = {
  languages: ["English (Native)", "German (C2)"],
  certifications: [
    "IBM Product Owner Professional Certificate",
    "Google UX Design Professional Certificate",
    "AppAkademie Flutter Developer Certificate"
  ],
  interests: ["Cloud computing", "Flutter development", "AI integration", "Scalable web architectures"]
};

export default function CVPage() {
  return (
    <div className={styles.cvPage}>
      {/* Summary */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summary}>
          Technically minded and communication-driven professional with a background in science, sales, software development, and seven years as a professional opera singer. I bring a unique perspective that blends hands-on technical experience with strong user empathy, consultative sales experience, and the presentation skills of a trained performer.
        </p>
        <p className={styles.summary}>
          Through my work as a Product Specialist and Junior Full Stack Developer, I&apos;ve gained practical experience with API integrations, agile collaboration, and turning business needs into actionable product requirements.
        </p>
      </section>

      {/* Technical Skills */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <div key={index} className={styles.skillCategory}>
              <span className={styles.skillLabel}>{category.label}</span>
              <div className={styles.skillTags}>
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <div className={styles.experienceList}>
          {workExperience.map((job, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.experienceHeader}>
                <div className={styles.experienceTitleGroup}>
                  <h3 className={styles.experienceTitle}>{job.title}</h3>
                  <span className={styles.experienceCompany}>{job.company}</span>
                </div>
                <span className={styles.experienceDuration}>{job.duration}</span>
              </div>
              <ul className={styles.experienceBullets}>
                {job.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
              {job.caseStudyLink && (
                <Link href={job.caseStudyLink} className={styles.caseStudyLink}>
                  View Case Study →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.educationList}>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <div className={styles.educationHeader}>
                <div className={styles.educationTitleGroup}>
                  <h3 className={styles.educationDegree}>
                    {edu.degree}
                    {edu.grade && <span className={styles.educationGrade}> — {edu.grade}</span>}
                  </h3>
                  <span className={styles.educationInstitution}>{edu.institution}</span>
                </div>
                <span className={styles.educationDuration}>{edu.duration}</span>
              </div>
              {edu.bullets && (
                <ul className={styles.educationBullets}>
                  {edu.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Additional Information</h2>
        <div className={styles.additionalGrid}>
          <div className={styles.additionalItem}>
            <span className={styles.additionalLabel}>Languages</span>
            <span className={styles.additionalValue}>{additionalInfo.languages.join(", ")}</span>
          </div>
          <div className={styles.additionalItem}>
            <span className={styles.additionalLabel}>Certifications</span>
            <div className={styles.certificationTags}>
              {additionalInfo.certifications.map((cert, index) => (
                <span key={index} className={styles.certificationTag}>{cert}</span>
              ))}
            </div>
          </div>
          <div className={styles.additionalItem}>
            <span className={styles.additionalLabel}>Interests</span>
            <span className={styles.additionalValue}>{additionalInfo.interests.join(", ")}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import styles from "./CaseStudyContent.module.css";
import { caseStudyContent } from "./caseStudyData";

// Helper to generate slug from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface CaseStudyContentProps {
  studyId: string;
}

export default function CaseStudyContent({ studyId }: CaseStudyContentProps) {
  const study = caseStudyContent[studyId];
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Generate section IDs for TOC
  const sectionIds = study?.sections.map((section) => ({
    id: slugify(section.title),
    title: section.title,
  })) ?? [];

  const handleScroll = useCallback(() => {
    const sectionElements = sectionIds.map(({ id }) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    // Check if we're near the bottom of the page
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

    // If near bottom, highlight the last section
    if (scrolledToBottom && sectionIds.length > 0) {
      setActiveSection(sectionIds[sectionIds.length - 1].id);
      return;
    }

    // Find the section closest to the top of the viewport
    let currentSection = "";
    const offset = 100; // Offset from top to trigger active state

    for (const element of sectionElements) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= offset) {
        currentSection = element.id;
      }
    }

    setActiveSection(currentSection);
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string, title: string, closeMobile = false) => {
    const element = document.getElementById(id);
    if (element) {
      // Capture TOC navigation event
      posthog.capture("case_study_section_navigated", {
        case_study_id: studyId,
        case_study_title: study?.title,
        section_id: id,
        section_title: title,
        navigation_source: closeMobile ? "mobile_toc" : "desktop_toc",
      });

      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      if (closeMobile) {
        setIsMobileTocOpen(false);
      }
    }
  };

  if (!study) {
    return (
      <div className={styles.caseStudyWrapper}>
        <div className={styles.caseStudyContent}>
          <p>Case study not found.</p>
        </div>
      </div>
    );
  }

  const hasMetadata = study.role || study.context || study.users || study.status || study.platform || study.duration || study.team || study.websiteUrl;

  return (
    <div className={styles.caseStudyWrapper}>
      {sectionIds.length > 0 && (
        <nav className={styles.tableOfContents}>
          <h4 className={styles.tocTitle}>Contents</h4>
          <ul className={styles.tocList}>
            {sectionIds.map(({ id, title }) => (
              <li key={id} className={styles.tocItem}>
                <button
                  onClick={() => scrollToSection(id, title)}
                  className={`${styles.tocLink} ${activeSection === id ? styles.tocLinkActive : ""}`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className={styles.caseStudyContent}>
        <header className={styles.header}>
          <h2 className={styles.title}>{study.title}</h2>
          <p className={styles.subtitle}>{study.subtitle}</p>
        </header>

        {hasMetadata && (
          <div className={styles.meta}>
            {study.role && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{study.role}</span>
              </div>
            )}
            {study.context && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Context</span>
                <span className={styles.metaValue}>{study.context}</span>
              </div>
            )}
            {study.users && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Users</span>
                <span className={styles.metaValue}>{study.users}</span>
              </div>
            )}
            {study.status && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>{study.status}</span>
              </div>
            )}
            {study.platform && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Platform</span>
                <span className={styles.metaValue}>{study.platform}</span>
              </div>
            )}
            {study.duration && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>{study.duration}</span>
              </div>
            )}
            {study.team && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Team</span>
                <span className={styles.metaValue}>{study.team}</span>
              </div>
            )}
            {study.websiteUrl && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Website</span>
                <a
                  href={study.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                >
                  {study.websiteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </a>
              </div>
            )}
          </div>
        )}

        {study.overview && <p className={styles.overview}>{study.overview}</p>}

        {study.disclaimer && (
          <div className={styles.disclaimer}>
            <p>{study.disclaimer}</p>
          </div>
        )}

        {study.sections.length > 0 && (
          <div className={styles.sections}>
            {study.sections.map((section, index) => (
              <div key={index} id={slugify(section.title)} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>

                {section.content && (
                  <p className={styles.sectionContent}>{section.content}</p>
                )}

                {section.subsection && (
                  <p className={styles.subsection}>{section.subsection}</p>
                )}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className={styles.bulletList}>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.twoColumn && (
                  <div className={styles.twoColumn}>
                    <div className={styles.column}>
                      <h4 className={styles.columnHeading}>{section.twoColumn.left.heading}</h4>
                      <ul className={styles.columnList}>
                        {section.twoColumn.left.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.column}>
                      <h4 className={styles.columnHeading}>{section.twoColumn.right.heading}</h4>
                      <ul className={styles.columnList}>
                        {section.twoColumn.right.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section.principles && section.principles.length > 0 && (
                  <div className={styles.principlesList}>
                    {section.principles.map((principle, principleIndex) => (
                      <div key={principleIndex} className={styles.principle}>
                        <div className={styles.principleNumber}>{principleIndex + 1}</div>
                        <div className={styles.principleContent}>
                          <h4 className={styles.principleName}>{principle.name}</h4>
                          <p className={styles.principleDescription}>{principle.description}</p>
                          {principle.image && (
                            <button
                              className={styles.principleImageButton}
                              onClick={() => setExpandedImage(principle.image!)}
                              aria-label={`Expand ${principle.name} image`}
                            >
                              <div className={styles.principleImage}>
                                <Image
                                  src={principle.image}
                                  alt={`${principle.name} illustration`}
                                  width={400}
                                  height={225}
                                  className={styles.principleImageImg}
                                />
                                <div className={styles.expandHint}>
                                  <span>Click to expand</span>
                                </div>
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.workflowSteps && section.workflowSteps.length > 0 && (
                  <div className={styles.workflowSteps}>
                    {section.workflowSteps.map((step, stepIndex) => (
                      <div key={stepIndex} className={styles.workflowStep}>
                        <div className={styles.stepNumber}>{stepIndex + 1}</div>
                        <div className={styles.stepContent}>
                          <h4 className={styles.stepName}>{step.name}</h4>
                          <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.workflowDiagram && (
                  <div className={styles.workflowDiagram}>
                    {section.workflowDiagram.placeholder ? (
                      <div className={styles.diagramPlaceholder}>
                        <div className={styles.placeholderFlow}>
                          {section.workflowDiagram.steps.map((step, stepIndex) => (
                            <span key={stepIndex} className={styles.flowStep}>
                              {step}
                              {stepIndex < section.workflowDiagram!.steps.length - 1 && (
                                <span className={styles.flowArrow}>→</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {section.decisions && section.decisions.length > 0 && (
                  <div className={styles.decisionsList}>
                    {section.decisions.map((decision, decisionIndex) => (
                      <div key={decisionIndex} className={styles.decision}>
                        <div className={styles.decisionHeader}>
                          <span className={styles.decisionNumber}>{decisionIndex + 1}</span>
                          <h4 className={styles.decisionTitle}>{decision.title}</h4>
                        </div>
                        <div className={styles.decisionBody}>
                          <div className={styles.decisionRow}>
                            <span className={styles.decisionLabel}>Decision</span>
                            <p className={styles.decisionText}>{decision.decision}</p>
                          </div>
                          <div className={styles.decisionRow}>
                            <span className={styles.decisionLabel}>Why</span>
                            <div>
                              <p className={styles.decisionText}>{decision.why}</p>
                              {decision.whyBullets && decision.whyBullets.length > 0 && (
                                <ul className={styles.decisionBullets}>
                                  {decision.whyBullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                          {decision.tradeoffs.length > 0 && (
                            <div className={styles.decisionRow}>
                              <span className={styles.decisionLabel}>Trade-off</span>
                              <ul className={styles.decisionBullets}>
                                {decision.tradeoffs.map((tradeoff, tradeoffIndex) => (
                                  <li key={tradeoffIndex}>{tradeoff}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {decision.outcomes.length > 0 && (
                            <div className={styles.decisionRow}>
                              <span className={styles.decisionLabel}>Outcome</span>
                              <ul className={styles.decisionBullets}>
                                {decision.outcomes.map((outcome, outcomeIndex) => (
                                  <li key={outcomeIndex}>{outcome}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.closingNote && (
                  <div className={styles.closingNote}>
                    <p>{section.closingNote}</p>
                  </div>
                )}

                {section.note && (
                  <p className={styles.sectionNote}>{section.note}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {study.technologies.length > 0 && (
          <div className={styles.technologies}>
            <h3 className={styles.techTitle}>Technologies</h3>
            <div className={styles.techList}>
              {study.technologies.map((tech, index) => (
                <span key={index} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      {sectionIds.length > 0 && (
        <button
          className={styles.tocFab}
          onClick={() => setIsMobileTocOpen(true)}
          aria-label="Open table of contents"
        >
          <span className={styles.tocFabIcon}>☰</span>
        </button>
      )}

      {/* Mobile TOC Overlay */}
      <div
        className={`${styles.tocOverlay} ${isMobileTocOpen ? styles.tocOverlayVisible : ""}`}
        onClick={() => setIsMobileTocOpen(false)}
      />

      {/* Mobile TOC Bottom Sheet */}
      <nav className={`${styles.tocMobile} ${isMobileTocOpen ? styles.tocMobileVisible : ""}`}>
        <div className={styles.tocMobileHeader}>
          <h4 className={styles.tocMobileTitle}>Contents</h4>
          <button
            className={styles.tocMobileClose}
            onClick={() => setIsMobileTocOpen(false)}
            aria-label="Close table of contents"
          >
            ×
          </button>
        </div>
        <ul className={styles.tocMobileList}>
          {sectionIds.map(({ id, title }) => (
            <li key={id} className={styles.tocMobileItem}>
              <button
                onClick={() => scrollToSection(id, title, true)}
                className={`${styles.tocMobileLink} ${activeSection === id ? styles.tocMobileLinkActive : ""}`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Image Lightbox */}
      {expandedImage && (
        <>
          <div
            className={styles.lightboxOverlay}
            onClick={() => setExpandedImage(null)}
          />
          <div className={styles.lightbox}>
            <button
              className={styles.lightboxClose}
              onClick={() => setExpandedImage(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <Image
              src={expandedImage}
              alt="Expanded view"
              width={1200}
              height={675}
              className={styles.lightboxImage}
            />
          </div>
        </>
      )}
    </div>
  );
}

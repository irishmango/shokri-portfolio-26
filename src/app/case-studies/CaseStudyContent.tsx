"use client";

import styles from "./CaseStudyContent.module.css";

// Case study content data
const caseStudyContent: Record<string, CaseStudyData> = {
  docnotes: {
    title: "DocNotes",
    subtitle: "Clinical Documentation Workspace",
    overview: "A clinical documentation workspace for solo clinicians, designed to support drafting, reviewing, approving, and exporting notes with strict human control and auditability.",
    disclaimer: "DocNotes is intentionally not an EHR and does not replace existing clinical systems. It operates alongside them via explicit copy-paste workflows, prioritizing clinician control and accountability over automation.",
    role: "Product Owner / Software Engineer",
    context: "Healthcare-adjacent, EU-focused",
    users: "Solo clinicians",
    status: "Beta / pilot",
    platform: "Web",
    sections: [
      {
        title: "Problem & Context",
        content: "Clinical documentation has become an increasing burden for clinicians. In practice, many clinicians now turn to general-purpose AI tools to rewrite or structure notes outside their primary systems.",
        subsection: "This creates serious workflow and safety gaps:",
        bullets: [
          "No clear separation between drafts and final records",
          "No audit trail for AI usage or document changes",
          "No immutable, approved version of a note",
          "No versioning or amendment history",
          "No clear accountability boundaries",
          "No GDPR-aligned handling of sensitive data"
        ],
        note: "The issue is not simply that AI is being used, but that it is being used outside any workflow designed for clinical accountability. DocNotes was created to address this workflow gap, not to replace clinical systems or automate medical decision-making."
      },
      {
        title: "What This Product Is / Is Not",
        twoColumn: {
          left: {
            heading: "What DocNotes Is",
            items: [
              "A browser-based clinical documentation workspace",
              "A tool for drafting, reviewing, approving, and exporting clinical notes",
              "An assistive system where the clinician remains fully in control",
              "Designed to operate alongside existing EHRs",
              "Built conservatively to validate safety and usability before broader release"
            ]
          },
          right: {
            heading: "What DocNotes Is Not",
            items: [
              "Not an EHR or clinical record system",
              "Not a diagnostic or decision-making tool",
              "Not autonomous or self-submitting",
              "Not a patient-facing platform",
              "Not an enterprise or multi-practice system (at this stage)"
            ]
          }
        },
        note: "These boundaries are intentional and actively enforced."
      },
      {
        title: "Core Design Principles",
        content: "DocNotes is shaped by a small set of non-negotiable design principles. Each principle directly constrains what the product can and cannot do.",
        principles: [
          {
            name: "Human-in-the-loop by default",
            description: "AI is used only to rewrite or structure clinician-provided text. Every output must be reviewed and explicitly approved by the clinician before it becomes part of the record."
          },
          {
            name: "Draft ≠ Approved",
            description: "Drafts are editable and transient. Approved documents are immutable. Any change requires an amendment, creating a new version while preserving prior records."
          },
          {
            name: "Auditability over convenience",
            description: "Sensitive actions — including AI generation, approvals, exports, and authentication events — are logged. This prioritizes traceability and accountability, even when it introduces friction."
          },
          {
            name: "Minimal data by design",
            description: "Only essential patient identifiers are stored. There is no background syncing, no patient portals, and an optional incognito mode for session-only use."
          },
          {
            name: "Conservative scope",
            description: "Features that increase clinical, regulatory, or liability risk are intentionally excluded. The product favors clear boundaries over feature completeness."
          }
        ]
      },
      {
        title: "Primary User Workflow",
        content: "DocNotes is designed around a single, explicit clinical documentation workflow. The goal is to support clinicians from first draft to final record without collapsing responsibility or control.",
        note: "The workflow intentionally mirrors how clinicians already work — while adding structure, traceability, and clear state transitions.",
        subsection: "End-to-End Flow",
        workflowSteps: [
          {
            name: "Create a draft",
            description: "A clinician starts a new draft within a patient context or session. Drafts are explicitly marked as non-final and are treated as working material."
          },
          {
            name: "Capture rough notes",
            description: "The clinician enters unstructured or semi-structured notes freely. No assumptions are made about format or completeness at this stage."
          },
          {
            name: "Optional AI-assisted rewrite",
            description: "The clinician can request an AI rewrite (e.g. SOAP-style structuring). AI output is always based solely on clinician-provided text and never runs autonomously."
          },
          {
            name: "Review and edit",
            description: "The rewritten content is reviewed, edited, or discarded by the clinician. The clinician remains fully responsible for the final content."
          },
          {
            name: "Explicit approval",
            description: "Once the clinician is satisfied, the draft is explicitly approved. This is a deliberate action, not an automatic transition."
          },
          {
            name: "Immutable approved document",
            description: "After approval, the document becomes immutable. The approved version is locked and preserved as a stable record."
          },
          {
            name: "Amendments (if required)",
            description: "Any later change creates an amendment rather than modifying the original. Prior versions remain accessible for traceability."
          },
          {
            name: "Export and handoff",
            description: "Approved documents are copied into the clinician's primary system (e.g. EHR). DocNotes does not submit or sync data automatically."
          }
        ],
        workflowDiagram: {
          steps: ["Draft", "AI Rewrite", "Review", "Approve", "Immutable Record", "Export"],
          placeholder: true
        },
        bullets: [
          "Drafting encourages speed and flexibility",
          "AI assists without assuming clinical responsibility",
          "Approval establishes a clear point of accountability",
          "Immutability preserves record integrity",
          "Amendments preserve history without rewriting the past"
        ]
      },
      {
        title: "Key Product Decisions",
        content: "DocNotes is the result of a small number of deliberate, high-impact product decisions. Each decision was made to balance usability, safety, and scope in a healthcare-adjacent context.",
        note: "Rather than optimizing for feature breadth, I focused on reducing risk while preserving real workflow value.",
        decisions: [
          {
            title: "Separate Drafts from Approved Documents",
            decision: "Treat drafts and approved documents as fundamentally different states.",
            why: "In practice, clinicians think in drafts, but systems often blur the line between \"working notes\" and \"the record.\" This creates ambiguity around responsibility, especially when AI is involved.",
            tradeoffs: [
              "Introduced an extra explicit step (approval)",
              "Slowed down the moment where a document becomes final"
            ],
            outcomes: [
              "Clear accountability boundary",
              "Immutable approved records",
              "Safer integration of AI assistance without collapsing responsibility"
            ]
          },
          {
            title: "AI as Rewrite Assistance Only (No Autonomy)",
            decision: "Restrict AI usage to rewriting and structuring clinician-provided text.",
            why: "Allowing AI to infer, suggest, or auto-complete clinical content would:",
            whyBullets: [
              "introduce false authority",
              "blur accountability",
              "increase clinical and regulatory risk"
            ],
            tradeoffs: [
              "Less automation",
              "Reduced \"wow factor\" compared to fully generative tools"
            ],
            outcomes: [
              "AI supports clinicians without replacing judgment",
              "Every word in the final document remains clinician-owned",
              "AI failures are visible and containable"
            ]
          },
          {
            title: "Explicit Approval as a Required Action",
            decision: "Require a deliberate approval action before a document becomes immutable.",
            why: "Passive transitions (e.g. autosave = final) are common sources of silent failure. Approval creates a clear, auditable moment of responsibility.",
            tradeoffs: [
              "Added friction to the workflow",
              "Required clinicians to consciously \"sign off\""
            ],
            outcomes: [
              "Clear accountability point",
              "Reliable audit trail",
              "Reduced risk of accidental finalization"
            ]
          },
          {
            title: "Auditability as a First-Class Concern",
            decision: "Log sensitive actions such as AI generation, approvals, exports, and authentication events.",
            why: "Once AI enters clinical documentation workflows, traceability becomes critical — not for surveillance, but for accountability and learning.",
            tradeoffs: [
              "Additional implementation complexity",
              "Some loss of convenience compared to silent systems"
            ],
            outcomes: [
              "Clear visibility into how documents are created",
              "Safer operational debugging",
              "Foundation for responsible future expansion"
            ]
          },
          {
            title: "Application-Level Protection of Patient Identifiers",
            decision: "Protect patient identifiers at the application layer rather than relying solely on infrastructure controls.",
            why: "Patient names and identifiers appear across multiple workflows (lists, drafts, logs). Application-level safeguards reduce the risk of accidental exposure through logs, debugging, or operational tooling.",
            tradeoffs: [
              "Added complexity to persistence and search",
              "Required careful handling of usability impacts"
            ],
            outcomes: [
              "Sensitive identifiers are protected by default",
              "Audit logs never contain plaintext patient names",
              "Core workflows (search, review, export) remain usable"
            ]
          },
          {
            title: "Operate Alongside Existing Systems (No Syncing)",
            decision: "Design DocNotes to export content via explicit copy-paste rather than automated syncing.",
            why: "Automatic integration with clinical systems would:",
            whyBullets: [
              "expand regulatory scope",
              "obscure responsibility boundaries",
              "introduce failure modes outside clinician control"
            ],
            tradeoffs: [
              "Less convenience",
              "Manual handoff step"
            ],
            outcomes: [
              "Clear separation of responsibility",
              "Reduced liability surface",
              "Easier adoption alongside existing workflows"
            ]
          }
        ],
        closingNote: "Across all decisions, the guiding question was: \"Does this increase clarity of responsibility, or does it quietly shift it?\" When the answer was unclear, the decision defaulted toward restraint."
      }
    ],
    technologies: []
  },
  arfin: {
    title: "Arfin",
    subtitle: "Under Construction",
    overview: "",
    role: "",
    duration: "",
    team: "",
    sections: [],
    technologies: []
  },
  medcred: {
    title: "MedCred",
    subtitle: "Medical Credentialing Platform",
    overview: "Streamlining medical credentialing with a secure, efficient platform that reduces verification time by 60%.",
    role: "Technical Product Owner",
    duration: "2021 - 2022",
    team: "Cross-functional team of 5",
    sections: [
      {
        title: "The Challenge",
        content: "Medical credentialing is a complex, time-consuming process that often takes months to complete. Healthcare organizations needed a way to streamline verification while maintaining compliance."
      },
      {
        title: "The Solution",
        content: "We created a digital credentialing platform that automates document collection, verification workflows, and compliance tracking, while providing real-time status updates to all stakeholders."
      },
      {
        title: "Key Features",
        content: "Automated document verification, blockchain-based credential storage, real-time status tracking, compliance monitoring, and integration with primary source verification databases."
      },
      {
        title: "Results",
        content: "Reduced credentialing time by 60%, decreased administrative costs by 45%, and achieved 99.9% verification accuracy."
      }
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Blockchain", "AWS"]
  }
};

interface Principle {
  name: string;
  description: string;
}

interface TwoColumnData {
  left: {
    heading: string;
    items: string[];
  };
  right: {
    heading: string;
    items: string[];
  };
}

interface WorkflowStep {
  name: string;
  description: string;
}

interface ProductDecision {
  title: string;
  decision: string;
  why: string;
  whyBullets?: string[];
  tradeoffs: string[];
  outcomes: string[];
}

interface CaseStudySection {
  title: string;
  content?: string;
  subsection?: string;
  bullets?: string[];
  note?: string;
  twoColumn?: TwoColumnData;
  principles?: Principle[];
  workflowSteps?: WorkflowStep[];
  workflowDiagram?: {
    steps: string[];
    placeholder?: boolean;
  };
  decisions?: ProductDecision[];
  closingNote?: string;
}

interface CaseStudyData {
  title: string;
  subtitle: string;
  overview: string;
  disclaimer?: string;
  role?: string;
  context?: string;
  users?: string;
  status?: string;
  platform?: string;
  duration?: string;
  team?: string;
  sections: CaseStudySection[];
  technologies: string[];
}

interface CaseStudyContentProps {
  studyId: string;
}

export default function CaseStudyContent({ studyId }: CaseStudyContentProps) {
  const study = caseStudyContent[studyId];

  if (!study) {
    return (
      <div className={styles.caseStudyContent}>
        <p>Case study not found.</p>
      </div>
    );
  }

  const hasMetadata = study.role || study.context || study.users || study.status || study.platform || study.duration || study.team;

  return (
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
            <div key={index} className={styles.section}>
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
                        <div className={styles.decisionRow}>
                          <span className={styles.decisionLabel}>Trade-off</span>
                          <ul className={styles.decisionBullets}>
                            {decision.tradeoffs.map((tradeoff, tradeoffIndex) => (
                              <li key={tradeoffIndex}>{tradeoff}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.decisionRow}>
                          <span className={styles.decisionLabel}>Outcome</span>
                          <ul className={styles.decisionBullets}>
                            {decision.outcomes.map((outcome, outcomeIndex) => (
                              <li key={outcomeIndex}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
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
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./CaseStudyContent.module.css";

// Helper to generate slug from title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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
      },
      {
        title: "Constraints & Risk Management",
        content: "From the outset, DocNotes was treated as a healthcare-adjacent system operating under heightened risk, even as an early-stage MVP. Rather than treating risk as a future concern, constraints were made explicit design inputs that shaped scope, workflows, and technical decisions.",
        principles: [
          {
            name: "Regulatory & Scope Constraints",
            description: "DocNotes is intentionally positioned outside regulated medical record systems. The product does not store official patient records, does not submit, sync, or modify data in EHRs, does not generate diagnoses, recommendations, or clinical decisions, and all exports require explicit clinician action. These constraints reduce regulatory exposure while keeping the product usable within real clinical workflows."
          },
          {
            name: "Human Accountability Boundaries",
            description: "AI assistance introduces ambiguity around authorship and responsibility if not carefully constrained. AI is restricted to rewriting clinician-provided text, all AI output requires explicit review and approval, no document becomes final without a deliberate approval action, and amendments preserve history rather than overwriting prior records. This ensures that clinical responsibility never silently shifts to the system."
          },
          {
            name: "Data Protection & Privacy",
            description: "Patient-identifiable information was treated as a primary risk surface. Key measures included application-level protection of sensitive patient identifiers, minimization of stored data to essential fields only, no background syncing or secondary data use, and optional incognito workflows for session-only use. These decisions prioritize data minimization and exposure reduction over convenience."
          },
          {
            name: "Security & Operational Logging",
            description: "Rather than implementing broad activity surveillance, DocNotes focuses on security and operational traceability. Logged events include authentication events, access attempts, AI generation requests, and document approvals and exports. Importantly, audit logs never contain plaintext patient names and are designed for operational safety and misuse detection, not monitoring clinicians."
          },
          {
            name: "Failure Modes & Safe Degradation",
            description: "AI systems are inherently probabilistic and can fail unpredictably. DocNotes is designed so that AI failures are visible, not silent, failed generations do not block manual workflows, clinicians can always proceed without AI assistance, and the system remains usable even when AI is unavailable. This prevents AI reliability from becoming a single point of failure."
          }
        ],
        closingNote: "Across all constraints, the guiding principle was: Reduce harm and ambiguity before optimizing for speed or convenience. In a healthcare-adjacent context, clarity, restraint, and explicit boundaries are more valuable than feature completeness."
      },
      {
        title: "Delivery & Execution",
        content: "DocNotes was delivered through incremental, risk-aware execution, with an emphasis on sequencing decisions rather than maximizing feature count. As a solo Product Owner, I treated delivery artifacts as tools for scope control and learning, not ceremony.",
        principles: [
          {
            name: "Roadmap & Sequencing",
            description: "The roadmap focused on reducing uncertainty early, rather than delivering a broad feature set. Initial milestones prioritized establishing a safe core workflow (draft → review → approval), defining non-negotiable boundaries around AI usage, validating that the product remained usable without automation, and introducing auditability and data protection before expansion. This sequencing ensured that later features were built on a stable and defensible foundation, rather than retrofitted onto unsafe assumptions."
          },
          {
            name: "Backlog & Prioritization",
            description: "Work was managed through a lightweight backlog that emphasized clear problem statements, explicit acceptance criteria, and scope boundaries and non-goals. Backlog items were ordered to isolate higher-risk changes (AI, authentication, data handling), keep iterations small and reversible, and avoid coupling unrelated concerns. This allowed steady progress while maintaining confidence in system behavior."
          },
          {
            name: "Acceptance-Criteria–Driven Delivery",
            description: "To keep implementation aligned with product intent, individual backlog items were written with clear acceptance criteria. A typical ticket included the user problem being addressed, preconditions and constraints, explicit success criteria, and out-of-scope clarifications. This helped prevent scope creep and ensured that \"done\" meant meeting product intent, not just shipping code."
          },
          {
            name: "Managing Risk While Building Solo",
            description: "Certain areas of the product carried disproportionate risk: patient-identifiable data, AI-assisted content generation, and approval and audit flows. These changes were handled in small, isolated increments and validated against acceptance criteria before being merged into the main system. The goal was not process fidelity, but reducing the cost of mistakes."
          }
        ],
        bullets: [
          "Maintain momentum without accumulating hidden risk",
          "Make trade-offs visible early",
          "Iterate safely in a healthcare-adjacent context",
          "Treat \"how we ship\" as a product decision, not just an engineering one"
        ],
        note: "This delivery approach allowed me to achieve these outcomes while working solo on a healthcare-adjacent product."
      },
      {
        title: "Outcomes & Learnings",
        content: "Because DocNotes is a private, invite-only MVP, outcomes are primarily qualitative and focused on workflow behavior rather than growth metrics. The most meaningful learnings came from observing how clinicians interact with structure, friction, and AI assistance in practice.",
        decisions: [
          {
            title: "Workflow Clarity Matters More Than Automation",
            decision: "Clinicians responded positively to the clear separation between drafts and approved documents.",
            why: "Even though this introduced additional steps, the explicit state transitions provided meaningful benefits:",
            whyBullets: [
              "Reduced ambiguity about what \"counts\" as the record",
              "Increased confidence when using AI-assisted rewriting",
              "Made later amendments feel safer and more intentional"
            ],
            tradeoffs: [],
            outcomes: [
              "In clinical contexts, clarity of responsibility outweighs speed"
            ]
          },
          {
            title: "AI Is Most Useful When It Is Constrained",
            decision: "AI-assisted rewriting was most valuable when applied to clinician-written text, scoped to formatting and structure, and easy to discard without penalty.",
            why: "Attempts to make AI more proactive or \"helpful\" quickly reduced trust.",
            tradeoffs: [],
            outcomes: [
              "Validated the decision to treat AI as a supporting tool, not a source of authority"
            ]
          },
          {
            title: "Explicit Friction Can Increase Trust",
            decision: "Features like manual approval, immutable records, and visible audit events introduced friction.",
            why: "That friction was interpreted as intentional and reassuring, not burdensome. This was especially true once clinicians understood why those steps existed.",
            tradeoffs: [],
            outcomes: [
              "Deliberate friction can build confidence in healthcare-adjacent contexts"
            ]
          },
          {
            title: "Failure Handling Is as Important as Success",
            decision: "AI failures (e.g. unusable rewrites, interruptions, or timeouts) surfaced early in testing.",
            why: "Designing the system so that failures were visible, manual workflows always remained available, and AI was never required to proceed prevented frustration and preserved trust.",
            tradeoffs: [],
            outcomes: [
              "Reinforced the importance of designing around failure modes, not just ideal paths"
            ]
          },
          {
            title: "Scope Discipline Prevents Downstream Risk",
            decision: "Several feature ideas were deliberately deferred or excluded.",
            why: "Ideas like automatic syncing with clinical systems, background patient data ingestion, and AI-generated content beyond rewriting were resisted early.",
            whyBullets: [
              "Avoided unclear accountability",
              "Avoided expanded regulatory exposure",
              "Avoided complex rollback scenarios"
            ],
            tradeoffs: [],
            outcomes: [
              "Validated the value of explicit non-goals as a delivery tool"
            ]
          },
          {
            title: "Product Responsibility Increases After Launch",
            decision: "Once real users began interacting with the system, the nature of the work shifted.",
            why: "Prioritization became more conservative, reliability mattered more than new features, and \"edge cases\" stopped being theoretical.",
            tradeoffs: [],
            outcomes: [
              "Shipping is not the finish line, especially in healthcare-adjacent products"
            ]
          }
        ],
        closingNote: "These outcomes and learnings shaped not just DocNotes, but my understanding of what responsible product development looks like in high-stakes contexts."
      },
      {
        title: "What I'd Do Differently",
        content: "Building DocNotes clarified several areas where earlier decisions could have reduced friction or surfaced risk sooner. None of these are regrets — they reflect how product responsibility evolves once real constraints and usage patterns become visible.",
        principles: [
          {
            name: "Validate Workflow Language Earlier",
            description: "While the core workflow proved sound, some terminology around drafts, approvals, and amendments required explanation. If starting again, I would test naming and state labels earlier with clinicians, validate whether concepts like \"approval\" and \"amendment\" map cleanly to different specialties, and iterate on language before locking workflow states. This would have reduced onboarding friction without changing the underlying structure."
          },
          {
            name: "Introduce Explicit Boundaries Even Sooner",
            description: "Many scope decisions were correct, but some boundaries could have been enforced earlier to avoid revisiting them later. In hindsight, I would formalize non-goals sooner and reference them more often during delivery, explicitly document why certain features were excluded (not just deferred), and use constraints as a more visible prioritization tool. This would have reduced second-guessing and made trade-offs clearer earlier."
          },
          {
            name: "Test Failure Scenarios More Aggressively",
            description: "AI failure modes became more obvious once workflows were exercised end-to-end. Next time, I would simulate degraded AI behavior earlier (timeouts, unusable output), test \"AI unavailable\" scenarios as first-class cases, and design fallback states before optimizing happy paths. This would have accelerated confidence in system reliability."
          },
          {
            name: "Separate \"Build\" and \"Operate\" Earlier",
            description: "As the product moved closer to real usage, the nature of the work shifted from building features to operating a system. If starting again, I would introduce operational checklists earlier, define post-launch responsibilities before launch (not after), and treat reliability and observability as part of the MVP definition. This would have smoothed the transition from development to ownership."
          }
        ],
        closingNote: "All of these adjustments point to the same learning: In healthcare-adjacent products, clarity and restraint compound faster than feature velocity. The earlier those constraints are made explicit, the easier it becomes to ship responsibly."
      },
      {
        title: "What's Next",
        content: "DocNotes is currently in a private beta phase, with the primary goal of validating workflows, boundaries, and reliability in real clinical use. Future development is intentionally framed around earned complexity, not expansion for its own sake.",
        principles: [
          {
            name: "Validate the Core Workflow Across Repeated Use",
            description: "Before adding functionality, the next priority is to observe how the draft → approval → amendment workflow holds up over time, identify where friction reinforces accountability versus where it becomes noise, and validate that the mental model works across different documentation styles. Only once this workflow proves consistently understandable does further abstraction make sense."
          },
          {
            name: "Improve Onboarding and Shared Mental Models",
            description: "Early usage shows that clarity of intent matters as much as interface usability. Next steps focus on making workflow states (draft, approved, amended) self-explanatory, embedding product boundaries and non-goals directly into onboarding, and reducing the need for external explanation without simplifying responsibility. This is treated as a product communication problem, not a feature gap."
          },
          {
            name: "Expand AI Assistance Carefully — If It Earns It",
            description: "AI support may evolve, but only under strict conditions: clinician authorship must remain explicit, failures must stay visible and non-blocking, and added assistance must reduce cognitive load without shifting responsibility. Potential expansion is limited to formatting and structuring support — not inference, interpretation, or automation of clinical judgment."
          },
          {
            name: "Prepare for a German-Language Version (DACH), If Validation Holds",
            description: "If the core workflow proves stable and valuable, a natural next step would be to explore a German-language version for the DACH market. This would be driven by clinician demand rather than geographic ambition, the need for precise, domain-appropriate language, and alignment with existing EU data protection expectations. Localization would be treated as a product and safety concern, not a simple translation exercise."
          },
          {
            name: "Strengthen Operational Readiness as Usage Grows",
            description: "As real usage increases, operational needs will expand. Potential next steps include clearer separation between operational monitoring and user-visible audit trails, better tooling around failure analysis and recovery, and preparing for compliance discussions only if institutional use becomes a real requirement. These steps would be driven by observed needs, not assumptions."
          }
        ],
        closingNote: "At this stage, the most valuable work is not scaling features, but reinforcing boundaries, validating responsibility models, and ensuring the product earns its next level of complexity. Growth is treated as a consequence of trust, not a goal in itself."
      },
      {
        title: "Technical Context",
        content: "This section provides high-level technical context for readers interested in how the product was implemented. It is included for completeness and is not required to understand the product decisions above.",
        bullets: [
          "Web-based application with authenticated, user-scoped workspaces",
          "Explicit separation of draft, approved, and amended document states",
          "AI-assisted rewriting using third-party language models, with human review required for all outputs",
          "Application-level protection of sensitive patient identifiers before persistence, designed to reduce accidental exposure through logs or operational tooling",
          "Security and operational logging for authentication events, access attempts, AI generation requests, approvals, and exports",
          "Data stored and processed within the EU"
        ],
        subsection: "Stack (for context):"
      }
    ],
    technologies: ["TypeScript", "React", "Server-side APIs", "Relational Database", "Third-party AI Services"]
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
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

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

  const scrollToSection = (id: string, closeMobile = false) => {
    const element = document.getElementById(id);
    if (element) {
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

  const hasMetadata = study.role || study.context || study.users || study.status || study.platform || study.duration || study.team;

  return (
    <div className={styles.caseStudyWrapper}>
      {sectionIds.length > 0 && (
        <nav className={styles.tableOfContents}>
          <h4 className={styles.tocTitle}>Contents</h4>
          <ul className={styles.tocList}>
            {sectionIds.map(({ id, title }) => (
              <li key={id} className={styles.tocItem}>
                <button
                  onClick={() => scrollToSection(id)}
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
                onClick={() => scrollToSection(id, true)}
                className={`${styles.tocMobileLink} ${activeSection === id ? styles.tocMobileLinkActive : ""}`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// Case Study Data Types and Content

export interface Principle {
  name: string;
  description: string;
  image?: string;
}

export interface TwoColumnData {
  left: {
    heading: string;
    items: string[];
  };
  right: {
    heading: string;
    items: string[];
  };
}

export interface WorkflowStep {
  name: string;
  description: string;
}

export interface ProductDecision {
  title: string;
  decision: string;
  why: string;
  whyBullets?: string[];
  tradeoffs: string[];
  outcomes: string[];
}

export interface CaseStudySection {
  title: string;
  content?: string;
  subsection?: string;
  bullets?: string[];
  note?: string;
  image?: string;
  twoColumn?: TwoColumnData;
  principles?: Principle[];
  workflowSteps?: WorkflowStep[];
  workflowDiagram?: {
    steps: string[];
    placeholder?: boolean;
  };
  decisions?: ProductDecision[];
  closingNote?: string;
  video?: string;
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  overview: string;
  websiteUrl?: string;
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

export const caseStudyContent: Record<string, CaseStudyData> = {
  docnotes: {
    title: "DocNotes",
    subtitle: "Clinical Documentation Workspace",
    overview: "A clinical documentation workspace for solo clinicians, designed to support drafting, reviewing, approving, and exporting notes with strict human control and auditability.",
    websiteUrl: "https://www.docnotes.app/",
    disclaimer: "DocNotes is intentionally not an EHR and does not replace existing clinical systems. It operates alongside them via explicit copy-paste workflows, prioritizing clinician control and accountability over automation.",
    role: "Product Owner / Software Engineer",
    context: "Healthcare-adjacent, EU-focused",
    users: "Solo clinicians",
    status: "Beta / pilot",
    platform: "Web-based Healthcare SaaS",
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
        video: "/docnotes_demo_recording.mp4",
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
            description: "The roadmap focused on reducing uncertainty early, rather than delivering a broad feature set. Initial milestones prioritized establishing a safe core workflow (draft → review → approval), defining non-negotiable boundaries around AI usage, validating that the product remained usable without automation, and introducing auditability and data protection before expansion. This sequencing ensured that later features were built on a stable and defensible foundation, rather than retrofitted onto unsafe assumptions.",
            image: "/roadmap.webp"
          },
          {
            name: "Backlog & Prioritization",
            description: "Work was managed through a lightweight backlog that emphasized clear problem statements, explicit acceptance criteria, and scope boundaries and non-goals. Backlog items were ordered to isolate higher-risk changes (AI, authentication, data handling), keep iterations small and reversible, and avoid coupling unrelated concerns. This allowed steady progress while maintaining confidence in system behavior.",
            image: "/tickets.webp"
          },
          {
            name: "Acceptance-Criteria–Driven Delivery",
            description: "To keep implementation aligned with product intent, individual backlog items were written with clear acceptance criteria. A typical ticket included the user problem being addressed, preconditions and constraints, explicit success criteria, and out-of-scope clarifications. This helped prevent scope creep and ensured that \"done\" meant meeting product intent, not just shipping code.",
            image: "/ticket_02.webp"
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
        subsection: "Application Characteristics",
        bullets: [
          "Web-based application with authenticated, user-scoped workspaces",
          "Explicit separation of draft, approved, and amended document states",
          "AI-assisted rewriting using third-party language models, with human review required for all outputs",
          "Application-level protection of sensitive patient identifiers before persistence, designed to reduce accidental exposure through logs or operational tooling",
          "Security and operational logging for authentication events, access attempts, AI generation requests, approvals, and exports",
          "Data stored and processed within the EU"
        ]
      }
    ],
    technologies: ["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Auth.js", "OpenAI API", "Resend", "Vitest"]
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
    subtitle: "Hospital Visitor Credentialing Platform",
    overview: "MedCred was an early-stage healthcare startup building a credentialing platform for hospital visitors and external professionals. The product operated in a regulated, high-trust environment, where clarity, accuracy, and reliability were critical.",
    websiteUrl: "https://www.medcred.online/",
    role: "Product Specialist (Customer-facing & Technical Operations)",
    duration: "2 years",
    context: "Regulated healthcare environments with multiple non-technical stakeholders (hospital staff, vendors, external representatives)",
    status: "Early-stage startup",
    platform: "Web-based Healthcare SaaS",
    sections: [
      {
        title: "Context & Problem",
        content: "The product was explored in collaboration with Irish healthcare stakeholders, including alignment with HSE environments, which increased the importance of scope clarity, reliability, and conservative demos.",
        image: "/medcred_screenshot.webp",
        note: "As with many startups, there was no strict separation between sales, product, operations, and engineering. Live demos to potential buyers often doubled as real-world product validation, and misalignment between what was shown, what was technically feasible, and what was production-ready carried significant risk.",
        subsection: "The core challenge was not just building features, but managing the gap between:",
        bullets: [
          "Customer expectations formed during demos",
          "Evolving product capabilities",
          "Engineering delivery constraints"
        ],
        closingNote: "Without a clear translation layer, this gap risked overselling unfinished functionality, unclear scope entering engineering, rework caused by misunderstood edge cases, and loss of trust in a sensitive healthcare context."
      },
      {
        title: "My Role & Responsibilities",
        content: "I operated at the intersection of customers, founders, and engineers, owning the operational layer that translated real-world usage and technical constraints into clear, actionable product work.",
        twoColumn: {
          left: {
            heading: "Product-facing responsibilities",
            items: [
              "Served as the primary point of contact during product demos and presentations for potential buyers",
              "Explained both frontend behavior and backend processes to non-technical stakeholders",
              "Identified points of confusion, friction, and objections during live demos",
              "Collected and synthesized customer feedback and fed it back into the product team to inform iteration and improvements"
            ]
          },
          right: {
            heading: "Technical operations responsibilities",
            items: [
              "Created and triaged engineering tickets across bug fixes, integrations, and customer onboarding/configuration issues",
              "Defined expected behavior and documented edge cases surfaced during demos and customer interactions",
              "Acted as a technical sanity check on sales and founder assumptions, clarifying what the product could realistically support",
              "Pushed back on demos or presentations when functionality was not stable or ready to be shown",
              "Translated technical constraints and implementation details into language founders and non-technical stakeholders could confidently communicate"
            ]
          }
        },
        closingNote: "While I also contributed as an engineer, my primary value was reducing ambiguity at the boundary between customer needs and engineering delivery, ensuring that work entering development was well-scoped, realistic, and aligned with real-world usage."
      },
      {
        title: "Key Decisions & Judgment Calls",
        content: "Working in an early-stage healthcare startup meant that decisions were often made under uncertainty, with incomplete information and evolving requirements. My role required exercising judgment to balance speed, credibility, and technical reality, particularly in customer-facing situations.",
        decisions: [
          {
            title: "Delaying or pushing back on demos when functionality wasn't ready",
            decision: "Because live demos directly shaped customer expectations, I made the call to delay or push back on presentations when features were unstable, underspecified, or likely to misrepresent the product's actual capabilities.",
            why: "This was especially important given the regulated healthcare context, where overpromising or showing incomplete functionality could quickly erode trust. Prioritizing credibility over speed helped ensure that what customers saw aligned with what engineering could reliably deliver.",
            whyBullets: [
              "Example: In one instance, an integration-related workflow was technically functional but relied on incomplete configuration and had several unresolved edge cases that only surfaced during internal testing. Rather than demoing it as \"ready,\" I flagged the risk, advised against presenting it in a live customer setting, and worked with engineering to clarify expected behavior before it was shown externally. This avoided setting unrealistic expectations and prevented follow-up rework driven by customer confusion."
            ],
            tradeoffs: [],
            outcomes: []
          },
          {
            title: "Acting as a technical sanity check on sales and founder assumptions",
            decision: "I regularly reviewed assumptions coming from sales conversations and founder discussions, validating them against the current state of the product and technical constraints.",
            why: "When expectations drifted beyond what was feasible, I translated those constraints into clear, non-technical language and proposed safer alternatives or phased approaches. This helped prevent misaligned commitments and reduced downstream delivery risk.",
            tradeoffs: [],
            outcomes: []
          },
          {
            title: "Surfacing edge cases early to avoid rework",
            decision: "Many of the most important product issues surfaced during demos and onboarding conversations rather than through formal requirements.",
            why: "I made a deliberate effort to capture edge cases observed in real usage, define expected behavior clearly, and feed this context into engineering tickets. By addressing these issues early, we reduced ambiguity in development and avoided repeated cycles of rework caused by misunderstood customer workflows.",
            tradeoffs: [],
            outcomes: []
          },
          {
            title: "Choosing conservative scope in a high-trust domain",
            decision: "In a healthcare environment where reliability mattered more than feature breadth, I consistently favored conservative scope over ambitious but unstable functionality.",
            why: "This meant advocating for clearer behavior definitions, incremental improvements, and stable configurations before expansion. These decisions helped maintain trust with stakeholders and ensured that product progress did not outpace operational readiness.",
            tradeoffs: [],
            outcomes: []
          }
        ],
        closingNote: "These judgment calls helped protect product credibility in front of potential buyers, reduce delivery risk for engineering, and create a more reliable feedback loop between customers and the product team. More importantly, they reinforced the importance of operational ownership in a startup environment where formal product processes were still emerging."
      },
      {
        title: "Operational Workflow",
        content: "In the absence of rigid product processes, I helped establish a practical operational workflow that connected customer-facing activity with engineering delivery. The goal was to reduce ambiguity, surface risk early, and ensure that work entering development reflected real-world usage rather than assumptions.",
        principles: [
          {
            name: "From demo to delivery",
            description: "Live demos and onboarding conversations were a primary source of insight into how the product was actually being used and understood. During these sessions, I actively observed points of confusion, implicit assumptions made by customers, and edge cases that were not captured in existing requirements. Following each interaction, I translated these observations into concrete follow-up actions, ensuring that customer-facing insights did not remain anecdotal."
          },
          {
            name: "Translating feedback into actionable work",
            description: "Customer feedback and demo observations were distilled into engineering tickets with clearly defined expected behavior, documented edge cases, and contextual background explaining why the work mattered. Tickets covered a mix of bugs, integration issues, and configuration or onboarding gaps. This helped engineers understand not just what needed to be built or fixed, but how it affected real customer workflows."
          },
          {
            name: "Scope validation before development",
            description: "Before work entered active development, I acted as a scope filter, checking that requests were technically feasible, clearly specified, and aligned with what had been shown or promised externally. When scope was unclear or risky, I worked with engineers to refine requirements or with founders to reset expectations. This reduced rework and prevented partially defined features from reaching customers."
          },
          {
            name: "Ongoing alignment during delivery",
            description: "Throughout development, I stayed closely aligned with engineers to answer clarification questions, confirm expected behavior, and validate that implemented solutions matched the original intent. Because I understood both the technical implementation and the customer context, I was able to resolve ambiguities quickly without blocking delivery."
          },
          {
            name: "Release and demo readiness",
            description: "Before features were shown externally or used in demos, I helped assess readiness by considering stability, configuration completeness, and likelihood of customer misunderstanding. If risks remained, I recommended delaying demos or narrowing scope to ensure that what was presented was reliable and defensible in a healthcare setting."
          }
        ],
        closingNote: "This operational approach reduced ambiguity between customer needs and engineering execution, minimized rework caused by misunderstood requirements, and protected product credibility in front of healthcare stakeholders. It also created a lightweight but effective feedback loop suited to an early-stage startup, where formal product processes were still evolving."
      },
      {
        title: "Outcomes & Impact",
        content: "While MedCred operated in an early-stage startup environment without formal product analytics or large-scale deployment metrics, the operational approach I took had clear qualitative impact across customer interactions, delivery reliability, and internal alignment.",
        principles: [
          {
            name: "Improved demo credibility and customer trust",
            description: "By pushing back on unstable or underspecified functionality and ensuring that demos reflected the product's true capabilities, customer-facing interactions became more consistent and defensible. This reduced the risk of misaligned expectations and helped establish trust with stakeholders operating in a regulated healthcare context, where accuracy and reliability were critical."
          },
          {
            name: "Reduced rework and clearer engineering scope",
            description: "Capturing edge cases early and translating real-world usage into well-scoped tickets helped reduce ambiguity for engineering. Engineers received clearer context around expected behavior, integration constraints, and configuration requirements. As a result, work entering development was better defined, reducing avoidable rework caused by misunderstood requirements or incomplete assumptions."
          },
          {
            name: "Stronger alignment between founders, sales, and engineering",
            description: "By acting as a translation layer between technical implementation and non-technical discussions, I helped align founder and sales expectations with delivery reality. This improved internal communication and reduced friction caused by mismatched assumptions about what the product could support at a given point in time."
          },
          {
            name: "More reliable onboarding and configuration workflows",
            description: "Addressing onboarding and configuration gaps surfaced during demos led to smoother initial customer interactions and fewer follow-up issues after first use. These improvements supported more predictable customer experiences, particularly when integrations or environment-specific configurations were involved."
          }
        ],
        closingNote: "In a healthcare startup where credibility, trust, and operational reliability were essential, these outcomes helped ensure that product progress remained aligned with real-world usage and delivery capacity. They also reinforced the value of operational ownership in environments where formal product processes were still emerging."
      },
      {
        title: "What I Learned",
        content: "Working at MedCred clarified for me how critical operational ownership is in early-stage, regulated products — particularly when formal product processes are still evolving.",
        principles: [
          {
            name: "Product credibility is fragile and must be protected",
            description: "In healthcare contexts, even small misalignments between what is shown and what actually works can quickly undermine trust. I learned that saying \"not yet\" or narrowing scope is often a stronger product decision than pushing forward prematurely. Protecting credibility required resisting short-term pressure and prioritizing accuracy and reliability over speed."
          },
          {
            name: "Translation is a core product skill",
            description: "A significant part of my impact came from translating between different perspectives: customer expectations formed during demos, technical realities understood by engineers, and strategic assumptions held by founders. I learned that product effectiveness often depends less on formal authority and more on the ability to create shared understanding across disciplines."
          },
          {
            name: "Real-world usage reveals requirements that specs miss",
            description: "Many of the most important edge cases and workflow gaps only emerged during live demos and onboarding conversations. This reinforced the importance of grounding product decisions in observed behavior rather than relying solely on theoretical requirements or assumptions."
          },
          {
            name: "Technical context improves product judgment",
            description: "Having a technical background allowed me to assess feasibility, risk, and delivery implications more accurately. It also helped me communicate constraints clearly and early, reducing friction and rework. I learned that technical fluency is a force multiplier for product and operations roles when used to clarify—not dominate—decision-making."
          },
          {
            name: "Product and operations are deeply interconnected",
            description: "At MedCred, product decisions and operational execution were tightly coupled. Poorly scoped decisions immediately created delivery and trust issues, while clear operational workflows enabled faster and safer progress. This experience shaped my interest in Product Owner and Technical Product Operations roles, where bridging strategy and execution is central."
          }
        ],
        closingNote: "These lessons continue to inform how I approach product work: prioritizing clarity, conservative scope, and real-world validation—especially in environments where trust, regulation, and reliability are non-negotiable."
      },
      {
        title: "What I'd Do Differently",
        content: "This role required stepping into a fast-moving startup environment with limited structure, where learning and decision-making happened in real time. While this accelerated my growth significantly, it also highlighted areas where I would intentionally operate differently with hindsight.",
        principles: [
          {
            name: "Establish structure earlier in a high-velocity environment",
            description: "Much of my early impact came from adapting quickly and solving problems as they emerged. However, with experience, I learned that even in fast-moving startups, introducing lightweight structure early can amplify effectiveness. If starting again, I would put earlier emphasis on lightweight documentation of recurring edge cases, shared definitions of \"demo-ready\" or \"deliverable,\" and clearer handoff points between customer-facing and engineering work. This would have reduced reliance on tacit knowledge while preserving speed."
          },
          {
            name: "Be more deliberate about slowing down to protect long-term clarity",
            description: "Early on, the pace of work required rapid context-switching between demos, tickets, and delivery support. While this helped me learn quickly, it sometimes deferred opportunities to step back and systematize what was being learned. With hindsight, I would more deliberately create space to consolidate learnings from repeated customer interactions, identify patterns earlier, and formalize them into clearer product and operational guidance."
          },
          {
            name: "Name the role I was already playing sooner",
            description: "Operating in the \"deep end\" meant that responsibilities expanded organically before they were explicitly defined. If starting again, I would more proactively name and align on the product–operations bridge role I was already fulfilling, helping set clearer expectations with founders and engineers and making ownership boundaries more explicit earlier."
          }
        ],
        closingNote: "This experience taught me how quickly capability can grow when operating close to real users, real constraints, and real consequences. More importantly, it shaped how I now approach product and operational roles: balancing adaptability with intentional structure, and speed with long-term clarity—especially in regulated, high-trust environments."
      },
      {
        title: "How This Experience Shapes My Work Today",
        content: "This role reinforced my interest in product work that sits close to real users, real constraints, and real delivery trade-offs—particularly in regulated or high-trust environments.",
        note: "Operating in a fast-moving healthcare startup required comfort with ambiguity, strong judgment under pressure, and the ability to bridge technical and non-technical perspectives without relying on formal process or authority. Over time, this shaped how I approach product and operational responsibilities: prioritizing clarity over assumptions, credibility over speed, and delivery readiness over theoretical completeness.",
        closingNote: "The experience also confirmed the value of Product Owner and Technical Product Operations roles, where success depends on translating customer reality into well-scoped, actionable work and ensuring that engineering effort aligns with what can be responsibly delivered. These lessons continue to inform how I work today—especially when protecting product trust, managing scope in ambiguous environments, and designing workflows that connect customer needs with engineering execution."
      },
      {
        title: "Technical Context",
        content: "MedCred was implemented as a full-stack, web-based healthcare SaaS platform, designed to support multiple user roles and operate reliably in regulated environments.",
        principles: [
          {
            name: "Backend",
            description: "Node.js with Express.js (REST-based web application), MongoDB with Mongoose (document database), and Passport.js (local authentication strategy)."
          },
          {
            name: "Frontend",
            description: "EJS (server-side templating), jQuery (DOM manipulation and interaction handling), Bootstrap and Material Design for Bootstrap (MDB), and SCSS / Sass for styling."
          },
          {
            name: "Key Integrations",
            description: "AWS S3 for file storage (credentials, avatars), Stripe for payment processing, Nodemailer for transactional email notifications, and Chart.js and DataTables for reporting and data visualization."
          },
          {
            name: "Architecture & Deployment",
            description: "Role-based access model supporting three user types: Cardholder (primary users managing credentials and dashboards), Hospital (healthcare providers managing visitor access and zones), and Admin (system and platform management). Environment-based configuration with MongoDB, deployed via Heroku."
          }
        ],
        closingNote: "This technical context informed many of the product and operational decisions described above, particularly around demo readiness, scope validation, integrations, and onboarding workflows."
      }
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Passport.js", "EJS", "jQuery", "Bootstrap", "MDB", "SCSS", "AWS S3", "Stripe", "Nodemailer", "Chart.js", "DataTables", "Heroku"]
  }
};

// Helper to get all case study IDs
export const caseStudyIds = Object.keys(caseStudyContent);

// Helper to get case study by ID
export const getCaseStudy = (id: string): CaseStudyData | undefined => caseStudyContent[id];

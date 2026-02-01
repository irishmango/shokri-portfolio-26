// Case Study Data Types and Content

export interface Principle {
  name: string;
  description: string;
  image?: string;
  imageCaption?: string;
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
  noteImage?: string;
  image?: string;
  twoColumn?: TwoColumnData;
  principles?: Principle[];
  workflowSteps?: WorkflowStep[];
  workflowDiagram?: {
    steps: string[];
    placeholder?: boolean;
  };
  decisions?: ProductDecision[];
  responsibilityDiagram?: {
    actors: {
      title: string;
      subtitle?: string;
      excluded?: boolean;
      does?: string[];
      doesNot?: string[];
      notes?: string[];
    }[];
    caption?: string;
  };
  solutionFlow?: {
    steps: {
      title: string;
      items?: string[];
      annotation?: string;
    }[];
    arrowLabels?: { after: number; label: string }[];
    caption?: string;
  };
  architectureDiagram?: {
    layers: {
      id: string;
      title?: string;
      side?: boolean;
      boxes: {
        title: string;
        items?: string[];
        annotation?: string;
        optional?: boolean;
      }[];
    }[];
    connections: {
      from: string;
      to: string;
      label?: string;
      bidirectional?: boolean;
    }[];
    footer?: string;
    caption?: string;
  };
  closingNote?: string;
  video?: string;
  sources?: { label: string; url: string }[];
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
  clearsight: {
    title: "ClearSight",
    subtitle: "Improving Follow-Up Adherence After Diabetic Retinopathy Screening",
    overview: "ClearSight is an AI-assisted adherence platform designed to support public diabetic retinopathy screening programs across the EU. It focuses on what happens after screening: helping patients understand their results, complete the appropriate next step, and reducing avoidable drop-off, without adding workload for clinicians or expanding regulatory scope.\n\nClearSight does not diagnose disease, interpret retinal images, or replace clinical systems. It operates as a lightweight layer between existing screening infrastructure and patients, with the explicit goal of improving follow-up completion in a safe, auditable, and privacy-respecting way.",
    role: "Product Lead / Developer",
    context: "Healthcare, EU-Focused",
    users: "Screening programs, public health systems",
    status: "In development",
    platform: "Web-based Healthcare",
    sections: [
      {
        title: "Context & Problem",
        content: "Diabetic retinopathy screening programs across Europe achieve high participation rates and generate large volumes of screening data. However, screening alone does not prevent vision loss. The critical failure point often occurs after the screening result is delivered.\n\nIn practice, a significant proportion of patients do not complete recommended follow-up actions after screening, particularly when results are borderline, non-urgent, or require self-initiated booking. These missed follow-ups can lead to delayed treatment, avoidable vision loss, and increased long-term healthcare costs.\n\nThe core issue is not diagnostic accuracy or image interpretation. It is a systems-level gap between:",
        bullets: [
          "Screening outcomes",
          "Patient understanding",
          "Completed follow-up actions"
        ],
        note: "In many programs, abnormal results are communicated via letters or portals, after which responsibility for follow-up shifts implicitly to the patient. At this point, screening systems often lose visibility into whether action was taken.\n\nClearSight was conceived to address this gap — not by changing how screening is performed, but by improving how results are translated into clear, completed next steps."
      },
      {
        title: "Discovery & Stakeholder Evidence",
        content: "ClearSight's problem framing and constraints are grounded in qualitative discovery across the diabetic retinopathy screening pathway.\n\nInterviews were conducted with:",
        bullets: [
          "A screening ophthalmologist involved in clinical governance",
          "A diabetes clinic consultant responsible for downstream care",
          "A screening program nurse / coordinator managing operational follow-up"
        ],
        subsection: "Across these conversations, consistent patterns emerged:",
        principles: [
          {
            name: "Follow-up failures occur after screening results are issued",
            description: "During the handover to patient action."
          },
          {
            name: "Responsibility for follow-up is diffuse and poorly observable",
            description: "Clinicians lack closed-loop confirmation and often discover missed follow-up retrospectively."
          },
          {
            name: "Patients frequently misunderstand results",
            description: "Both the urgency of results and who is responsible for initiating follow-up."
          },
          {
            name: "Stakeholders explicitly resisted new clinician-facing tools",
            description: "Dashboards, inboxes, or alerting systems were resisted due to workload and liability concerns."
          }
        ],
        note: "Interviews were used to identify unacceptable system behaviors and responsibility risks, rather than to validate feature desirability.",
        closingNote: "These findings directly informed ClearSight's scope boundaries, responsibility model, and decision to prioritise clarity, reinforcement, and population-level insight over escalation or automation."
      },
      {
        title: "Why Existing Approaches Fall Short",
        content: "Most screening programs already communicate results to patients, typically via letters, PDFs, or basic patient portals. While these approaches technically \"close the loop,\" they often fail to support action in practice.\n\nCommon limitations include:",
        principles: [
          {
            name: "Ambiguous communication",
            description: "Results may be clinically correct but difficult to interpret for patients, especially when risk is neither clearly normal nor clearly urgent."
          },
          {
            name: "Unclear responsibility",
            description: "Patients are often unsure whether follow-up is automatic, optional, or their responsibility to initiate."
          },
          {
            name: "Static reminders",
            description: "Reminder systems, where they exist, tend to be one-size-fits-all, policy blind and don't adapt to drop-off risk."
          },
          {
            name: "Lack of population visibility",
            description: "Screening programs may know how many people were screened, but have limited insight into where and why follow-up breaks down."
          }
        ],
        note: "These gaps are rarely due to negligence. They emerge from fragmented systems, unclear ownership, and tools that were not designed to support adherence as a first-class outcome.",
        closingNote: "ClearSight is intended to complement existing screening infrastructure by addressing these specific weaknesses — not by replacing it."
      },
      {
        title: "Product Intent & Boundaries",
        content: "ClearSight is deliberately scoped to remain a non-diagnostic, non-clinical system.",
        twoColumn: {
          left: {
            heading: "What ClearSight Is",
            items: [
              "An adherence-focused layer that sits downstream of screening",
              "A patient-facing system that explains results in plain language",
              "A tool that presents a single, clear recommended next action",
              "An analytics surface for screening programs to understand follow-up completion at a population level",
              "An AI-assisted system that prioritizes explainability, auditability, and safe failure modes"
            ]
          },
          right: {
            heading: "What ClearSight Is Not",
            items: [
              "Not a diagnostic device",
              "Not an image analysis or computer vision system",
              "Not a clinical decision-making tool",
              "Not an EHR or patient record system",
              "Not a clinician task manager or inbox",
              "Not a replacement for existing screening workflows"
            ]
          }
        },
        noteImage: "/product_intent_boundaries_image.webp",
        note: "These boundaries are intentional. They reduce regulatory risk, avoid shifting clinical responsibility, and ensure the product remains compatible with real-world public screening programs.",
        closingNote: "ClearSight's success is not measured by how much it automates, but by whether more patients complete the follow-up actions that screening programs already recommend."
      },
      {
        title: "Users & Responsibility Model",
        content: "ClearSight is designed around a deliberately narrow set of users and responsibilities. In a public screening context, ambiguity around \"who is responsible for what\" is a common source of failure. This section defines those boundaries explicitly.",
        principles: [
          {
            name: "Primary User: Screening Program Operators",
            description: "Screening program operators are the primary users of ClearSight, configuring workflows and using aggregated insights to improve follow-up adherence at scale. Their responsibilities include: defining follow-up workflows for different screening outcomes, configuring reminder rules and escalation logic, monitoring follow-up adherence at a population level, identifying where drop-off occurs across cohorts or regions, and exporting aggregated data for care coordination or reporting. Importantly, operators interact with aggregated data only. ClearSight does not create patient-level task lists, inboxes, or case management queues for program staff."
          },
          {
            name: "Secondary User: Patients",
            description: "Patients are the only individual-level users of ClearSight. Their needs are intentionally simple: receive their screening outcome in clear, non-alarming language, understand what the result means at a high level, see one recommended next action, receive reminders until that action is completed or they opt out, and confirm follow-up completion themselves. Patients do not \"use\" ClearSight as an application. They receive a single, program-defined digital result page and reminders designed to support follow-up action. ClearSight is designed to reduce uncertainty rather than provide medical guidance."
          },
          {
            name: "Explicit Non-User: Clinicians",
            description: "Clinicians are intentionally not operational users of ClearSight. They do not log into the system daily, do not manage patients within ClearSight, do not receive tasks, alerts, or reminders, and are not responsible for follow-up execution via the platform. This is a deliberate design decision. In many screening programs, clinicians are already operating at capacity. Introducing additional systems, inboxes, or follow-up responsibilities risks increasing burnout and creating parallel workflows that are difficult to sustain. ClearSight is designed to support clinicians indirectly by improving follow-up completion rates — without requiring their ongoing interaction."
          },
          {
            name: "Responsibility Boundaries",
            description: "ClearSight does not change clinical responsibility. It makes responsibility visible. Clinical decisions remain with clinicians and existing healthcare systems. Follow-up ownership remains with patients, as defined by the screening program. System configuration and oversight remain with program operators. The platform itself does not assume clinical judgment or care coordination roles. By explicitly separating these responsibilities, ClearSight avoids silently shifting accountability while still addressing a real, systemic gap in screening outcomes."
          }
        ],
        responsibilityDiagram: {
          actors: [
            {
              title: "Patients",
              subtitle: "Primary users",
              does: [
                "Receives screening results",
                "Understands recommended next action",
                "Initiates follow-up",
                "Confirms follow-up completion",
                "Can opt out of reminders"
              ],
              doesNot: [
                "Receive medical advice",
                "Manage care pathways",
                "Interact with clinicians via ClearSight"
              ]
            },
            {
              title: "Screening Program Operators",
              subtitle: "Configuration & oversight",
              does: [
                "Define follow-up workflows",
                "Configure reminder rules",
                "Monitor aggregate adherence",
                "Review cohort-level trends"
              ],
              doesNot: [
                "Manage individual patients",
                "Send manual reminders",
                "Own clinical decisions",
                "Receive patient-level task lists"
              ]
            },
            {
              title: "Clinicians",
              subtitle: "Explicit non-users",
              excluded: true,
              doesNot: [
                "Log into ClearSight",
                "Receive alerts or inbox items",
                "Track follow-up completion",
                "Manage patients within the system"
              ],
              notes: [
                "Clinical responsibility remains unchanged"
              ]
            }
          ],
          caption: "ClearSight enforces clear responsibility boundaries to avoid shifting clinical accountability or creating hidden operational workload."
        }
      },
      {
        title: "Solution Overview",
        content: "ClearSight is designed as a lightweight, downstream layer that translates screening outputs into completed follow-up actions. It does not change how screening is performed or how clinical decisions are made. Instead, it focuses on the narrow but critical gap between results delivery and patient action.\n\nAt a high level, the system operates in five steps.",
        workflowSteps: [
          {
            name: "Structured Screening Inputs",
            description: "ClearSight ingests structured outputs from existing screening systems. These inputs are intentionally minimal and standardized to avoid scope creep and regulatory risk. Typical inputs include: screening result category (e.g. no retinopathy, mild findings, referral recommended), screening date, and optional contextual bands (e.g. age band, diabetes duration band, prior screening history). ClearSight does not ingest raw retinal images, free-text clinical notes, diagnoses, or treatment plans."
          },
          {
            name: "Risk Tier Assignment",
            description: "Based on the screening output and limited contextual data, ClearSight assigns the patient to a coarse risk tier (e.g. low, medium, high). These tiers are not clinical judgments. They are used solely to determine follow-up urgency, tailor reminder timing and frequency, and support population-level analysis. Risk tiering is designed to be explainable and auditable."
          },
          {
            name: "Single Recommended Next Action",
            description: "For each patient, ClearSight presents one primary recommended next action. Examples include: \"Book an eye clinic appointment within X weeks,\" \"Repeat screening at the next scheduled interval,\" or \"Contact your GP or screening provider.\" The platform deliberately avoids presenting multiple competing options. Reducing choice overload is treated as a core adherence strategy. ClearSight does not provide medical advice or alternative care pathways."
          },
          {
            name: "Reminder & Follow-Up Support",
            description: "ClearSight supports patients through reminders that are time-bound, risk-aware, and adaptive to likelihood of drop-off. Reminder logic is designed to optimize timing and frequency rather than message content. Messages remain standardized, neutral, and non-alarming. Patients can opt out at any time. If AI-assisted optimization is unavailable or disabled, ClearSight falls back to static, rule-based reminder schedules without loss of core functionality."
          },
          {
            name: "Confirmation Loop & Outcome Visibility",
            description: "Patients can confirm when they have completed the recommended follow-up action. This confirmation closes the loop for the patient, stops further reminders, and feeds aggregated adherence data back to the screening program. Program operators gain visibility into follow-up completion rates, drop-off points, and adherence trends across cohorts. ClearSight does not verify clinical outcomes or treatment details. Its role ends at confirming that the follow-up action occurred."
          }
        ],
        solutionFlow: {
          steps: [
            {
              title: "Screening Output",
              items: ["Result category", "Screening date", "Contextual bands"],
              annotation: "Structured data only"
            },
            {
              title: "Risk Tier Assignment",
              items: ["Low / Medium / High"],
              annotation: "Explainable, non-clinical"
            },
            {
              title: "Single Recommended Next Action",
              items: ["Programme-defined workflow"],
              annotation: "Book appointment / Repeat screening / Contact provider"
            },
            {
              title: "Follow-Up Orchestration",
              items: ["Reminder timing logic", "Drop-off sensitivity"],
              annotation: "Signals, not messages"
            },
            {
              title: "Programme Messaging System",
              items: ["SMS / letters / portal notifications"],
              annotation: "System of record for communications"
            },
            {
              title: "Follow-Up Confirmation",
              items: ["Patient confirms action", "Reminders stop"],
              annotation: "Opt-out supported"
            },
            {
              title: "Aggregated Adherence Insights",
              items: ["Completion rates", "Drop-off points", "Cohort trends"],
              annotation: "No patient task lists"
            }
          ],
          arrowLabels: [
            { after: 3, label: "Reminder signals" },
            { after: 5, label: "Anonymised outcomes" }
          ],
          caption: "ClearSight translates screening outputs into completed follow-up actions by orchestrating programme-defined workflows and closing the loop with confirmation and aggregated insight."
        }
      },
      {
        title: "Interface Design",
        content: "The following screens are illustrative design concepts developed in collaboration with a product designer. They demonstrate how ClearSight's scope, responsibility model, and analytics focus are expressed visually. Metrics shown are representative placeholders used to explore clarity and interpretability, not live production data.",
        principles: [
          {
            name: "Patient-facing experience",
            description: "",
            image: "/patient_view.webp",
            imageCaption: "This screen reflects the decision to present screening results in plain, non-alarming language with a single recommended next action. The interface avoids diagnostic interpretation and makes responsibility explicit: the patient is responsible for arranging follow-up. This mirrors the design intent of a digitally readable letter rather than a dashboard."
          },
          {
            name: "Follow-up overview",
            description: "",
            image: "/overview.webp",
            imageCaption: "The follow-up overview provides a high-level view of completion rates, median follow-up time, and distribution by screening outcome. This supports programme oversight without creating patient-level operational responsibility."
          },
          {
            name: "Risk & drop-off analysis",
            description: "",
            image: "/analysis.webp",
            imageCaption: "This view explores where follow-up failure occurs and how risk is distributed across cohorts. These insights are used to inform reminder policy and programme configuration, not to intervene on individual patients."
          },
          {
            name: "Policy change and impact review",
            description: "",
            image: "/review.webp",
            imageCaption: "Policy impact views allow operators to assess the effect of configuration changes (e.g. reminder timing) on adherence outcomes over time. This supports evidence-based programme decisions without expanding the system into case management."
          }
        ],
        note: "Operator interfaces are intentionally limited to population-level visibility. ClearSight does not provide patient-level task lists, alerts, or case management tools."
      },
      {
        title: "Metrics & Impact Model (Pre-Pilot)",
        content: "ClearSight is designed to improve follow-up adherence rather than screening participation. At this stage, impact is framed using explicit assumptions rather than observed outcomes.",
        principles: [
          {
            name: "Baseline Assumptions",
            description: "Based on public screening program reports and stakeholder interviews, follow-up completion after abnormal diabetic retinopathy screening is typically estimated at ~65–75%, with significant variation by risk category and region."
          },
          {
            name: "Target Outcome",
            description: "ClearSight is designed to improve follow-up completion within the recommended window by approximately 10–20 percentage points, primarily by reducing missed or delayed follow-up among medium- and high-risk cohorts."
          },
          {
            name: "Adherence Funnel",
            description: "ClearSight explicitly operates between: Screened → Result delivered → Result understood → Action initiated → Follow-up completed. The platform intervenes only between \"result delivered\" and \"action initiated.\""
          }
        ],
        subsection: "Key Metrics",
        bullets: [
          "North Star: % of patients completing follow-up within the target window",
          "Leading Indicators: reminder open rate, reminder response latency, follow-up confirmation rate, opt-out rate",
          "Risk & Quality Metrics: reminder fatigue indicators, false urgency rate, demographic bias in risk tier assignment"
        ],
        note: "These metrics are designed to support program-level evaluation rather than individual clinical decision-making.",
        sources: [
          { label: "Follow-Up After Diabetic Retinopathy Screening (ScienceDirect)", url: "https://www.sciencedirect.com/science/article/pii/S0002939424003350" },
          { label: "Diabetic Retinopathy Screening in Europe — Narrative Review (ResearchGate)", url: "https://www.researchgate.net/publication/352517106_Diabetic_Retinopathy_Screening_and_Registration_in_Europe-Narrative_Review" }
        ]
      },
      {
        title: "AI Scope & Explainability",
        content: "ClearSight uses AI as a constrained, supporting capability — not as the core product and not as a source of clinical authority. From the outset, AI was treated as a dependency with clearly defined inputs, outputs, and failure modes, rather than as an autonomous system.",
        twoColumn: {
          left: {
            heading: "What AI Is Used For",
            items: [
              "Risk Stratification: AI assigns patients to coarse risk tiers based on structured screening outputs and minimal contextual data — not to make or infer diagnoses",
              "Drop-Off Prediction: AI estimates the likelihood that a patient will miss or delay follow-up, used to adjust reminder timing and frequency",
              "Reminder Optimization: AI optimizes when reminders are sent, not what they say. Message content remains standardized, pre-approved, and non-alarming"
            ]
          },
          right: {
            heading: "What AI Is Explicitly Not Used For",
            items: [
              "Diagnosing disease",
              "Interpreting retinal images",
              "Inferring treatment pathways",
              "Generating free-text medical advice",
              "Personalizing message content",
              "Replacing program-defined workflows"
            ]
          }
        },
        principles: [
          {
            name: "Model Choices & Explainability",
            description: "ClearSight prioritizes interpretable, auditable models over opaque or highly complex approaches. Model selection favors logistic regression or gradient boosting, clearly defined feature sets, and stable, bounded outputs (e.g. tiers, probabilities). For every AI-influenced decision, the system can surface which input factors were considered, how they influenced the outcome at a high level, and what the AI output was used for. This explainability is designed for two audiences: patients, who need reassurance and clarity, and program operators, who need confidence in system behavior and oversight capability."
          },
          {
            name: "AI as an Optional Dependency",
            description: "AI is not a hard requirement for ClearSight to function. If AI services are unavailable, disabled, or deliberately excluded: risk tiering falls back to rule-based logic defined by the screening program, reminders follow static, predefined schedules, and core patient workflows remain fully usable. This design ensures that AI failure does not block patient communication or follow-up support. It also allows programs to adopt ClearSight incrementally, without committing to AI from day one."
          },
          {
            name: "Failure Modes & Safety Considerations",
            description: "AI systems are probabilistic and can fail in unpredictable ways. ClearSight is designed so that AI failures are visible, contained, and non-blocking. Key safety measures include: bounded outputs (no open-ended generation), explicit confidence thresholds, human-defined workflows that AI cannot override, and monitoring of AI behavior at an aggregate level rather than per-patient intervention. The guiding principle is that AI should improve efficiency and targeting without introducing silent failure modes or shifting responsibility."
          }
        ],
        closingNote: "While ClearSight can operate safely without AI, its ability to generate population-level insight and inform program optimisation depends on AI-assisted analysis."
      },
      {
        title: "Known Failure Scenarios & Escalation Boundaries",
        content: "ClearSight deliberately avoids automated clinical escalation in early versions. This is an intentional boundary informed by stakeholder concerns around implied responsibility and resourcing.\n\nIn cases where high-risk patients repeatedly fail to complete follow-up:",
        bullets: [
          "ClearSight treats this as a population-level signal rather than an individual clinical trigger",
          "Patterns of repeated non-adherence are surfaced to program operators for policy review",
          "Any escalation beyond reminder reinforcement must be explicitly defined, resourced, and owned by the screening program"
        ],
        note: "ClearSight is designed to highlight where escalation may be required, not to silently assume clinical responsibility.",
        closingNote: "This boundary is intended to preserve trust with clinicians, patients, and program operators by avoiding false assurances or silent handoffs."
      },
      {
        title: "Data, Privacy & GDPR Posture",
        content: "ClearSight is designed for use within EU public screening programs, where data protection, patient trust, and regulatory clarity are non-negotiable. From the outset, data handling was treated as a product design problem, not a compliance afterthought.\n\nRather than attempting to store or centralize medical records, ClearSight adopts a data-minimization–first posture aligned with GDPR principles and public-sector expectations.",
        principles: [
          {
            name: "Data Minimization by Design",
            description: "ClearSight ingests and stores only the minimum data required to support follow-up adherence: a pseudonymized patient identifier, screening result category, screening date, and optional contextual bands (e.g. age range, diabetes duration band, prior screening history). ClearSight explicitly does not ingest raw retinal images, diagnoses or treatment plans, free-text clinical notes, or detailed demographic or identity data. By constraining data inputs early, the platform reduces both regulatory exposure and the blast radius of potential failures. This posture aligns with GDPR principles of data minimisation, purpose limitation, and storage limitation."
          },
          {
            name: "Pseudonymization & Identity Separation",
            description: "All patient-facing workflows operate on pseudonymized identifiers. ClearSight does not act as a system of record for patient identity. Where identity resolution is required (e.g. message delivery), it is handled via controlled interfaces with existing program infrastructure, rather than replicated inside the platform. This separation limits the amount of identifiable data stored, reduces accidental exposure through logs or analytics, and simplifies data retention and deletion."
          },
          {
            name: "Consent, Transparency & Opt-Out",
            description: "ClearSight assumes explicit patient consent as a prerequisite for participation. Patients are informed why they are receiving messages, can opt out at any time, and can complete follow-up without continued platform engagement. Opting out stops reminders immediately, does not block care, and does not require clinician intervention. This ensures that adherence support remains voluntary and proportionate."
          },
          {
            name: "Controller / Processor Clarity",
            description: "ClearSight is designed to operate as a data processor, not a data controller. Screening programs retain ownership of patient data, program operators configure workflows and retention policies, and ClearSight processes data strictly within those defined boundaries. This separation is important not only for GDPR alignment, but also for maintaining trust with public-sector operators and avoiding silent scope expansion."
          },
          {
            name: "Retention & Deletion Principles",
            description: "Data retention is limited by default and driven by purpose. Typical principles include: retaining patient-level data only as long as needed to support follow-up, aggregating and anonymizing data for longer-term reporting, and supporting deletion requests in line with program policies. ClearSight avoids indefinite storage of patient-linked data and does not repurpose data beyond adherence support."
          },
          {
            name: "Privacy as a Product Constraint",
            description: "Rather than treating privacy as a compliance checklist, ClearSight treats it as a design constraint that shapes system architecture. A formal Data Protection Impact Assessment (DPIA) would be required prior to pilot deployment. This posture influenced decisions such as avoiding free-text inputs, limiting personalization, preferring coarse risk tiers over granular scores, and prioritizing aggregate insights over individual tracking. These constraints reduce complexity, improve explainability, and make the system easier to operate responsibly at scale."
          }
        ]
      },
      {
        title: "Key Product Decisions",
        content: "ClearSight is intentionally shaped by a small number of high-impact product decisions made before full implementation. These decisions were driven less by feature ambition and more by risk management, system clarity, and long-term operability in a public healthcare context.\n\nRather than deferring difficult trade-offs, ClearSight treats early constraint-setting as a core product responsibility.",
        decisions: [
          {
            title: "Do Not Create Clinician Task Lists or Inboxes",
            decision: "ClearSight does not generate patient-level task lists, alerts, or inboxes for clinicians.",
            why: "In many screening programs, follow-up breakdowns are attributed to \"communication gaps,\" but introducing new clinician-facing tools often worsens the problem by adding parallel workflows. This risks:",
            whyBullets: [
              "Increasing clinician workload",
              "Fragmenting responsibility",
              "Creating implicit expectations that clinicians will manage follow-up within yet another system"
            ],
            tradeoffs: [
              "Reduced ability to intervene on individual cases",
              "Less perceived control at the clinician level"
            ],
            outcomes: [
              "No additional daily burden on clinicians",
              "Clear responsibility boundaries",
              "Higher likelihood of adoption within existing screening programs"
            ]
          },
          {
            title: "One Recommended Next Action per Patient",
            decision: "ClearSight presents a single primary next action for each patient, rather than multiple options or branching pathways.",
            why: "Patients receiving screening results are often uncertain, anxious, or unfamiliar with the healthcare system. Presenting multiple actions can increase cognitive load and decision paralysis. ClearSight prioritizes clarity over flexibility, adherence over optionality. The recommended action reflects the screening program's predefined workflow, not system-generated medical advice.",
            tradeoffs: [
              "Reduced personalization",
              "Fewer alternative pathways surfaced in-app"
            ],
            outcomes: [
              "Improved follow-up completion rates",
              "Lower patient confusion",
              "Simpler, more auditable patient flows"
            ]
          },
          {
            title: "Ingest Structured Outputs Only",
            decision: "ClearSight ingests only structured screening outputs and minimal contextual data.",
            why: "Allowing raw images, free-text notes, or diagnoses into the system would:",
            whyBullets: [
              "Significantly expand regulatory scope",
              "Increase data protection risk",
              "Blur the boundary between adherence support and clinical decision-making"
            ],
            tradeoffs: [
              "Loss of potentially rich clinical detail",
              "Reduced ability to fine-tune AI models using unstructured data"
            ],
            outcomes: [
              "Reduced regulatory exposure",
              "Easier integration with existing systems",
              "Clear, defensible system boundaries"
            ]
          },
          {
            title: "Population Metrics Over Individual Case Management",
            decision: "ClearSight prioritizes aggregated adherence metrics rather than individual patient tracking for program operators.",
            why: "Screening programs operate at scale. Their ability to improve outcomes depends on understanding where drop-off occurs, which cohorts are at higher risk, and which interventions are effective overall. Individual case management introduces operational complexity and responsibility shifts that ClearSight explicitly avoids.",
            tradeoffs: [
              "Less granularity for one-off interventions",
              "Reduced visibility into single-patient journeys"
            ],
            outcomes: [
              "Actionable insights at the program level",
              "Better support for policy and workflow adjustments",
              "Lower operational burden on staff"
            ]
          },
          {
            title: "Treat AI as Optional Infrastructure",
            decision: "ClearSight is designed to function fully even when AI components are unavailable or disabled.",
            why: "AI services introduce operational risk, dependency complexity, and procurement barriers in public-sector environments. Making AI optional reduces single points of failure, allows incremental adoption, and avoids positioning AI as a prerequisite for value. Fallback behavior is rule-based and program-defined.",
            tradeoffs: [
              "Slower optimization without AI",
              "Less dynamic reminder behavior in fallback mode"
            ],
            outcomes: [
              "Greater system resilience",
              "Easier pilot and rollout",
              "Clear separation between core functionality and optimization layers"
            ]
          },
          {
            title: "Avoid Early Optimization and Automation",
            decision: "ClearSight deliberately avoids early optimization of workflows, reminders, or AI models.",
            why: "Before optimizing, the system must be understandable, explainable, and behave predictably. Premature optimization risks locking in incorrect assumptions and increasing rollback costs in a regulated environment.",
            tradeoffs: [
              "Fewer \"smart\" behaviors early on",
              "Slower perceived innovation"
            ],
            outcomes: [
              "Safer iteration",
              "Easier auditing and adjustment",
              "Stronger foundation for future complexity"
            ]
          }
        ],
        closingNote: "Across all decisions, the guiding question was: \"Does this reduce ambiguity and risk, or does it quietly shift responsibility?\" When the answer was unclear, decisions consistently defaulted toward restraint.",
        noteImage: "/Reasoning Diagram for Decisions.webp"
      },
      {
        title: "Current Status & Progress",
        content: "ClearSight is an early-stage, design-led product initiative. At this stage, the focus has been on problem framing, scope definition, and risk reduction rather than feature completeness or rapid implementation.\n\nThis work was approached deliberately as a foundation-setting phase, recognizing that in a regulated healthcare context, early decisions around boundaries and responsibility have a disproportionate impact on long-term viability.",
        principles: [
          {
            name: "What Is Defined Today",
            description: "The following elements are intentionally locked before deeper implementation: problem scope and non-goals (ClearSight is explicitly positioned as a non-diagnostic, non-clinical, downstream adherence platform), user roles and responsibility boundaries (patients, screening program operators, and clinicians are clearly separated), data boundaries and privacy posture (structured inputs only, pseudonymization by default, explicit consent, and controller/processor clarity), AI scope and failure behavior (AI is constrained to risk stratification and optimization, with rule-based fallbacks and explainability built in), and high-level system flow (from screening output to patient action to aggregated outcome visibility). These decisions are treated as prerequisites for implementation, not artifacts to be retrofitted later."
          },
          {
            name: "What Exists in Practice",
            description: "At the time of writing, ClearSight consists of: a defined product scope and responsibility model, documented product decisions and constraints, drafted end-to-end system flows, initial technical architecture planning, and a structured case study capturing assumptions, trade-offs, and rationale. While user interfaces and production code are not yet complete, the core product intent and system behavior are sufficiently defined to support informed implementation and iteration."
          },
          {
            name: "What Is Intentionally Deferred",
            description: "Certain elements are deliberately postponed until the foundation proves sound: detailed UI design and interaction refinement, reminder optimization tuning and model training, performance metrics and outcome benchmarking, and integrations with live screening program infrastructure. Deferring these elements avoids premature optimization and reduces the cost of revisiting early assumptions."
          },
          {
            name: "How Progress Is Evaluated at This Stage",
            description: "Success at this stage is measured qualitatively rather than through delivery metrics. Key signals include: clarity of responsibility and system boundaries, internal consistency of decisions across product, data, and AI usage, ability to explain and defend trade-offs, and readiness for safe pilot implementation. This framing reflects the reality of early-stage work in regulated domains, where correctness and trust are prerequisites for scale."
          }
        ],
        closingNote: "At this stage, ClearSight is positioned to support a limited pilot focused on validating assumptions rather than demonstrating scale. This staging reflects feedback from stakeholders who emphasised the cost of revisiting responsibility and data decisions once systems are deployed."
      },
      {
        title: "What's Next",
        content: "Future work on ClearSight is intentionally framed around earned complexity, not feature expansion for its own sake. The next phase focuses on validating assumptions, testing system behavior in realistic conditions, and preparing for a safe pilot, rather than scaling functionality prematurely.",
        principles: [
          {
            name: "Near-Term Focus: Making the Core Real",
            description: "The immediate priority is to make the defined system concrete while preserving the boundaries established so far. This includes: prototyping the patient-facing flow from screening result to follow-up confirmation, validating that \"one recommended next action\" is understandable and actionable across different result categories, implementing the reminder system with rule-based logic before introducing optimization, and ensuring opt-out, fallback, and failure scenarios are fully supported from day one. The goal of this phase is not polish, but confidence: confirming that the core flow works without relying on AI or complex integrations."
          },
          {
            name: "Preparing for a Pilot Context",
            description: "ClearSight is designed to be piloted within an existing public screening program rather than launched as a standalone product. Preparation for such a pilot would include: defining minimal integration points with screening systems (structured outputs only), aligning reminder workflows with program-defined follow-up policies, validating consent, opt-out, and retention behavior with real operational constraints, and ensuring that aggregated adherence metrics answer questions program operators actually care about. This work prioritizes operational fit and trust over scale."
          },
          {
            name: "Introducing AI Incrementally",
            description: "AI-assisted capabilities are treated as optional enhancements, not prerequisites. Only after the core system proves stable would the next steps include: training and validating interpretable risk stratification models, introducing drop-off prediction to refine reminder timing, and monitoring AI behavior at an aggregate level to detect drift or unintended effects. AI would be introduced gradually, with clear rollback paths and rule-based fallbacks always available."
          },
          {
            name: "What Is Intentionally Out of Scope (For Now)",
            description: "Several areas are deliberately excluded from near-term plans: clinician-facing dashboards or task management, patient-level case management by program staff, free-text personalization or generative messaging, automated clinical escalation pathways, and deep integration with EHRs or imaging systems. These exclusions are treated as active decisions, not missing features. Each would materially change the responsibility and regulatory profile of the system."
          },
          {
            name: "Long-Term Direction (If Earned)",
            description: "If ClearSight proves valuable and operable in a pilot context, longer-term evolution could include: deeper population-level analytics to support program planning, cross-program benchmarking using fully anonymized data, and adaptation to adjacent screening programs with similar adherence challenges. Any such expansion would be driven by demonstrated need and institutional trust, not by product ambition alone."
          }
        ],
        closingNote: "ClearSight is intentionally built as a conservative system that earns complexity over time. Progress is measured not by how much the system does, but by how clearly responsibility is defined and how safely it operates in a real healthcare context. This approach reflects how high-impact systems are built in public and regulated environments — incrementally, transparently, and with restraint."
      },
      {
        title: "Technical Context",
        content: "This section provides high-level technical context for ClearSight. It is included to illustrate architectural intent and delivery considerations, not as an implementation specification.\n\nTechnology choices were guided by reliability, explainability, and compatibility with EU public-sector environments, rather than novelty or optimization.",
        principles: [
          {
            name: "System Architecture Overview",
            description: "ClearSight is designed as a modular, service-oriented system with clear separation between: patient-facing experience, program configuration and analytics, AI-assisted optimization, and external screening system integrations. This separation supports independent evolution of components, clear responsibility boundaries, and safer iteration in a regulated context."
          },
          {
            name: "Integration & Data Flow Considerations",
            description: "ClearSight is designed to integrate with national or regional screening systems via event-based ingestion of structured screening results. Key design considerations include: asynchronous ingestion of screening events rather than polling, idempotent processing to avoid duplicate reminders, upstream identity resolution with ClearSight operating on pseudonymized keys, and explicit rejection of unstructured or free-text payloads. The system is compatible with HL7 / FHIR-style payloads without requiring deep EHR integration."
          },
          {
            name: "Frontend",
            description: "React + TypeScript with clean, restrained UI design focused on clarity and accessibility over visual density. The frontend is intentionally thin: no complex client-side logic, no medical decision-making, and minimal state persistence. This reduces risk and simplifies auditing and testing."
          },
          {
            name: "Backend",
            description: "Node.js + TypeScript with REST-based APIs with explicit versioning and structured logging for operational visibility. Backend services are responsible for enforcing workflow rules, applying configuration defined by screening programs, coordinating reminder logic and confirmation events, and enforcing data minimization and access boundaries."
          },
          {
            name: "Reliability & Failure Handling",
            description: "ClearSight is designed to tolerate partial failures without blocking patient communication. Examples include: retryable message delivery failures, delayed or missing confirmation events, and temporary downstream outages. Reminder workflows are idempotent and resumable, and failure states are observable at an aggregate level for operational review."
          },
          {
            name: "Data Layer",
            description: "PostgreSQL with relational schema and strong data integrity constraints. The data model favors explicit relationships, minimal patient-linked data, and easy deletion and aggregation. ClearSight is intentionally not a document store or medical record repository."
          },
          {
            name: "AI / ML Service",
            description: "Separate Python service using FastAPI and scikit-learn with interpretable models only. AI services are loosely coupled, optional, and replaceable without affecting core workflows. This allows ClearSight to degrade gracefully and avoids hard dependencies on AI availability."
          },
          {
            name: "Infrastructure & Deployment",
            description: "Containerized using Docker with EU-based managed hosting, HTTPS everywhere, and environment separation (dev / test / prod). The system is designed to be deployable by public screening bodies, public–private partnerships, or managed service providers. No reliance on proprietary or opaque infrastructure components."
          }
        ],
        image: "/technical_context_diagram.webp",
        closingNote: "The stack was chosen to minimize operational risk, favor long-term maintainability, support auditability and explainability, and avoid lock-in and unnecessary complexity. The technology supports the product's constraints — not the other way around."
      }
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Python", "FastAPI", "scikit-learn", "Docker"]
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

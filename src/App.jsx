import { useState } from 'react'
import './App.css'
import { useScrollTracking, useSectionTracking, trackClick } from './useAnalytics'

function App() {
  const workExperiences = [
    {
      id: 'creatio-crm-po',
      role: 'CRM and marketing automation for a citizen cooperative in transition.',
      org: 'Product ownership and delivery',
      period: '2025–present',
      description: [
        'Product ownership for the implementation of Creatio Marketing/CRM for a citizen cooperative working on the food and biodiversity transition.',
        'I do this engagement pro bono (zero rate) to contribute to solving societal challenges.',
        'I translate goals into a practical backlog, align stakeholders, and help deliver a system that volunteers and small teams can actually run and evolve.',
      ],
      outcomes: [
        'Clear scope, priorities and roadmap for marketing/CRM enablement',
        'Incremental implementation with working software and documented processes',
        'A maintainable setup that supports volunteer-driven operations and handover',
      ],
      tech: ['Creatio', 'CRM', 'Marketing automation', 'Low-code', 'Process design', 'Data & integrations', 'Documentation'],
      context: { domain: 'Civic/impact', team: 'Citizen cooperative (lean team + volunteers)', waysOfWorking: 'Agile, step-by-step delivery with frequent feedback' },
    },
    {
      id: 'pwf-devsecops-2025',
      role: 'Security-critical trust services in a regulated notarial environment',
      org: 'DevSecOps engineering and operational delivery.',
      period: '2025–present',
      description: [
        'In a three-person delivery team we replaced existing contracts with multinational vendors by taking ownership of both software and platform delivery.',
        'We redesigned, simplified and re-implemented the software, migrated the infrastructure to the desired Kubernetes provider, and then ran and optimized the service for six months in production.',
        'The result: materially reduced operational complexity and significantly lower costs — without sacrificing reliability or security.',
      ],
      outcomes: [
        'Replaced multinational vendor contracts with an internal three-person delivery team',
        'Redesigned and re-implemented the service to reduce complexity and improve maintainability',
        'Migrated infrastructure to the target Kubernetes provider and stabilized production operations',
        'Operated and optimized the service for 6 months post-migration, reducing cost and complexity',
      ],
      tech: ['Kubernetes', 'Cloud/Kubernetes provider migration', 'CI/CD', 'Observability', 'DevSecOps', 'Security', 'Node.js'],
      context: { domain: 'Regulated IT', team: '3-person delivery team', waysOfWorking: 'Agile, incremental delivery with production ownership' },
    },
    {
      id: 'data-migration-2021',
      role: 'Large-scale data migration and integration in an international retail landscape.',
      org: 'Hands-on delivery and technical coordination.',
      period: '2021–present',
      description: [
        'A three-part engagement: (1) assessment and migration planning, (2) implementation of the approach and tooling, and (3) executing the migrations at scale.',
        'The program migrated ~5 million employee documents from multiple sources into a new HR DMS for an international retail organization. I assessed the involved countries and their document landscapes and designed a pragmatic, verifiable approach.',
        'After approval I implemented the approach as a Node.js migration pipeline, integrating DocShifter to convert documents to PDF. Using the delivered tooling and runbooks, I executed the migrations for 10 European countries.',
      ],
      outcomes: [
        'Assessment and approach designed across 10 European countries (international retail)',
        'Implemented a Node.js migration pipeline with DocShifter PDF conversion integration',
        'Delivered runbooks and repeatable tooling to execute migrations predictably and safely',
        'Executed migrations for ~5 million employee documents into the new HR DMS',
      ],
      tech: ['Node.js', 'DocShifter', 'Migration pipeline', 'ETL', 'Validation & reconciliation', 'Runbooks', 'HR DMS'],
      context: { domain: 'HR document management (international retail)', team: 'Lean team with high accountability', waysOfWorking: 'Iterative, checkpoint-driven delivery' },
    },

    {
      id: 'qts-po-2019',
      role: 'Qualified electronic signature services under eIDAS regulation.',
      org: 'End-to-end product ownership and delivery.',
      period: '2019–2023',
      description: [
        'We rebuilt a qualified certificate issuance service from the ground up because the solution that had evolved over the previous years was not certifiable against the ETSI standards under eIDAS. We deliberately threw it away and implemented a fit-for-purpose service designed to pass audit and operate reliably in production.',
        'My formal role was Product Owner, but the work was hybrid: I wrote software, produced the technical documentation set, and translated regulatory requirements into implementable designs and user stories.',
        'I designed, documented and executed the key ceremony, and then ran the service in production for ~6 months to stabilize and optimize operations before handover.',
      ],
      outcomes: [
        'Rebuilt a qualified certificate issuance service to be certifiable under eIDAS/ETSI (fit-for-purpose, audit-ready)',
        'Key ceremony designed, documented and executed; operational procedures and documentation brought to production standard',
        'Production ownership for ~6 months: operated and optimized the service, then handed it back to the organization',
        'Achieved certification outcomes in a relatively short timeframe: ISO 27001 and relevant ETSI standards under eIDAS',
        'Organization recognized as one of a small number of Dutch providers at the highest European qualification level for certificate issuance',
      ],
      tech: ['PKI', 'Qualified certificates', 'eIDAS', 'ETSI', 'Certificate issuance', 'Key ceremony', 'ISO 27001', 'Kubernetes', 'VMware', 'Technical writing'],
      context: { domain: 'Qualified trust services (notariat)', team: 'Lean team with partners + vendors', waysOfWorking: 'Agile, step-by-step delivery under regulatory constraints with auditability' },
    },
    {
      id: 'ciam-po-2023',
      role: 'Enterprise IAM platform within a global professional services firm.',
      org: 'Product ownership at scale.',
      period: '2023–2025',
      description: [
        'I took over ownership of an Okta CIAM implementation that had not been actively maintained for ~8 years and had been implemented as a “byproduct” — while still managing ~100,000 customer accounts.',
        'I assembled a three-person team and brought the service back under control: cleanup, documentation, operational hygiene and clear ownership.',
        'We “emancipated” the CIAM capability into a first-class platform and made it fit for use across all public apps of a global top-10 accountancy firm, then transferred it back to the organization for ongoing operations and development.',
      ],
      outcomes: [
        'Stabilized and modernized a neglected CIAM implementation while continuing to support ~100,000 managed accounts',
        'Established clear ownership, documentation and operational readiness for the platform',
        'Created a reusable CIAM platform suitable for all public-facing applications within a global top-10 accountancy firm',
        'Handover completed: cleaned up, documented and transferred back to the organization for long-term operation and evolution',
      ],
      tech: ['Okta', 'CIAM', 'SSO', 'OAuth/OIDC', 'APIs', 'IAM', 'Security', 'Technical writing'],
      context: { domain: 'Customer identity & access', team: '3-person team + multiple stakeholders', waysOfWorking: 'Agile, step-by-step delivery with room for learning' },
    },
    {
      id: 'shipping-architect-2023',
      role: 'Enterprise IT architecture in a globally operating gas tanker shipping company',
      org: 'Enterprise architect (pragmatic, project-embedded)',
      period: '2023–2024',
      description: [
        'Introduced architecture as a steering instrument in IT projects for a globally operating gas tanker shipping company (≈300 shore staff, ≈1,000 at sea). The IT department was compact and highly dependent on external capacity.',
        'The approach was pragmatic and incremental: I embedded as a project architect in ongoing initiatives to surface bottlenecks, dependencies and recurring non-functional requirements. I translated these learnings into practical architecture principles and guidelines without heavy governance overhead.',
        'A key issue was that infrastructure and application knowledge was implicit and concentrated in a small group. With high turnover and short-term external engagement, this reduced predictability in projects and planning.',
        'To address this, I established a central architecture description/repository to capture and make knowledge accessible for teams and new joiners. The engagement ended before architecture could be structurally embedded due to broader organizational constraints, but the delivered principles and documentation form a concrete base to build on.',
      ],
      outcomes: [
        'Architecture principles defined and adopted by management',
        'Pragmatic guidelines produced to steer future projects without heavy governance',
        'Central architecture repository created to make implicit system knowledge explicit and reusable',
        'Improved visibility of dependencies, constraints and recurring non-functional requirements across projects',
      ],
      tech: ['Architecture principles', 'Non-functional requirements', 'System documentation', 'Repository/knowledge base', 'Stakeholder alignment'],
      context: { domain: 'Maritime / shipping', team: 'Compact IT with external vendors/contractors', waysOfWorking: 'Pragmatic, incremental introduction of architecture' },
    },

    {
      id: 'cloudguide-2021',
      role: 'IAM and CIAM delivery for multiple end clients via a reseller model',
      org: 'IAM/CIAM consultant & implementer',
      period: '2021–present',
      description: [
        'Consultancy and implementation work for an Okta reseller, delivering Okta IAM/CIAM solutions for end clients.',
        'Typical work includes integration design (SSO, OAuth/OIDC), tenant configuration, automation, and making the setup operable with clear governance and onboarding.',
        'The focus is not just “go-live”, but a handover-ready implementation with documentation and a delivery approach that client teams can sustain.',
      ],
      outcomes: [
        'Okta IAM/CIAM implementations delivered for multiple end clients via a reseller',
        'Working integrations (SSO / OAuth/OIDC) with repeatable configuration patterns',
        'Clear governance, onboarding and operational handover for client teams',
      ],
      tech: ['Okta', 'IAM', 'CIAM', 'SSO', 'OAuth/OIDC', 'Automation', 'Documentation'],
      context: { domain: 'Identity & access management', team: 'Reseller + client delivery teams', waysOfWorking: 'Incremental rollout with clear handover' },
    },

    {
      id: 'info-arch-2019',
      role: 'Information architecture in the Dutch public sector under Common Ground principles',
      org: 'Information architect',
      period: '2019–2020',
      description: [
        'Information architect for VNG Realisatie, Gemeente Delft and BIJ12, focused on the Dutch Common Ground principles: making data and application landscapes modern, modular and adaptable.',
        'A key part of the work was getting design values and architecture principles adopted across stakeholders — translating abstract “Common Ground” ideas into practical choices teams could apply in projects.',
      ],
      outcomes: [
        'Shared design values and architecture principles adopted by stakeholders (Common Ground aligned)',
        'Pragmatic guidance to modernize and modularize the data/application landscape',
        'Documentation and decision support that teams could reuse across initiatives',
      ],
      tech: ['Common Ground', 'Architecture principles', 'Information architecture', 'Data landscape', 'Governance', 'Documentation'],
      context: { domain: 'Public sector (Common Ground)', team: 'Business + IT stakeholders', waysOfWorking: 'Iterative discovery and alignment' },
    },

    {
      id: 'contezza-owner-2008',
      role: 'Founding and growing a boutique consultancy into an implementation-focused software company',
      org: 'Founder & delivery lead',
      period: '2008–2019',
      description: [
        'I founded Contezza as a small boutique consultancy and grew it into an implementation and software development company of ~15 people.',
        'Over time I deliberately chose content and personal agility over management: I handed day-to-day management over to my two business partners so I could stay close to delivery and keep my own flexibility.',
      ],
      outcomes: [
        'Grew a boutique consultancy into a ~15-person implementation and software development firm',
        'Delivered end-to-end implementations across multiple client contexts',
        'Leadership handover: management transferred to partners to stay delivery-focused and agile',
      ],
      tech: ['Consulting', 'Delivery', 'Implementation', 'Software development', 'Stakeholder management'],
      context: { domain: 'Multiple', team: 'Founder-led team growing to ~15', waysOfWorking: 'Pragmatic, step-by-step delivery' },
    },

    {
      id: 'afm-info-2004',
      role: 'Information management in a regulated financial supervision environment',
      org: 'Information specialist',
      period: '2004–2008',
      description: [
        'I worked at the AFM during the period when new supervisory responsibilities were assigned by the Dutch government. I helped implement these new tasks from an information management perspective: making intake, processing and retrieval of evidence predictable and auditable.',
        'I implemented OpenText Livelink to support the new workflows, and helped digitize and classify incoming physical documents using Kofax.',
        'For a period I was also responsible for the data warehouse built on Business Objects, supporting reporting and management information needs.',
      ],
      outcomes: [
        'Implemented information management capabilities to support new supervisory responsibilities (audit-ready workflows)',
        'OpenText Livelink implementation and adoption for case- and document-centric work',
        'Digitization and classification flow implemented for incoming physical documents (Kofax)',
        'Data warehouse responsibility (Business Objects) to support reporting and management information',
      ],
      tech: ['OpenText Livelink', 'Kofax', 'Business Objects', 'Information management', 'Governance', 'Compliance'],
      context: { domain: 'Financial supervision & regulation', team: 'Business + IT', waysOfWorking: 'Pragmatic implementation and adoption' },
    },

    {
      id: 'siennax-impl-1999',
      role: 'Enterprise software implementations in a startup and scale-up context',
      org: 'Implementation consultant & project lead',
      period: '1999–2004',
      description: [
        'I joined startup Siennax as an implementation consultant and grew into a project manager / project lead role.',
        'I was the “oil in the machine”: connecting sales, delivery and operations, filling gaps, removing blockers, and making implementations succeed end-to-end.',
        'Over time I deliberately chose content over a further management track, which led to my next step: moving to the AFM as an information manager in a regulated environment.',
      ],
      outcomes: [
        'Grew from implementation consultant to project manager in a startup environment',
        'Delivered end-to-end implementations with clear handover and pragmatic stakeholder alignment',
        'Built a reputation for making complex delivery predictable by bridging functions and closing gaps',
      ],
      tech: ['Implementation', 'Project management', 'Stakeholder management', 'Delivery'],
      context: { domain: 'Enterprise implementations', team: 'Startup project teams', waysOfWorking: 'Hands-on, structured delivery' },
    }

  ]

  const educationItems = [
    {
      id: 'mis-change-2018',
      program: 'Managing Information and Sustainable Change',
      institution: 'Postgraduate program',
      period: '2018–2020',
      description: [
        'This program equipped participants with frameworks and tools for operating in the modern VUCA world, where rapid change and systemic complexity challenge traditional approaches.',
        'The curriculum focused on how to make sense of complexity, navigate uncertainty, and apply strategic thinking and adaptive approaches to real-world organisational and information challenges.',
      ],
      skills: ['Information management', 'Organizational change', 'Operating models', 'Stakeholder alignment', 'Transformation'],
    },
    {
      id: 'scs-1995',
      program: 'School for Communication Systems',
      institution: 'Faculty of Communication and Journalism',
      period: '1995–2000',
      description: [
        'This program emerged in the mid-1990s as a response to the one-sided, technology-centric approach of traditional computer science programs.',
        'Positioned within the faculty of Communication and Journalism, it emphasized information systems as socio-technical constructs: technology embedded in organizations, processes, and human communication.',
        'In hindsight, it closely aligns with what later became Business Information Systems.',
      ],
      skills: ['Business information systems', 'Socio-technical systems', 'Process thinking', 'Organizational context', 'Communication & IT'],
    },
    {
      id: 'cert-architecture',
      program: 'Architecture & design',
      institution: 'Certifications',
      period: '',
      description: [
        'TOGAF® 9 Certified — Certification focused on enterprise architecture as a decision-making and steering discipline. Emphasizes translating strategy into executable structures, governance, and change — rather than producing theoretical models.',
        'ArchiMate® 3 Practitioner — Advanced modeling of enterprise architecture across business, application, and technology layers. Used to make dependencies, trade-offs, and impact of change explicit and communicable.',
        'Platform Design Toolkit (PDT) — Certified Professional — Framework for designing platforms and ecosystems as socio-technical systems. Focuses on roles, interactions, incentives, and governance — beyond purely technical architecture.',
      ],
      skills: ['TOGAF® 9 Certified', 'ArchiMate® 3 Practitioner', 'Platform Design Toolkit (PDT) — Certified Professional'],
    },
    {
      id: 'cert-product-agile',
      program: 'Product & agile delivery',
      institution: 'Certifications',
      period: '',
      description: [
        'Professional Scrum Product Owner I (PSPO I) — Formal grounding in product ownership: value-driven backlog management, stakeholder alignment, and decision-making under uncertainty.',
        'Professional Scrum Master I (PSM I) — Understanding of Scrum as a lightweight framework for learning and delivery, with emphasis on collaboration, transparency, and continuous improvement — not dogma.',
      ],
      skills: ['Professional Scrum Product Owner I (PSPO I)', 'Professional Scrum Master I (PSM I)'],
    },
    {
      id: 'cert-identity-okta',
      program: 'Identity, security & SaaS platforms',
      institution: 'Certifications',
      period: '',
      description: [
        'Okta Certified Professional — Foundational knowledge of Okta identity services, core concepts, and platform capabilities in real-world IAM and CIAM scenarios.',
        'Okta Certified Consultant — Design and implementation of Okta solutions in client environments, including integration patterns, governance, and handover to operational teams.',
        'Okta Certified Administrator — Operational management of Okta tenants: configuration, lifecycle management, access control, and day-to-day administration.',
        'Okta Certified Developer — Custom integrations and extensions using Okta APIs and standards such as OAuth 2.0 and OpenID Connect.',
      ],
      skills: ['Okta Certified Professional', 'Okta Certified Consultant', 'Okta Certified Administrator', 'Okta Certified Developer'],
    },
    {
      id: 'cert-box',
      program: 'Content & collaboration platforms',
      institution: 'Certifications',
      period: '2019',
      description: [
        'Box Certified Professional (2019) — Design and implementation of secure content collaboration solutions, with attention to governance, compliance, and integration into enterprise workflows.',
      ],
      skills: ['Box Certified Professional'],
    },
  ]

  const [openExperienceId, setOpenExperienceId] = useState(null)
  const [openEducationId, setOpenEducationId] = useState(null)

  useScrollTracking()
  useSectionTracking(['profile', 'diensten', 'werkwijze', 'ervaring', 'security', 'contact'])

  const chipCategory = (label) => {
    const t = String(label || '').toLowerCase()

    const techTokens = [
      'javascript',
      'node',
      'react',
      'typescript',
      'devops',
      'gitops',
      'kubernetes',
      'docker',
      'terraform',
      'ci/cd',
      'cloud',
      'infrastructure',
      'vmware',
      'okta',
      'oauth',
      'openid',
      'oidc',
      'api',
      'iam',
      'ciam',
    ]

    const peopleTokens = [
      'stakeholder',
      'alignment',
      'communication',
      'facilitation',
      'leadership',
      'coaching',
      'change',
      'organization',
      'organisational',
      'process',
      'agile',
      'scrum',
      'product',
      'workshop',
      'delivery',
    ]

    const govTokens = ['architecture', 'governance', 'strategy', 'compliance', 'operating model', 'togaf', 'archimate', 'risk', 'policy']

    if (techTokens.some((k) => t.includes(k))) return 'tech'
    if (peopleTokens.some((k) => t.includes(k))) return 'people'
    if (govTokens.some((k) => t.includes(k))) return 'gov'

    return 'gov'
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="brand" href="#top" aria-label="Goodgrid">
            <img className="brandLogo" src="/embleem.png" alt="Goodgrid" />
            <span className="brandName">goodgrid</span>
          </a>

          <nav className="nav" aria-label="Primary navigation">
            <a className="navLink" href="#profile">Profile</a>
            <a className="navLink" href="#diensten">Services</a>
            <a className="navLink" href="#werkwijze">How I work</a>
            <a className="navLink" href="#ervaring">Experience</a>
            <a className="navLink" href="#security">Security</a>
            <a className="navLink" href="#contact">Contact</a>
          </nav>

          <a className="btn btnPrimary" href="#contact" data-umami-event="nav-cta-click">Book an intro call</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <img className="heroLogo" src="/logo.png" alt="Goodgrid" />
              <div className="eyebrow">Strategy to execution</div>
              <h1>From strategy to production-grade IT, without building a big team.</h1>
              <p className="lead">
                Technical, pragmatic and outcome-driven. I help teams move from plans to production, with systems that hold up in practice.
              </p>

              <p className="forWho">Best fit for small teams that need senior delivery capability without hiring a full team.</p>

              <div className="heroCtas">
                <a className="btn btnPrimary" href="#contact" data-umami-event="hero-cta-primary">Book a short intro</a>
                <a className="btn btnGhost" href="#diensten" data-umami-event="hero-cta-secondary">View services</a>
              </div>
            </div>

            <aside className="heroAside" aria-label="How I can help">
              <div className="card photoCard" aria-label="Photo">
                <div className="photoFrame photoFramePortrait">
                  <img
                    className="photoImg photoImgPortrait"
                    src="/cntz101.jpg"
                    alt="Koen Bonnet"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="photoCaption">
                  <div className="cardTitle">Koen Bonnet</div>
                  <div className="cardText">Freelancer · strategy → execution · remote-first</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="profile" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>Profile</h2>
              <p className="muted">Result-oriented designer and IT architect. I turn goals into designs and designs into implemented solutions.</p>
            </div>

            <div className="grid2">
              <div className="card">
                <div className="cardTitle">What you get</div>
                <p className="cardText">
                  I learn new domains quickly, empathize with stakeholders and make sense of complexity. I think in structures — and I can
                  spot structure in chaos. I’m strong with words and can communicate ideas clearly through explanation and documentation.
                </p>
              </div>

              <div className="card">
                <div className="cardTitle">How I manage my own pitfalls</div>
                <p className="cardText">
                  I’m not great at sitting on my hands. I’m impatient with slow or dysfunctional processes and can be tempted to jump in and
                  do the work myself. To avoid losing the bigger picture, I work with clear priorities, small increments and explicit
                  handover moments.
                </p>
              </div>
            </div>

            <div className="grid2" style={{ marginTop: 14 }}>
              <div className="card">
                <div className="cardTitle">Working style</div>
                <p className="cardText">
                  I’m not a perfectionist and don’t expect perfection from teams — I do expect commitment and accuracy. I prefer moving in
                  small steps through concepts, prototypes, MVPs and phased delivery. I don’t believe in designing everything up front; I
                  believe in learning while building.
                </p>
              </div>

              <div className="card">
                <div className="cardTitle">Roles I thrive in</div>
                <p className="cardText">
                  Integration / information / systems architect, business analyst and product owner. I also enjoy hands-on engineering,
                  especially backend and integration development (Node.js).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="diensten" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>Services</h2>
              <p className="muted">
                One person, multiple roles. Ideal when you’re too small for a large team, but still want mature IT delivery.
              </p>
            </div>

            <div className="grid3">
              <div className="card">
                <div className="badge badgeCyan">Strategy → plan → delivery</div>
                <div className="cardTitle">From direction to shipped outcomes</div>
                <p className="cardText">
                  I translate goals into an executable plan: scope, roadmap, risks, dependencies, and a delivery cadence that
                  actually works.
                </p>
              </div>

              <div className="card">
                <div className="badge badgePink">Architecture & product</div>
                <div className="cardTitle">Design what works, build what’s needed</div>
                <p className="cardText">
                  Practical architecture and product ownership: clear boundaries, integrations, data modeling and choices that
                  remain maintainable.
                </p>
              </div>

              <div className="card">
                <div className="badge badgeAmber">DevOps & operations</div>
                <div className="cardTitle">Reliable in production</div>
                <p className="cardText">
                  CI/CD, Kubernetes, GitOps, monitoring and incident processes. I implement it and hand it over to your
                  (new) team when the time is right.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid2">
              <div className="card cardStrong">
                <div className="cardTitle">Typical engagements</div>
                <div className="list">
                  <div className="listItem">
                    <div className="listKey">Build an operating model</div>
                    <div className="listVal">Processes, tooling and a line organization that’s transferable.</div>
                  </div>
                  <div className="listItem">
                    <div className="listKey">Product & platform</div>
                    <div className="listVal">From roadmap to implementation and operations.</div>
                  </div>
                  <div className="listItem">
                    <div className="listKey">Accelerate DevOps</div>
                    <div className="listVal">Kubernetes, GitOps, CI/CD and observability.</div>
                  </div>
                  <div className="listItem">
                    <div className="listKey">Compliance-ready delivery</div>
                    <div className="listVal">Security, privacy, audits and certifications.</div>
                  </div>
                </div>
              </div>

              <div className="card photoCard" aria-label="In-context photo">
                <div className="photoFrame photoFrameWide photoFrameHover" aria-label="Last time in an office">
                  <img
                    className="photoImg"
                    src="/IMG_0838.jpeg"
                    alt="In context"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="photoOverlay" aria-hidden="true">Last time I worked in an office (2011) 😂</div>
                </div>
                <div className="photoCaption">
                  <div className="cardTitle">Practical & outcome-driven</div>
                  <div className="cardText">Less talk, more delivery. I ship, document, and hand over.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>How I work</h2>
              <p className="muted">Agile and framework-agnostic: we deliver step by step, leaving room for learning and changing insights. I work independently, with access to a small, trusted network of senior freelancers when additional capacity or expertise is required.</p>
            </div>

            <div className="grid2">
              <div className="card">
                <div className="stepHeader">
                  <div className="stepNum">1</div>
                  <div className="cardTitle">Discover</div>
                </div>
                <p className="cardText">
                  Understand the real problem: stakeholders, constraints, risks and the current system. Map what matters and what doesn’t.
                </p>
              </div>
              <div className="card">
                <div className="stepHeader">
                  <div className="stepNum">2</div>
                  <div className="cardTitle">Define</div>
                </div>
                <p className="cardText">
                  Turn insight into direction: a clear problem statement, success metrics, scope boundaries, and a delivery plan.
                </p>
              </div>
              <div className="card">
                <div className="stepHeader">
                  <div className="stepNum">3</div>
                  <div className="cardTitle">Develop</div>
                </div>
                <p className="cardText">
                  Explore solution options and validate fast. Prototype where useful, then implement in small, working increments.
                </p>
              </div>
              <div className="card">
                <div className="stepHeader">
                  <div className="stepNum">4</div>
                  <div className="cardTitle">Deliver</div>
                </div>
                <p className="cardText">
                  Production-grade outcomes: ship, operate, document, and transfer. You end up with a system your team can run and evolve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ervaring" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>Experience</h2>
              <p className="muted">A selection of roles and engagements across early-stage and scaling companies.</p>
            </div>

            <div className="experienceGrid">
              <div className="card">
                <div className="cardTitle">Work experience</div>
                <div className="experienceAccordion" role="list">
                  {workExperiences.map((exp) => {
                    const isOpen = openExperienceId === exp.id

                    return (
                      <div className="experienceItem" role="listitem" key={exp.id}>
                        <button
                          className="experienceSummary"
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => {
                          const willOpen = openExperienceId !== exp.id
                          if (willOpen) trackClick('experience-expand', { id: exp.id })
                          setOpenExperienceId((cur) => (cur === exp.id ? null : exp.id))
                        }}
                        >
                          <div className="experienceSummaryText">
                            <div className="experienceHeadline">{exp.role}</div>
                            <div className="experienceSubline">
                              <div className="experienceOrg">{exp.org}</div>
                              <div className="experienceMeta">{exp.period}</div>
                            </div>
                          </div>
                          <div className="experienceChevron" aria-hidden="true">▾</div>
                        </button>

                        {isOpen ? (
                          <div className="experiencePanel">
                            <div className="experiencePanelGrid">
                              <div className="experienceMain">
                                <div className="experienceSection">
                                  <div className="experienceSectionTitle">Overview</div>
                                  <div className="experienceParagraphs">
                                    {exp.description.map((p, idx) => (
                                      <p className="experienceParagraph" key={`${exp.id}-p-${idx}`}>{p}</p>
                                    ))}
                                  </div>
                                </div>

                                <div className="experienceSection">
                                  <div className="experienceSectionTitle">Outcomes</div>
                                  <div className="experienceHighlights">
                                    {exp.outcomes.map((h, idx) => (
                                      <div className="experienceHighlight" key={`${exp.id}-o-${idx}`}>{h}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <aside className="experienceSide" aria-label="Experience details">
                                <div className="experienceSection">
                                  <div className="experienceSectionTitle">Tech stack</div>
                                  <div className="techChips">
                                    {exp.tech.map((t, idx) => (
                                      <span className="techChip" data-cat={chipCategory(t)} key={`${exp.id}-t-${idx}`}>{t}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="experienceSection">
                                  <div className="experienceSectionTitle">Context</div>
                                  <div className="experienceKv">
                                    <div className="experienceKvRow">
                                      <div className="experienceKvKey">Domain</div>
                                      <div className="experienceKvVal">{exp.context.domain}</div>
                                    </div>
                                    <div className="experienceKvRow">
                                      <div className="experienceKvKey">Team</div>
                                      <div className="experienceKvVal">{exp.context.team}</div>
                                    </div>
                                    <div className="experienceKvRow">
                                      <div className="experienceKvKey">Way of working</div>
                                      <div className="experienceKvVal">{exp.context.waysOfWorking}</div>
                                    </div>
                                  </div>
                                </div>
                              </aside>
                            </div>

                            <div className="experienceNote"></div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">Education & training</div>
                <div className="experienceAccordion" role="list">
                  {educationItems.map((edu) => {
                    const isOpen = openEducationId === edu.id

                    return (
                      <div className={`experienceItem ${isOpen ? 'isOpen' : ''}`} key={edu.id} role="listitem">
                        <button
                          className="experienceSummary"
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => {
                          const willOpen = openEducationId !== edu.id
                          if (willOpen) trackClick('education-expand', { id: edu.id })
                          setOpenEducationId((prev) => (prev === edu.id ? null : edu.id))
                        }}
                        >
                          <div className="experienceSummaryText">
                            <div className="experienceHeadline">{edu.program}</div>
                            <div className="experienceSubline">
                              <div className="experienceOrg">{edu.institution}</div>
                              {edu.period ? <div className="experienceMeta">{edu.period}</div> : null}
                            </div>
                          </div>
                          <div className="experienceChevron" aria-hidden="true">▾</div>
                        </button>

                        {isOpen ? (
                          <div className="experiencePanel">
                            <div className="experiencePanelGrid">
                              <div className="experienceSection">
                                <div className="experienceSectionTitle">Summary</div>
                                <div className="experienceParagraphs">
                                  {edu.description.map((p, idx) => (
                                    <p className="experienceParagraph" key={`${edu.id}-p-${idx}`}>{p}</p>
                                  ))}
                                </div>
                              </div>

                              <aside className="experienceAside">
                                <div className="experienceSection">
                                  <div className="experienceSectionTitle">Skills</div>
                                  <div className="techChips">
                                    {edu.skills.map((t, idx) => (
                                      <span className="techChip" data-cat={chipCategory(t)} key={`${edu.id}-s-${idx}`}>{t}</span>
                                    ))}
                                  </div>
                                </div>
                              </aside>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>

                <div className="note" style={{ marginTop: 14 }}>
                  <div className="noteTitle">Focus</div>
                  <div className="noteText">Architecture, product ownership, hands-on delivery, and operating models in regulated environments.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>Security, privacy & compliance</h2>
              <p className="muted">
                Experience in environments where audits and evidence matter, including contributions to complex infosec
                certifications.
              </p>
            </div>

            <div className="grid3">
              <div className="card">
                <div className="cardTitle">Evidence</div>
                <p className="cardText">Controls, logging, change management and documentation auditors can follow.</p>
              </div>
              <div className="card">
                <div className="cardTitle">Secure by design</div>
                <p className="cardText">Threat modeling, least privilege, secrets management and hardening.</p>
              </div>
              <div className="card">
                <div className="cardTitle">Practical implementation</div>
                <p className="cardText">No paper tigers: what we agree on gets built and embedded.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="cta">
              <div className="ctaCopy">
                <h2>Is this a fit?</h2>
                <p className="muted">
                  If you want to level up your IT delivery quickly with a small budget and minimal overhead, I can help.
                  Send me your context and goal and we’ll schedule a short intro.
                </p>
              </div>
              <div className="ctaActions">
                <a className="btn btnPrimary" href="mailto:info@goodgrid.nl?subject=Intro%20call%20goodgrid" data-umami-event="contact-email-click">Email for an intro</a>
                <a className="btn btnGhost" href="#diensten" data-umami-event="contact-services-click">Read services first</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerBrand">
            <img className="footerLogo" src="/embleem.png" alt="Goodgrid" />
            <div>
              <div className="footerName">goodgrid</div>
              <div className="footerTag">Freelance strategy to execution</div>
            </div>
          </div>
          <div className="footerLinks">
            <a className="footerLink" href="#top">Back to top</a>
            <a className="footerLink" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

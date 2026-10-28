import { useState } from 'react'
import './App.css'
import { useScrollTracking, useSectionTracking, trackClick } from './useAnalytics'
import CV from './CV'

import site from './config/site.json'
import heroContent from './config/content/hero.json'
import profileContent from './config/content/profile.json'
import servicesContent from './config/content/services.json'
import howIWorkContent from './config/content/howIWork.json'
import experienceContent from './config/content/experience.json'
import securityContent from './config/content/security.json'
import contactContent from './config/content/contact.json'
import workExperiences from './config/content/workExperiences.json'
import educationItems from './config/content/education.json'

function App() {
  const [openExperienceId, setOpenExperienceId] = useState(null)
  const [openEducationId, setOpenEducationId] = useState(null)
  const [showCV, setShowCV] = useState(false)

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

  if (showCV) {
    return (
      <CV
        workExperiences={workExperiences}
        educationItems={educationItems}
        onBack={() => setShowCV(false)}
      />
    )
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
              <img className="heroLogo" src="/logo.png" alt={site.siteName} />
              <div className="eyebrow">{heroContent.eyebrow}</div>
              <h1>{heroContent.headline}</h1>
              <p className="lead">{heroContent.lead}</p>

              <p className="forWho">{heroContent.forWho}</p>

              <div className="heroCtas">
                <a className="btn btnPrimary" href="#contact" data-umami-event="hero-cta-primary">{heroContent.cta.primary}</a>
                <a className="btn btnGhost" href="#diensten" data-umami-event="hero-cta-secondary">{heroContent.cta.secondary}</a>
                <button className="btn btnGhost" onClick={() => { trackClick('show-cv'); setShowCV(true) }}>{heroContent.cta.cv}</button>
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
                  <div className="cardTitle">{heroContent.photoCaption.title}</div>
                  <div className="cardText">{heroContent.photoCaption.subtitle}</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="profile" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>{profileContent.title}</h2>
              <p className="muted">{profileContent.subtitle}</p>
            </div>

            <div className="grid2">
              {profileContent.cards.slice(0, 2).map((card, idx) => (
                <div className="card" key={idx}>
                  <div className="cardTitle">{card.title}</div>
                  <p className="cardText">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="grid2" style={{ marginTop: 14 }}>
              {profileContent.cards.slice(2, 4).map((card, idx) => (
                <div className="card" key={idx}>
                  <div className="cardTitle">{card.title}</div>
                  <p className="cardText">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="diensten" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>{servicesContent.title}</h2>
              <p className="muted">{servicesContent.subtitle}</p>
            </div>

            <div className="grid3">
              {servicesContent.offerings.map((offering, idx) => (
                <div className="card" key={idx}>
                  <div className={`badge badge${offering.badgeColor.charAt(0).toUpperCase() + offering.badgeColor.slice(1)}`}>{offering.badge}</div>
                  <div className="cardTitle">{offering.title}</div>
                  <p className="cardText">{offering.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid2">
              <div className="card cardStrong">
                <div className="cardTitle">Typical engagements</div>
                <div className="list">
                  {servicesContent.engagements.map((engagement, idx) => (
                    <div className="listItem" key={idx}>
                      <div className="listKey">{engagement.title}</div>
                      <div className="listVal">{engagement.text}</div>
                    </div>
                  ))}
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
                  <div className="photoOverlay" aria-hidden="true">{servicesContent.photoCaption.overlay}</div>
                </div>
                <div className="photoCaption">
                  <div className="cardTitle">{servicesContent.photoCaption.title}</div>
                  <div className="cardText">{servicesContent.photoCaption.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="werkwijze" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>{howIWorkContent.title}</h2>
              <p className="muted">{howIWorkContent.subtitle}</p>
            </div>

            <div className="grid2">
              {howIWorkContent.steps.map((step) => (
                <div className="card" key={step.number}>
                  <div className="stepHeader">
                    <div className="stepNum">{step.number}</div>
                    <div className="cardTitle">{step.title}</div>
                  </div>
                  <p className="cardText">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ervaring" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>{experienceContent.title}</h2>
              <p className="muted">{experienceContent.subtitle}</p>
            </div>

            <div className="experienceGrid">
              <div className="card">
                <div className="cardTitle">{experienceContent.workTitle}</div>
                <div className="experienceAccordion" role="list">
                  {workExperiences.map((exp) => {
                    const isOpen = openExperienceId === exp.id

                    return (
                      <div className={`experienceItem ${isOpen ? 'isOpen' : ''}`} role="listitem" key={exp.id}>
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
                              <div className="experienceOrg">{exp.title}</div>
                              <div className="experienceMeta">{exp.period}</div>
                            </div>
                          </div>
                          <div className="experienceChevron" aria-hidden="true">▾</div>
                        </button>

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
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card">
                <div className="cardTitle">{experienceContent.educationTitle}</div>
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
                      </div>
                    )
                  })}
                </div>

                <div className="note" style={{ marginTop: 14 }}>
                  <div className="noteTitle">{experienceContent.focusNote.title}</div>
                  <div className="noteText">{experienceContent.focusNote.text}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>{securityContent.title}</h2>
              <p className="muted">{securityContent.subtitle}</p>
            </div>

            <div className="grid3">
              {securityContent.cards.map((card, idx) => (
                <div className="card" key={idx}>
                  <div className="cardTitle">{card.title}</div>
                  <p className="cardText">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="ctaRow">
              <div className="cta">
                <div className="ctaCopy">
                  <h2>{contactContent.title}</h2>
                  <p className="muted">{contactContent.text}</p>
                </div>
                <div className="ctaActions">
                  <a className="btn btnPrimary" href={`mailto:${site.email}?subject=Intro%20call%20${site.siteName}`} data-umami-event="contact-email-click">{contactContent.cta.primary}</a>
                  <a className="btn btnGhost" href="#diensten" data-umami-event="contact-services-click">{contactContent.cta.secondary}</a>
                </div>
              </div>
              <div className="collectiveBadge">
                <span className="collectiveLabel">{contactContent.collectiveLabel}</span>
                <a href={site.collective.url} target="_blank" rel="noopener noreferrer" className="collectiveLogoLink" data-umami-event="nexustrust-click">
                  <img src={site.collective.logo} alt={site.collective.name} className="collectiveLogo" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <div className="footerBrand">
            <img className="footerLogo" src="/embleem.png" alt={site.siteName} />
            <div>
              <div className="footerName">{site.siteName}</div>
              <div className="footerTag">Freelance {heroContent.eyebrow.toLowerCase()}</div>
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

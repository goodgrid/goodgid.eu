import { useEffect } from 'react'
import './CV.css'
import { trackClick } from './useAnalytics'
import site from './config/site.json'
import profileContent from './config/content/profile.json'

function CV({ workExperiences, educationItems, onBack }) {
  useEffect(() => {
    const handleBeforePrint = () => {
      trackClick('print')
    }
    window.addEventListener('beforeprint', handleBeforePrint)
    return () => window.removeEventListener('beforeprint', handleBeforePrint)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="cvPage">
      <div className="cvActions noPrint">
        <button className="btn btnGhost" onClick={onBack}>← Back to website</button>
        <button className="btn btnPrimary" onClick={handlePrint}>Download / Print PDF</button>
      </div>

      <div className="cvDocument">
        <header className="cvHeader">
          <div className="cvHeaderMain">
            <h1 className="cvName">{site.owner.name}</h1>
            <p className="cvTitle">{site.owner.title}</p>
            <p className="cvTagline">{site.owner.tagline}</p>
          </div>
          <div className="cvContact">
            <div className="cvContactItem">{site.email}</div>
            <div className="cvContactItem">{site.domain}</div>
            <div className="cvContactItem">{site.location}</div>
          </div>
        </header>

        <section className="cvSection">
          <h2 className="cvSectionTitle">Profile</h2>
          <p className="cvText">{profileContent.cards[0].text}</p>
          <p className="cvText">{profileContent.cards[3].text}</p>
        </section>

        <section className="cvSection">
          <h2 className="cvSectionTitle">Work Experience</h2>
          {workExperiences.map((exp) => (
            <div className="cvExperience" key={exp.id}>
              <div className="cvExpHeader">
                <div className="cvExpRole">{exp.role}</div>
                <div className="cvExpPeriod">{exp.period}</div>
              </div>
              <div className="cvExpOrg">{exp.org}</div>
              <div className="cvExpDescription">
                {exp.description.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="cvExpOutcomes">
                <strong>Key outcomes:</strong>
                <ul>
                  {exp.outcomes.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>
              <div className="cvExpTech">
                <strong>Tech:</strong> {exp.tech.join(' · ')}
              </div>
            </div>
          ))}
        </section>

        <section className="cvSection">
          <h2 className="cvSectionTitle">Education & Certifications</h2>
          {educationItems.map((edu) => (
            <div className="cvEducation" key={edu.id}>
              <div className="cvEduHeader">
                <div className="cvEduProgram">{edu.program}</div>
                {edu.period && <div className="cvEduPeriod">{edu.period}</div>}
              </div>
              <div className="cvEduInstitution">{edu.institution}</div>
              <div className="cvEduDescription">
                {edu.description.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="cvSection">
          <h2 className="cvSectionTitle">Core Competencies</h2>
          <div className="cvCompetencies">
            <div className="cvCompetencyGroup">
              <h3>Architecture & Design</h3>
              <p>Enterprise architecture, systems design, integration architecture, information architecture, TOGAF, ArchiMate</p>
            </div>
            <div className="cvCompetencyGroup">
              <h3>Product & Delivery</h3>
              <p>Product ownership, backlog management, stakeholder alignment, agile delivery, Scrum</p>
            </div>
            <div className="cvCompetencyGroup">
              <h3>Technology</h3>
              <p>Node.js, Kubernetes, DevSecOps, CI/CD, Okta/IAM, API design, cloud infrastructure</p>
            </div>
          </div>
        </section>

        <footer className="cvFooter">
          <div className="cvFooterText">
            <strong>{site.siteName}</strong> · {site.owner.title} · {site.email} · {site.domain}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CV

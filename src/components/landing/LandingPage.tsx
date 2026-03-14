import Image from "next/image";

import { LeadForm } from "@/components/landing/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ViewportEffects } from "@/components/shared/ViewportEffects";
import {
  consultationNotes,
  consultationSection,
  credibilityFacts,
  founderStatement,
  manifesto,
  manifestoFacts,
  methodIntro,
  methodSteps,
  navigation,
  residenceCases,
  standardsIntro,
  standardNotes,
} from "@/lib/site-content";
import styles from "@/components/landing/LandingPage.module.css";

export function LandingPage() {
  return (
    <>
      <ViewportEffects />
      <SiteHeader navigation={navigation} />
      <main className={styles.page}>
        <section id="manifesto" className={`page-shell ${styles.heroSection}`}>
          <div className={`canon-grid ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal`} data-reveal>
              <span className="section-label">{manifesto.label}</span>
              <h1 className={`display-title ${styles.heroTitle}`}>{manifesto.title}</h1>
              <p className={styles.heroSummary}>{manifesto.summary}</p>
              <div className={styles.heroActions}>
                <a href="#consult" className="button-primary">
                  {manifesto.ctaPrimary}
                </a>
                <a href="#residences" className="button-secondary">
                  {manifesto.ctaSecondary}
                </a>
              </div>
            </div>

            <div className={`${styles.heroMedia} reveal`} data-reveal>
              <div className={`${styles.mediaFrame} ${styles.washedFrame}`}>
                <div className={styles.mediaWash} />
                <div className={styles.heroMediaInner} data-parallax>
                  <Image
                    src="/images/hero-exterior.jpg"
                    alt="Astek editorial exterior"
                    width={1180}
                    height={920}
                    priority
                    className={styles.coverImage}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.heroFacts} reveal`} data-reveal>
              {manifestoFacts.map((fact) => (
                <article key={fact.label} className={styles.heroFact}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.sectionLeadGrid}`}>
            <div className={`${styles.sectionLead} reveal`} data-reveal>
              <span className="section-label">Practice</span>
              <h2 className="display-title">Measured credibility.</h2>
              <p>The facts stay close to the line. No oversized claims. No glossy noise.</p>
            </div>
          </div>

          <div className={`${styles.credibilityList} reveal`} data-reveal>
            {credibilityFacts.map((fact) => (
              <article key={fact.label} className={styles.credibilityRow}>
                <span className={styles.credibilityLabel}>{fact.label}</span>
                <strong className={styles.credibilityValue}>{fact.value}</strong>
                <p className={styles.credibilityNote}>{fact.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="residences" className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.sectionLeadGrid}`}>
            <div className={`${styles.sectionLead} reveal`} data-reveal>
              <span className="section-label">Residences</span>
              <h2 className="display-title">Selected residential work.</h2>
              <p>Large gestures, quiet systems, disciplined materials.</p>
            </div>
          </div>

          <div className={styles.residenceList}>
            {residenceCases.map((residence, index) => (
              <article
                key={residence.title}
                className={`${styles.residenceCard} ${index === 0 ? styles.residenceFeatured : ""} reveal`}
                data-reveal
              >
                <div
                  className={`${styles.residenceMedia} ${
                    residence.treatment === "washed" ? styles.washedFrame : styles.naturalFrame
                  }`}
                >
                  {residence.treatment === "washed" ? <div className={styles.mediaWash} /> : null}
                  <Image
                    src={residence.image}
                    alt={`Residence ${residence.title}`}
                    width={960}
                    height={720}
                    className={styles.coverImage}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                <div className={styles.residenceBody}>
                  <span className="section-label">{residence.tag}</span>
                  <div className={styles.residenceMeta}>{residence.location}</div>
                  <h3 className={`display-title ${styles.residenceTitle}`}>{residence.title}</h3>
                  <p>{residence.summary}</p>
                  <ul className={styles.lineList}>
                    {residence.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="method" className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.methodGrid}`}>
            <div className={`${styles.methodMedia} reveal`} data-reveal>
              <div className={`${styles.mediaFrame} ${styles.washedFrame}`}>
                <div className={styles.mediaWash} />
                <div data-parallax>
                  <Image
                    src={methodIntro.image}
                    alt="Astek method"
                    width={940}
                    height={980}
                    className={styles.coverImage}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.methodContent} reveal`} data-reveal>
              <span className="section-label">{methodIntro.label}</span>
              <h2 className="display-title">{methodIntro.title}</h2>
              <p>{methodIntro.summary}</p>
              <div className={styles.methodList}>
                {methodSteps.map((step) => (
                  <article key={step.number} className={styles.methodRow}>
                    <span className={styles.methodNumber}>{step.number}</span>
                    <div className={styles.methodText}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="standards" className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.standardsGrid}`}>
            <div className={`${styles.standardsIntro} reveal`} data-reveal>
              <span className="section-label">{standardsIntro.label}</span>
              <h2 className="display-title">{standardsIntro.title}</h2>
              <p>{standardsIntro.summary}</p>

              <blockquote className={styles.founderQuote}>
                <p>{founderStatement.quote}</p>
              </blockquote>

              <ul className={styles.lineList}>
                {founderStatement.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.standardsMedia} reveal`} data-reveal>
              <div className={`${styles.mediaFrame} ${styles.naturalFrame}`}>
                <Image
                  src={standardsIntro.image}
                  alt="Material intelligence"
                  width={900}
                  height={760}
                  className={styles.coverImage}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.standardTable} reveal`} data-reveal>
            {standardNotes.map((note) => (
              <article key={note.title} className={styles.standardRow}>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="consult" className={`page-shell ${styles.consultSection}`}>
          <div className={`canon-grid ${styles.consultGrid}`}>
            <div className={`${styles.consultIntro} reveal`} data-reveal>
              <span className="section-label">{consultationSection.label}</span>
              <h2 className="display-title">{consultationSection.title}</h2>
              <p>{consultationSection.summary}</p>

              <div className={styles.consultNotes}>
                {consultationNotes.map((item) => (
                  <article key={item.label} className={styles.consultNote}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>

              <div className={`${styles.mediaFrame} ${styles.naturalFrame} ${styles.consultImage}`}>
                <Image
                  src={consultationSection.image}
                  alt="Astek detail"
                  width={920}
                  height={760}
                  className={styles.coverImage}
                />
              </div>
            </div>

            <div className={`${styles.formPanel} reveal`} data-reveal>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter navigation={navigation} />
    </>
  );
}

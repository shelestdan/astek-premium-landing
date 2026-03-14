import Image from "next/image";
import type { CSSProperties } from "react";

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
import { assetPath } from "@/lib/asset-path";
import styles from "@/components/landing/LandingPage.module.css";

const revealStyle = (delay: number) =>
  ({
    "--reveal-delay": `${delay}ms`,
  }) as CSSProperties;

export function LandingPage() {
  return (
    <>
      <ViewportEffects />
      <SiteHeader navigation={navigation} />
      <main className={styles.page}>
        <section id="manifesto" className={`page-shell ${styles.heroSection}`}>
          <div className={`canon-grid ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal`} data-reveal style={revealStyle(40)}>
              <span className="section-label">{manifesto.label}</span>
              <h1 className={`display-title ${styles.heroTitle}`}>{manifesto.title}</h1>
              <p className={styles.heroSummary}>{manifesto.summary}</p>
              <div className={styles.heroActions}>
                <a href="#consult" className="button-primary" data-magnetic>
                  {manifesto.ctaPrimary}
                </a>
                <a href="#residences" className="button-secondary" data-magnetic>
                  {manifesto.ctaSecondary}
                </a>
              </div>
            </div>

            <div className={`${styles.heroMedia} reveal`} data-reveal style={revealStyle(180)}>
              <div className={`${styles.mediaFrame} ${styles.washedFrame}`}>
                <div className={styles.mediaWash} />
                <div className={styles.heroMediaInner} data-parallax>
                  <Image
                    src={assetPath("/images/hero-exterior.jpg")}
                    alt="Astek editorial exterior"
                    width={1180}
                    height={920}
                    priority
                    className={styles.coverImage}
                  />
                </div>
              </div>
            </div>

            <div className={styles.heroFacts}>
              {manifestoFacts.map((fact, index) => (
                <article
                  key={fact.label}
                  className={`${styles.heroFact} reveal`}
                  data-reveal
                  style={revealStyle(260 + index * 70)}
                >
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.sectionLeadGrid}`}>
            <div className={`${styles.sectionLead} reveal`} data-reveal style={revealStyle(40)}>
              <span className="section-label">Practice</span>
              <h2 className="display-title">Measured credibility.</h2>
              <p>The facts stay close to the line. No oversized claims. No glossy noise.</p>
            </div>
          </div>

          <div className={styles.credibilityList}>
            {credibilityFacts.map((fact, index) => (
              <article
                key={fact.label}
                className={`${styles.credibilityRow} reveal`}
                data-reveal
                style={revealStyle(110 + index * 55)}
              >
                <span className={styles.credibilityLabel}>{fact.label}</span>
                <strong className={styles.credibilityValue}>{fact.value}</strong>
                <p className={styles.credibilityNote}>{fact.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="residences" className={`page-shell ${styles.section}`}>
          <div className={`canon-grid ${styles.sectionLeadGrid}`}>
            <div className={`${styles.sectionLead} reveal`} data-reveal style={revealStyle(40)}>
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
                style={revealStyle(120 + index * 90)}
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
            <div className={`${styles.methodMedia} reveal`} data-reveal style={revealStyle(40)}>
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

            <div className={`${styles.methodContent} reveal`} data-reveal style={revealStyle(120)}>
              <span className="section-label">{methodIntro.label}</span>
              <h2 className="display-title">{methodIntro.title}</h2>
              <p>{methodIntro.summary}</p>
              <div className={styles.methodList}>
                {methodSteps.map((step, index) => (
                  <article
                    key={step.number}
                    className={`${styles.methodRow} reveal`}
                    data-reveal
                    style={revealStyle(180 + index * 60)}
                  >
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
            <div className={`${styles.standardsIntro} reveal`} data-reveal style={revealStyle(40)}>
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

            <div className={`${styles.standardsMedia} reveal`} data-reveal style={revealStyle(160)}>
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

          <div className={styles.standardTable}>
            {standardNotes.map((note, index) => (
              <article
                key={note.title}
                className={`${styles.standardRow} reveal`}
                data-reveal
                style={revealStyle(180 + index * 55)}
              >
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="consult" className={`page-shell ${styles.consultSection}`}>
          <div className={`canon-grid ${styles.consultGrid}`}>
            <div className={`${styles.consultIntro} reveal`} data-reveal style={revealStyle(40)}>
              <span className="section-label">{consultationSection.label}</span>
              <h2 className="display-title">{consultationSection.title}</h2>
              <p>{consultationSection.summary}</p>

              <div className={styles.consultNotes}>
                {consultationNotes.map((item, index) => (
                  <article
                    key={item.label}
                    className={`${styles.consultNote} reveal`}
                    data-reveal
                    style={revealStyle(120 + index * 55)}
                  >
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

            <div className={`${styles.formPanel} reveal`} data-reveal style={revealStyle(160)}>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter navigation={navigation} />
    </>
  );
}

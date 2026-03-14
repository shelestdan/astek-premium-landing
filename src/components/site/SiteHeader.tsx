"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { NavigationItem } from "@/lib/types";
import styles from "@/components/site/SiteHeader.module.css";

interface SiteHeaderProps {
  navigation: NavigationItem[];
}

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={`page-shell canon-grid ${styles.inner}`}>
          <a href="#manifesto" className={styles.wordmark} onClick={closeMenu}>
            <span className={styles.wordmarkMain}>Astek</span>
            <span className={styles.wordmarkMeta}>Private construction atelier</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.utilityRail}>
            <span className={styles.locale}>EN</span>
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={isOpen}
              aria-controls="editorial-menu"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X size={16} /> : <span>Menu</span>}
            </button>
            <a href="#consult" className={styles.inquireLink}>
              Inquire
            </a>
          </div>
        </div>
      </header>

      <div
        id="editorial-menu"
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={`page-shell canon-grid ${styles.overlayInner}`}>
          <div className={styles.overlayIntro}>
            <span className="section-label">Astek / Menu</span>
            <h2 className="display-title">A calm index of the atelier.</h2>
            <p>
              Private residences shaped through architecture, engineering and controlled
              execution.
            </p>
          </div>

          <nav className={styles.overlayNav} aria-label="Expanded navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className={styles.overlayLink} onClick={closeMenu}>
                <span className={styles.overlayLinkLabel}>{item.label}</span>
                <span className={styles.overlayLinkMeta}>{item.href.replace("#", "")}</span>
              </a>
            ))}
          </nav>

          <div className={styles.overlayMeta}>
            <p>Moscow / St. Petersburg / Sochi</p>
            <a href="#consult" className="button-primary" onClick={closeMenu}>
              Request consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

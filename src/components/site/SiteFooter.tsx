import { footerCopy } from "@/lib/site-content";
import type { NavigationItem } from "@/lib/types";
import styles from "@/components/site/SiteFooter.module.css";

interface SiteFooterProps {
  navigation: NavigationItem[];
}

export function SiteFooter({ navigation }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`page-shell canon-grid ${styles.inner}`}>
        <div className={styles.brandColumn}>
          <span className="section-label">Astek</span>
          <h2 className="display-title">Private construction atelier.</h2>
          <p>{footerCopy.statement}</p>
        </div>

        <div className={styles.navColumn}>
          <span className={styles.columnLabel}>Index</span>
          <div className={styles.linkList}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.metaColumn}>
          <span className={styles.columnLabel}>Territory</span>
          <p>{footerCopy.locations}</p>
          <a href="#consult" className={styles.link}>
            {footerCopy.contactPrompt}
          </a>
        </div>
      </div>
    </footer>
  );
}

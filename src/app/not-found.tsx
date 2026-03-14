import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
      <section
        className="surface-panel"
        style={{
          display: "grid",
          gap: "18px",
          padding: "36px",
          maxWidth: "760px",
        }}
      >
        <span className="section-label">404</span>
        <h1 className="display-title" style={{ fontSize: "clamp(3rem, 8vw, 5.2rem)" }}>
          Страница не найдена
        </h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "52ch", lineHeight: 1.7 }}>
          В этом проекте доступен только основной лендинг Astek. Вернитесь на главную, чтобы
          открыть презентацию компании и форму заявки.
        </p>
        <div>
          <Link href="/" className="button-primary">
            На главную
          </Link>
        </div>
      </section>
    </main>
  );
}

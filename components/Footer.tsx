import { COMPANY } from "@/data/company";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__wordmark">{COMPANY.wordmark}</span>
            <span className="footer__descriptor">{COMPANY.descriptor}</span>
          </div>

          <nav aria-label="Footer">
            <p className="footer__col-title">Navigate</p>
            <div className="footer__list">
              {COMPANY.nav.map((item) => (
                <a key={item.href} href={`/${item.href}`}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="footer__col-title">Contact</p>
            <div className="footer__list">
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            &copy; {COMPANY.incorporatedYear} {COMPANY.name}
          </span>
          <span>
            Established {COMPANY.foundedYear} &middot; Incorporated{" "}
            {COMPANY.incorporatedYear}
          </span>
        </div>
      </div>
    </footer>
  );
}

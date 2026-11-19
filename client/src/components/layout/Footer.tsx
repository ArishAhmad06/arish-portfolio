import { site } from '@/config';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <p>{site.footer.line1}</p>
          <p className="mono">{site.footer.line2}</p>
        </div>
        <div className="row mono">
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {site.linkedinUrl && (
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          <a href={`mailto:${site.email}`}>Email</a>
          <a href="#top">Back to top</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

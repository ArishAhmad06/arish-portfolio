import { certifications, type Certification } from '@/config';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import './Certifications.css';

export function Certifications() {
  return (
    <Section id="certifications" index="05" label="CERTIFICATIONS" title="Credentials">
      <div className="certs">
        {certifications.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} number={index + 1} />
        ))}
      </div>
    </Section>
  );
}

function CertificateCard({ cert, number }: { cert: Certification; number: number }) {
  const meta = [cert.issuedOn, cert.credentialId && `ID ${cert.credentialId}`].filter(Boolean).join(' · ');

  return (
    <Reveal as="article" className="cert">
      <p className="mono">
        CERTIFICATE {String(number).padStart(2, '0')}
        {cert.tag ? ` · ${cert.tag.toUpperCase()}` : ''}
      </p>

      {cert.image && (
        <img className="cert__image" src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
      )}

      <div>
        <h3>{cert.title}</h3>
        <p className="cert__issuer">{cert.issuer}</p>
      </div>

      <p className="mono">
        {meta || 'Date not added'}
        {cert.verifyUrl && (
          <>
            {' · '}
            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
              Verify
            </a>
          </>
        )}
      </p>
    </Reveal>
  );
}


import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

export const metadata = {
    title: 'Imprint - Legal Notice | FlyCompense',
    description: 'Legal information and company details for FlyCompense.',
};

type Locale = 'en' | 'fr';

type InfoItem = {
    label: string;
    lines: string[];
};

const localizedContent = {
    en: {
        heroTitle: 'Imprint & Legal Notice',
        heroSubtitle: 'Transparency and compliance are at the core of how we protect air passenger rights.',
        companyTitle: 'Company Information',
        companyInfo: [
            { label: 'Company Name', lines: ['FlyCompense S.A.'] },
            { label: 'Legal Form', lines: ['Société Anonyme'] },
            {
                label: 'Registered Office',
                lines: ['26 Boulevard Royal', 'L-2449 Luxembourg', 'Grand Duchy of Luxembourg'],
            },
            {
                label: 'Registration',
                lines: ['RCS Luxembourg: B303002', 'VAT ID: LU 12345678'],
            },
        ] as InfoItem[],
        contactTitle: 'Contact & Management',
        contactInfo: [
            {
                label: 'Communication',
                lines: [
                    'Email: contact@flycompense.com',
                    'Phone: +352 27 86 44 87',
                    'Web: www.flycompense.com',
                ],
            },
            {
                label: 'Represented By',
                lines: ['Managing Directors:', 'Jean Dupont, CEO', 'Sarah Meyer, COO'],
            },
        ] as InfoItem[],
        regulatoryTitle: 'Regulatory Details',
        regulatoryInfo: [
            {
                label: 'EU Compliance',
                lines: ['FlyCompense operates as a professional claim service specializing in passenger rights under Regulation (EC) No 261/2004.'],
            },
            {
                label: 'Professional Liability',
                lines: ['Insurer: EuroProtect Insurance S.A.', 'Policy No.: EP-99887766', 'Scope: EU & EEA'],
            },
        ] as InfoItem[],
        disputeTitle: 'Dispute Resolution',
        disputeParagraphs: [
            'The European Commission provides an online dispute resolution (ODR) platform, available at https://ec.europa.eu/consumers/odr.',
            'We are not obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board. We prefer to resolve any differences directly and amicably.',
        ],
        legalTitle: 'Legal Notices',
        responsible: {
            label: 'Editorially Responsible',
            lines: ['Marco Weber', 'Head of Communications', '26 Boulevard Royal, L-2449 Luxembourg'],
        },
        disclaimer:
            'Disclaimer: Despite careful control of the content, we assume no liability for the content of external links. The operators of the linked pages are solely responsible. The information provided on this website does not constitute legal advice.',
        footerNote: '© FlyCompense S.A. All rights reserved.',
    },
    fr: {
        heroTitle: 'Mentions légales',
        heroSubtitle: 'La transparence et la conformité sont au cœur de notre mission de protection des droits des passagers.',
        companyTitle: 'Informations sur la société',
        companyInfo: [
            { label: 'Raison sociale', lines: ['FlyCompense S.A.'] },
            { label: 'Forme juridique', lines: ['Société Anonyme'] },
            {
                label: 'Siège social',
                lines: ['26 Boulevard Royal', 'L-2449 Luxembourg', 'Grand-Duché de Luxembourg'],
            },
            {
                label: 'Immatriculation',
                lines: ['RCS Luxembourg : B303002', 'ID TVA : LU 12345678'],
            },
        ] as InfoItem[],
        contactTitle: 'Contact & direction',
        contactInfo: [
            {
                label: 'Communication',
                lines: [
                    'Email : contact@flycompense.com',
                    'Téléphone : +352 27 86 44 87',
                    'Site : www.flycompense.com',
                ],
            },
            {
                label: 'Représentée par',
                lines: ['Direction générale :', 'Jean Dupont, CEO', 'Sarah Meyer, COO'],
            },
        ] as InfoItem[],
        regulatoryTitle: 'Informations réglementaires',
        regulatoryInfo: [
            {
                label: 'Conformité UE',
                lines: ['FlyCompense agit en tant que prestataire spécialisé dans les droits des passagers selon le règlement (CE) n° 261/2004.'],
            },
            {
                label: 'Responsabilité civile professionnelle',
                lines: ['Assureur : EuroProtect Insurance S.A.', 'Police : EP-99887766', 'Couverture : UE & EEE'],
            },
        ] as InfoItem[],
        disputeTitle: 'Règlement des litiges',
        disputeParagraphs: [
            'La Commission européenne propose une plateforme de règlement en ligne des litiges (RLL) accessible sur https://ec.europa.eu/consumers/odr.',
            "Nous ne sommes ni tenus ni disposés à participer à une procédure devant un organisme de médiation des consommateurs. Nous privilégions un règlement direct et amiable de tout différend.",
        ],
        legalTitle: 'Mentions complémentaires',
        responsible: {
            label: 'Responsable de la publication',
            lines: ['Marco Weber', 'Responsable communication', '26 Boulevard Royal, L-2449 Luxembourg'],
        },
        disclaimer:
            'Avertissement : malgré un contrôle minutieux, nous n’assumons aucune responsabilité quant au contenu des liens externes. Les éditeurs des sites liés sont seuls responsables. Les informations fournies ne constituent pas un conseil juridique.',
        footerNote: '© FlyCompense S.A. Tous droits réservés.',
    },
} satisfies Record<Locale, any>;

const renderLines = (lines: string[]) =>
    lines.map((line, index) => (
        <span key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 && <br />}
        </span>
    ));

export default async function Imprint() {
    const locale = (await getLocale()) as Locale;
    const copy = localizedContent[locale] ?? localizedContent.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
                    <p className={styles.heroSubtitle}>{copy.heroSubtitle}</p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.companyTitle}</h2>
                        <div className={styles.grid}>
                            {copy.companyInfo.map((item: InfoItem) => (
                                <div key={item.label} className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{item.label}</span>
                                    <div className={styles.infoValue}>{renderLines(item.lines)}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.contactTitle}</h2>
                        <div className={styles.grid}>
                            {copy.contactInfo.map((item: InfoItem) => (
                                <div key={item.label} className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{item.label}</span>
                                    <div className={styles.infoValue}>{renderLines(item.lines)}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.regulatoryTitle}</h2>
                        <div className={styles.grid}>
                            {copy.regulatoryInfo.map((item: InfoItem) => (
                                <div key={item.label} className={styles.infoItem}>
                                    <span className={styles.infoLabel}>{item.label}</span>
                                    <div className={styles.infoValue}>{renderLines(item.lines)}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.disputeTitle}</h2>
                        <div className={styles.infoValue}>
                            {copy.disputeParagraphs.map((paragraph: string) => (
                                <p key={paragraph}>
                                    {paragraph.includes('https://ec.europa.eu/consumers/odr') ? (
                                        <>
                                            {paragraph.split('https://ec.europa.eu/consumers/odr')[0]}
                                            <a
                                                href="https://ec.europa.eu/consumers/odr"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                https://ec.europa.eu/consumers/odr
                                            </a>
                                            {paragraph.split('https://ec.europa.eu/consumers/odr')[1]}
                                        </>
                                    ) : (
                                        paragraph
                                    )}
                                </p>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.legalTitle}</h2>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>{copy.responsible.label}</span>
                            <div className={styles.infoValue}>{renderLines(copy.responsible.lines)}</div>
                        </div>
                        <div className={styles.disclaimerBox}>
                            <p className={styles.disclaimerText}>{copy.disclaimer}</p>
                        </div>
                    </section>
                </div>

                <div className={styles.footerNote}>
                    <p>© {new Date().getFullYear()} {copy.footerNote}</p>
                </div>
            </div>
        </main>
    );
}


import { db } from '@/lib/db';
import { pageContent } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

export const metadata = {
    title: 'Terms of Service | FlyCompense',
    description: 'Read the terms and conditions for using FlyCompense flight compensation services.',
};

type Locale = 'en' | 'fr';

const fallbackContent = {
    en: {
        heroTitle: 'Terms of Service',
        heroSubtitle: 'Clear and transparent terms for our partnership in protecting your air passenger rights.',
        lastUpdated: 'Last updated: January 2026',
        sections: [
            {
                title: '1. Introduction',
                paragraphs: [
                    'These Terms of Service ("Terms") govern your use of the FlyCompense website and services. By using our services, you agree to be bound by these Terms.',
                    'FlyCompense provides flight compensation claim services, helping passengers claim compensation for flight disruptions under EU Regulation 261/2004 and other applicable regulations.',
                ],
            },
            {
                title: '2. Definitions',
                bullets: [
                    '"FlyCompense," "we," "us," "our" refers to FlyCompense and its affiliates.',
                    '"Customer," "you," "your" refers to the person using our services.',
                    '"Services" refers to our flight compensation claim services.',
                    '"Claim" refers to a compensation claim for a flight disruption.',
                    '"Compensation" refers to the monetary amount recovered from an airline.',
                ],
            },
            {
                title: '3. Our Services',
                paragraphs: ['FlyCompense provides the following services:'],
                bullets: [
                    'Assessment of flight compensation eligibility',
                    'Preparation and submission of compensation claims to airlines',
                    'Communication and negotiation with airlines on your behalf',
                    'Legal action when necessary to recover compensation',
                    'Processing and transfer of compensation payments',
                ],
                paragraphsAfterList: [
                    'We operate on a "No Win, No Fee" basis. You only pay our service fee if we successfully recover compensation on your behalf.',
                ],
            },
            {
                title: '4. Service Fee',
                paragraphs: [
                    'Our service fee is 35% (including applicable VAT) of the compensation amount successfully recovered. This fee is deducted from the compensation before payment is transferred to you.',
                    'If legal action is required to recover your compensation, an additional legal action fee of up to 15% may apply. If we are unsuccessful in recovering compensation, you owe us nothing.',
                ],
            },
            {
                title: '5. Assignment of Claim',
                paragraphs: [
                    'By submitting a claim through FlyCompense, you authorize us to act on your behalf and assign the compensation claim to us. This assignment allows us to:',
                ],
                bullets: [
                    'Communicate with the airline in your name',
                    'Accept or reject settlement offers',
                    'Initiate legal proceedings if necessary',
                    'Receive compensation payments on your behalf',
                ],
            },
            {
                title: '6. Your Obligations',
                paragraphs: ['When using our services, you agree to:'],
                bullets: [
                    'Provide accurate and complete information',
                    'Not pursue the same claim independently while we handle it',
                    'Inform us of any direct communication from the airline',
                    'Provide necessary documents (booking confirmation, ID, etc.)',
                ],
            },
            {
                title: '7. Payment Terms',
                paragraphs: [
                    'Upon successful recovery of compensation, we will transfer the net amount (compensation minus our fees) to your designated bank account within 5 business days.',
                ],
            },
            {
                title: '8. Governing Law',
                paragraphs: [
                    'These Terms are governed by and construed in accordance with the laws of Luxembourg. Any disputes shall be submitted to the exclusive jurisdiction of the courts in Luxembourg.',
                ],
            },
        ],
    },
    fr: {
        heroTitle: 'Conditions d’utilisation',
        heroSubtitle: 'Des conditions claires et transparentes pour protéger vos droits de passager.',
        lastUpdated: 'Dernière mise à jour : janvier 2026',
        sections: [
            {
                title: '1. Introduction',
                paragraphs: [
                    'Les présentes Conditions d’utilisation (« Conditions ») régissent l’usage du site et des services FlyCompense. En utilisant nos services, vous acceptez d’être lié par ces Conditions.',
                    'FlyCompense accompagne les passagers pour réclamer des indemnités en cas de perturbation de vol conformément au règlement (CE) n°261/2004 et aux autres lois applicables.',
                ],
            },
            {
                title: '2. Définitions',
                bullets: [
                    '« FlyCompense », « nous » désigne FlyCompense et ses sociétés affiliées.',
                    '« Client », « vous » désigne la personne qui utilise nos services.',
                    '« Services » désigne nos prestations d’accompagnement à l’indemnisation aérienne.',
                    '« Réclamation » désigne la procédure d’indemnisation liée à un vol perturbé.',
                    '« Indemnité » désigne le montant financier récupéré auprès d’une compagnie aérienne.',
                ],
            },
            {
                title: '3. Nos services',
                paragraphs: ['FlyCompense fournit notamment :'],
                bullets: [
                    'Analyse de l’éligibilité à une indemnisation',
                    'Préparation et dépôt des dossiers auprès des compagnies',
                    'Communication et négociation au nom du client',
                    'Action juridique si nécessaire pour obtenir l’indemnité',
                    'Traitement et versement des paiements',
                ],
                paragraphsAfterList: ['Nous fonctionnons sur la base « Pas de gain, pas de frais ». Des frais sont dus uniquement en cas de réussite.'],
            },
            {
                title: '4. Frais de service',
                paragraphs: [
                    'Nos frais de service s’élèvent à 35 % (TVA incluse) de l’indemnité obtenue et sont prélevés avant le versement.',
                    'Si une action en justice est nécessaire, un complément pouvant aller jusqu’à 15 % s’applique. En cas d’échec, aucun frais n’est facturé.',
                ],
            },
            {
                title: '5. Cession de créance',
                paragraphs: ['En soumettant une réclamation, vous nous autorisez à agir en votre nom et à :'],
                bullets: [
                    'Communiquer avec la compagnie aérienne',
                    'Accepter ou refuser les propositions de règlement',
                    'Engager des actions en justice si nécessaire',
                    'Recevoir les paiements d’indemnisation en votre nom',
                ],
            },
            {
                title: '6. Vos obligations',
                paragraphs: ['Vous vous engagez à :'],
                bullets: [
                    'Fournir des informations exactes et complètes',
                    'Ne pas mener de démarche parallèle durant notre intervention',
                    'Nous informer de toute communication directe de la compagnie',
                    'Transmettre les documents requis (confirmation de réservation, pièce d’identité, etc.)',
                ],
            },
            {
                title: '7. Modalités de paiement',
                paragraphs: ['Après réussite, nous versons le montant net (indemnité moins nos frais) sur votre compte sous cinq jours ouvrés.'],
            },
            {
                title: '8. Droit applicable',
                paragraphs: ['Les présentes Conditions sont régies par le droit luxembourgeois. Tout litige relève des tribunaux de Luxembourg.'],
            },
        ],
    },
} satisfies Record<Locale, {
    heroTitle: string;
    heroSubtitle: string;
    lastUpdated: string;
    sections: {
        title: string;
        paragraphs?: string[];
        bullets?: string[];
        paragraphsAfterList?: string[];
    }[];
}>;

export default async function TermsOfService() {
    const locale = await getLocale();
    const pageResult = await db
        .select()
        .from(pageContent)
        .where(eq(pageContent.pageSlug, 'terms-of-service'))
        .limit(1);

    if (pageResult.length > 0) {
        const page = pageResult[0];
        const title = locale === 'fr' && page.titleFr ? page.titleFr : page.title;
        const content = locale === 'fr' && page.contentFr ? page.contentFr : page.content;
        const metaDescription =
            locale === 'fr' && page.metaDescriptionFr ? page.metaDescriptionFr : page.metaDescription;

        const updatedAt = page.updatedAt ? new Date(page.updatedAt) : null;

        return (
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroPattern} />
                    <div className={styles.container}>
                        <h1 className={styles.heroTitle}>{title}</h1>
                        {metaDescription && (
                            <p className={styles.heroSubtitle}>{metaDescription}</p>
                        )}
                    </div>
                </section>

                <div className={styles.container}>
                    <div className={styles.card}>
                        <span className={styles.lastUpdated}>
                            Last updated:{' '}
                            {updatedAt
                                ? updatedAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                })
                                : '—'}
                        </span>

                        <div
                            className={styles.dynamicContent}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </main>
        );
    }

    const fallbackLocale = (locale === 'fr' ? 'fr' : 'en') as Locale;
    const copy = fallbackContent[fallbackLocale];

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
                    <span className={styles.lastUpdated}>{copy.lastUpdated}</span>

                    {copy.sections.map((section) => (
                        <section key={section.title} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            {section.paragraphs?.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                            {section.bullets && (
                                <ul>
                                    {section.bullets.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {section.paragraphsAfterList?.map((paragraph, idx) => (
                                <p key={`after-${idx}`}>{paragraph}</p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

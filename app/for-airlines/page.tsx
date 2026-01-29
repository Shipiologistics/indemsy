import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

type Locale = 'en' | 'fr';

type BenefitCard = {
    title: string;
    body: string;
    icon: string;
};

type Feature = {
    title: string;
    body: string;
};

const localizedContent = {
    en: {
        eyebrow: 'Become a partner',
        heroTitle: "Let's work together",
        heroBody: [
            'Just like you, we care about air passengers. We build strong partnerships with airlines to improve the customer travel experience.',
            "Are you from an airline? Send us a message if you'd like to partner with us or simply ask a question. Our team will get back to you soon.",
        ],
        ctaPrimary: "Let's talk",
        ctaHref: '/contact-us',
        reviewCaption: 'Showing our 5-star reviews.',
        reviewQuote: "It's in the name. FlyCompense helps. The service is not quick, but it is certain and effective. Thanks!",
        reviewAuthor: 'Customer',
        helpEyebrow: "We're here for airlines",
        helpTitle: 'How we can help',
        helpLinkLabel: 'Contact us',
        helpCards: [
            {
                icon: '⭐',
                title: 'Fully automated claims processing',
                body: 'We take care of claims from start to finish. Our process helps identify eligible claims quickly and reliably.',
            },
            {
                icon: '🛡️',
                title: 'Parametric protection products',
                body: 'Offer fast payouts for flight delays and lost luggage to improve customer trust and satisfaction.',
            },
            {
                icon: '🧩',
                title: 'Personalized add-ons',
                body: 'Helpful extras like lounge access and vouchers give passengers more value during disruptions.',
            },
            {
                icon: '💬',
                title: 'Dedicated customer support',
                body: 'Our specialized support team handles claims and payouts with care. Available 24/7 in multiple languages.',
            },
        ] as BenefitCard[],
        featureRow: [
            {
                title: 'Lighter load for customer support',
                body: 'We provide personalized communication after a disruption so your teams can focus on core operations.',
            },
            {
                title: 'Hands-off claims processing',
                body: 'Streamline eligibility checks, data collection, and claim settlements end-to-end.',
            },
            {
                title: 'Proactive disruption benefits',
                body: 'Go above and beyond with fast protection and add-ons so customers feel valued.',
            },
        ] as Feature[],
        bannerTitle: 'Claim up to €600 for your delayed or canceled flight.',
        bannerBadges: ['All airlines', 'All countries', 'No Win, No Fee'],
        bannerCta: 'Check Compensation',
        bannerCtaHref: '/claim',
    },
    fr: {
        eyebrow: 'Devenir partenaire',
        heroTitle: 'Travaillons ensemble',
        heroBody: [
            'Comme vous, nous nous soucions des passagers aériens. Nous construisons des partenariats solides avec les compagnies pour améliorer l’expérience client.',
            'Vous représentez une compagnie aérienne ? Envoyez-nous un message pour discuter d’un partenariat ou poser une question. Notre équipe vous répondra rapidement.',
        ],
        ctaPrimary: 'Parlons-en',
        ctaHref: '/contact-us',
        reviewCaption: 'Découvrez nos avis 5 étoiles.',
        reviewQuote: "C'est dans le nom. FlyCompense aide. Le service n'est pas rapide, mais il est sûr et efficace. Merci !",
        reviewAuthor: 'Client',
        helpEyebrow: 'Nous sommes là pour les compagnies',
        helpTitle: 'Comment nous pouvons vous aider',
        helpLinkLabel: 'Nous contacter',
        helpCards: [
            {
                icon: '⭐',
                title: 'Traitement automatisé des réclamations',
                body: 'Nous gérons les dossiers de bout en bout. Notre processus identifie les dossiers éligibles rapidement et de manière fiable.',
            },
            {
                icon: '🛡️',
                title: 'Produits de protection paramétriques',
                body: 'Des paiements rapides en cas de retard ou de bagage perdu pour renforcer la confiance et la satisfaction.',
            },
            {
                icon: '🧩',
                title: 'Options personnalisées',
                body: 'Des extras utiles comme l’accès salon ou des vouchers apportent plus de valeur lors d’une perturbation.',
            },
            {
                icon: '💬',
                title: 'Support client dédié',
                body: 'Notre équipe spécialisée gère les dossiers et les paiements avec soin. Disponible 24h/24 et en plusieurs langues.',
            },
        ] as BenefitCard[],
        featureRow: [
            {
                title: 'Moins de charge pour votre support',
                body: 'Nous assurons une communication personnalisée après une perturbation pour libérer vos équipes.',
            },
            {
                title: 'Réclamations gérées de A à Z',
                body: 'Vérification d’éligibilité, collecte des données et règlement : nous prenons en charge l’ensemble du processus.',
            },
            {
                title: 'Des bénéfices proactifs',
                body: 'Allez plus loin avec des protections rapides et des options additionnelles pour valoriser vos passagers.',
            },
        ] as Feature[],
        bannerTitle: 'Réclamez jusqu’à 600 € pour un vol retardé ou annulé.',
        bannerBadges: ['Toutes compagnies', 'Tous pays', 'Pas de gain, pas de frais'],
        bannerCta: 'Vérifier mon indemnité',
        bannerCtaHref: '/claim',
    },
} satisfies Record<Locale, any>;

export default async function ForAirlinesPage() {
    const locale = (await getLocale()) as Locale;
    const copy = localizedContent[locale] ?? localizedContent.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroMedia}>
                        <div className={styles.heroImage}>
                            <img
                                src="https://img.airhelp.com/i/airlines/supporting-air-passengers-rights-section-img.png?updatedAt=1631175469826"
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.reviewCard}>
                            <div className={styles.reviewStars}>
                                <span>★★★★★</span>
                            </div>
                            <p className={styles.reviewQuote}>{copy.reviewQuote}</p>
                            <p className={styles.reviewAuthor}>{copy.reviewAuthor}</p>
                        </div>
                        <p className={styles.reviewCaption}>{copy.reviewCaption}</p>
                    </div>

                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>{copy.eyebrow}</p>
                        <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
                        {copy.heroBody.map((p: string, idx: number) => (
                            <p key={idx} className={styles.heroText}>
                                {p}
                            </p>
                        ))}
                        <div className={styles.heroCtas}>
                            <Link href={copy.ctaHref} className={styles.primaryButton}>
                                {copy.ctaPrimary}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.helpSection}>
                <div className={styles.container}>
                    <div className={styles.helpHeader}>
                        <div>
                            <p className={styles.sectionEyebrow}>{copy.helpEyebrow}</p>
                            <h2 className={styles.sectionTitle}>{copy.helpTitle}</h2>
                        </div>
                        <Link href={copy.ctaHref} className={styles.textLink}>
                            {copy.helpLinkLabel} →
                        </Link>
                    </div>

                    <div className={styles.helpGrid}>
                        {copy.helpCards.map((card: BenefitCard) => (
                            <article key={card.title} className={styles.helpCard}>
                                <div className={styles.helpIcon}>{card.icon}</div>
                                <h3 className={styles.helpCardTitle}>{card.title}</h3>
                                <p className={styles.helpCardBody}>{card.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.featureRow}>
                <div className={styles.containerWide}>
                    <div className={styles.featureGrid}>
                        {copy.featureRow.map((feature: Feature) => (
                            <article key={feature.title} className={styles.featureCard}>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureBody}>{feature.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.banner}>
                <div className={styles.bannerInner}>
                    <div>
                        <h3 className={styles.bannerTitle}>{copy.bannerTitle}</h3>
                        <div className={styles.bannerBadges}>
                            {copy.bannerBadges.map((badge: string) => (
                                <span key={badge} className={styles.bannerBadge}>
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Link href={copy.bannerCtaHref} className={styles.bannerButton}>
                        {copy.bannerCta}
                    </Link>
                </div>
            </section>
        </main>
    );
}

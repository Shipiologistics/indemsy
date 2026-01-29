import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

type Locale = 'en' | 'fr';

const localizedContent = {
    en: {
        heroEyebrow: 'Excellent · Trustpilot Proof',
        heroTitle: 'Transparent fees designed to stay fair',
        heroCopy:
            'No Win, No Fee means we deduct a fee only when you win. Prefer zero deductions? Choose our annual AirHelp+ membership and keep 100% of the compensation we recover.',
        stats: [
            { label: 'Reviews on Trustpilot', value: '230,628', note: 'Excellent rating' },
            { label: 'Claim confidence', value: '98%', note: 'Success-focused process' },
        ],
        feePlans: [
            {
                title: 'No Win, No Fee',
                subtitle: 'You receive: Up to 65%',
                receiveLabel: '65%',
                receiveCopy: 'You receive',
                feeLabel: '35%',
                feeCopy: 'Our fee',
                chart: {
                    receivePercent: 65,
                    feePercent: 35,
                    receiveColor: '#34d399',
                    feeColor: '#e0e7ff',
                },
                bullets: [
                    'Fee deducted from what you win',
                    'Standard fee is equivalent to 35%',
                    'VAT included so no surprises later',
                ],
                cta: { label: 'Check Compensation', href: '/claim', variant: 'primary' as const },
            },
            {
                title: 'AirHelp+',
                subtitle: 'You receive: 100%',
                receiveLabel: '100%',
                receiveCopy: 'You receive',
                feeLabel: '0%',
                feeCopy: 'Our fee',
                chart: {
                    receivePercent: 100,
                    feePercent: 0,
                    receiveColor: '#34c5f0',
                    feeColor: '#dbeafe',
                },
                bullets: [
                    'No fee deducted from what you win',
                    'Claim as many times as you need',
                    'Purchase before flight disruption',
                    'From €39.99 per year',
                ],
                cta: { label: 'See our Plans', href: '/plus', variant: 'secondary' as const },
            },
        ],
        notice: 'Please note: if your claim falls under Brazilian laws you should refer to our Brazilian Price List.',
        exampleBreakdown: [
            {
                title: 'No Win, No Fee – Standard',
                description: 'If we win €600 compensation for you, here is how it breaks down.',
                receive: '€390',
                fee: '€210',
                highlight: 'You receive',
                feeHighlight: 'Our fee',
            },
            {
                title: 'AirHelp+ – In all cases',
                description: 'With AirHelp+, nothing is deducted from the same €600 payout.',
                receive: '€600',
                fee: '€0',
                highlight: 'You receive',
                feeHighlight: 'Our fee',
            },
        ],
        standardHeading: 'Standard Fee explained',
        standardQuestion: "What's included in the standard fee?",
        standardBody: [
            'Our Standard Fee covers everything involved with getting your compensation in a standard claim and includes VAT so that there are no surprises later.',
            'Our team of 400+ AirHelpers is available to handle every element of your claim, from validating your documents and confirming details against weather and flight reports, to putting together a case and negotiating with the airlines.',
        ],
        standardFooter: {
            text: "We'll keep you updated every step of the way. And we're available 24/7 in case you have any questions.",
            linkLabel: 'Read our T&Cs',
        },
        compareHeading: 'Why choose FlyCompense?',
        comparisonCards: [
            {
                heading: 'Claim by yourself',
                items: [
                    'Time-consuming and stressful',
                    'Deal with complicated airline processes alone',
                    'Need to learn the law yourself',
                    'Your time is wasted if you lose',
                ],
            },
            {
                heading: 'Claim with FlyCompense',
                badge: 'Hassle-free',
                items: [
                    'Affordable set fee',
                    'We handle paperwork, negotiations, and evidence',
                    'Specialists in passenger rights & compensation',
                    'Risk-free – you pay nothing if there is no compensation',
                    'We cover legal costs up to €1,000 even if the case loses',
                ],
            },
            {
                heading: 'Use a Lawyer',
                items: [
                    'Handles the claim for you',
                    'Costly lawyer + court fees',
                    'Most lawyers aren’t specialised in passenger rights',
                    'You still pay fees if you lose and may owe airline attorneys',
                ],
            },
        ],
        detailsHeading: 'Our Fees – Full Details',
        detailSections: [
            {
                title: '1. INTRODUCTION',
                body: 'Our Fees is the full breakdown of how FlyCompense charges for every service. Please read them together with our Terms, Privacy Statement, and FAQs before engaging us. Claims touching Brazil may fall under our Brazilian Price List and specific T&Cs.',
            },
            {
                title: '2. DEFINITIONS',
                body: 'Capitalised terms like Service Fee, Legal Action Fee, Membership Fees, and Goodwill Claim have the meanings given in our Terms.',
            },
            {
                title: '3. SERVICES FREE OF CHARGE',
                body: 'We do not charge for Eligibility checks, information tools, or unsuccessful compensation attempts.',
            },
            {
                title: '4. COMPENSATION SERVICE FEES',
                body: 'Our default model is no-win, no-fee. When we succeed, we deduct the Standard (Service) Fee of 35% including VAT. If legal action is required, an additional 15% Legal Action Fee applies. These fees are always taken from the recovered amount.',
                list: [
                    'Service Fee / Standard Fee – 35% of the recovered compensation.',
                    'Legal Action Fee – 15% added only when court or legal representation was necessary.',
                    'Legal expenses and court fees are paid upfront by FlyCompense. If courts reimburse them, we keep that reimbursement to cover the costs incurred.',
                ],
            },
            {
                title: 'Notes for Denmark & Sweden',
                body: 'Danish fees are fixed sums equivalent to 35% + 15% including VAT. Swedish claims filed in local courts involve application fees and hourly legal standards paid by us; if we lose, we still absorb these costs.',
            },
            {
                title: 'Goodwill Claims',
                body: 'When we secure goodwill compensation we charge US$29.99, waived when the payout is below US$30 or under 3,000 fidelity points.',
            },
            {
                title: '5. AIRHELP+ MEMBERSHIP FEES',
                body: 'AirHelp+ customers (Lite €29.99, Smart €39.99, Pro €99.99 per year; Comfort $179.99 / Pro $249.99 in the USA) do not pay Service or Legal Action Fees. Plans purchased via third parties follow the partner’s agreed pricing.',
            },
            {
                title: '6. SPECIAL FEES',
                body: 'If a travel agency or partner pays on your behalf, your payout schedule or included services may differ, but combined fees never exceed our published Service + Legal Action percentages.',
            },
            {
                title: '7. FULL FLIGHT COMPENSATION AMOUNT',
                body: 'We always pay you the full amount we receive minus our fees. EU claims are paid in EUR. Other jurisdictions follow the mandated currency or (if offered) your residence currency. Any exchange-rate variation depends on banks/payment providers.',
            },
            {
                title: '8. INTERNATIONAL TRANSFERS & CHECKS',
                body: 'International transfers via our payment partners are free on our side; intermediary bank charges remain your responsibility. U.S. customers can opt for USD checks with no extra fee from FlyCompense.',
            },
            {
                title: '9. VALUE ADDED TAX',
                body: 'All published fees already include applicable VAT unless stated otherwise.',
            },
            {
                title: 'Updated: June 24 2025 · Version PL1.25',
                body: 'The English version of these fees prevails over any translation.',
            },
        ],
    },
    fr: {
        heroEyebrow: 'Excellent · Certifié Trustpilot',
        heroTitle: 'Des frais transparents pensés pour rester justes',
        heroCopy:
            'Le modèle « Pas de gain, pas de frais » signifie que nous ne déduisons un pourcentage que si vous gagnez. Vous voulez conserver 100 % de votre indemnité ? Choisissez notre abonnement annuel AirHelp+ et aucun montant ne sera retenu.',
        stats: [
            { label: 'Avis sur Trustpilot', value: '230 628', note: 'Note Excellent' },
            { label: 'Taux de confiance', value: '98%', note: 'Processus orienté réussite' },
        ],
        feePlans: [
            {
                title: 'Pas de gain, pas de frais',
                subtitle: 'Vous recevez : jusqu’à 65 %',
                receiveLabel: '65%',
                receiveCopy: 'Montant pour vous',
                feeLabel: '35%',
                feeCopy: 'Nos frais',
                chart: {
                    receivePercent: 65,
                    feePercent: 35,
                    receiveColor: '#34d399',
                    feeColor: '#e0e7ff',
                },
                bullets: [
                    'Frais déduits de l’indemnisation obtenue',
                    'Frais standard équivalents à 35 %',
                    'TVA incluse pour éviter toute surprise',
                ],
                cta: { label: 'Vérifier mon indemnité', href: '/claim', variant: 'primary' as const },
            },
            {
                title: 'AirHelp+',
                subtitle: 'Vous recevez : 100 %',
                receiveLabel: '100%',
                receiveCopy: 'Montant pour vous',
                feeLabel: '0%',
                feeCopy: 'Nos frais',
                chart: {
                    receivePercent: 100,
                    feePercent: 0,
                    receiveColor: '#34c5f0',
                    feeColor: '#dbeafe',
                },
                bullets: [
                    'Aucun frais déduit de votre gain',
                    'Réclamez autant de fois que nécessaire',
                    'À souscrire avant la perturbation de vol',
                    'À partir de 39,99 € par an',
                ],
                cta: { label: 'Découvrir nos offres', href: '/plus', variant: 'secondary' as const },
            },
        ],
        notice: 'Important : si votre dossier relève du droit brésilien, consultez notre grille tarifaire brésilienne.',
        exampleBreakdown: [
            {
                title: 'Pas de gain, pas de frais – Standard',
                description: 'Pour 600 € d’indemnité obtenue, voici la répartition.',
                receive: '390 €',
                fee: '210 €',
                highlight: 'Montant pour vous',
                feeHighlight: 'Nos frais',
            },
            {
                title: 'AirHelp+ – Dans tous les cas',
                description: 'Avec AirHelp+, rien n’est déduit sur les mêmes 600 €.',
                receive: '600 €',
                fee: '0 €',
                highlight: 'Montant pour vous',
                feeHighlight: 'Nos frais',
            },
        ],
        standardHeading: 'Frais standard expliqués',
        standardQuestion: 'Que comprend le tarif standard ? ',
        standardBody: [
            'Notre tarif standard couvre toutes les démarches nécessaires pour obtenir votre indemnisation dans un dossier classique et inclut la TVA afin d’éviter toute mauvaise surprise.',
            'Notre équipe de plus de 400 AirHelpers gère chaque étape : vérification des documents, comparaison avec les rapports météo et de vol, constitution du dossier et négociation avec les compagnies.',
        ],
        standardFooter: {
            text: 'Nous vous tenons informé à chaque étape et restons disponibles 24h/24 pour répondre à vos questions.',
            linkLabel: 'Consultez nos CGU',
        },
        compareHeading: 'Pourquoi choisir FlyCompense ?',
        comparisonCards: [
            {
                heading: 'Réclamer seul',
                items: [
                    'Long et stressant',
                    'Processus aériens compliqués à gérer',
                    'Vous devez comprendre la loi vous-même',
                    'Temps perdu si vous perdez le dossier',
                ],
            },
            {
                heading: 'Réclamer avec FlyCompense',
                badge: 'Sans tracas',
                items: [
                    'Frais fixes abordables',
                    'Nous gérons documents, négociations et preuves',
                    'Spécialistes des droits passagers',
                    'Sans risque – rien à payer sans indemnité',
                    'Nous couvrons jusqu’à 1 000 € de frais juridiques même en cas d’échec',
                ],
            },
            {
                heading: 'Passer par un avocat',
                items: [
                    'Il traite le dossier pour vous',
                    'Honoraires élevés + frais de justice',
                    'Peu d’avocats spécialisés passagers',
                    'Frais dus même en cas de perte et risque d’honoraire adverse',
                ],
            },
        ],
        detailsHeading: 'Nos frais – version complète',
        detailSections: [
            {
                title: '1. INTRODUCTION',
                body: '« Nos frais » détaille la tarification FlyCompense. Lisez-les avec nos CGU, notre politique de confidentialité et la FAQ. Les dossiers liés au Brésil peuvent relever de la grille tarifaire locale.',
            },
            {
                title: '2. DÉFINITIONS',
                body: 'Les termes Service Fee, Legal Action Fee, Membership Fees ou Goodwill Claim ont la même définition que dans nos CGU.',
            },
            {
                title: '3. SERVICES GRATUITS',
                body: 'Le test d’éligibilité, les outils d’information et les démarches sans indemnité restent gratuits.',
            },
            {
                title: '4. FRAIS DU SERVICE D’INDEMNISATION',
                body: 'Notre modèle est « pas de gain, pas de frais ». Si nous réussissons, nous prélevons 35 % TTC. Une action en justice ajoute 15 % TTC, toujours déduits des montants recouvrés.',
                list: [
                    'Frais de service/standard – 35 % de l’indemnité obtenue.',
                    'Frais d’action en justice – 15 % uniquement si une procédure juridique est nécessaire.',
                    'Frais juridiques avancés par FlyCompense. Toute somme remboursée par les tribunaux nous revient pour couvrir ces coûts.',
                ],
            },
            {
                title: 'Notes Danemark & Suède',
                body: 'Au Danemark, les frais sont des montants fixes équivalant à 35 % + 15 % TVA incluse. En Suède, nous payons les frais de dépôt et standards horaires. En cas d’échec, nous assumons tout de même ces coûts.',
            },
            {
                title: 'Demandes « Goodwill »',
                body: 'Pour une compensation commerciale, nous facturons 29,99 $ US, supprimés si le montant est inférieur à 30 $ ou 3 000 points.',
            },
            {
                title: '5. ABONNEMENT AIRHELP+',
                body: 'AirHelp+ (Lite 29,99 €, Smart 39,99 €, Pro 99,99 € par an ; Comfort 179,99 $ / Pro 249,99 $ aux USA) supprime les frais de service et d’action. Les offres vendues via des partenaires suivent leurs tarifs.',
            },
            {
                title: '6. TARIFS SPÉCIAUX',
                body: 'Si une agence de voyage règle à votre place, le calendrier de paiement ou les services inclus peuvent changer sans jamais dépasser nos pourcentages publiés.',
            },
            {
                title: '7. VERSEMENT DU MONTANT TOTAL',
                body: 'Nous vous reversons toujours la somme reçue moins nos frais. Dans l’UE, les paiements sont effectués en euros. Les autres juridictions respectent la devise requise ou éventuellement celle de résidence.',
            },
            {
                title: '8. VIREMENTS INTERNATIONAUX & CHÈQUES',
                body: 'Les virements internationaux via nos partenaires ne comportent pas de frais FlyCompense ; les frais bancaires tiers restent à votre charge. Les clients américains peuvent recevoir un chèque en USD sans coût additionnel.',
            },
            {
                title: '9. TAXE SUR LA VALEUR AJOUTÉE',
                body: 'Tous les frais affichés incluent la TVA applicable, sauf mention contraire.',
            },
            {
                title: 'Mis à jour : 24 juin 2025 · Version PL1.25',
                body: 'La version anglaise prévaut en cas de divergence.',
            },
        ],
    },
};

export default async function FeesPage() {
    const locale = (await getLocale()) as Locale;
    const copy = localizedContent[locale] ?? localizedContent.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>{copy.heroEyebrow}</p>
                <h1>{copy.heroTitle}</h1>
                <p>{copy.heroCopy}</p>
                <div className={styles.heroStats}>
                    {copy.stats.map((stat) => (
                        <div key={stat.label} className={styles.statCard}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                            <small>{stat.note}</small>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.sectionPadding} ${styles.feesIntro}`}>
                <div className={styles.feeCardGrid}>
                    {copy.feePlans.map((plan) => (
                        <div key={plan.title} className={styles.planCard}>
                            <div className={styles.planHeader}>
                                <h3>{plan.title}</h3>
                                <p>{plan.subtitle}</p>
                            </div>
                            <div className={styles.pieWrapper}>
                                <div className={styles.pieShell}>
                                    <div
                                        className={styles.pieChart}
                                        style={{
                                            background: `conic-gradient(${plan.chart.receiveColor} 0 ${plan.chart.receivePercent}%, ${plan.chart.feeColor} ${plan.chart.receivePercent}% 100%)`,
                                        }}
                                    >
                                        <div className={styles.pieCenter} />
                                    </div>
                                    <div className={`${styles.pieBadge} ${styles.pieBadgePrimary}`}>
                                        <span className={styles.badgeValue}>{plan.receiveLabel}</span>
                                        <span className={styles.badgeCaption}>{plan.receiveCopy}</span>
                                    </div>
                                    <div className={`${styles.pieBadge} ${styles.pieBadgeSecondary}`}>
                                        <span className={styles.badgeValue}>{plan.feeLabel}</span>
                                        <span className={styles.badgeCaption}>{plan.feeCopy}</span>
                                    </div>
                                </div>
                                <div className={styles.pieLegend}>
                                    <div>
                                        <span className={styles.legendValue}>{plan.receiveLabel}</span>
                                        <span className={styles.legendLabel}>{plan.receiveCopy}</span>
                                    </div>
                                    <div>
                                        <span className={styles.legendValue}>{plan.feeLabel}</span>
                                        <span className={styles.legendLabel}>{plan.feeCopy}</span>
                                    </div>
                                </div>
                            </div>
                            <ul className={styles.planList}>
                                {plan.bullets.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <div className={styles.ctaRow}>
                                <Link
                                    href={plan.cta.href}
                                    className={`${styles.ctaButton} ${plan.cta.variant === 'primary' ? styles.primaryBtn : styles.secondaryBtn}`}
                                >
                                    {plan.cta.label}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.noticeBox}>
                    <span aria-hidden="true">ℹ️</span>
                    <p>{copy.notice}</p>
                </div>
            </section>

            <section className={`${styles.sectionPadding} ${styles.exampleSection}`}>
                {copy.exampleBreakdown.map((example) => (
                    <div key={example.title} className={styles.exampleCard}>
                        <h3>{example.title}</h3>
                        <p>{example.description}</p>
                        <div className={styles.exampleAmounts}>
                            <div>
                                <strong>{example.receive}</strong>
                                <span>{example.highlight}</span>
                            </div>
                            <div>
                                <strong>{example.fee}</strong>
                                <span>{example.feeHighlight}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className={`${styles.sectionPadding} ${styles.standardSection}`}>
                <div className={styles.standardText}>
                    <h2>{copy.standardHeading}</h2>
                    <h3 className={styles.standardQuestion}>{copy.standardQuestion}</h3>
                    {copy.standardBody.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                    <p>
                        {copy.standardFooter.text}{' '}
                        <Link href="/terms-of-service" className={styles.linkInline}>
                            {copy.standardFooter.linkLabel}
                        </Link>
                    </p>
                </div>
                <div className={styles.standardImage}>
                    <img
                        src="https://img.airhelp.com/i/our-fees/desktop-fee-page-image.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660222905314"
                        alt={locale === 'fr' ? 'Spécialiste FlyCompense souriant en travaillant' : 'FlyCompense specialist smiling while working'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                    />
                </div>
            </section>

            <section className={`${styles.sectionPadding} ${styles.compareSection}`}>
                <h2>{copy.compareHeading}</h2>
                <div className={styles.compareGrid}>
                    {copy.comparisonCards.map((card) => (
                        <div key={card.heading} className={styles.compareCard}>
                            {card.badge && <span style={{ color: '#059669', fontWeight: 700 }}>{card.badge}</span>}
                            <h3>{card.heading}</h3>
                            <ul className={styles.compareList}>
                                {card.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.sectionPadding} ${styles.detailsSection}`}>
                <h2>{copy.detailsHeading}</h2>
                <div className={styles.detailsGrid}>
                    {copy.detailSections.map((detail) => (
                        <article key={detail.title} className={styles.detailCard}>
                            <h4>{detail.title}</h4>
                            <p>{detail.body}</p>
                            {detail.list && (
                                <ul>
                                    {detail.list.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

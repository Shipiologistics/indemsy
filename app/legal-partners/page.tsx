import { db } from '@/lib/db';
import { partners } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Legal Partners - FlyCompense',
    description: 'Our network of trusted legal partners across the globe.',
};

export default async function LegalPartnersPage() {
    const legalPartners = await db
        .select()
        .from(partners)
        .where(eq(partners.type, 'legal'));

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Our Legal Partners</h1>
                <p className={styles.heroSubtitle}>
                    We work with top law firms worldwide to ensure your rights are protected in every jurisdiction.
                </p>
            </section>

            <div className={styles.container}>
                {legalPartners.length === 0 ? (
                    <div className={styles.grid}>
                        {/* Placeholder for now since DB might be empty but user wants route to work */}
                        <div className={styles.partnerCard}>
                            <div className={styles.logoArea}>
                                <div className={styles.logoPlaceholder}>⚖️</div>
                            </div>
                            <h3 className={styles.name}>Global Legal Network</h3>
                            <p className={styles.description}>Global coverage for passenger rights.</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {legalPartners.map((partner) => (
                            <div key={partner.id} className={styles.partnerCard}>
                                <div className={styles.logoArea}>
                                    {partner.logo ? (
                                        <img src={partner.logo} alt={partner.name} className={styles.logo} />
                                    ) : (
                                        <div className={styles.logoPlaceholder}>⚖️</div>
                                    )}
                                </div>
                                <h3 className={styles.name}>{partner.name}</h3>
                                <p className={styles.description}>{partner.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

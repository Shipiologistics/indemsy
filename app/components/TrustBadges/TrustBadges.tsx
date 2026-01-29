'use client';

import { useTranslations } from 'next-intl';
import styles from './TrustBadges.module.css';

export default function TrustBadges() {
    const t = useTranslations('featured');

    const mediaLinks = [
        { name: "L'essentiel", url: "https://www.lessentiel.lu/fr", logo: "/media/lessentiel.svg" },
        { name: "Virgule", url: "https://www.virgule.lu/", logo: "/media/virgule.svg" },
        { name: "Le Quotidien", url: "https://lequotidien.lu/", logo: "/media/lequotidien.svg" },
        { name: "Paperjam", url: "https://paperjam.lu/", logo: "/media/paperjam.svg" },
        { name: "RTL", url: "https://www.rtl.lu/", logo: "/media/rtl.svg" }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.title}>
                    {t('title')}
                </p>
                <div className={styles.badges}>
                    {mediaLinks.map((media) => (
                        <a
                            key={media.name}
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.badge}
                        >
                            <img
                                src={media.logo}
                                alt={`${media.name} logo`}
                                className={`${styles.logo} ${media.name === "L'essentiel" ? styles.blueLogo : ''}`}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = media.name;
                                }}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

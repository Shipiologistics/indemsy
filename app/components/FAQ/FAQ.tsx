'use client';

import { useTranslations } from 'next-intl';
import styles from './FAQ.module.css';
import FaqAccordion from '../FaqAccordion/FaqAccordion';

export default function FAQ() {
    const t = useTranslations('faq');

    const faqs = [
        { question: t('q1'), answer: t('a1') },
        { question: t('q2'), answer: t('a2') },
        { question: t('q3'), answer: t('a3') },
        { question: t('q4'), answer: t('a4') },
        { question: t('q5'), answer: t('a5') },
        { question: t('q6'), answer: t('a6') },
    ];

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>
                </div>

                <FaqAccordion items={faqs} />

                <div className={styles.cta}>
                    <p className={styles.ctaText}>{t('moreQuestions')}</p>
                    <a href="/contact-us" className={styles.ctaLink}>
                        {t('visitHelp')} →
                    </a>
                </div>
            </div>
        </section>
    );
}

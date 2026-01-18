'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FAQ.module.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const t = useTranslations('faq');

    const faqs = [
        { question: t('q1'), answer: t('a1') },
        { question: t('q2'), answer: t('a2') },
        { question: t('q3'), answer: t('a3') },
        { question: t('q4'), answer: t('a4') },
        { question: t('q5'), answer: t('a5') },
        { question: t('q6'), answer: t('a6') },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('title')}</h2>
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                        >
                            <button
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <span className={styles.faqIcon}>
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div className={styles.faqAnswer}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <p className={styles.ctaText}>{t('moreQuestions')}</p>
                    <a href="#" className={styles.ctaLink}>
                        {t('visitHelp')} →
                    </a>
                </div>
            </div>
        </section>
    );
}

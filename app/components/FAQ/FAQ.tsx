'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: 'Why should I claim with FlyCompensate?',
        answer: "Airlines can make claiming compensation tricky — delaying or rejecting claims and turning it into a frustrating, time-consuming process. That's where we come in. We handle the paperwork, negotiations, and all the hassle, so you don't have to. Our experts know air passenger rights laws inside and out, maximizing your chances of winning. And we only charge a service fee if we successfully secure your compensation.",
    },
    {
        question: 'What do I need to claim compensation?',
        answer: "Having the right documents makes your claim stronger. Essential documents include: your boarding pass (including any passes for alternative flights), your booking confirmation email or receipt (as proof of your reservation). Useful extras include: the reason your flight was disrupted, receipts for extra expenses, the final arrival time of your flight, any emails or notifications from the airline, and a photo of your ID (some airlines ask for it).",
    },
    {
        question: 'Can I claim compensation for the people I traveled with?',
        answer: "Yes! You can claim for friends, family, children, and colleagues. Each person you traveled with could also be eligible for up to $650 compensation — just include them in your claim.",
    },
    {
        question: 'Is there a time limit to make my claim?',
        answer: "Time limits vary by country, but in most cases, you can claim up to three years after the disruption. We recommend submitting your claim as soon as possible to avoid missing your window of opportunity.",
    },
    {
        question: 'How long does it take to get my compensation?',
        answer: "The timeline varies depending on the airline and complexity of the case. Simple cases can be resolved in 2-4 weeks, while more complex cases may take several months. We'll keep you updated throughout the entire process.",
    },
    {
        question: 'What if the airline rejects my claim?',
        answer: "Don't worry! If the airline rejects your claim, we can pursue legal action on your behalf at no extra cost to you. Our legal team has extensive experience in air passenger rights and has successfully challenged thousands of airline rejections.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Frequently Asked Questions</h2>
                    <p className={styles.subtitle}>
                        Everything you need to know about claiming flight compensation
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
                    <p className={styles.ctaText}>Have more questions?</p>
                    <a href="#" className={styles.ctaLink}>
                        Visit our help center →
                    </a>
                </div>
            </div>
        </section>
    );
}

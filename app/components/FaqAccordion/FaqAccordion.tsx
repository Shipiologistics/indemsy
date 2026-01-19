'use client';
import { useState } from 'react';
import styles from './FaqAccordion.module.css';

interface FaqItem {
    question: string;
    answer: React.ReactNode;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <div key={index} className={`${styles.item} ${openIndex === index ? styles.open : ''}`}>
                    <button
                        className={styles.question}
                        onClick={() => toggle(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.question}</span>
                        <span className={styles.icon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                    <div className={styles.answerWrapper} aria-hidden={openIndex !== index}>
                        <div className={styles.answer}>
                            <div className={styles.answerContent}>
                                {item.answer}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

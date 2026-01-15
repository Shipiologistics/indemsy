'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HowItWorks.module.css';

const steps = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" fillRule="evenodd" d="M10 2a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zm8.994 2.205a1.001 1.001 0 0 0-.564 1.762l1.424 1.207a1.001 1.001 0 0 0 1.293-1.528L19.723 4.44a1 1 0 0 0-.729-.234M12 5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9m0 3a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1" clipRule="evenodd" />
            </svg>
        ),
        step: 'Step 1',
        title: 'Claim in 2 minutes',
        description: "We make sure everything's quick and easy, and that your data's safe.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" fillRule="evenodd" d="m11.188 1.173-7 3.11A2 2 0 0 0 3 6.113v4.7c0 7.83 6.439 11.486 9 12 2.561-.515 9-4.17 9-12v-4.7a2 2 0 0 0-1.188-1.828l-7-3.111a2 2 0 0 0-1.624 0m-.895 14.346-2.77-2.77a1 1 0 0 1 1.414-1.415L11 13.399l5.085-5.085a1 1 0 0 1 1.414 1.413l-5.792 5.792a1 1 0 0 1-1.414 0" clipRule="evenodd" />
            </svg>
        ),
        step: 'Step 2',
        title: 'We handle everything',
        description: "We'll build a strong case and negotiate with the airline, so you don't have to.",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" fillRule="evenodd" d="M19.625 3.01a1 1 0 0 0-.396.022L3.99 7.001h7.938l5.957-1.55c.253.371.658.61 1.107.65l.236.9h2.067l-.848-3.252a1 1 0 0 0-.822-.738M3 9a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1zm1.912 2h14.176a1.5 1.5 0 0 0 .912.913v6.176a1.5 1.5 0 0 0-.912.912H4.912A1.5 1.5 0 0 0 4 18.089v-6.176a1.5 1.5 0 0 0 .912-.912M12 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6m-5 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clipRule="evenodd" />
            </svg>
        ),
        step: 'Step 3',
        title: 'You win compensation',
        description: 'The airline pays us and we make a transfer straight to your account.',
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stepsContainerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = useState(0);
    const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !stepsContainerRef.current) return;

            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.6; // Trigger when element reaches 60% from top

            // Check each step individually
            const newActiveSteps = stepRefs.current.map((stepRef) => {
                if (!stepRef) return false;
                const rect = stepRef.getBoundingClientRect();
                return rect.top < triggerPoint;
            });

            setActiveSteps(newActiveSteps);

            // Calculate progress line height based on active steps
            const stepsContainer = stepsContainerRef.current;
            const containerRect = stepsContainer.getBoundingClientRect();

            // Get positions of first and last step icons
            const firstStep = stepRefs.current[0];
            const lastStep = stepRefs.current[2];

            if (!firstStep || !lastStep) return;

            const firstStepRect = firstStep.getBoundingClientRect();
            const lastStepRect = lastStep.getBoundingClientRect();

            // Total height from first to last step
            const totalHeight = lastStepRect.top - firstStepRect.top;

            // Calculate how much of the line should be filled
            let fillHeight = 0;

            if (newActiveSteps[2]) {
                // All steps active - fill to 100%
                fillHeight = totalHeight;
            } else if (newActiveSteps[1]) {
                // Steps 1 and 2 active
                const secondStep = stepRefs.current[1];
                if (secondStep) {
                    const secondStepRect = secondStep.getBoundingClientRect();
                    fillHeight = secondStepRect.top - firstStepRect.top;
                }
            } else if (newActiveSteps[0]) {
                // Only step 1 active - small fill
                fillHeight = 0;
            }

            // Convert to percentage
            const progressPercent = totalHeight > 0 ? (fillHeight / totalHeight) : 0;
            setProgress(Math.min(1, Math.max(0, progressPercent)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.section} id="how-it-works" ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Column - Title */}
                    <div className={styles.leftColumn}>
                        <div className={styles.badge}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M15 18H5V6h7V1H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-5h-2z" />
                                <path fill="currentColor" d="m16 14 5-5-1.41-1.41L17 10.17V3h-2v7.17l-2.59-2.58L11 9z" />
                            </svg>
                            <span>How it works</span>
                        </div>
                        <h2 className={styles.title}>
                            <span className={styles.highlight}>Your 3 steps</span> to compensation
                        </h2>
                        <p className={styles.subtitle}>
                            Getting flight compensation has never been easier. FlyCompensate takes care of the hard work and you get paid without the hassle.
                        </p>
                    </div>

                    {/* Right Column - Steps */}
                    <div className={styles.rightColumn}>
                        <div className={styles.stepsWrapper} ref={stepsContainerRef}>
                            {/* Progress Line Background */}
                            <div className={styles.progressLineBackground}></div>

                            {/* Progress Line Fill */}
                            <div
                                className={styles.progressLineFill}
                                style={{ transform: `scaleY(${progress})` }}
                            ></div>

                            {/* Steps */}
                            <div className={styles.steps}>
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className={styles.stepItem}
                                        ref={(el) => { stepRefs.current[index] = el; }}
                                    >
                                        <div
                                            className={`${styles.stepIcon} ${activeSteps[index] ? styles.active : ''}`}
                                        >
                                            {step.icon}
                                        </div>
                                        <div
                                            className={styles.stepContent}
                                            style={{
                                                opacity: activeSteps[index] ? 1 : 1,
                                                transform: activeSteps[index] ? 'none' : 'none'
                                            }}
                                        >
                                            <span className={styles.stepLabel}>{step.step}</span>
                                            <h3 className={styles.stepTitle}>{step.title}</h3>
                                            <p className={styles.stepDescription}>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

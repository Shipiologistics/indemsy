'use client';

import styles from './FooterAnimation.module.css';

export default function FooterAnimation() {
    return (
        <div className={styles.animationContainer}>
            <svg
                className={styles.plane}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>

            {/* Clouds */}
            <svg className={`${styles.cloud} ${styles.cloud1}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9A9 9 0 017 16z" />
            </svg>

            <svg className={`${styles.cloud} ${styles.cloud2}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9A9 9 0 017 16z" />
            </svg>

            <svg className={`${styles.cloud} ${styles.cloud3}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9A9 9 0 017 16z" />
            </svg>
        </div>
    );
}

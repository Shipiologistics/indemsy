import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loaderWrapper}>
                <div className={styles.planeIcon}>✈️</div>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Preparing your journey...</p>
            </div>
        </div>
    );
}

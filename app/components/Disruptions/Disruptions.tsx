'use client';

import styles from './Disruptions.module.css';

const disruptions = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12.183 15.184a5.96 5.96 0 0 1 1.962-2.547 5.8 5.8 0 0 1 2.977-1.13l-3.736-2.379V3.932a1.97 1.97 0 0 0-.555-1.367A1.9 1.9 0 0 0 11.49 2c-.503 0-.986.203-1.343.565a1.96 1.96 0 0 0-.558 1.367v5.196l-7.124 4.52a1.035 1.035 0 0 0-.377 1.282.984.984 0 0 0 1.198.536l6.303-2v5.197l-1.57 1.203a.8.8 0 0 0-.299.452.85.85 0 0 0 .056.565.8.8 0 0 0 .382.384.8.8 0 0 0 .555.056l2.8-.717 1.318.339a6.068 6.068 0 0 1-.626-5.744z" />
                <path fill="currentColor" d="M21.679 15.754a4.5 4.5 0 0 0-.71-1.17 4.37 4.37 0 0 0-2.924-1.574 4.34 4.34 0 0 0-3.174.948 4.46 4.46 0 0 0-1.49 2.26 4.5 4.5 0 0 0-.184 1.281c-.002.664.14 1.32.417 1.92.276.601.68 1.132 1.182 1.555.502.422 1.09.726 1.721.889.632.163 1.29.18 1.93.053a4.4 4.4 0 0 0 1.766-.793 4.5 4.5 0 0 0 1.263-1.486 4.55 4.55 0 0 0 .191-3.832zm-1.353 2.864a2.97 2.97 0 0 1-1.109 1.344 2.896 2.896 0 0 1-3.707-.374 3.038 3.038 0 0 1-.367-3.778 2.94 2.94 0 0 1 1.32-1.1q.18-.08.37-.125a2.87 2.87 0 0 1 1.516 0 2.9 2.9 0 0 1 1.456.932 3.057 3.057 0 0 1 .488 3.101z" />
            </svg>
        ),
        title: 'Flight delays',
        description: 'If you were delayed over 3 hours, check if we can get you up to $650 compensation.',
        image: 'https://img.airhelp.com/i/revamp/delay-illustration.svg',
        stat: '1 in 4',
        statText: 'flights is delayed',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="m12.738 17.516.818.818-.818.817a2.54 2.54 0 0 0-.73 2.074l-.015-.004-2.952.738a.842.842 0 0 1-.707-1.49l1.66-1.243v-5.354L3.357 15.94a1.044 1.044 0 0 1-.864-1.883l7.503-4.685V3.998a1.998 1.998 0 0 1 3.997 0v5.374l6.114 3.82a2.53 2.53 0 0 0-2.132.724l-.818.817-.818-.818a2.547 2.547 0 1 0-3.6 3.6" />
                <path fill="currentColor" d="m18.637 18.334 1.878 1.877a1.046 1.046 0 0 1-1.48 1.48l-1.878-1.877-1.88 1.88a1.04 1.04 0 0 1-1.141.226 1.05 1.05 0 0 1-.34-.227l-.024-.026a1.046 1.046 0 0 1 .024-1.455l1.88-1.878-1.879-1.878a1.047 1.047 0 0 1 1.481-1.481l1.878 1.878 1.878-1.878a1.046 1.046 0 0 1 1.796.738 1.05 1.05 0 0 1-.315.743z" />
            </svg>
        ),
        title: 'Flight cancellations',
        description: 'If your flight was canceled fewer than 14 days before departure, you might be owed up to $650.',
        image: 'https://img.airhelp.com/i/revamp/cancel-illustration-us.png',
        stat: '28M+ flights',
        statText: 'were canceled last year',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" fillRule="evenodd" d="M7.384 4q-.135.004-.268.043a1.035 1.035 0 0 0-.597 1.504l3.353 5.85-5.094 1.344-1.484-1.248a.788.788 0 0 0-1.186 1.002l1.29 2.199a2 2 0 0 0 2.234.924l14.724-3.88.006-.001a1.5 1.5 0 1 0-.646-2.926v-.002l-5.23 1.377-6.368-5.91A1.03 1.03 0 0 0 7.384 4m-4.18 14.76a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2z" clipRule="evenodd" />
            </svg>
        ),
        title: 'Missed connections',
        description: 'If you missed a connection and arrived 3+ hours late, you could get up to $650.',
        image: 'https://img.airhelp.com/i/revamp/missed-illustration.svg',
        stat: '43M+',
        statText: 'passengers miss connections every year',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m0 15a1 1 0 0 1-1-1v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1m.5-8h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5" clipRule="evenodd" />
            </svg>
        ),
        title: 'Other',
        description: 'We help you understand your rights during flight disruptions like denied boarding and strikes.',
        image: 'https://img.airhelp.com/i/revamp/other-disruption-illustration-us.png',
        stat: '38M+',
        statText: 'passengers were eligible for compensation last year',
    },
];

export default function Disruptions() {
    return (
        <section className={styles.section} id="disruptions">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.badge}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" fillRule="evenodd" d="M9.062 2c-.704 0-1.207.682-.998 1.355L9.7 7.461 16.239 14H20a2 2 0 1 0 0-4h-5L9.95 2.49A1.05 1.05 0 0 0 9.062 2M3.707 4.707A.999.999 0 0 0 3 6.414L6.586 10H5L3.619 8.303C3.474 8.125 3.338 8 3.109 8h-.61a.5.5 0 0 0-.484.621L3 12l-.985 3.379A.5.5 0 0 0 2.5 16h.609c.229 0 .365-.125.51-.303L4.999 14h5.49l-2.446 6.645a1.046 1.046 0 0 0 1.886.865l3.315-4.852L17.586 21A.999.999 0 1 0 19 19.586l-5.602-5.602L9.429 10h-.015l-5-5a1 1 0 0 0-.707-.293" clipRule="evenodd" />
                        </svg>
                        flight issues
                    </span>
                    <h2 className={styles.title}>Types of flight disruptions</h2>
                    <p className={styles.subtitle}>
                        We're experts in all flight disruptions and all global regulations,
                        and we'll endeavour to get you the compensation you're owed.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className={styles.grid}>
                    {disruptions.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDescription}>{item.description}</p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.cardImage}
                                loading="lazy"
                            />
                            <p className={styles.cardStat}>
                                <span className={styles.statHighlight}>{item.stat}</span> {item.statText}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { CSSProperties } from 'react';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './FloatingActions.module.css';

interface FloatingActionsProps {
  top?: string;
  right?: string;
}

export default function FloatingActions({
  top = '26px',
  right = 'calc(2in + clamp(1.25rem, 3vw, 4.5rem))',
}: FloatingActionsProps) {
  const widgetStyle = {
    '--floating-actions-top': top,
    '--floating-actions-right': right,
  } as CSSProperties & {
    '--floating-actions-top': string;
    '--floating-actions-right': string;
  };

  return (
    <div className={styles.widget} style={widgetStyle}>
      <LanguageSelector />

      <Link href="/dashboard" className={styles.userButton} aria-label="User account">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke="#0E1F3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="#0E1F3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}


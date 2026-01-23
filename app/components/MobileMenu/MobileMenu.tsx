'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './MobileMenu.module.css';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('header');

  const primaryLinks = [
    { href: '/check-compensation', label: t('getCompensation') },
    { href: '/plus', label: t('flycompensePlus') },
    { href: '/about-us', label: t('aboutUs') },
  ];

  const rightLinks = [
    { href: '/air-passenger-rights', label: t('airPassengerRights') },
    { href: '/flight-delay-compensation', label: t('flightDelayCompensation') },
    { href: '/flight-cancellation-compensation', label: t('flightCancellationCompensation') },
    { href: '/missed-connection-compensation', label: t('missedConnectionCompensation') },
    { href: '/overbooking-compensation', label: t('overbookingCompensation') },
    { href: '/denied-boarding-compensation', label: t('deniedBoardingCompensation') },
    { href: '/delayed-baggage-compensation', label: t('delayedBaggageCompensation') },
    { href: '/airline-strike-compensation', label: t('airlineStrikeCompensation') },
    { href: '/passengers-with-disabilities', label: t('passengersWithDisabilities') },
    { href: '/airlines', label: t('airlines') },
    { href: '/airports', label: t('airports') },
  ];

  const closeMenu = () => setIsOpen(false);
  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
        aria-label="Toggle menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={closeMenu}>
          <aside className={styles.sidebar} onClick={stopPropagation}>
            <div className={styles.sidebarHeader}>
              <span className={styles.badge}>{t('knowYourRights')}</span>
              <button className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
                ×
              </button>
            </div>

            <nav className={styles.sidebarNav}>
              <div className={styles.section}>
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.navItem} onClick={closeMenu}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={styles.sectionSecondary}>
                {rightLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.secondaryItem} onClick={closeMenu}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

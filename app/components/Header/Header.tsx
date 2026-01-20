'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const t = useTranslations('header');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            <img
              src="/ChatGPT_Image_Jan_20__2026__02_21_19_PM-removebg-preview.png"
              alt="Indemsy Logo"
              className={styles.logoImage}
            />
          </Link>

          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/check-compensation" className={styles.navLink}>{t('getCompensation')}</Link>
            <Link href="/plus" className={styles.navLink}>{t('indemsyPlus')}</Link>

            <div
              className={`${styles.dropdownContainer} ${isDropdownOpen ? styles.active : ''}`}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <button className={`${styles.navLink} ${styles.dropdownButton}`}>
                {t('knowYourRights')}
                <span className={styles.arrow}>▼</span>
              </button>
              <div className={styles.dropdownMenu}>
                <Link href="/air-passenger-rights" className={styles.dropdownItem}>{t('airPassengerRights')}</Link>
                <Link href="/flight-delay-compensation" className={styles.dropdownItem}>{t('flightDelayCompensation')}</Link>
                <Link href="/flight-cancellation-compensation" className={styles.dropdownItem}>{t('flightCancellationCompensation')}</Link>
                <Link href="/missed-connection-compensation" className={styles.dropdownItem}>{t('missedConnectionCompensation')}</Link>
                <Link href="/overbooking-compensation" className={styles.dropdownItem}>{t('overbookingCompensation')}</Link>
                <Link href="/denied-boarding-compensation" className={styles.dropdownItem}>{t('deniedBoardingCompensation')}</Link>
                <Link href="/delayed-baggage-compensation" className={styles.dropdownItem}>{t('delayedBaggageCompensation')}</Link>
                <Link href="/airline-strike-compensation" className={styles.dropdownItem}>{t('airlineStrikeCompensation')}</Link>
                <Link href="/passengers-with-disabilities" className={styles.dropdownItem}>{t('passengersWithDisabilities')}</Link>
                <Link href="/airlines" className={styles.dropdownItem}>{t('airlines')}</Link>
                <Link href="/airports" className={styles.dropdownItem}>{t('airports')}</Link>
              </div>
            </div>

            <Link href="/app" className={styles.navLink}>{t('mobileApp')}</Link>
            <Link href="/about-us" className={styles.navLink}>{t('aboutUs')}</Link>
          </nav>
        </div>

        <div className={styles.actions}>
          <LanguageSelector />
          <button className={styles.userButton} aria-label="User account">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#0E1F3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#0E1F3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}></span>
          </button>
        </div>

      </div>
    </header>
  );
}

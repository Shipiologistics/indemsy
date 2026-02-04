'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import FloatingActions from '../FloatingActions/FloatingActions';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
          <Link href="/" className={styles.logo} prefetch={false}>
            <img
              src="/ChatGPT_Image_Jan_20__2026__02_21_19_PM-removebg-preview.png"
              alt="FlyCompense Logo"
              className={styles.logoImage}
            />
          </Link>

          <nav className={styles.nav}>
            <div className={styles.navPanel}>
              <Link href="/claim" className={styles.navLink} prefetch={false}>{t('getCompensation')}</Link>
              <Link href="/plus" className={styles.navLink} prefetch={false}>{t('flycompensePlus')}</Link>

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
                  <Link href="/air-passenger-rights" className={styles.dropdownItem} prefetch={false}>{t('airPassengerRights')}</Link>
                  <Link href="/flight-delay-compensation" className={styles.dropdownItem} prefetch={false}>{t('flightDelayCompensation')}</Link>
                  <Link href="/flight-cancellation-compensation" className={styles.dropdownItem} prefetch={false}>{t('flightCancellationCompensation')}</Link>
                  <Link href="/missed-connection-compensation" className={styles.dropdownItem} prefetch={false}>{t('missedConnectionCompensation')}</Link>
                  <Link href="/overbooking-compensation" className={styles.dropdownItem} prefetch={false}>{t('overbookingCompensation')}</Link>
                  <Link href="/denied-boarding-compensation" className={styles.dropdownItem} prefetch={false}>{t('deniedBoardingCompensation')}</Link>
                  <Link href="/delayed-baggage-compensation" className={styles.dropdownItem} prefetch={false}>{t('delayedBaggageCompensation')}</Link>
                  <Link href="/airline-strike-compensation" className={styles.dropdownItem} prefetch={false}>{t('airlineStrikeCompensation')}</Link>
                  <Link href="/passengers-with-disabilities" className={styles.dropdownItem} prefetch={false}>{t('passengersWithDisabilities')}</Link>
                  <Link href="/airlines" className={styles.dropdownItem} prefetch={false}>{t('airlines')}</Link>
                  <Link href="/airports" className={styles.dropdownItem} prefetch={false}>{t('airports')}</Link>
                </div>
              </div>

              <Link href="/about-us" className={styles.navLink} prefetch={false}>{t('aboutUs')}</Link>
            </div>
          </nav>
        </div>

        <div className={styles.rightRail}>
          <FloatingActions />
          <MobileMenu />
        </div>

      </div>
    </header>
  );
}

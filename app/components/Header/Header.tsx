'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✈</span>
          <span className={styles.logoText}>Indemsy</span>
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <Link href="#how-it-works" className={styles.navLink}>{t('howItWorks')}</Link>
          <Link href="#compensation" className={styles.navLink}>{t('compensation')}</Link>
          <Link href="#disruptions" className={styles.navLink}>{t('flightDisruptions')}</Link>
          <Link href="#testimonials" className={styles.navLink}>{t('reviews')}</Link>
          <Link href="#faq" className={styles.navLink}>{t('faq')}</Link>
        </nav>

        <div className={styles.actions}>
          <LanguageSelector />
          <Link href="#check" className={styles.ctaButton}>
            {t('checkCompensation')}
          </Link>
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}></span>
        </button>
      </div>
    </header>
  );
}

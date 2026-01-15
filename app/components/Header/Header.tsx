'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="#how-it-works" className={styles.navLink}>How It Works</Link>
          <Link href="#compensation" className={styles.navLink}>Compensation</Link>
          <Link href="#disruptions" className={styles.navLink}>Flight Disruptions</Link>
          <Link href="#testimonials" className={styles.navLink}>Reviews</Link>
          <Link href="#faq" className={styles.navLink}>FAQ</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="#check" className={styles.ctaButton}>
            Check Compensation
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

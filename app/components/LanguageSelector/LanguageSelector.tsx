'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LanguageSelector.module.css';

const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState('en');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Get current locale from cookie
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1];

        if (cookieLocale) {
            setCurrentLocale(cookieLocale);
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (locale: string) => {
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
        setCurrentLocale(locale);
        setIsOpen(false);
        router.refresh();
    };

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    return (
        <div className={styles.wrapper} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select language"
            >
                <span className={styles.flag}>{currentLanguage.flag}</span>
                <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`${styles.option} ${lang.code === currentLocale ? styles.optionActive : ''}`}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            <span className={styles.flag}>{lang.flag}</span>
                            <span className={styles.name}>{lang.name}</span>
                            {lang.code === currentLocale && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

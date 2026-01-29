'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { countries, Country } from '@/app/data/countries';
import styles from './CountrySelect.module.css';

interface CountrySelectProps {
    value: string; // ISO code (e.g., 'US')
    onChange: (isoCode: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCountry = useMemo(() =>
        countries.find(c => c.code === value) || countries.find(c => c.code === 'US') || countries[0],
        [value]
    );

    const filteredCountries = useMemo(() => {
        const term = search.toLowerCase();
        return countries.filter(c =>
            c.name.toLowerCase().includes(term) ||
            c.code.toLowerCase().includes(term) ||
            c.dial_code.includes(term)
        );
    }, [search]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getFlagUrl = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                type="button"
                className={styles.selectedButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={getFlagUrl(selectedCountry.code)}
                    alt={selectedCountry.name}
                    className={styles.flag}
                    loading="lazy"
                />
                <span className={styles.dialCode}>{selectedCountry.dial_code}</span>
                <span className={styles.arrow}>▼</span>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search country..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    {filteredCountries.map((country) => (
                        <div
                            key={country.code}
                            className={`${styles.option} ${country.code === value ? styles.selected : ''}`}
                            onClick={() => {
                                onChange(country.code);
                                setIsOpen(false);
                                setSearch('');
                            }}
                        >
                            <img
                                src={getFlagUrl(country.code)}
                                alt={country.name}
                                className={styles.flag}
                                loading="lazy"
                            />
                            <span className={styles.optionName}>{country.name}</span>
                            <span className={styles.optionCode}>{country.dial_code}</span>
                        </div>
                    ))}
                    {filteredCountries.length === 0 && (
                        <div style={{ padding: '8px 12px', color: '#64748b', fontSize: '14px' }}>
                            No countries found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

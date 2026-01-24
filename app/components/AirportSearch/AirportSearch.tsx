'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AirportSearch.module.css';

interface Airport {
    iata: string;
    icao: string;
    name: string;
    municipalityName: string;
    countryCode: string;
    label: string;
}

interface AirportSearchProps {
    placeholder: string;
    icon: React.ReactNode;
    value: Airport | null;
    onChange: (airport: Airport | null) => void;
    id: string;
}

export default function AirportSearch({
    placeholder,
    icon,
    value,
    onChange,
    id
}: AirportSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Airport[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const isSelection = useRef(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search airports when query changes
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // If this update is due to a selection, reset flag and do NOT search/open
        if (isSelection.current) {
            isSelection.current = false;
            return;
        }

        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/airports/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.items || []);
                setIsOpen(true);
                setHighlightedIndex(-1);
            } catch (error) {
                console.error('Error searching airports:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (value && newQuery !== value.label) {
            onChange(null);
        }
    };

    const handleSelect = (airport: Airport) => {
        isSelection.current = true; // Mark as selection to prevent re-search
        onChange(airport);
        setQuery(airport.label);
        setIsOpen(false);
        setResults([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelect(results[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const handleFocus = () => {
        if (results.length > 0) {
            setIsOpen(true);
        }
    };

    const displayValue = value ? value.label : query;

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.inputContainer}>
                <span className={styles.icon}>{icon}</span>
                <input
                    ref={inputRef}
                    type="text"
                    id={id}
                    className={styles.input}
                    placeholder={placeholder}
                    value={displayValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls={`${id}-listbox`}
                    aria-expanded={isOpen}
                />
                {isLoading && (
                    <span className={styles.loader}></span>
                )}
                {value && (
                    <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => {
                            onChange(null);
                            setQuery('');
                            inputRef.current?.focus();
                        }}
                        aria-label="Clear selection"
                    >
                        ✕
                    </button>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <ul
                    id={`${id}-listbox`}
                    className={styles.dropdown}
                    role="listbox"
                >
                    {results.map((airport, index) => (
                        <li
                            key={`${airport.iata || airport.icao}-${index}`}
                            className={`${styles.option} ${index === highlightedIndex ? styles.highlighted : ''}`}
                            onClick={() => handleSelect(airport)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            role="option"
                            aria-selected={index === highlightedIndex}
                        >
                            <span className={styles.airportCode}>
                                {airport.iata || airport.icao}
                            </span>
                            <span className={styles.airportInfo}>
                                <span className={styles.airportName}>{airport.name}</span>
                                {airport.municipalityName && (
                                    <span className={styles.airportCity}>{airport.municipalityName}</span>
                                )}
                            </span>
                            <span className={styles.countryCode}>{airport.countryCode}</span>
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                <div className={styles.noResults}>
                    No airports found for "{query}"
                </div>
            )}
        </div>
    );
}

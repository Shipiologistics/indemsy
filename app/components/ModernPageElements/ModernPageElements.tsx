'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import styles from './ModernPageElements.module.css';

// ============ HERO VARIANTS ============

interface GradientHeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    imageSrc?: string;
    imageAlt?: string;
    chips?: { icon: string; text: string }[];
    variant?: 'blue' | 'purple' | 'orange';
}

export function GradientHero({
    title,
    subtitle,
    ctaText,
    ctaHref = '/claim',
    imageSrc,
    imageAlt = 'Hero image',
    chips = [],
    variant = 'blue'
}: GradientHeroProps) {
    return (
        <section className={`${styles.gradientHero} ${styles[`hero${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            <div className={styles.heroPattern}></div>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{title}</h1>
                    {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
                    {chips.length > 0 && (
                        <div className={styles.heroChips}>
                            {chips.map((chip, i) => (
                                <span key={i} className={styles.heroChip}>
                                    <span className={styles.chipIcon}>{chip.icon}</span>
                                    {chip.text}
                                </span>
                            ))}
                        </div>
                    )}
                    {ctaText && (
                        <a href={ctaHref} className={styles.heroCta}>
                            {ctaText}
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M13.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 1 1 0-2h9.586l-2.293-2.293a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </a>
                    )}
                </div>
                {imageSrc && (
                    <div className={styles.heroImageWrapper}>
                        <div className={styles.heroImageGlow}></div>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={480}
                            height={320}
                            className={styles.heroImage}
                            priority
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

// ============ GLASS CARDS ============

interface GlassCardProps {
    children: ReactNode;
    variant?: 'light' | 'dark' | 'gradient';
    className?: string;
}

export function GlassCard({ children, variant = 'light', className = '' }: GlassCardProps) {
    return (
        <div className={`${styles.glassCard} ${styles[`glass${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${className}`}>
            {children}
        </div>
    );
}

// ============ FEATURE GRID ============

interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface FeatureGridProps {
    items: FeatureItem[];
    columns?: 2 | 3 | 4;
}

export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
    return (
        <div className={`${styles.featureGrid} ${styles[`cols${columns}`]}`}>
            {items.map((item, index) => (
                <div key={index} className={styles.featureCard}>
                    <div className={styles.featureIcon}>{item.icon}</div>
                    <h3 className={styles.featureTitle}>{item.title}</h3>
                    <p className={styles.featureDesc}>{item.description}</p>
                </div>
            ))}
        </div>
    );
}

// ============ STATS BAR ============

interface StatItem {
    value: string;
    label: string;
    icon?: string;
}

interface StatsBarProps {
    stats: StatItem[];
    variant?: 'light' | 'gradient';
}

export function StatsBar({ stats, variant = 'gradient' }: StatsBarProps) {
    return (
        <div className={`${styles.statsBar} ${styles[`stats${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                    {stat.icon && <span className={styles.statIcon}>{stat.icon}</span>}
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                </div>
            ))}
        </div>
    );
}

// ============ MODERN TABLE WITH ICONS ============

interface TableColumn {
    key: string;
    header: string;
    icon?: string;
}

interface ModernTableProps {
    columns: TableColumn[];
    rows: Record<string, string | ReactNode>[];
    variant?: 'default' | 'striped' | 'glassmorphic';
}

export function ModernTable({ columns, rows, variant = 'glassmorphic' }: ModernTableProps) {
    return (
        <div className={`${styles.tableWrapper} ${styles[`table${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            <table className={styles.modernTable}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>
                                {col.icon && <span className={styles.colIcon}>{col.icon}</span>}
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ============ COUNTRY/FLAG CARDS ============

interface CountryCardItem {
    flag: string;
    name: string;
    description?: string;
    href?: string;
}

interface CountryCardsProps {
    items: CountryCardItem[];
}

export function CountryCards({ items }: CountryCardsProps) {
    return (
        <div className={styles.countryGrid}>
            {items.map((item, index) => (
                <a key={index} href={item.href || '#'} className={styles.countryCard}>
                    <div className={styles.countryFlagWrapper}>
                        <Image
                            src={item.flag}
                            alt={item.name}
                            width={48}
                            height={36}
                            className={styles.countryFlag}
                        />
                    </div>
                    <div className={styles.countryInfo}>
                        <span className={styles.countryName}>{item.name}</span>
                        {item.description && (
                            <span className={styles.countryDesc}>{item.description}</span>
                        )}
                    </div>
                    <svg className={styles.countryArrow} viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M9.293 18.707a1 1 0 0 1 0-1.414L14.586 12 9.293 6.707a1 1 0 0 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0z" />
                    </svg>
                </a>
            ))}
        </div>
    );
}

// ============ GRADIENT DIVIDER ============

interface GradientDividerProps {
    variant?: 'wave' | 'diagonal' | 'dots';
}

export function GradientDivider({ variant = 'wave' }: GradientDividerProps) {
    return (
        <div className={`${styles.gradientDivider} ${styles[`divider${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            {variant === 'wave' && (
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" />
                </svg>
            )}
        </div>
    );
}

// ============ CTA BANNER ============

interface CtaBannerProps {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonHref?: string;
    chips?: string[];
    variant?: 'gradient' | 'glass' | 'solid';
}

export function CtaBanner({
    title,
    subtitle,
    buttonText,
    buttonHref = '/claim',
    chips = [],
    variant = 'gradient'
}: CtaBannerProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (buttonHref.startsWith('#')) {
            e.preventDefault();
            const targetId = buttonHref.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={`${styles.ctaBanner} ${styles[`cta${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            <div className={styles.ctaContent}>
                <h3 className={styles.ctaTitle}>{title}</h3>
                {subtitle && <p className={styles.ctaSubtitle}>{subtitle}</p>}
                {chips.length > 0 && (
                    <div className={styles.ctaChips}>
                        {chips.map((chip, i) => (
                            <span key={i} className={styles.ctaChip}>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                {chip}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <a href={buttonHref} className={styles.ctaButton} onClick={handleClick}>
                {buttonText}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M13.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 1 1 0-2h9.586l-2.293-2.293a1 1 0 0 1 0-1.414z" />
                </svg>
            </a>
        </div>
    );
}

// ============ ANIMATED ICON LIST ============

interface IconListItem {
    icon: string;
    text: string;
    highlight?: boolean;
}

interface IconListProps {
    items: IconListItem[];
    variant?: 'check' | 'number' | 'custom';
}

export function IconList({ items, variant = 'check' }: IconListProps) {
    return (
        <ul className={`${styles.iconList} ${styles[`list${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            {items.map((item, index) => (
                <li key={index} className={`${styles.iconListItem} ${item.highlight ? styles.highlighted : ''}`}>
                    <span className={styles.iconListIcon}>
                        {variant === 'number' ? index + 1 : (variant === 'check' ? '✓' : item.icon)}
                    </span>
                    <span className={styles.iconListText}>{item.text}</span>
                </li>
            ))}
        </ul>
    );
}

// ============ INFO CALLOUT ============

interface InfoCalloutProps {
    icon?: string;
    title?: string;
    text: string;
    variant?: 'info' | 'success' | 'warning' | 'tip';
}

export function InfoCallout({ icon, title, text, variant = 'info' }: InfoCalloutProps) {
    const defaultIcons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        tip: '💡'
    };

    return (
        <div className={`${styles.infoCallout} ${styles[`callout${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
            <span className={styles.calloutIcon}>{icon || defaultIcons[variant]}</span>
            <div className={styles.calloutContent}>
                {title && <strong className={styles.calloutTitle}>{title}</strong>}
                <p className={styles.calloutText}>{text}</p>
            </div>
        </div>
    );
}

// ============ COMPENSATION AMOUNT CARDS ============

interface CompensationCardItem {
    amount: string;
    distance: string;
    icon?: string;
}

interface CompensationCardsProps {
    items: CompensationCardItem[];
    title?: string;
}

export function CompensationCards({ items, title }: CompensationCardsProps) {
    return (
        <div className={styles.compensationSection}>
            {title && <h3 className={styles.compensationTitle}>{title}</h3>}
            <div className={styles.compensationGrid}>
                {items.map((item, index) => (
                    <div key={index} className={styles.compensationCard}>
                        <div className={styles.compensationAmount}>{item.amount}</div>
                        <div className={styles.compensationDistance}>{item.distance}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============ IMAGE WITH OVERLAY ============

interface ImageWithOverlayProps {
    src: string;
    alt: string;
    overlayText?: string;
    caption?: string;
}

export function ImageWithOverlay({ src, alt, overlayText, caption }: ImageWithOverlayProps) {
    return (
        <figure className={styles.imageOverlayWrapper}>
            <div className={styles.imageContainer}>
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={450}
                    className={styles.overlayImage}
                />
                {overlayText && (
                    <div className={styles.imageOverlay}>
                        <span>{overlayText}</span>
                    </div>
                )}
            </div>
            {caption && <figcaption className={styles.imageCaption}>{caption}</figcaption>}
        </figure>
    );
}

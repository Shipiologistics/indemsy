'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';


interface Flight {
    flightNumber: string;
    airline: {
        name: string;
        code: string;
    };
    departure: {
        airport: {
            iata: string;
            name: string;
        };
        scheduledTime: string;
        terminal: string;
        gate: string;
    };
    arrival: {
        airport: {
            iata: string;
            name: string;
            municipalityName: string;
        };
        scheduledTime: string;
        terminal: string;
    };
    status: string;
    aircraft: {
        model: string;
        registration: string;
    };
}

interface Route {
    destination: {
        iata: string;
        icao: string;
        name: string;
        municipalityName: string;
        countryCode: string;
    };
    averageDailyFlights: number;
    operators: string[];
}

function FlightsContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const [flights, setFlights] = useState<Flight[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'flights' | 'routes'>('flights');

    useEffect(() => {
        if (!from) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch flights and routes in parallel
                const [flightsRes, routesRes] = await Promise.all([
                    fetch(`/api/flights/search?from=${from}${to ? `&to=${to}` : ''}`),
                    fetch(`/api/airports/${from}/routes`),
                ]);

                if (!flightsRes.ok || !routesRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const flightsData = await flightsRes.json();
                const routesData = await routesRes.json();

                setFlights(flightsData.flights || []);
                setRoutes(routesData.routes || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Unable to fetch flight data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [from, to]);

    const formatTime = (timeStr: string) => {
        if (!timeStr) return '--:--';
        try {
            const date = new Date(timeStr);
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        } catch {
            return timeStr.slice(11, 16) || '--:--';
        }
    };

    const formatDate = (timeStr: string) => {
        if (!timeStr) return '';
        try {
            const date = new Date(timeStr);
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });
        } catch {
            return '';
        }
    };

    const getStatusClass = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('arrived') || statusLower.includes('landed')) {
            return styles.statusArrived;
        } else if (statusLower.includes('cancelled') || statusLower.includes('canceled')) {
            return styles.statusCancelled;
        } else if (statusLower.includes('delayed')) {
            return styles.statusDelayed;
        } else if (statusLower.includes('departed') || statusLower.includes('active')) {
            return styles.statusActive;
        }
        return styles.statusScheduled;
    };

    if (!from) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>✈️</div>
                <h2>Search for Flights</h2>
                <p>Enter a departure airport on the homepage to find available flights and destinations.</p>
                <a href="/#check" className={styles.ctaButton}>Go to Search</a>
            </div>
        );
    }

    return (
        <div className={styles.content}>
            <div className={styles.searchInfo}>
                <h1 className={styles.title}>
                    Flights from <span className={styles.highlight}>{from}</span>
                    {to && <> to <span className={styles.highlight}>{to}</span></>}
                </h1>
                <p className={styles.subtitle}>
                    Showing flights for the next 12 hours. Check your flight status and claim compensation for delays.
                </p>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'flights' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('flights')}
                >
                    <span className={styles.tabIcon}>🛫</span>
                    Departures
                    {flights.length > 0 && <span className={styles.tabBadge}>{flights.length}</span>}
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'routes' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('routes')}
                >
                    <span className={styles.tabIcon}>🗺️</span>
                    All Destinations
                    {routes.length > 0 && <span className={styles.tabBadge}>{routes.length}</span>}
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Searching for flights...</p>
                </div>
            ) : error ? (
                <div className={styles.error}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                        Try Again
                    </button>
                </div>
            ) : activeTab === 'flights' ? (
                <div className={styles.flightsList}>
                    {flights.length === 0 ? (
                        <div className={styles.noResults}>
                            <span className={styles.noResultsIcon}>🔍</span>
                            <h3>No flights found</h3>
                            <p>No departures found for the selected route in the next 12 hours.</p>
                        </div>
                    ) : (
                        flights.map((flight, index) => (
                            <div key={`${flight.flightNumber}-${index}`} className={styles.flightCard}>
                                <div className={styles.flightHeader}>
                                    <div className={styles.flightNumber}>
                                        <span className={styles.airlineCode}>{flight.airline.code}</span>
                                        <span>{flight.flightNumber}</span>
                                    </div>
                                    <div className={`${styles.flightStatus} ${getStatusClass(flight.status)}`}>
                                        {flight.status || 'Scheduled'}
                                    </div>
                                </div>

                                <div className={styles.flightRoute}>
                                    <div className={styles.airport}>
                                        <span className={styles.airportCode}>{flight.departure.airport.iata}</span>
                                        <span className={styles.airportTime}>{formatTime(flight.departure.scheduledTime)}</span>
                                        {flight.departure.terminal && (
                                            <span className={styles.terminal}>Terminal {flight.departure.terminal}</span>
                                        )}
                                    </div>

                                    <div className={styles.routeLine}>
                                        <div className={styles.dot}></div>
                                        <div className={styles.line}></div>
                                        <div className={styles.plane}>✈</div>
                                        <div className={styles.line}></div>
                                        <div className={styles.dot}></div>
                                    </div>

                                    <div className={styles.airport}>
                                        <span className={styles.airportCode}>{flight.arrival.airport.iata}</span>
                                        <span className={styles.airportTime}>{formatTime(flight.arrival.scheduledTime)}</span>
                                        <span className={styles.airportName}>{flight.arrival.airport.municipalityName || flight.arrival.airport.name}</span>
                                    </div>
                                </div>

                                <div className={styles.flightFooter}>
                                    <span className={styles.flightDate}>{formatDate(flight.departure.scheduledTime)}</span>
                                    {flight.aircraft.model && (
                                        <span className={styles.aircraft}>{flight.aircraft.model}</span>
                                    )}
                                    <button className={styles.checkBtn}>
                                        Check Compensation →
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className={styles.routesList}>
                    {routes.length === 0 ? (
                        <div className={styles.noResults}>
                            <span className={styles.noResultsIcon}>🗺️</span>
                            <h3>No routes found</h3>
                            <p>Unable to find destination routes from this airport.</p>
                        </div>
                    ) : (
                        <div className={styles.routesGrid}>
                            {routes.map((route, index) => (
                                <div key={`${route.destination.iata || route.destination.icao}-${index}`} className={styles.routeCard}>
                                    <div className={styles.routeDestination}>
                                        <span className={styles.routeCode}>{route.destination.iata || route.destination.icao}</span>
                                        <div className={styles.routeInfo}>
                                            <span className={styles.routeName}>{route.destination.name}</span>
                                            <span className={styles.routeCity}>
                                                {route.destination.municipalityName}
                                                {route.destination.countryCode && `, ${route.destination.countryCode}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.routeStats}>
                                        <span className={styles.dailyFlights}>
                                            ~{route.averageDailyFlights.toFixed(1)} flights/day
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function FlightsPage() {
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <Suspense fallback={
                    <div className={styles.loading}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Loading...</p>
                    </div>
                }>
                    <FlightsContent />
                </Suspense>
            </div>
        </div>
    );
}

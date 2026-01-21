'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './ClaimForm.module.css';
import AirportSearch from '../AirportSearch/AirportSearch';
import { submitClaim } from '@/app/actions/submit-claim';
import { uploadToCloudinary } from '@/lib/cloudinary';

// Types
export interface Airport {
    iata: string;
    icao: string;
    name: string;
    municipalityName: string;
    countryCode: string;
    label: string;
}

interface Flight {
    flightNumber: string;
    airline: { name: string; code: string };
    departure: { airport: { iata: string; name: string }; scheduledTime: string };
    arrival: { airport: { iata: string; name: string }; scheduledTime: string };
    status: string;
}

interface FormData {
    // Step 1: Flight Type
    isDirect: boolean | null;

    // Connection airports (if not direct)
    connectionAirports: Airport[];

    // Step 2: Airports
    departureAirport: Airport | null;
    arrivalAirport: Airport | null;
    travelDate: string;

    // Step 3: Flight Selection
    selectedFlight: Flight | null;
    manualFlightNumber: string;
    manualAirline: string;
    manualDepartureTime: string;

    // Step 4: Problem Type
    problemType: 'delayed' | 'cancelled' | 'refused' | null;
    refusedReason: string;

    // Step 5: Delay Duration (if delayed)
    delayDuration: string;

    // Step 6: Passenger Info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    acceptTerms: boolean;

    // Step 7: Group Travel
    isGroupTravel: boolean | null;
    groupPassengers: Array<{ firstName: string; lastName: string; email: string }>;

    // Step 8: Address
    address: string;
    city: string;
    postalCode: string;
    country: string;

    // Step 9: Booking Number
    bookingNumber: string;

    // Step 10: Signature
    signature: string;

    // Step 11: Boarding Pass
    boardingPass: File | null;
    boardingPassUrl?: string; // Add URL field

    // Step 12: ID Document
    idDocument: File | null;
    idDocumentUrl?: string; // Add URL field

    // Step 13: Airline Contact
    contactedAirline: boolean | null;
    incidentDescription: string;

    // Step 14: Additional Info
    preferredLanguage: string;
    ticketPurchaseSource: string;
    referralSource: string;

}

const TOTAL_STEPS = 15;

const initialFormData: FormData = {
    isDirect: null,
    connectionAirports: [],
    departureAirport: null,
    arrivalAirport: null,
    travelDate: '',
    selectedFlight: null,
    manualFlightNumber: '',
    manualAirline: '',
    manualDepartureTime: '',
    problemType: null,
    refusedReason: '',
    delayDuration: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    acceptTerms: false,
    isGroupTravel: null,
    groupPassengers: [],
    address: '',
    city: '',
    postalCode: '',
    country: '',
    bookingNumber: '',
    signature: '',
    boardingPass: null,
    idDocument: null,
    contactedAirline: null,
    incidentDescription: '',
    preferredLanguage: '',
    ticketPurchaseSource: '',
    referralSource: '',
};

interface ClaimFormProps {
    onClose?: () => void;
}

export default function ClaimForm({ onClose }: ClaimFormProps) {
    const searchParams = useSearchParams();
    const t = useTranslations('claimForm');
    const tCommon = useTranslations('common');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(() => ({
        ...initialFormData,
    }));
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoadingFlights, setIsLoadingFlights] = useState(false);
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fastTrackMode, setFastTrackMode] = useState(false);
    const [flightSearchMeta, setFlightSearchMeta] = useState<{
        isApproximateDate: boolean;
        usedDate: string | null;
        requestedDate: string | null;
    }>({ isApproximateDate: false, usedDate: null, requestedDate: null });

    // Fast-track steps to skip (1-3 for flight info, 11 for boarding pass)
    const fastTrackSkipSteps = [1, 2, 3, 11];

    // Initialize from URL params and check for fast-track mode
    useEffect(() => {
        const mode = searchParams.get('mode');
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        // Check for fast-track mode from sessionStorage
        if (mode === 'fast' || sessionStorage.getItem('fastTrackMode') === 'true') {
            setFastTrackMode(true);

            // Get the pre-uploaded boarding pass URL
            const boardingPassUrl = sessionStorage.getItem('boardingPassUrl');
            if (boardingPassUrl) {
                setFormData(prev => ({
                    ...prev,
                    boardingPassUrl: boardingPassUrl,
                }));
            }

            // Start at step 4 (problem type) instead of step 1
            setCurrentStep(4);

            // Clean up sessionStorage
            sessionStorage.removeItem('fastTrackMode');
            sessionStorage.removeItem('boardingPassUrl');
        } else {
            // Normal flow - initialize from URL params
            if (from) {
                setFormData(prev => ({
                    ...prev,
                    departureAirport: {
                        iata: from,
                        icao: '',
                        name: from,
                        municipalityName: '',
                        countryCode: '',
                        label: from
                    }
                }));

                // Fetch full airport details
                fetch(`/api/airports/search?q=${from}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.items && data.items.length > 0) {
                            const match = data.items.find((a: Airport) => a.iata === from || a.icao === from) || data.items[0];
                            setFormData(prev => ({ ...prev, departureAirport: match }));
                        }
                    })
                    .catch(e => console.error('Error fetching departure airport:', e));
            }

            if (to) {
                setFormData(prev => ({
                    ...prev,
                    arrivalAirport: {
                        iata: to,
                        icao: '',
                        name: to,
                        municipalityName: '',
                        countryCode: '',
                        label: to
                    }
                }));

                // Fetch full airport details
                fetch(`/api/airports/search?q=${to}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.items && data.items.length > 0) {
                            const match = data.items.find((a: Airport) => a.iata === to || a.icao === to) || data.items[0];
                            setFormData(prev => ({ ...prev, arrivalAirport: match }));
                        }
                    })
                    .catch(e => console.error('Error fetching arrival airport:', e));
            }
        }
    }, [searchParams]);

    // Fetch flights when date and airports are set
    const fetchFlights = useCallback(async () => {
        if (!formData.departureAirport || !formData.travelDate) return;

        setIsLoadingFlights(true);
        try {
            const params = new URLSearchParams({
                from: formData.departureAirport.iata || formData.departureAirport.icao,
                date: formData.travelDate,
            });

            if (formData.arrivalAirport) {
                params.append('to', formData.arrivalAirport.iata || formData.arrivalAirport.icao);
            }

            const response = await fetch(`/api/flights/search?${params}`);
            const data = await response.json();
            setFlights(data.flights || []);
            setFlightSearchMeta({
                isApproximateDate: data.searchParams?.isApproximateDate || false,
                usedDate: data.searchParams?.usedDate || null,
                requestedDate: data.searchParams?.requestedDate || null,
            });
        } catch (error) {
            console.error('Error fetching flights:', error);
            setFlights([]);
            setFlightSearchMeta({ isApproximateDate: false, usedDate: null, requestedDate: null });
        } finally {
            setIsLoadingFlights(false);
        }
    }, [formData.departureAirport, formData.arrivalAirport, formData.travelDate]);

    const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            let next = currentStep + 1;
            // Skip fast-track steps when in fast mode
            while (fastTrackMode && fastTrackSkipSteps.includes(next) && next < TOTAL_STEPS) {
                next++;
            }
            setCurrentStep(next);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            let prev = currentStep - 1;
            // Skip fast-track steps when going back in fast mode
            while (fastTrackMode && fastTrackSkipSteps.includes(prev) && prev > 1) {
                prev--;
            }
            // If we're at the first non-skipped step and in fast mode, don't go below step 4
            if (fastTrackMode && prev < 4) {
                prev = 4;
            }
            setCurrentStep(prev);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (onClose) {
            onClose();
        }
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 1: return formData.isDirect !== null && !!formData.departureAirport && !!formData.arrivalAirport;
            case 2: return !!(formData.departureAirport && formData.arrivalAirport && formData.travelDate);
            case 3: return !!(formData.selectedFlight || (showManualEntry && formData.manualFlightNumber));
            case 4: return !!formData.problemType;
            case 5: return formData.problemType !== 'delayed' || !!formData.delayDuration;
            case 6: return !!(formData.firstName && formData.lastName && formData.email && formData.acceptTerms);
            case 7: return formData.isGroupTravel !== null;
            case 8: return !!(formData.address && formData.city && formData.postalCode && formData.country);
            case 9: return !!formData.bookingNumber;
            case 10: return !!formData.signature;
            case 11: return true; // Optional
            case 12: return !!formData.idDocument;
            case 13: return formData.contactedAirline !== null;
            case 14: return true; // Optional
            default: return true;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Upload files first if they exist
            let finalFormData = { ...formData }; // Create a copy of current state

            if (formData.boardingPass) {
                try {
                    const boardingPassUrl = await uploadToCloudinary(formData.boardingPass);
                    finalFormData.boardingPassUrl = boardingPassUrl;
                } catch (err) {
                    console.error('Failed to upload boarding pass:', err);
                }
            }

            if (formData.idDocument) {
                try {
                    const idDocumentUrl = await uploadToCloudinary(formData.idDocument);
                    finalFormData.idDocumentUrl = idDocumentUrl;
                } catch (err) {
                    console.error('Failed to upload ID document:', err);
                }
            }

            // Create a copy of formData excluding File objects which can't be passed directly in JSON
            const { boardingPass, idDocument, ...dataToSubmit } = finalFormData;

            const result = await submitClaim(dataToSubmit);

            if (result.success) {
                console.log('Claim submitted successfully, ID:', result.claimId);
                nextStep();
            } else {
                console.error('Submission failed:', result.error);
                // Optionally handle error UI here
            }
        } catch (error) {
            console.error('Error submitting claim:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return '--:--';
        try {
            const date = new Date(timeStr);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        } catch {
            return timeStr.slice(11, 16) || '--:--';
        }
    };

    const addConnectionAirport = () => {
        if (formData.connectionAirports.length < 3) {
            setFormData(prev => ({
                ...prev,
                connectionAirports: [...prev.connectionAirports, { iata: '', icao: '', name: '', municipalityName: '', countryCode: '', label: '' }]
            }));
        }
    };

    const updateConnectionAirport = (index: number, airport: Airport | null) => {
        const updated = [...formData.connectionAirports];
        if (airport) {
            updated[index] = airport;
        } else {
            updated.splice(index, 1);
        }
        setFormData(prev => ({ ...prev, connectionAirports: updated }));
    };

    const progress = (currentStep / TOTAL_STEPS) * 100;

    const renderStep = () => {
        switch (currentStep) {
            // Step 1: Flight Details (Route + Direct Question)
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>✈️</div>
                        <h2 className={styles.stepTitle}>Where did you fly?</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('departureAirport')}</label>
                            <AirportSearch
                                id="departure"
                                placeholder="Departure airport"
                                icon="🛫"
                                value={formData.departureAirport}
                                onChange={(a) => updateFormData('departureAirport', a)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('arrivalAirport')}</label>
                            <AirportSearch
                                id="arrival"
                                placeholder="Arrival airport"
                                icon="🛬"
                                value={formData.arrivalAirport}
                                onChange={(a) => updateFormData('arrivalAirport', a)}
                            />
                        </div>

                        <div className={styles.separator}></div>

                        <h2 className={styles.stepTitle} style={{ marginTop: '2rem' }}>{t('step1Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step1Subtitle')}</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isDirect === true ? styles.selected : ''}`}
                                onClick={() => updateFormData('isDirect', true)}
                            >
                                <div className={styles.optionIcon}>🛫</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('yes')}</h3>
                                    <p>{t('directFlight')}</p>
                                </div>
                                <div className={styles.optionCheck}>
                                    {formData.isDirect === true && <span>✓</span>}
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isDirect === false ? styles.selected : ''}`}
                                onClick={() => updateFormData('isDirect', false)}
                            >
                                <div className={styles.optionIcon}>🔄</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('no')}</h3>
                                    <p>{t('connectingFlight')}</p>
                                </div>
                                <div className={styles.optionCheck}>
                                    {formData.isDirect === false && <span>✓</span>}
                                </div>
                            </button>
                        </div>

                        {formData.isDirect === false && (
                            <div className={styles.connectionSection}>
                                <h4>Add your connection airports</h4>
                                {formData.connectionAirports.map((airport, index) => (
                                    <div key={index} className={styles.connectionRow}>
                                        <span className={styles.connectionLabel}>Stop {index + 1}</span>
                                        <AirportSearch
                                            id={`connection-${index}`}
                                            placeholder="Connection airport"
                                            icon="🔄"
                                            value={airport.iata ? airport : null}
                                            onChange={(a) => updateConnectionAirport(index, a)}
                                        />
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => updateConnectionAirport(index, null)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {formData.connectionAirports.length < 3 && (
                                    <button
                                        type="button"
                                        className={styles.addConnectionBtn}
                                        onClick={addConnectionAirport}
                                    >
                                        + Add connection airport
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                );

            // Step 2: Date
            case 2:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📅</div>
                        <h2 className={styles.stepTitle}>{t('whenTravel')}</h2>
                        <p className={styles.stepSubtitle}>{t('step2Subtitle')}</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('travelDate')}</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={formData.travelDate}
                                onChange={(e) => updateFormData('travelDate', e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>
                );

            // Step 3: Flight Selection
            case 3:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🔍</div>
                        <h2 className={styles.stepTitle}>{t('step3Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step3Subtitle')}</p>

                        {!showManualEntry ? (
                            <>
                                <button
                                    type="button"
                                    className={styles.searchFlightsBtn}
                                    onClick={fetchFlights}
                                    disabled={isLoadingFlights}
                                >
                                    {isLoadingFlights ? 'Searching...' : '🔍 Search Flights'}
                                </button>

                                {isLoadingFlights && (
                                    <div className={styles.loadingFlights}>
                                        <div className={styles.spinner}></div>
                                        <p>Searching for your flight...</p>
                                    </div>
                                )}

                                {!isLoadingFlights && flightSearchMeta.isApproximateDate && flights.length > 0 && (
                                    <div className={styles.warningBox}>
                                        <span className={styles.warningIcon}>⚠️</span>
                                        <div>
                                            <p><strong>Historical data not available</strong></p>
                                            <p>We couldn't find flight data for {flightSearchMeta.requestedDate}. Showing flights from {flightSearchMeta.usedDate} instead.</p>
                                            <p>If you can't find your flight, please enter details manually below.</p>
                                        </div>
                                    </div>
                                )}

                                {!isLoadingFlights && flights.length > 0 && (
                                    <div className={styles.flightOptions}>
                                        {flights.map((flight, index) => (
                                            <button
                                                key={`${flight.flightNumber}-${index}`}
                                                type="button"
                                                className={`${styles.flightOption} ${formData.selectedFlight?.flightNumber === flight.flightNumber ? styles.selected : ''}`}
                                                onClick={() => updateFormData('selectedFlight', flight)}
                                            >
                                                <div className={styles.flightTime}>{formatTime(flight.departure.scheduledTime)}</div>
                                                <div className={styles.flightNumber}>{flight.flightNumber}</div>
                                                <div className={styles.flightAirline}>{flight.airline.name || flight.airline.code}</div>
                                                <div className={styles.flightRoute}>
                                                    {flight.departure.airport.iata} → {flight.arrival.airport.iata}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {!isLoadingFlights && flights.length === 0 && formData.travelDate && (
                                    <div className={styles.noFlightsFound}>
                                        <p><strong>No flights found</strong></p>
                                        <p>We couldn't find flight data for {formData.travelDate}. Historical flight data may not be available for dates more than a few days in the past.</p>
                                        <p>Please enter your flight details manually using the button below.</p>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className={styles.manualEntryBtn}
                                    onClick={() => setShowManualEntry(true)}
                                >
                                    🔎 I can't find my flight - Enter manually
                                </button>
                            </>
                        ) : (
                            <>
                                <div className={styles.manualEntryForm}>
                                    <h4>Enter flight details manually</h4>
                                    <p className={styles.manualNote}>We will search manually for your flight.</p>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Flight Number</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g., BA123, LH456"
                                            value={formData.manualFlightNumber}
                                            onChange={(e) => updateFormData('manualFlightNumber', e.target.value.toUpperCase())}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Airline</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="e.g., British Airways"
                                            value={formData.manualAirline}
                                            onChange={(e) => updateFormData('manualAirline', e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Scheduled Departure Time</label>
                                        <input
                                            type="time"
                                            className={styles.input}
                                            value={formData.manualDepartureTime}
                                            onChange={(e) => updateFormData('manualDepartureTime', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={styles.backToSearchBtn}
                                    onClick={() => setShowManualEntry(false)}
                                >
                                    ← Back to flight search
                                </button>
                            </>
                        )}
                    </div>
                );

            // Step 4: Problem Type
            case 4:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>⚠️</div>
                        <h2 className={styles.stepTitle}>{t('step4Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step4Subtitle')}</p>

                        <div className={styles.problemCards}>
                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'delayed' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'delayed')}
                            >
                                <span className={styles.problemIcon}>⏱️</span>
                                <h3>{t('delayed')}</h3>
                                <p>{t('delayedDesc')}</p>
                            </button>

                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'cancelled' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'cancelled')}
                            >
                                <span className={styles.problemIcon}>❌</span>
                                <h3>{t('cancelled')}</h3>
                                <p>{t('cancelledDesc')}</p>
                            </button>

                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'refused' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'refused')}
                            >
                                <span className={styles.problemIcon}>🚫</span>
                                <h3>{t('denied')}</h3>
                                <p>{t('deniedDesc')}</p>
                            </button>
                        </div>

                        {formData.problemType === 'refused' && (
                            <div className={styles.refusedReasonSection}>
                                <label className={styles.label}>Select a reason</label>
                                <select
                                    className={styles.select}
                                    value={formData.refusedReason}
                                    onChange={(e) => updateFormData('refusedReason', e.target.value)}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="dont_remember">I don't remember</option>
                                    <option value="technical">Technical problem</option>
                                    <option value="weather">Bad weather</option>
                                    <option value="linked_flights">Linked to other flights</option>
                                    <option value="airport_problems">Problems at the airport</option>
                                    <option value="strike">Strike</option>
                                    <option value="no_reason">No reason given</option>
                                    <option value="force_majeure">Force majeure (COVID-19)</option>
                                </select>
                            </div>
                        )}
                    </div>
                );

            // Step 5: Delay Duration
            case 5:
                if (formData.problemType !== 'delayed') {
                    nextStep();
                    return null;
                }
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>⏰</div>
                        <h2 className={styles.stepTitle}>{t('step5Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step5Subtitle')}</p>


                        <div className={styles.delayOptions}>
                            {[
                                { val: '< 2h', label: t('delayLessThan2') },
                                { val: '2-3 hours', label: t('delay2to3') },
                                { val: '3-4 hours', label: t('delay3to4') },
                                { val: '> 4h', label: t('delayMoreThan4') }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    type="button"
                                    className={`${styles.delayOption} ${formData.delayDuration === opt.val ? styles.selected : ''}`}
                                    onClick={() => updateFormData('delayDuration', opt.val)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {
                            formData.delayDuration && formData.delayDuration.includes('< 2') && (
                                <div className={styles.warningBox}>
                                    <span className={styles.warningIcon}>ℹ️</span>
                                    <p>{t('delayShortWarning')}</p>
                                </div>
                            )
                        }
                    </div >
                );

            // Step 6: Passenger Information
            case 6:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>👤</div>
                        <h2 className={styles.stepTitle}>{t('step6Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step6Subtitle')}</p>

                        <div className={styles.assistantNote}>
                            <div className={styles.assistantAvatar}>M</div>
                            <p><strong>Marie</strong> · Your Indemfly Assistant</p>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('firstName')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('firstName')}
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                />
                                <span className={styles.hint}>Please enter all first names exactly as they appear on your identity card.</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('lastName')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('lastName')}
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData('lastName', e.target.value)}
                                />
                                <span className={styles.hint}>Please enter all names exactly as they appear on your identity card.</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>E-mail</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone</label>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="+1 234 567 8900"
                                value={formData.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                            />
                            <span className={styles.hint}>We will be able to contact you more quickly if needed.</span>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                                />
                                <span className={styles.checkmark}></span>
                                <span>{t('acceptTerms')}</span>
                            </label>
                        </div>
                    </div>
                );

            // Step 7: Group Travel
            case 7:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>👥</div>
                        <h2 className={styles.stepTitle}>{t('step7Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step7Subtitle')}</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isGroupTravel === false ? styles.selected : ''}`}
                                onClick={() => updateFormData('isGroupTravel', false)}
                            >
                                <div className={styles.optionIcon}>👤</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('travelingAlone')}</h3>
                                    <p>{t('directFlight')}</p>
                                </div>
                                <div className={styles.optionCheck}>
                                    {formData.isGroupTravel === false && <span>✓</span>}
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isGroupTravel === true ? styles.selected : ''}`}
                                onClick={() => updateFormData('isGroupTravel', true)}
                            >
                                <div className={styles.optionIcon}>👥</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('travelingWithOthers')}</h3>
                                    <p>{t('groupTravel')}</p>
                                </div>
                                <div className={styles.optionCheck}>
                                    {formData.isGroupTravel === true && <span>✓</span>}
                                </div>
                            </button>
                        </div>

                        {formData.isGroupTravel === true && (
                            <div className={styles.groupPassengersSection}>
                                <h4>Add other passengers</h4>
                                {formData.groupPassengers.map((passenger, index) => (
                                    <div key={index} className={styles.passengerRow}>
                                        <input
                                            type="text"
                                            placeholder={t('firstName')}
                                            value={passenger.firstName}
                                            onChange={(e) => {
                                                const updated = [...formData.groupPassengers];
                                                updated[index].firstName = e.target.value;
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder={t('lastName')}
                                            value={passenger.lastName}
                                            onChange={(e) => {
                                                const updated = [...formData.groupPassengers];
                                                updated[index].lastName = e.target.value;
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder={t('email')}
                                            value={passenger.email}
                                            onChange={(e) => {
                                                const updated = [...formData.groupPassengers];
                                                updated[index].email = e.target.value;
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = formData.groupPassengers.filter((_, i) => i !== index);
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className={styles.addPassengerBtn}
                                    onClick={() => {
                                        updateFormData('groupPassengers', [
                                            ...formData.groupPassengers,
                                            { firstName: '', lastName: '', email: '' }
                                        ]);
                                    }}
                                >
                                    {t('addPassenger')}
                                </button>
                            </div>
                        )}
                    </div>
                );

            // Step 8: Address
            case 8:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📍</div>
                        <h2 className={styles.stepTitle}>{t('step8Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step8Subtitle')}</p>

                        <div className={styles.compensationNote}>
                            <span className={styles.noteIcon}>💡</span>
                            <p>If you submit your claim now, you will likely receive your compensation within the next 15 days. Filing a claim promptly speeds up the review process.</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('address')}</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Street address"
                                value={formData.address}
                                onChange={(e) => updateFormData('address', e.target.value)}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('city')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('city')}
                                    value={formData.city}
                                    onChange={(e) => updateFormData('city', e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('postalCode')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('postalCode')}
                                    value={formData.postalCode}
                                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('country')}</label>
                            <select
                                className={styles.select}
                                value={formData.country}
                                onChange={(e) => updateFormData('country', e.target.value)}
                            >
                                <option value="">{t('selectCountry')}</option>
                                <option value="LU">{t('countries.LU')}</option>
                                <option value="US">{t('countries.US')}</option>
                                <option value="UK">{t('countries.UK')}</option>
                                <option value="DE">{t('countries.DE')}</option>
                                <option value="FR">{t('countries.FR')}</option>
                                <option value="ES">{t('countries.ES')}</option>
                                <option value="IT">{t('countries.IT')}</option>
                                <option value="NL">{t('countries.NL')}</option>
                                <option value="BE">{t('countries.BE')}</option>
                                <option value="IN">{t('countries.IN')}</option>
                                <option value="other">{t('countries.other')}</option>
                            </select>
                        </div>
                    </div>
                );

            // Step 9: Booking Number
            case 9:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🎫</div>
                        <h2 className={styles.stepTitle}>{t('step9Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step9Subtitle')}</p>

                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={`${styles.input} ${styles.bookingInput}`}
                                placeholder={t('bookingNumber')}
                                value={formData.bookingNumber}
                                onChange={(e) => updateFormData('bookingNumber', e.target.value.toUpperCase())}
                                maxLength={10}
                            />
                        </div>

                        <details className={styles.helpDetails}>
                            <summary>{t('bookingHint')}</summary>
                            <p>Your booking number (also called PNR or confirmation code) can be found in:</p>
                            <ul>
                                <li>Your booking confirmation email</li>
                                <li>Your e-ticket or boarding pass</li>
                                <li>Your airline's app or website account</li>
                            </ul>
                        </details>
                    </div>
                );

            // Step 10: Signature
            case 10:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>✍️</div>
                        <h2 className={styles.stepTitle}>{t('step10Title')}</h2>
                        <p className={styles.stepSubtitle}>
                            {t.rich('step10SubtitleComp', {
                                strong: (chunks) => <strong className={styles.amount}>{chunks}</strong>
                            })}
                        </p>

                        <div className={styles.signatureSection}>
                            <p className={styles.signatureNote}>{t('step10Subtitle')}</p>

                            <div className={styles.signatureBox}>
                                <textarea
                                    className={styles.signatureInput}
                                    placeholder={t('signaturePlaceholder')}
                                    value={formData.signature}
                                    onChange={(e) => updateFormData('signature', e.target.value)}
                                />
                            </div>

                            <div className={styles.signatureActions}>
                                <button
                                    type="button"
                                    className={styles.clearSignature}
                                    onClick={() => updateFormData('signature', '')}
                                >
                                    {t('clearSignature')}
                                </button>
                            </div>

                            <p className={styles.signatureLegal}>
                                {t.rich('signatureLegal', {
                                    terms: (chunks) => <a href="/terms">{chunks}</a>
                                })}
                            </p>
                        </div>
                    </div>
                );

            // Step 11: Boarding Pass
            case 11:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🎟️</div>
                        <h2 className={styles.stepTitle}>{t('step11Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step11Subtitle')}</p>

                        <div className={styles.uploadSection}>
                            <label className={styles.uploadBox}>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => updateFormData('boardingPass', e.target.files?.[0] || null)}
                                />
                                <div className={styles.uploadContent}>
                                    {formData.boardingPass ? (
                                        <>
                                            <span className={styles.uploadIcon}>✅</span>
                                            <p>{formData.boardingPass.name}</p>
                                            <span className={styles.changeFile}>Click to change</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles.uploadIcon}>📄</span>
                                            <p>{t('dragDrop')}</p>
                                            <span className={styles.uploadFormats}>{t('supportedFormats')}</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>
                );

            // Step 12: ID Upload
            case 12:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🪪</div>
                        <h2 className={styles.stepTitle}>{t('step12Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step12Subtitle')}</p>

                        <div className={styles.idNote}>
                            <p>{t('idNote')}</p>
                        </div>

                        <div className={styles.uploadSection}>
                            <label className={styles.uploadBox}>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => updateFormData('idDocument', e.target.files?.[0] || null)}
                                />
                                <div className={styles.uploadContent}>
                                    {formData.idDocument ? (
                                        <>
                                            <span className={styles.uploadIcon}>✅</span>
                                            <p>{formData.idDocument.name}</p>
                                            <span className={styles.changeFile}>Click to change</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles.uploadIcon}>📤</span>
                                            <p>{t('uploadId')}</p>
                                            <span className={styles.uploadFormats}>{t('idTypes')}</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className={styles.securityNote}>
                            <span className={styles.securityIcon}>🔒</span>
                            <p>{t('securityNote')}</p>
                        </div>
                    </div>
                );

            // Step 13: Airline Contact
            case 13:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📞</div>
                        <h2 className={styles.stepTitle}>{t('step13Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step13Subtitle')}</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.contactedAirline === true ? styles.selected : ''}`}
                                onClick={() => updateFormData('contactedAirline', true)}
                            >
                                <div className={styles.optionIcon}>✅</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('yesContacted')}</h3>
                                    <p>{t('yes')}</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.contactedAirline === false ? styles.selected : ''}`}
                                onClick={() => updateFormData('contactedAirline', false)}
                            >
                                <div className={styles.optionIcon}>❌</div>
                                <div className={styles.optionContent}>
                                    <h3>{t('noContacted')}</h3>
                                    <p>{t('no')}</p>
                                </div>
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('describeIncident')}</label>
                            <textarea
                                className={styles.textarea}
                                placeholder={t('incidentPlaceholder')}
                                value={formData.incidentDescription}
                                onChange={(e) => updateFormData('incidentDescription', e.target.value)}
                                rows={5}
                            />
                            <div className={styles.descriptionHints}>
                                <p><strong>What details do you need to provide?</strong></p>
                                <ul>
                                    <li>What time did you arrive at your final destination?</li>
                                    <li>What information did the airline provide you?</li>
                                    <li>Were you travelling with another person?</li>
                                    <li>What inconveniences did the delay cause you?</li>
                                    <li>Did you miss a particular event or suffer a financial loss?</li>
                                </ul>
                                <p className={styles.tipNote}>💡 The more information you provide, the faster your compensation claim will be processed.</p>
                            </div>
                        </div>
                    </div>
                );

            // Step 14: Additional Info
            case 14:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📝</div>
                        <h2 className={styles.stepTitle}>{t('step14Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step14Subtitle')}</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('preferredLanguage')}</label>
                            <select
                                className={styles.select}
                                value={formData.preferredLanguage}
                                onChange={(e) => updateFormData('preferredLanguage', e.target.value)}
                            >
                                <option value="">{t('preferredLanguage')}</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="es">Español</option>
                                <option value="it">Italiano</option>
                                <option value="nl">Nederlands</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('ticketSource')}</label>
                            <select
                                className={styles.select}
                                value={formData.ticketPurchaseSource}
                                onChange={(e) => updateFormData('ticketPurchaseSource', e.target.value)}
                            >
                                <option value="">{t('ticketSource')}</option>
                                <option value="airline">{t('airlineWebsite')}</option>
                                <option value="travel_agency">{t('travelAgency')}</option>
                                <option value="online_agency">{t('onlineBooking')}</option>
                                <option value="comparison">Price comparison website</option>
                                <option value="other">{t('other')}</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('howDidYouFind')}</label>
                            <select
                                className={styles.select}
                                value={formData.referralSource}
                                onChange={(e) => updateFormData('referralSource', e.target.value)}
                            >
                                <option value="">{t('howDidYouFind')}</option>
                                <option value="google">{t('google')}</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="friend">{t('friendFamily')}</option>
                                <option value="airport">At the airport</option>
                                <option value="television">Television</option>
                                <option value="other">{t('other')}</option>
                            </select>
                        </div>
                    </div>
                );

            // Step 15: Success
            case 15:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.successIcon}>🎉</div>
                        <h2 className={styles.stepTitle}>{t('successTitle')}</h2>
                        <p className={styles.stepSubtitle}>{t('successMessage')}</p>

                        <div className={styles.successCard}>
                            <div className={styles.successInfo}>
                                <p><strong>{t('claimReference')}:</strong> CLM-{Date.now().toString(36).toUpperCase()}</p>
                                <p><strong>{t('flight')}:</strong> {formData.selectedFlight?.flightNumber || formData.manualFlightNumber}</p>
                                <p><strong>{t('route')}:</strong> {formData.departureAirport?.iata} → {formData.arrivalAirport?.iata}</p>
                                <p><strong>{t('expectedCompensation')}:</strong> Up to €400</p>
                            </div>
                        </div>

                        <div className={styles.emailReminder}>
                            <div className={styles.emailReminderIcon}>📧</div>
                            <div className={styles.emailReminderContent}>
                                <h4>{t('emailReminderTitle')}</h4>
                                <p>{t('emailReminderText')}</p>
                                <p className={styles.emailHighlight}><strong>{formData.email}</strong></p>
                                <a href="/dashboard" className={styles.trackClaimBtn}>
                                    {t('trackButton')} →
                                </a>
                            </div>
                        </div>

                        <div className={styles.nextSteps}>
                            <h4>{t('whatNext')}</h4>
                            <ol>
                                <li>{t('nextStep1')}</li>
                                <li>{t('nextStep2')}</li>
                                <li>{t('nextStep3')}</li>
                                <li>{t('nextStep4')}</li>
                            </ol>
                        </div>

                        <a href="/" className={styles.homeBtn}>
                            {t('returnHome')}
                        </a>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.claimForm}>
            {/* Header - Hidden via CSS, using page sidebar instead */}
            <header className={styles.header}>
                <a href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>✈</span>
                    <span className={styles.logoText}>FlyCompensate</span>
                </a>
                {currentStep < TOTAL_STEPS && (
                    <button className={styles.cancelBtn} onClick={() => window.location.href = '/'}>
                        {tCommon('cancel')}
                    </button>
                )}
            </header>

            {/* Progress Bar */}
            {currentStep < TOTAL_STEPS && (
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {/* Form Content */}
            <div className={styles.formContainer}>
                {renderStep()}
            </div>

            {/* Navigation */}
            {currentStep < TOTAL_STEPS && (
                <div className={styles.navigation}>
                    {currentStep > 1 && (
                        <button type="button" className={styles.backBtn} onClick={prevStep}>
                            ← {t('back')}
                        </button>
                    )}

                    {currentStep < 14 ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={nextStep}
                            disabled={!canProceed()}
                        >
                            {t('continue')} →
                        </button>
                    ) : currentStep === 14 ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('processing') : t('submit') + ' →'}
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
}

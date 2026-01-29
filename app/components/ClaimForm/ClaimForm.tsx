'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './ClaimForm.module.css';
import AirportSearch from '../AirportSearch/AirportSearch';
import { submitClaim } from '@/app/actions/submit-claim';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { countries } from '@/app/data/countries';
import CountrySelect from './CountrySelect';

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
    connectionAirports: Airport[];

    // Step A (New): Full Journey (Stored for Reference)
    fullJourneyDeparture: Airport | null;
    fullJourneyArrival: Airport | null;

    // Step 2 (New): Disrupted Segment Selection (Only if not direct)
    disruptedSegment: { from: Airport, to: Airport } | null;

    // Step 3 (Old Step 2): Airports (These will be updated to the DISRUPTED segment for search)
    departureAirport: Airport | null; // This will hold the start of the DISRUPTED segment
    arrivalAirport: Airport | null; // This will hold the end of the DISRUPTED segment
    travelDate: string;

    // Step 4 (Old Step 3): Flight Selection
    selectedFlight: Flight | null;
    manualFlightNumber: string;
    manualAirline: string;
    manualDepartureTime: string;

    // Step 5 (Old Step 4): Problem Type
    problemType: 'delayed' | 'cancelled' | 'refused' | null;
    refusedReason: string;

    // Step 6 (Old Step 5): Delay Duration
    delayDuration: string;

    // Step 7 (Old Step 6): Passenger Info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    acceptAgreementPower: boolean;
    acceptAgreementService: boolean;

    // Step 8 (Old Step 7): Group Travel
    isGroupTravel: boolean | null;
    groupPassengers: Array<{ firstName: string; lastName: string; email: string }>;

    // Step 9 (Old Step 8): Address
    address: string;
    city: string;
    postalCode: string;
    country: string;

    // Step 10 (Old Step 9): Booking Number
    bookingNumber: string;

    // Step 11 (Old Step 10): Signature
    signature: string;

    // Step 12 (Old Step 11): Boarding Pass
    boardingPass: File | null;
    boardingPassUrl?: string;

    // Step 13 (Old Step 12): ID Document
    idDocument: File | null;
    idDocumentUrl?: string;

    // Step 14 (Old Step 13): Airline Contact
    contactedAirline: boolean | null;
    incidentDescription: string;

    // Step 15 (Old Step 14): Additional Info
    preferredLanguage: string;
    ticketPurchaseSource: string;
    referralSource: string;
}

const TOTAL_STEPS = 18;

const initialFormData: FormData = {
    isDirect: null,
    connectionAirports: [],
    fullJourneyDeparture: null,
    fullJourneyArrival: null,
    disruptedSegment: null,
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
    acceptAgreementPower: false,
    acceptAgreementService: false,
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [fastTrackMode, setFastTrackMode] = useState(false);

    const [selectedCountryIso, setSelectedCountryIso] = useState('US');

    // Flight Search State
    const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);
    const [isLoadingFlights, setIsLoadingFlights] = useState(false);
    const [step4View, setStep4View] = useState<'list' | 'manual'>('list');

    // Fast-track steps to skip (1-3 for flight info, 11 for boarding pass)
    // Note: With new step 2, indices might shift if logic isn't careful.
    // Assuming fast track skips the whole flight selection flow.
    const fastTrackSkipSteps = [1, 2, 3, 4, 12]; // Adjusted roughly, but fast track logic is complex with inserted steps.

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

            // Start at step 5 (problem type) instead of step 1 (shifted by 1 due to Step 2 insertion)
            setCurrentStep(5);

            // Clean up sessionStorage
            sessionStorage.removeItem('fastTrackMode');
            sessionStorage.removeItem('boardingPassUrl');
        } else {
            // Normal flow - initialize from URL params
            if (from) {
                // Fetch full airport details
                fetch(`/api/airports/search?q=${from}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.items && data.items.length > 0) {
                            // Find precise match (case-insensitive) or fallback to first result
                            const match = data.items.find((a: Airport) =>
                                a.iata.toUpperCase() === from.toUpperCase() ||
                                a.icao.toUpperCase() === from.toUpperCase()
                            ) || data.items[0];
                            setFormData(prev => ({ ...prev, departureAirport: match }));
                        }
                    })
                    .catch(e => console.error('Error fetching departure airport:', e));
            }

            if (to) {
                // Fetch full airport details
                fetch(`/api/airports/search?q=${to}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.items && data.items.length > 0) {
                            // Find precise match (case-insensitive) or fallback to first result
                            const match = data.items.find((a: Airport) =>
                                a.iata.toUpperCase() === to.toUpperCase() ||
                                a.icao.toUpperCase() === to.toUpperCase()
                            ) || data.items[0];
                            setFormData(prev => ({ ...prev, arrivalAirport: match }));
                        }
                    })
                    .catch(e => console.error('Error fetching arrival airport:', e));
            }
        }
    }, [searchParams]);

    // Search flights when entering Step 4
    useEffect(() => {
        if (currentStep === 4 && step4View === 'list') {
            const searchFlights = async () => {
                setIsLoadingFlights(true);
                setAvailableFlights([]);
                try {
                    // Determine search segments
                    let searchFrom = formData.departureAirport?.iata || formData.departureAirport?.icao;
                    let searchTo = formData.arrivalAirport?.iata || formData.arrivalAirport?.icao;

                    if (!formData.isDirect && formData.disruptedSegment) {
                        searchFrom = formData.disruptedSegment.from.iata || formData.disruptedSegment.from.icao;
                        searchTo = formData.disruptedSegment.to.iata || formData.disruptedSegment.to.icao;
                    }

                    if (!searchFrom || !formData.travelDate) {
                        setStep4View('manual');
                        return;
                    }

                    const query = new URLSearchParams({
                        from: searchFrom,
                        date: formData.travelDate
                    });
                    if (searchTo) query.append('to', searchTo);

                    const res = await fetch(`/api/flights/search?${query.toString()}`);
                    const data = await res.json();

                    if (data.flights && data.flights.length > 0) {
                        setAvailableFlights(data.flights);
                    } else {
                        // No flights found, but don't auto-switch. We will show "No flights found" UI.
                        setAvailableFlights([]);
                    }
                } catch (err) {
                    console.error('Error searching flights', err);
                    // On error, show "No flights found" / Manual entry option instead of auto-switching
                    setAvailableFlights([]);
                    // Use a flag if we want to show a specific error message, but for now fallback UI handles it.
                } finally {
                    setIsLoadingFlights(false);
                }
            };
            searchFlights();
        }
    }, [currentStep, step4View, formData.departureAirport, formData.arrivalAirport, formData.travelDate, formData.isDirect, formData.disruptedSegment]);

    // Reset step 4 view when changing steps
    useEffect(() => {
        if (currentStep !== 4) setStep4View('list');
    }, [currentStep]);

    const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            let next = currentStep + 1;

            // Save full journey on Step 1 completion
            if (currentStep === 1) {
                if (!formData.fullJourneyDeparture && formData.departureAirport) {
                    updateFormData('fullJourneyDeparture', formData.departureAirport);
                }
                if (!formData.fullJourneyArrival && formData.arrivalAirport) {
                    updateFormData('fullJourneyArrival', formData.arrivalAirport);
                }
            }

            // Skip Step 2 (Segment Selection) if direct flight
            if (next === 2 && formData.isDirect) {
                next = 3;
            }

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

            // Skip Step 2 if direct flight
            if (prev === 2 && formData.isDirect) {
                prev = 1;
            }

            // Skip fast-track steps when going back in fast mode
            while (fastTrackMode && fastTrackSkipSteps.includes(prev) && prev > 1) {
                prev--;
            }
            // If we're at the first non-skipped step and in fast mode, don't go below step 5
            if (fastTrackMode && prev < 5) {
                prev = 5;
            }

            // If going back to Step 1 from Step 2, restore full journey to departure/arrival
            if (prev === 1 && currentStep === 2) {
                if (formData.fullJourneyDeparture) updateFormData('departureAirport', formData.fullJourneyDeparture);
                if (formData.fullJourneyArrival) updateFormData('arrivalAirport', formData.fullJourneyArrival);
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
            case 2: return formData.isDirect ? true : !!formData.disruptedSegment;
            case 3: return !!formData.travelDate; // Airports enforced in Step 1
            case 4: return !!(formData.manualFlightNumber && formData.manualAirline && formData.manualDepartureTime);
            case 5: return !!formData.problemType;
            case 6: return formData.problemType !== 'delayed' || !!formData.delayDuration;
            case 7: return !!(formData.firstName && formData.lastName && formData.email);
            case 8: return formData.isGroupTravel !== null;
            case 9: return !!(formData.address && formData.city && formData.postalCode && formData.country);
            case 10: return !!formData.bookingNumber;
            case 11: return !!formData.signature;
            case 12: return true;
            case 13: return !!formData.idDocument;
            case 14: return formData.contactedAirline !== null;
            case 15: return true;
            case 15: return true;
            case 16: return !!formData.acceptAgreementPower;
            case 17: return !!formData.acceptAgreementService;
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

            // Combine country code and phone number if phone is provided
            if (dataToSubmit.phone) {
                const country = countries.find(c => c.code === selectedCountryIso);
                const dialCode = country ? country.dial_code : '+1';
                dataToSubmit.phone = `${dialCode} ${dataToSubmit.phone}`;
            }

            try {
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
        } catch (e) {
            console.error('Unexpected error:', e);
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

    const handleExpressUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // 1. Upload/Store File
            updateFormData('boardingPass', file);

            // 2. Enable Fast Track
            setFastTrackMode(true);

            // 3. Simulate Data Extraction (Mock Data for Demo)
            // In a real app, this would come from OCR backend
            const mockDeparture: Airport = {
                iata: 'LHR',
                icao: 'EGLL',
                name: 'London Heathrow Airport',
                municipalityName: 'London',
                countryCode: 'GB',
                label: 'London Heathrow (LHR)'
            };
            const mockArrival: Airport = {
                iata: 'JFK',
                icao: 'KJFK',
                name: 'John F. Kennedy International Airport',
                municipalityName: 'New York',
                countryCode: 'US',
                label: 'New York John F. Kennedy (JFK)'
            };

            setFormData(prev => ({
                ...prev,
                boardingPass: file,
                departureAirport: mockDeparture,
                arrivalAirport: mockArrival,
                isDirect: true, // simplified for express
                travelDate: new Date().toISOString().split('T')[0],
                manualFlightNumber: 'BA123',
                manualAirline: 'British Airways'
            }));

            // 4. Skip to Problem Type (Step 5)
            // Timeout to allow state update visual feedback if needed, but immediate is usually fine
            setTimeout(() => {
                setCurrentStep(5);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            // Step 1: Flight Details (Route + Direct Question)
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>✈️</div>
                        <h2 className={styles.stepTitle}>{t('whereDidYouFly')}</h2>

                        {/* Express Checkout Section */}
                        <div className={styles.expressCheckout} style={{
                            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                            border: '1px solid #bfdbfe',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '32px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚀</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>{t('expressCheckout')}</h3>
                            <p style={{ color: '#3b82f6', marginBottom: '16px', fontSize: '14px' }}>
                                {t('expressCheckoutDesc')}
                            </p>
                            <label style={{
                                display: 'inline-block',
                                background: '#2563eb',
                                color: 'white',
                                padding: '10px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                            }}>
                                {t('uploadBoardingPassBtn')}
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleExpressUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>

                        <div className={styles.separator}>
                            <span>{t('or')}</span>
                        </div>

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
                                <h4>{t('addConnectionAirports')}</h4>
                                {formData.connectionAirports.map((airport, index) => (
                                    <div key={index} className={styles.connectionRow}>
                                        <span className={styles.connectionLabel}>{t('stop')} {index + 1}</span>
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
                                        {t('addConnectionAirportBtn')}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                );

            // Step 2: Segment Selection (New)
            case 2:
                if (formData.isDirect) return null;

                // Construct segments
                const segments: { from: Airport, to: Airport }[] = [];
                if (formData.fullJourneyDeparture && formData.fullJourneyArrival) {
                    // Start -> Conn 1
                    if (formData.connectionAirports.length > 0 && formData.connectionAirports[0].iata) {
                        segments.push({ from: formData.fullJourneyDeparture, to: formData.connectionAirports[0] });

                        // Conn 1 -> Conn 2 (if exists)
                        for (let i = 0; i < formData.connectionAirports.length - 1; i++) {
                            if (formData.connectionAirports[i + 1].iata) {
                                segments.push({ from: formData.connectionAirports[i], to: formData.connectionAirports[i + 1] });
                            }
                        }

                        // Last Conn -> End
                        const lastConn = formData.connectionAirports[formData.connectionAirports.length - 1];
                        if (lastConn.iata) {
                            segments.push({ from: lastConn, to: formData.fullJourneyArrival });
                        }
                    } else {
                        // If no connection airports added but marked as indirect (fail safe)
                        segments.push({ from: formData.fullJourneyDeparture, to: formData.fullJourneyArrival });
                    }
                }

                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🔀</div>
                        <h2 className={styles.stepTitle}>{t('whichSegment')}</h2>
                        <p className={styles.stepSubtitle}>{t('selectSegment')}</p>

                        <div className={styles.segmentOptions} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {segments.map((segment, index) => {
                                const isSelected = formData.disruptedSegment?.from.iata === segment.from.iata && formData.disruptedSegment?.to.iata === segment.to.iata;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${styles.optionCard} ${isSelected ? styles.selected : ''}`}
                                        style={{ justifyContent: 'space-between', padding: '16px' }}
                                        onClick={() => {
                                            updateFormData('disruptedSegment', segment);
                                            // Update the main departure/arrival to the disrupted segment for later usage
                                            updateFormData('departureAirport', segment.from);
                                            updateFormData('arrivalAirport', segment.to);
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{segment.from.iata}</div>
                                            <div style={{ color: '#9ca3af' }}>→</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{segment.to.iata}</div>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                            {segment.from.municipalityName} {t('to')} {segment.to.municipalityName}
                                        </div>
                                        <div className={styles.optionCheck}>
                                            {isSelected && <span>✓</span>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );

            // Step 3: Date
            case 3:
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

            // Step 4: Flight Details (Auto Search + Manual Fallback)
            case 4:
                // Loading State
                if (isLoadingFlights) {
                    return (
                        <div className={styles.stepContent}>
                            <div className={styles.stepIcon}>🔎</div>
                            <h2 className={styles.stepTitle}>Searching for your flight...</h2>
                            <div className={styles.loadingSpinner}></div>
                        </div>
                    );
                }

                // List View
                if (step4View === 'list' && availableFlights.length > 0) {
                    return (
                        <div className={styles.stepContent}>
                            <div className={styles.stepIcon}>✈️</div>
                            <h2 className={styles.stepTitle}>Select your flight</h2>
                            <p className={styles.stepSubtitle}>We found these flights for your route.</p>

                            <div className={styles.flightList}>
                                {availableFlights.map((flight, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={styles.flightCard}
                                        onClick={() => {
                                            updateFormData('selectedFlight', flight);
                                            updateFormData('manualFlightNumber', flight.flightNumber);
                                            updateFormData('manualAirline', flight.airline.name);
                                            updateFormData('manualDepartureTime', flight.departure.scheduledTime);
                                            nextStep();
                                        }}
                                    >
                                        <div className={styles.flightInfo}>
                                            <div className={styles.flightMain}>
                                                <span className={styles.flightNumber}>{flight.flightNumber}</span>
                                                <span className={styles.flightAirline}>{flight.airline.name}</span>
                                            </div>
                                            <div className={styles.flightRoute}>
                                                <span>{flight.departure.scheduledTime?.slice(11, 16)} {flight.departure.airport.iata}</span>
                                                <span className={styles.arrow}>→</span>
                                                <span>{flight.arrival.scheduledTime?.slice(11, 16)} {flight.arrival.airport.iata}</span>
                                            </div>
                                        </div>
                                        <div className={styles.flightStatus}>
                                            <span className={`${styles.statusBadge} ${styles[flight.status.toLowerCase()] || ''}`}>
                                                {flight.status}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                className={styles.linkButton}
                                onClick={() => setStep4View('manual')}
                                style={{ marginTop: '1rem', color: '#6b7280', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                I can't find my flight
                            </button>
                        </div>
                    );
                }

                // List View - No Results Found
                if (step4View === 'list' && availableFlights.length === 0) {
                    return (
                        <div className={styles.stepContent}>
                            <div className={styles.stepIcon}>🔎</div>
                            <h2 className={styles.stepTitle}>No flights found</h2>
                            <p className={styles.stepSubtitle}>We couldn't find any flights for this date.</p>

                            <div className={styles.noFlightsFound}>
                                <p><strong>Don't worry!</strong> You can still claim by entering your flight details manually.</p>
                                <button className={styles.manualEntryBtn} onClick={() => setStep4View('manual')}>
                                    Enter Flight Details Manually
                                </button>
                            </div>
                        </div>
                    );
                }

                // Manual Entry View (Fallback)
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🔎</div>
                        <h2 className={styles.stepTitle}>{t('step3Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('provideFlightDetails')}</p>

                        <div className={styles.manualEntryForm}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('flightNumberLabel')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('flightNumberPlaceholder')}
                                    value={formData.manualFlightNumber}
                                    onChange={(e) => updateFormData('manualFlightNumber', e.target.value.toUpperCase())}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('airlineLabel')}</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder={t('airlinePlaceholder')}
                                    value={formData.manualAirline}
                                    onChange={(e) => updateFormData('manualAirline', e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>{t('scheduledDepartureTime')}</label>
                                <input
                                    type="time"
                                    className={styles.input}
                                    value={formData.manualDepartureTime}
                                    onChange={(e) => updateFormData('manualDepartureTime', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                );

            // Step 5: Problem Type
            case 5:
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
                                <label className={styles.label}>{t('selectReason')}</label>
                                <select
                                    className={styles.select}
                                    value={formData.refusedReason}
                                    onChange={(e) => updateFormData('refusedReason', e.target.value)}
                                >
                                    <option value="">{t('selectReason')}</option>
                                    <option value="dont_remember">{t('reasons.dontRemember')}</option>
                                    <option value="technical">{t('reasons.technical')}</option>
                                    <option value="weather">{t('reasons.weather')}</option>
                                    <option value="linked_flights">{t('reasons.linkedFlights')}</option>
                                    <option value="airport_problems">{t('reasons.airportProblems')}</option>
                                    <option value="strike">{t('reasons.strike')}</option>
                                    <option value="no_reason">{t('reasons.noReason')}</option>
                                    <option value="force_majeure">{t('reasons.forceMajeure')}</option>
                                </select>
                            </div>
                        )}
                    </div>
                );

            // Step 6: Delay Duration
            case 6:
                if (formData.problemType !== 'delayed') {
                    // This render might happen during transition, safe to return null or previous
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

            // Step 7: Passenger Information
            case 7:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>👤</div>
                        <h2 className={styles.stepTitle}>{t('step6Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step6Subtitle')}</p>

                        <div className={styles.assistantNote}>
                            <div className={styles.assistantAvatar}>M</div>
                            <p><strong>Marie</strong> · {t('assistantNote')}</p>
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
                                <span className={styles.hint}>{t('firstNameHint')}</span>
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
                                <span className={styles.hint}>{t('lastNameHint')}</span>
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
                            <div className={styles.phoneInputGroup}>
                                <CountrySelect
                                    value={selectedCountryIso}
                                    onChange={setSelectedCountryIso}
                                />
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="123 456 7890"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData('phone', e.target.value)}
                                />
                            </div>
                            <span className={styles.hint}>{t('phoneHint')}</span>
                        </div>

                    </div>
                );

            // Step 8: Group Travel
            case 8:
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

            // Step 9: Address
            case 9:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📍</div>
                        <h2 className={styles.stepTitle}>{t('step8Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step8Subtitle')}</p>

                        <div className={styles.compensationNote}>
                            <span className={styles.noteIcon}>💡</span>
                            <p>{t('compensationNote')}</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('address')}</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder={t('streetAddressPlaceholder')}
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

            // Step 10: Booking Number
            case 10:
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
                            <p>{t('bookingHintTitle')}</p>
                            <ul>
                                <li>{t('bookingHint1')}</li>
                                <li>{t('bookingHint2')}</li>
                                <li>{t('bookingHint3')}</li>
                            </ul>
                        </details>
                    </div>
                );

            // Step 11: Signature
            case 11:
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

            // Step 12: Boarding Pass
            case 12:
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
                                            <span className={styles.changeFile}>{t('clickToChange')}</span>
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

            // Step 13: ID Upload
            case 13:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🆔</div>
                        <h2 className={styles.stepTitle}>{t('step12Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step12Subtitle')}</p>

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
                                            <span className={styles.changeFile}>{t('clickToChange')}</span>
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

            // Step 14: Airline Contact
            case 14:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📝</div>
                        <h2 className={styles.stepTitle}>{t('step13Title')}</h2>
                        <p className={styles.stepSubtitle}>{t('step13Subtitle')}</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('contactedAirline')}</label>
                            <div className={styles.optionCards} style={{ marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    className={`${styles.optionCard} ${formData.contactedAirline === true ? styles.selected : ''}`}
                                    onClick={() => updateFormData('contactedAirline', true)}
                                >
                                    <div className={styles.optionIcon}>👍</div>
                                    <div className={styles.optionContent}>
                                        <h3>{t('yes')}</h3>
                                    </div>
                                    <div className={styles.optionCheck}>
                                        {formData.contactedAirline === true && <span>✓</span>}
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.optionCard} ${formData.contactedAirline === false ? styles.selected : ''}`}
                                    onClick={() => updateFormData('contactedAirline', false)}
                                >
                                    <div className={styles.optionIcon}>👎</div>
                                    <div className={styles.optionContent}>
                                        <h3>{t('no')}</h3>
                                    </div>
                                    <div className={styles.optionCheck}>
                                        {formData.contactedAirline === false && <span>✓</span>}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('incidentDescription')}</label>
                            <textarea
                                className={styles.textarea}
                                placeholder={t('incidentPlaceholder')}
                                value={formData.incidentDescription}
                                onChange={(e) => updateFormData('incidentDescription', e.target.value)}
                            />
                            <p className={styles.tipNote}>{t('incidentTip')}</p>
                        </div>
                    </div>
                );

            // Step 15: Additional Info
            case 15:
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

            // Step 16: Agreement 1 - Power of Attorney
            case 16:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>⚖️</div>
                        <h2 className={styles.stepTitle}>{t('agreementPowerTitle')}</h2>
                        <p className={styles.stepSubtitle}>{t('agreementPowerSubtitle')}</p>

                        <div style={{
                            background: '#ffffff',
                            padding: '24px',
                            borderRadius: '8px',
                            border: '2px solid #cbd5e1',
                            marginBottom: '1.5rem',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div className="prose prose-base text-gray-900 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t.raw('agreementPowerContent') }}
                            />
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox} style={{ alignItems: 'flex-start' }}>
                                <input
                                    type="checkbox"
                                    checked={!!formData.acceptAgreementPower}
                                    onChange={(e) => updateFormData('acceptAgreementPower', e.target.checked)}
                                    style={{ marginTop: '3px' }}
                                />
                                <span className={styles.checkmark} style={{ marginTop: '3px' }}></span>
                                <span style={{ fontWeight: '500' }}>{t('agreementAcceptPower')}</span>
                            </label>
                        </div>
                    </div>
                );

            // Step 17: Agreement 2 - Service Agreement
            case 17:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📝</div>
                        <h2 className={styles.stepTitle}>{t('agreementServiceTitle')}</h2>
                        <p className={styles.stepSubtitle}>{t('agreementServiceSubtitle')}</p>

                        <div style={{
                            background: '#ffffff',
                            padding: '24px',
                            borderRadius: '8px',
                            border: '2px solid #cbd5e1',
                            marginBottom: '1.5rem',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div className="prose prose-base text-gray-900 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t.raw('agreementServiceContent') }}
                            />
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label className={styles.checkbox} style={{ alignItems: 'flex-start' }}>
                                <input
                                    type="checkbox"
                                    checked={!!formData.acceptAgreementService}
                                    onChange={(e) => updateFormData('acceptAgreementService', e.target.checked)}
                                    style={{ marginTop: '3px' }}
                                />
                                <span className={styles.checkmark} style={{ marginTop: '3px' }}></span>
                                <span style={{ fontWeight: '500' }}>{t('agreementAcceptService')}</span>
                            </label>
                        </div>
                    </div>
                );

            // Step 18: Success
            case 18:
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
                                <p>{t('emailReminderBody')}</p>
                                <p className={styles.emailHighlight}><strong>{formData.email}</strong></p>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
                                    {t('emailReminderFooter')}
                                </p>
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

                    {currentStep < 17 ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={nextStep}
                            disabled={!canProceed()}
                        >
                            {t('continue')} →
                        </button>
                    ) : currentStep === 17 ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.acceptAgreementService}
                        >
                            {isSubmitting ? t('processing') : t('submit') + ' →'}
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
}

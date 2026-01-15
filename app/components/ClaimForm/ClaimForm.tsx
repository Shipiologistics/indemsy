'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ClaimForm.module.css';
import AirportSearch from '../AirportSearch/AirportSearch';

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

    // Step 12: ID Document
    idDocument: File | null;

    // Step 13: Airline Contact
    contactedAirline: boolean | null;
    incidentDescription: string;

    // Step 14: Additional Info
    preferredLanguage: string;
    ticketPurchaseSource: string;
    referralSource: string;

    // Step 15: Prime Subscription
    primeSubscription: 'none' | 'prime' | 'primePlus';
}

const TOTAL_STEPS = 16;

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
    primeSubscription: 'none',
};

interface ClaimFormProps {
    onClose?: () => void;
}

export default function ClaimForm({ onClose }: ClaimFormProps) {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(() => ({
        ...initialFormData,
    }));
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoadingFlights, setIsLoadingFlights] = useState(false);
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [flightSearchMeta, setFlightSearchMeta] = useState<{
        isApproximateDate: boolean;
        usedDate: string | null;
        requestedDate: string | null;
    }>({ isApproximateDate: false, usedDate: null, requestedDate: null });

    // Initialize from URL params
    useEffect(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (from) {
            // Set departure airport from URL
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
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (onClose) {
            onClose();
        }
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 1: return formData.isDirect !== null;
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
            case 15: return true; // Can skip premium
            default: return true;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        nextStep();
        setIsSubmitting(false);
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
            // Step 1: Direct Flight Question
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>✈️</div>
                        <h2 className={styles.stepTitle}>Was it a direct flight?</h2>
                        <p className={styles.stepSubtitle}>Indicate if you have had any correspondence.</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isDirect === true ? styles.selected : ''}`}
                                onClick={() => updateFormData('isDirect', true)}
                            >
                                <div className={styles.optionIcon}>🛫</div>
                                <div className={styles.optionContent}>
                                    <h3>Yes, it was a direct flight</h3>
                                    <p>Non-stop and without connections</p>
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
                                    <h3>No, I had at least one correspondence</h3>
                                    <p>One or more stopovers</p>
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

            // Step 2: Travel Details
            case 2:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📅</div>
                        <h2 className={styles.stepTitle}>When did you travel?</h2>
                        <p className={styles.stepSubtitle}>Enter your flight details to find your flight.</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Departure Airport</label>
                            <AirportSearch
                                id="departure"
                                placeholder="Departure airport"
                                icon="🛫"
                                value={formData.departureAirport}
                                onChange={(a) => updateFormData('departureAirport', a)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Arrival Airport</label>
                            <AirportSearch
                                id="arrival"
                                placeholder="Arrival airport"
                                icon="🛬"
                                value={formData.arrivalAirport}
                                onChange={(a) => updateFormData('arrivalAirport', a)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Date of Travel</label>
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
                        <h2 className={styles.stepTitle}>Select your flight</h2>
                        <p className={styles.stepSubtitle}>Choose the flight to which your claim relates.</p>

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
                        <h2 className={styles.stepTitle}>What was the problem encountered?</h2>
                        <p className={styles.stepSubtitle}>Select the type of disturbance.</p>

                        <div className={styles.problemCards}>
                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'delayed' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'delayed')}
                            >
                                <span className={styles.problemIcon}>⏱️</span>
                                <h3>My flight was delayed</h3>
                                <p>Arrived more than 3 hours late</p>
                            </button>

                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'cancelled' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'cancelled')}
                            >
                                <span className={styles.problemIcon}>❌</span>
                                <h3>My flight was cancelled</h3>
                                <p>Flight cancelled by the airline</p>
                            </button>

                            <button
                                type="button"
                                className={`${styles.problemCard} ${formData.problemType === 'refused' ? styles.selected : ''}`}
                                onClick={() => updateFormData('problemType', 'refused')}
                            >
                                <span className={styles.problemIcon}>🚫</span>
                                <h3>I was refused boarding</h3>
                                <p>Overbooking or other reason</p>
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
                        <h2 className={styles.stepTitle}>How many hours of delay?</h2>
                        <p className={styles.stepSubtitle}>
                            We are sorry to hear that. How many hours of delay did you experience upon arrival at {formData.arrivalAirport?.name || formData.arrivalAirport?.iata}?
                        </p>

                        <div className={styles.delayOptions}>
                            {['< 2h', '2-3 hours', '3-4 hours', '> 4h'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={`${styles.delayOption} ${formData.delayDuration === option ? styles.selected : ''}`}
                                    onClick={() => updateFormData('delayDuration', option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {formData.delayDuration && formData.delayDuration.includes('< 2') && (
                            <div className={styles.warningBox}>
                                <span className={styles.warningIcon}>ℹ️</span>
                                <p>Unfortunately, delays under 3 hours typically do not qualify for compensation under EU regulation EC 261/2004. However, we'll still check your case.</p>
                            </div>
                        )}
                    </div>
                );

            // Step 6: Passenger Information
            case 6:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>👤</div>
                        <h2 className={styles.stepTitle}>Passenger information</h2>
                        <p className={styles.stepSubtitle}>I need some information to file the claim.</p>

                        <div className={styles.assistantNote}>
                            <div className={styles.assistantAvatar}>M</div>
                            <p><strong>Marie</strong> · Your Indemfly Assistant</p>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>First name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                />
                                <span className={styles.hint}>Please enter all first names exactly as they appear on your identity card.</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Last name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Last name"
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
                                <span>I accept the <a href="/terms" target="_blank">Terms of Use</a> and the <a href="/privacy" target="_blank">Privacy Policy</a>.</span>
                            </label>
                            <p className={styles.checkboxNote}>
                                Indemfly may send you emails. You have the option to unsubscribe from these marketing emails free of charge and at any time.
                            </p>
                        </div>
                    </div>
                );

            // Step 7: Group Travel
            case 7:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>👥</div>
                        <h2 className={styles.stepTitle}>Were you travelling in a group?</h2>
                        <p className={styles.stepSubtitle}>All passengers on your flight could be eligible for compensation of up to €600!</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.isGroupTravel === false ? styles.selected : ''}`}
                                onClick={() => updateFormData('isGroupTravel', false)}
                            >
                                <div className={styles.optionIcon}>👤</div>
                                <div className={styles.optionContent}>
                                    <h3>No, I was alone.</h3>
                                    <p>Only one complaint</p>
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
                                    <h3>Yes, there were several of us.</h3>
                                    <p>Group claim</p>
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
                                            placeholder="First name"
                                            value={passenger.firstName}
                                            onChange={(e) => {
                                                const updated = [...formData.groupPassengers];
                                                updated[index].firstName = e.target.value;
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            value={passenger.lastName}
                                            onChange={(e) => {
                                                const updated = [...formData.groupPassengers];
                                                updated[index].lastName = e.target.value;
                                                updateFormData('groupPassengers', updated);
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
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
                                    + Add passenger
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
                        <h2 className={styles.stepTitle}>Add your address</h2>
                        <p className={styles.stepSubtitle}>We need your address for the claim.</p>

                        <div className={styles.compensationNote}>
                            <span className={styles.noteIcon}>💡</span>
                            <p>If you submit your claim now, you will likely receive your compensation within the next 15 days. Filing a claim promptly speeds up the review process.</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Address</label>
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
                                <label className={styles.label}>City</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => updateFormData('city', e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Postal Code</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Postal code"
                                    value={formData.postalCode}
                                    onChange={(e) => updateFormData('postalCode', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Country</label>
                            <select
                                className={styles.select}
                                value={formData.country}
                                onChange={(e) => updateFormData('country', e.target.value)}
                            >
                                <option value="">Select country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="IT">Italy</option>
                                <option value="NL">Netherlands</option>
                                <option value="IN">India</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                );

            // Step 9: Booking Number
            case 9:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🎫</div>
                        <h2 className={styles.stepTitle}>What is your booking number?</h2>
                        <p className={styles.stepSubtitle}>This unique code allows us to identify your reservation.</p>

                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={`${styles.input} ${styles.bookingInput}`}
                                placeholder="e.g., DF87G3 or REDYYD"
                                value={formData.bookingNumber}
                                onChange={(e) => updateFormData('bookingNumber', e.target.value.toUpperCase())}
                                maxLength={10}
                            />
                        </div>

                        <details className={styles.helpDetails}>
                            <summary>How do I find my booking number?</summary>
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
                        <h2 className={styles.stepTitle}>Sign to confirm</h2>
                        <p className={styles.stepSubtitle}>
                            Good news! You are eligible for compensation of up to <strong className={styles.amount}>€400</strong> per person.
                        </p>

                        <div className={styles.signatureSection}>
                            <p className={styles.signatureNote}>To receive the amount owed to you, please sign below.</p>

                            <div className={styles.signatureBox}>
                                <textarea
                                    className={styles.signatureInput}
                                    placeholder="Type your full name as signature..."
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
                                    Delete the signature
                                </button>
                            </div>

                            <p className={styles.signatureLegal}>
                                Your signature gives us your consent to seek compensation from the airline. The airline requires your signature to process the compensation claim. By signing, you agree to the <a href="/terms">Terms of Use</a>.
                            </p>
                        </div>
                    </div>
                );

            // Step 11: Boarding Pass
            case 11:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>🎟️</div>
                        <h2 className={styles.stepTitle}>Upload boarding pass</h2>
                        <p className={styles.stepSubtitle}>Upload your boarding pass to strengthen your claim (optional).</p>

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
                                            <p>Click to upload or drag file here</p>
                                            <span className={styles.uploadFormats}>PDF, JPG, PNG</span>
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
                        <h2 className={styles.stepTitle}>Identity card or passport</h2>
                        <p className={styles.stepSubtitle}>We now need your identity card or passport.</p>

                        <div className={styles.idNote}>
                            <p>This is very important for your case with the airline. Your document will only be used to process the claim and will then be deleted within 30 days of the claim being finalized.</p>
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
                                            <p>Upload ID document</p>
                                            <span className={styles.uploadFormats}>PDF, JPG, PNG</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className={styles.securityNote}>
                            <span className={styles.securityIcon}>🔒</span>
                            <p>We comply with all data protection laws, and thus ensure the security of your information.</p>
                        </div>
                    </div>
                );

            // Step 13: Airline Contact
            case 13:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>📞</div>
                        <h2 className={styles.stepTitle}>Have you contacted the airline?</h2>
                        <p className={styles.stepSubtitle}>Please provide additional details about your flight.</p>

                        <div className={styles.optionCards}>
                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.contactedAirline === true ? styles.selected : ''}`}
                                onClick={() => updateFormData('contactedAirline', true)}
                            >
                                <div className={styles.optionIcon}>✅</div>
                                <div className={styles.optionContent}>
                                    <h3>Yes</h3>
                                    <p>I contacted the company</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`${styles.optionCard} ${formData.contactedAirline === false ? styles.selected : ''}`}
                                onClick={() => updateFormData('contactedAirline', false)}
                            >
                                <div className={styles.optionIcon}>❌</div>
                                <div className={styles.optionContent}>
                                    <h3>No</h3>
                                    <p>Not yet contacted</p>
                                </div>
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Brief description of what happened</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="Describe what happened..."
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
                        <h2 className={styles.stepTitle}>Additional information</h2>
                        <p className={styles.stepSubtitle}>Optional: This information helps us to serve you better.</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>In which language would you like to communicate?</label>
                            <select
                                className={styles.select}
                                value={formData.preferredLanguage}
                                onChange={(e) => updateFormData('preferredLanguage', e.target.value)}
                            >
                                <option value="">Please choose</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                                <option value="it">Italian</option>
                                <option value="nl">Dutch</option>
                                <option value="pt">Portuguese</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Where did you buy your ticket?</label>
                            <select
                                className={styles.select}
                                value={formData.ticketPurchaseSource}
                                onChange={(e) => updateFormData('ticketPurchaseSource', e.target.value)}
                            >
                                <option value="">Please choose</option>
                                <option value="airline">Directly from airline</option>
                                <option value="travel_agency">Travel agency</option>
                                <option value="online_agency">Online travel agency (Booking, Expedia, etc.)</option>
                                <option value="comparison">Price comparison website</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Where did you hear about Indemfly?</label>
                            <select
                                className={styles.select}
                                value={formData.referralSource}
                                onChange={(e) => updateFormData('referralSource', e.target.value)}
                            >
                                <option value="">Please choose</option>
                                <option value="google">Google</option>
                                <option value="facebook">Facebook</option>
                                <option value="instagram">Instagram</option>
                                <option value="friend">Recommendation from a friend</option>
                                <option value="airport">At the airport</option>
                                <option value="television">Television</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                );

            // Step 15: Prime Subscription
            case 15:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.stepIcon}>✨</div>
                        <h2 className={styles.stepTitle}>Fly smart and comfortably</h2>
                        <p className={styles.stepSubtitle}>Steal Prime.</p>

                        <p className={styles.primeIntro}>
                            With Indemfly Prime, enjoy lounge access, 24/7 travel assistance, and much more.
                        </p>

                        <div className={styles.primeCards}>
                            <div
                                className={`${styles.primeCard} ${formData.primeSubscription === 'prime' ? styles.selected : ''} ${styles.recommended}`}
                                onClick={() => updateFormData('primeSubscription', 'prime')}
                            >
                                <span className={styles.recommendedBadge}>Recommended</span>
                                <div className={styles.primeIcon}>✨</div>
                                <h3>Prime</h3>
                                <div className={styles.primePrice}>
                                    <span className={styles.oldPrice}>€9.99</span>
                                    <span className={styles.newPrice}>€3.25</span>
                                    <span className={styles.period}>/month</span>
                                </div>
                            </div>

                            <div
                                className={`${styles.primeCard} ${formData.primeSubscription === 'primePlus' ? styles.selected : ''}`}
                                onClick={() => updateFormData('primeSubscription', 'primePlus')}
                            >
                                <div className={styles.primeIcon}>💎</div>
                                <h3>Prime +</h3>
                                <div className={styles.primePrice}>
                                    <span className={styles.newPrice}>€29.99</span>
                                    <span className={styles.period}>/month</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.primeFeatures}>
                            <p><strong>The subscription includes:</strong></p>
                            <ul>
                                <li>✓ Free lounge access at airports worldwide</li>
                                <li>✓ Guaranteed lowest prices on flights and hotels</li>
                                <li>✓ A dedicated travel expert is available 24/7 for your bookings</li>
                                <li>✓ Instant assistance via WhatsApp or LiveChat</li>
                                <li>✓ Prime members save approximately €488/year on their bookings</li>
                                <li>✓ Receive an extra €100 if your flight is disrupted</li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            className={styles.skipPrimeBtn}
                            onClick={() => {
                                updateFormData('primeSubscription', 'none');
                                nextStep();
                            }}
                        >
                            No thanks, I'm not interested.
                        </button>
                    </div>
                );

            // Step 16: Success
            case 16:
                return (
                    <div className={styles.stepContent}>
                        <div className={styles.successIcon}>🎉</div>
                        <h2 className={styles.stepTitle}>Your claim has been submitted!</h2>
                        <p className={styles.stepSubtitle}>We will connect with you soon.</p>

                        <div className={styles.successCard}>
                            <div className={styles.successInfo}>
                                <p><strong>Claim Reference:</strong> CLM-{Date.now().toString(36).toUpperCase()}</p>
                                <p><strong>Flight:</strong> {formData.selectedFlight?.flightNumber || formData.manualFlightNumber}</p>
                                <p><strong>Route:</strong> {formData.departureAirport?.iata} → {formData.arrivalAirport?.iata}</p>
                                <p><strong>Expected Compensation:</strong> Up to €400</p>
                            </div>
                        </div>

                        <div className={styles.nextSteps}>
                            <h4>What happens next?</h4>
                            <ol>
                                <li>Our team will review your claim within 24-48 hours</li>
                                <li>We'll contact the airline on your behalf</li>
                                <li>You'll receive updates via email</li>
                                <li>Once approved, compensation will be transferred to your account</li>
                            </ol>
                        </div>

                        <a href="/" className={styles.homeBtn}>
                            Return to Homepage
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
                        Cancel
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
                            ← Back
                        </button>
                    )}

                    {currentStep < 15 ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={nextStep}
                            disabled={!canProceed()}
                        >
                            Continue →
                        </button>
                    ) : currentStep === 15 && formData.primeSubscription !== 'none' ? (
                        <button
                            type="button"
                            className={styles.continueBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Claim →'}
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
}

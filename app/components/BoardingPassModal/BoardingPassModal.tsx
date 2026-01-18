'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '@/lib/cloudinary';
import styles from './BoardingPassModal.module.css';

interface BoardingPassModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BoardingPassModal({ isOpen, onClose }: BoardingPassModalProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    if (!isOpen) return null;

    const handleFile = async (file: File) => {
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload an image (JPEG, PNG, WebP) or PDF file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const url = await uploadToCloudinary(file);

            // Store the boarding pass URL and redirect to claim form with fast-track mode
            sessionStorage.setItem('boardingPassUrl', url);
            sessionStorage.setItem('fastTrackMode', 'true');

            onClose();
            router.push('/claim?mode=fast');
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const openFileSelector = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12.014 2a1 1 0 0 0-.707.295l-5.133 4.84-.011.01-.002.001A.5.5 0 0 0 6.514 8h3.5v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h3.5a.5.5 0 0 0 .354-.854l-.031-.029-5.106-4.814-.033-.032A1 1 0 0 0 12.014 2m-9 18a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className={styles.title}>Upload Boarding Pass</h2>
                    <p className={styles.subtitle}>
                        Upload your boarding pass and we'll automatically extract your flight details
                    </p>
                </div>

                {/* Upload Area */}
                <div
                    className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''} ${uploading ? styles.uploading : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={openFileSelector}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleInputChange}
                        className={styles.fileInput}
                    />

                    {uploading ? (
                        <div className={styles.uploadingState}>
                            <div className={styles.spinner}></div>
                            <p>Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.uploadIcon}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                            <p className={styles.uploadText}>
                                <span className={styles.uploadTextHighlight}>Click to upload</span> or drag and drop
                            </p>
                            <p className={styles.uploadHint}>PNG, JPG, WebP or PDF (max 10MB)</p>
                        </>
                    )}
                </div>

                {error && (
                    <div className={styles.error}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Benefits */}
                <div className={styles.benefits}>
                    <div className={styles.benefit}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Skip manual entry</span>
                    </div>
                    <div className={styles.benefit}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Faster processing</span>
                    </div>
                    <div className={styles.benefit}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Secure upload</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

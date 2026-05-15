'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

interface ImageLightboxProps {
    src: string;
    alt: string;
}

export default function ImageLightbox({ src, alt }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Clickable thumbnail */}
            <figure className="my-6 group cursor-zoom-in" onClick={handleOpen}>
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <img
                        src={src}
                        alt={alt || ''}
                        className="max-w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-white opacity-0 group-hover:opacity-70 transition-opacity duration-300 drop-shadow-lg">
                            zoom_in
                        </span>
                    </div>
                </div>
                {alt && (
                    <figcaption className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3 italic font-light">
                        {alt}
                    </figcaption>
                )}
            </figure>

            {/* Lightbox overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                        onClick={handleClose}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={handleClose}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </motion.button>

                        {/* Full image */}
                        <motion.img
                            src={src}
                            alt={alt || ''}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Caption */}
                        {alt && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-4 sm:bottom-8 text-center text-sm text-white/60 font-light max-w-lg"
                            >
                                {alt}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

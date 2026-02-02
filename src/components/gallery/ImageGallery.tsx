'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  title?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  categories: string[];
}

export default function ImageGallery({ images, categories }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (lightboxIndex + 1) % filteredImages.length
      : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  }, [lightboxIndex, filteredImages]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox('next');
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
  }, [closeLightbox, navigateLightbox]);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <motion.button
          onClick={() => setActiveCategory('All')}
          className={`filter-tab ${activeCategory === 'All' ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Image Count */}
      <motion.p
        className="text-center text-[#666] mb-8"
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Showing {filteredImages.length} {filteredImages.length === 1 ? 'project' : 'projects'}
      </motion.p>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.button
              key={`${image.src}-${index}`}
              onClick={() => openLightbox(image, index)}
              className="gallery-image group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#296142] focus:ring-offset-2"
              aria-label={`View ${image.alt}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                <span className="text-white font-medium text-sm px-4 text-center line-clamp-2">
                  {image.alt}
                </span>
              </div>
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    className="w-6 h-6 text-[#296142]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </div>
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/95 text-[#1D1D1B] text-xs font-semibold px-3 py-1.5 rounded-sm shadow-sm">
                  {image.category}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#666] text-lg">No projects found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-[#7cb894] transition-colors z-10 p-2 bg-black/20 backdrop-blur-sm rounded-full"
              aria-label="Close lightbox"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Previous Button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#7cb894] transition-colors z-10 p-3 bg-black/20 backdrop-blur-sm rounded-full"
              aria-label="Previous image"
              whileHover={{ scale: 1.1, x: -4, backgroundColor: 'rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#7cb894] transition-colors z-10 p-3 bg-black/20 backdrop-blur-sm rounded-full"
              aria-label="Next image"
              whileHover={{ scale: 1.1, x: 4, backgroundColor: 'rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              key={lightboxImage.src}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Image Info */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-medium">
                {lightboxIndex + 1} of {filteredImages.length} • <span className="text-[#7cb894]">{lightboxImage.category}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

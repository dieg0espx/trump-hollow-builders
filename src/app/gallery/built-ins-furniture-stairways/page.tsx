"use client";

import { Metadata } from 'next';
import ImageGallery, { GalleryImage } from '@/components/gallery/ImageGallery';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';

// Gallery images - these would ideally come from a CMS or API
const galleryImages: GalleryImage[] = [
  // Built-ins - Original
  { src: '/images/gallery2/builtin-01.jpg', alt: 'Custom window seat with storage drawers', category: 'Built-ins' },
  { src: '/images/gallery2/builtin-02.jpg', alt: 'Built-in bench with sliding barn door', category: 'Built-ins' },
  { src: '/images/gallery2/furniture-02.jpg', alt: 'Custom white china cabinet with glass doors', category: 'Built-ins' },

  // Furniture - Original
  { src: '/images/gallery2/furniture-01.jpg', alt: 'Heirloom oak secretary desk with brass gallery', category: 'Furniture' },
  { src: '/images/gallery2/furniture-03.jpg', alt: 'Cherry wood hutch display cabinet', category: 'Furniture' },
  { src: '/images/gallery2/furniture-04.jpg', alt: 'Custom sideboard with granite countertop', category: 'Furniture' },

  // Millwork - Original
  { src: '/images/gallery2/builtin-03.jpg', alt: 'Custom barn door with hardware detail', category: 'Millwork' },
  { src: '/images/gallery2/millwork-03.jpg', alt: 'Decorative ceiling beam with vaulted ceiling', category: 'Millwork' },

  // Custom Home Bar - New (kelsey series) - Stunning walnut bar project
  { src: '/dropbox/kelsey20220052-kelsey20220056-Edit.jpg', alt: 'Custom walnut home bar with seating area', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220057-kelsey20220060.jpg', alt: 'Walnut bar with stone tile backsplash', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220061-kelsey20220064-Edit.jpg', alt: 'Home bar with custom walnut cabinetry', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220065-kelsey20220068.jpg', alt: 'Elegant walnut bar with granite countertop', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220084-kelsey20220088.jpg', alt: 'Custom bar shelving with LED lighting', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220089-kelsey20220094.jpg', alt: 'Walnut home bar with display shelving', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220095-kelsey20220100.jpg', alt: 'Premium walnut bar with tile accent wall', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220106.jpg', alt: 'Built-in bar shelves with liquor display', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220107.jpg', alt: 'Custom walnut bar detail with copper mugs', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220108.jpg', alt: 'Home bar with walnut cabinets and seating', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220109.jpg', alt: 'Walnut bar cabinetry with modern tile', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220111.jpg', alt: 'Custom home bar with entertainment area', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220112.jpg', alt: 'Walnut bar with under-cabinet lighting', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220117.jpg', alt: 'Premium home bar with walnut woodwork', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220118.jpg', alt: 'Custom bar with floating shelves', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220119.jpg', alt: 'Walnut home bar full view', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220124.jpg', alt: 'Home bar detail with granite and walnut', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220125.jpg', alt: 'Custom walnut bar corner detail', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220132.jpg', alt: 'Elegant home bar with mixed materials', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220138-kelsey20220141.jpg', alt: 'Custom bar panoramic view', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220147-kelsey20220152.jpg', alt: 'Walnut bar with seating nook', category: 'Custom Home Bar' },
  { src: '/dropbox/kelsey20220153-kelsey20220158.jpg', alt: 'Complete custom walnut home bar', category: 'Custom Home Bar' },
];

const categories = ['Built-ins', 'Furniture', 'Millwork', 'Custom Home Bar'];

export default function BuiltInsFurnitureStairwaysGallery() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header - Enhanced with premium styling */}
      <section className="bg-gradient-to-b from-[#1e4a32] to-[#296142] py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative accent bar */}
          <BlurFade delay={0.1}>
            <div className="w-24 h-1 bg-white mx-auto mb-10" />
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
            >
              Built-ins, Furniture & Stairways
            </h1>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p className="text-lg sm:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed font-light">
              Homebuilders today follow the &apos;assembly line process&apos; producing carbon copies of the same house. Your home can stand out from the rest with high quality millwork, built-ins and stairways that complement your individual style. From entertainment centers, to home bars or pieces of furniture that can be passed from one generation to the next.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Gallery Section - Wrapped in AnimatedSection */}
      <AnimatedSection
        as="section"
        className="py-20 lg:py-24"
        animation="fade"
        delay={0.2}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageGallery images={galleryImages} categories={categories} />
        </div>
      </AnimatedSection>

      {/* CTA Section - Enhanced with premium styling and animations */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F8F8F8] relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[#296142]/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
            >
              Create Something Unique
            </h2>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="text-lg sm:text-xl text-[#4a4a48] mb-10 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s discuss your custom woodworking or millwork project and bring your vision to life.
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <motion.a
              href="tel:+1234567890"
              className="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3 font-semibold rounded-none"
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(41, 97, 66, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Start Your Custom Project
            </motion.a>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}

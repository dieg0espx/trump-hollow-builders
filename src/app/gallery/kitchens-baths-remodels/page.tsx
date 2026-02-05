"use client";

import { Metadata } from 'next';
import ImageGallery, { GalleryImage } from '@/components/gallery/ImageGallery';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';

// Gallery images - these would ideally come from a CMS or API
const galleryImages: GalleryImage[] = [
  // Kitchens - Original
  { src: '/images/gallery1/kitchen-01.jpg', alt: 'Modern gray shaker kitchen with stainless appliances', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-02.jpg', alt: 'Two-tone kitchen with cherry and white cabinets', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-03.jpg', alt: 'Contemporary white kitchen with marble countertops', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-04.jpg', alt: 'Transitional kitchen with custom island', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-05.jpg', alt: 'Farmhouse style kitchen renovation', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-06.jpg', alt: 'Luxury gourmet kitchen with professional range', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-07.jpg', alt: 'Cherry cabinet kitchen with island and Wolf range', category: 'Kitchens' },
  { src: '/images/gallery1/kitchen-08.jpg', alt: 'Gourmet kitchen with custom cherry cabinetry', category: 'Kitchens' },

  // Kitchens - New (kitchen series)
  { src: '/dropbox/kitchen1.jpg', alt: 'Cherry kitchen with granite island and tiered pendant lighting', category: 'Kitchens' },
  { src: '/dropbox/kitchen2.jpg', alt: 'Cherry kitchen with arched window valance and granite counters', category: 'Kitchens' },
  { src: '/dropbox/kitchen3.jpg', alt: 'Cherry kitchen with built-in wine bar and beverage cooler', category: 'Kitchens' },
  { src: '/dropbox/kitchen4.jpg', alt: 'Open concept cherry kitchen with bay window dining nook', category: 'Kitchens' },

  // Kitchens - New (Large Flat series) - only keeping actual kitchen
  { src: '/dropbox/Large Flat001.jpg', alt: 'Gourmet cherry kitchen with granite island and stainless appliances', category: 'Kitchens' },

  // Bathrooms - From Large Flat series
  { src: '/dropbox/Large Flat006.jpg', alt: 'Master bathroom with cherry vanity and soaking tub', category: 'Bathrooms' },
  { src: '/dropbox/Large Flat007.jpg', alt: 'Cherry double vanity bathroom with custom mirrors', category: 'Bathrooms' },

  // Kitchens - New (20201001 series - White Kitchen Remodel)
  { src: '/dropbox/20201001_154836.jpg', alt: 'Modern white shaker kitchen with hardwood floors', category: 'Kitchens' },
  { src: '/dropbox/20201001_154918.jpg', alt: 'White kitchen remodel with granite peninsula', category: 'Kitchens' },
  { src: '/dropbox/20201001_155001.jpg', alt: 'Contemporary white kitchen with stainless appliances', category: 'Kitchens' },
  { src: '/dropbox/20201001_155007.jpg', alt: 'White cabinet kitchen with accent wall', category: 'Kitchens' },
  { src: '/dropbox/20201001_155034.jpg', alt: 'Modern white kitchen renovation complete', category: 'Kitchens' },

  // Kitchens - White shaker kitchen
  { src: '/dropbox/kelsey20220124.jpg', alt: 'White shaker kitchen with floor-to-ceiling pantry cabinets', category: 'Kitchens' },
  { src: '/dropbox/kelsey20220125.jpg', alt: 'White shaker kitchen with black hardware and granite counters', category: 'Kitchens' },

  // Bathrooms - Original
  { src: '/images/gallery1/bathroom-01.jpg', alt: 'Spa-like master bathroom with walk-in shower', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-02.jpg', alt: 'Modern bathroom with frameless glass enclosure', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-03.jpg', alt: 'Luxury bathroom with freestanding tub', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-04.jpg', alt: 'Contemporary bathroom renovation', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-05.jpg', alt: 'Custom tile shower with built-in bench', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-06.jpg', alt: 'Modern shower with black fixtures and tile', category: 'Bathrooms' },
  { src: '/images/gallery1/bathroom-07.jpg', alt: 'Master bath with oak vanity and freestanding tub', category: 'Bathrooms' },

  // Bathrooms - New (bath series)
  { src: '/dropbox/bath1.jpg', alt: 'Master bath with cream vanity and frameless glass shower', category: 'Bathrooms' },
  { src: '/dropbox/bath2.jpg', alt: 'Master bath with soaking tub and custom cream cabinetry', category: 'Bathrooms' },
  { src: '/dropbox/kelsey20220132.jpg', alt: 'Bathroom detail with matte black faucet and granite counter', category: 'Bathrooms' },

  // Bathrooms - New (IMG series)
  { src: '/dropbox/IMG_0101.JPG', alt: 'Before and after bathroom transformation', category: 'Bathrooms' },
  { src: '/dropbox/IMG_0214.JPG', alt: 'Master bathroom with soaking tub and glass shower', category: 'Bathrooms' },

  // Full Remodels - Original
  { src: '/images/gallery1/remodel-01.jpg', alt: 'Whole home renovation project', category: 'Full Remodels' },
  { src: '/images/gallery1/remodel-02.jpg', alt: 'Open concept living space transformation', category: 'Full Remodels' },
  { src: '/images/gallery1/remodel-03.jpg', alt: 'Home addition and renovation', category: 'Full Remodels' },

  // Full Remodels - New (family room series)
  { src: '/dropbox/family room1.jpg', alt: 'Living room with white built-in shelves and fireplace surround', category: 'Full Remodels' },
  { src: '/dropbox/family room2.jpg', alt: 'Family room remodel with custom fireplace built-ins and large windows', category: 'Full Remodels' },

  // Full Remodels - New (IMG exterior)
  { src: '/dropbox/IMG_0066.JPG', alt: 'Before and after exterior home renovation', category: 'Full Remodels' },
  { src: '/dropbox/0621B5D5-2DAA-4333-A044-C0AE18C0390A.JPG', alt: 'Complete home remodel project', category: 'Full Remodels' },
];

const categories = ['Kitchens', 'Bathrooms', 'Full Remodels'];

export default function KitchensBathsRemodelsGallery() {
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
              Kitchens, Baths & Remodels
            </h1>
          </BlurFade>

          <BlurFade delay={0.4}>
            <p className="text-lg sm:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed font-light">
              Love where you live? Stay put, but create the dream home you&apos;ve always wished for. Homeowners benefit financially from remodeling their kitchen and bathrooms, increasing their equity in the property and upgrading their quality of life. Whether you&apos;re looking for a gourmet kitchen or a spa-like bathroom retreat, we have the solutions to guide your path.
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
              Ready to Transform Your Space?
            </h2>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="text-lg sm:text-xl text-[#4a4a48] mb-10 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s discuss your kitchen or bathroom remodeling project and turn your vision into reality.
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
              Get a Free Estimate
            </motion.a>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}

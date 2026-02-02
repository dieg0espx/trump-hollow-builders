"use client";

import Image from 'next/image';
import Link from 'next/link';
import { BlurFade } from '@/components/ui/blur-fade';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Scroll Progress Indicator Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#296142] origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// Floating CTA Button Component
function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            className="relative"
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
          >
            <motion.a
              href="tel:+1234567890"
              className="flex items-center gap-3 bg-[#296142] text-white shadow-lg shadow-[#296142]/30 hover:bg-[#1e4a32] transition-colors"
              animate={{
                paddingLeft: isExpanded ? 24 : 16,
                paddingRight: isExpanded ? 24 : 16,
                paddingTop: 16,
                paddingBottom: 16,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-semibold whitespace-nowrap overflow-hidden"
                  >
                    Free Consultation
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Featured Project Card Component
function FeaturedProjectCard({
  image,
  title,
  description,
  stats,
  delay
}: {
  image: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  delay: number;
}) {
  return (
    <BlurFade delay={delay} inView>
      <motion.div
        className="group relative overflow-hidden bg-white"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-[16/10] relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
          >
            {title}
          </h3>
          <p className="text-white/80 mb-4">{description}</p>
          <div className="flex gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-xl font-bold text-[#7cb894]">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </BlurFade>
  );
}

// Animated counter component for stats
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number | string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isNumber = typeof target === 'number';

  useEffect(() => {
    if (!isInView || !isNumber) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (target as number)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration, isNumber]);

  return (
    <span ref={ref}>
      {isNumber ? count : target}{suffix}
    </span>
  );
}

// Testimonials data
const testimonials = [
  {
    quote: "Trump-Hollow Builders transformed our outdated kitchen into a stunning culinary space. Their attention to detail and craftsmanship exceeded our expectations. The custom cabinetry is absolutely beautiful.",
    author: "Sarah M.",
    location: "Kitchen Remodel",
  },
  {
    quote: "From start to finish, the team was professional, communicative, and delivered exceptional quality. Our new master bathroom feels like a luxury spa. We couldn't be happier with the results.",
    author: "Michael & Jennifer T.",
    location: "Master Bath Renovation",
  },
  {
    quote: "The custom built-in entertainment center they created is a true work of art. Their woodworking skills are unmatched. It's now the centerpiece of our home and gets compliments from every guest.",
    author: "David R.",
    location: "Custom Built-ins",
  },
  {
    quote: "We hired Trump-Hollow for a complete home addition. The team was incredible - they managed every detail and kept us informed throughout. The quality of work is outstanding and the addition blends seamlessly.",
    author: "Robert & Lisa K.",
    location: "Home Addition",
  },
  {
    quote: "The staircase they built for us is stunning. It's become a focal point of our home. The craftsmanship and attention to detail shows in every spindle and handrail. True artisans.",
    author: "Amanda P.",
    location: "Custom Stairway",
  },
  {
    quote: "Working with Trump-Hollow was a pleasure from day one. They listened to our ideas, offered great suggestions, and delivered a kitchen that exceeded our wildest dreams. Highly recommend!",
    author: "James & Carol W.",
    location: "Kitchen Remodel",
  },
  {
    quote: "Our custom home bar is absolutely incredible. The walnut woodwork is museum quality. Every guest asks who built it. Trump-Hollow turned our basement into an entertainment paradise.",
    author: "Steven H.",
    location: "Custom Home Bar",
  },
  {
    quote: "They renovated both our bathrooms and the results are magazine-worthy. The tile work, the fixtures, the custom vanities - everything is perfect. Professional team from start to finish.",
    author: "Patricia & Tom B.",
    location: "Bathroom Renovations",
  },
];

// Testimonials Carousel Component
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalSlides = Math.ceil(testimonials.length / 3);

  // Infinite auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
            >
              What Our Clients Say
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-xl text-[#4a4a48] max-w-2xl mx-auto">
              Hear from homeowners who trusted us with their vision
            </p>
          </BlurFade>
        </div>

        {/* Carousel Container */}
        <BlurFade delay={0.4} inView>
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center hover:bg-[#296142] hover:text-white transition-colors group"
              aria-label="Previous testimonials"
            >
              <svg className="w-6 h-6 text-[#1D1D1B] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center hover:bg-[#296142] hover:text-white transition-colors group"
              aria-label="Next testimonials"
            >
              <svg className="w-6 h-6 text-[#1D1D1B] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Track */}
            <div ref={carouselRef} className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                      {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, index) => (
                        <div
                          key={index}
                          className="bg-white p-8 shadow-sm border border-gray-100 h-[320px] flex flex-col"
                        >
                          {/* Quote Icon */}
                          <svg className="w-10 h-10 text-[#296142]/20 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                          <p className="text-[#4a4a48] leading-relaxed italic flex-grow line-clamp-5">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                          <div className="border-t border-gray-100 pt-4 mt-4 flex-shrink-0">
                            <div className="font-semibold text-[#1D1D1B]">{testimonial.author}</div>
                            <div className="text-sm text-[#296142]">{testimonial.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 transition-colors ${
                    currentIndex === index ? 'bg-[#296142]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

// FAQ Item with expand/collapse functionality
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-700 overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-[#252523] hover:bg-[#2a2a28] transition-colors"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg className="w-5 h-5 text-[#7cb894]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 py-5 bg-[#1D1D1B] border-t border-gray-700">
          <p className="text-gray-400 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Gallery card with hover lift effect
function GalleryCard({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  delay
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <BlurFade delay={delay} inView>
      <Link href={href} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl shadow-lg bg-white"
          whileHover={{
            y: -12,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 group-hover:from-black/70 transition-all duration-500" />
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-lg"
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif", textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              {title}
            </h3>
            <p className="text-white mb-5 text-base leading-relaxed drop-shadow-md">
              {description}
            </p>
            <span className="inline-flex items-center gap-2 text-[#7cb894] font-semibold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
              Explore Gallery
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>
    </BlurFade>
  );
}

// Section Divider Component
function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'angle' | 'curve' }) {
  if (variant === 'wave') {
    return (
      <div className="relative h-16 md:h-24 bg-transparent -mt-16 md:-mt-24 z-10">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    );
  }
  if (variant === 'angle') {
    return (
      <div className="relative h-16 md:h-24 bg-transparent -mt-16 md:-mt-24 z-10">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0,100 1440,0 1440,100" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative h-16 md:h-24 bg-transparent -mt-16 md:-mt-24 z-10">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,100 Q720,0 1440,100 L1440,100 L0,100 Z" />
      </svg>
    </div>
  );
}

// Featured projects data
const featuredProjects = [
  {
    image: '/dropbox/kelsey20220052-kelsey20220056-Edit.jpg',
    title: 'Custom Walnut Home Bar',
    description: 'A stunning walnut bar with stone tile backsplash and premium finishes',
    stats: [
      { label: 'Project Duration', value: '8 weeks' },
      { label: 'Custom Features', value: '12+' },
    ],
  },
  {
    image: '/dropbox/Large Flat001.jpg',
    title: 'Gourmet Cherry Kitchen',
    description: 'Full kitchen remodel with custom cherry cabinetry and granite countertops',
    stats: [
      { label: 'Cabinets', value: 'Custom' },
      { label: 'Appliances', value: 'Pro-Grade' },
    ],
  },
  {
    image: '/dropbox/bath1.jpg',
    title: 'Spa Master Bathroom',
    description: 'Luxurious master bath featuring custom vanity and glass shower enclosure',
    stats: [
      { label: 'Tile Work', value: 'Handset' },
      { label: 'Fixtures', value: 'Premium' },
    ],
  },
];

// Partner logos placeholder data
const partnerLogos = [
  { name: 'Sub-Zero Wolf', description: 'Premium Appliances' },
  { name: 'KitchenAid', description: 'Quality Appliances' },
  { name: 'Kohler', description: 'Fixtures & Faucets' },
  { name: 'Miele', description: 'Luxury Appliances' },
  { name: 'Delta', description: 'Plumbing Fixtures' },
  { name: 'Sherwin-Williams', description: 'Premium Paints' },
];

// Hero Section with Parallax Effect
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
        <Image
          src="/images/hero-kitchen.jpg"
          alt="Custom kitchen remodel by Trump-Hollow Builders"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Hero Content with fade on scroll */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity }}
      >
        {/* Decorative element */}
        <BlurFade delay={0.1}>
          <div className="w-24 h-1 bg-[#296142] mx-auto mb-8" />
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
          >
            Structure, Durability
            <span className="block">and Development</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Full-service custom remodeling and architectural woodworking
          </p>
        </BlurFade>

        <BlurFade delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.a
              href="tel:+1234567890"
              className="btn-primary text-lg px-10 py-5 inline-flex items-center justify-center gap-3 font-semibold rounded-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Free Consultation
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="#our-work"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/40 px-10 py-5 font-semibold transition-all inline-flex items-center justify-center gap-3 backdrop-blur-sm rounded-none"
              >
                View Our Work
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </BlurFade>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Floating CTA Button */}
      <FloatingCTA />

      {/* Hero Section - Full viewport with parallax effect */}
      <HeroSection />

      {/* Company Description Section with staggered animations */}
      <section className="py-24 lg:py-32 bg-white relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#296142]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Craftsmanship You Can Trust
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-[#666] max-w-2xl mx-auto">
                Where vision meets precision
              </p>
            </BlurFade>
          </div>

          {/* Description paragraphs with staggered fade */}
          <div className="space-y-8 text-lg sm:text-xl text-[#444] leading-relaxed max-w-4xl mx-auto">
            <BlurFade delay={0.4} inView>
              <p>
                Trump-Hollow Builders LLC is a full-service custom remodel contractor specializing in kitchens, baths, additions, and built-ins. We are a design/build firm uniquely qualified to deliver high-end finishes in custom cabinetry, wainscoting, stairways, coffered ceilings, heirloom furniture and architectural woodworking.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <p>
                At Trump-Hollow Builders we enjoy the builder/client collaboration process. Our team has collectively over 100 years of experience. We will meet with you onsite to discuss your wants, needs, and dreams; craft a budget and provide creative options to enhance your largest investment.
              </p>
            </BlurFade>
          </div>

          {/* Stats Section with animated counters */}
          <div className="mt-20 pt-16 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              <BlurFade delay={0.6} inView>
                <motion.div
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white"
                  whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl sm:text-6xl font-bold text-[#296142] mb-3">
                    <AnimatedCounter target={100} suffix="+" />
                  </div>
                  <div className="text-[#4a4a48] font-medium text-lg">Years Combined Experience</div>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.7} inView>
                <motion.div
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white"
                  whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl sm:text-6xl font-bold text-[#296142] mb-3">
                    Design
                  </div>
                  <div className="text-[#4a4a48] font-medium text-lg">Build Expertise</div>
                </motion.div>
              </BlurFade>

              <BlurFade delay={0.8} inView>
                <motion.div
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white"
                  whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl sm:text-6xl font-bold text-[#296142] mb-3">
                    Custom
                  </div>
                  <div className="text-[#4a4a48] font-medium text-lg">High-End Finishes</div>
                </motion.div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-[#1D1D1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Our Services
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive solutions for every aspect of your home
              </p>
            </BlurFade>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Kitchen Remodeling',
                description: 'Transform your kitchen into a gourmet culinary space with custom cabinetry, premium countertops, and professional-grade appliances.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
              },
              {
                title: 'Bathroom Renovation',
                description: 'Create spa-like retreats with custom tile work, frameless glass enclosures, and luxurious fixtures that elevate your daily routine.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
              {
                title: 'Custom Cabinetry',
                description: 'Handcrafted cabinets built to your exact specifications, featuring premium hardwoods and meticulous joinery techniques.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
              },
              {
                title: 'Built-ins & Millwork',
                description: 'Entertainment centers, bookcases, window seats, and custom storage solutions that maximize space and add character.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
              },
              {
                title: 'Home Additions',
                description: 'Expand your living space with seamlessly integrated additions that match your home\'s architecture and exceed building standards.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ),
              },
              {
                title: 'Architectural Woodwork',
                description: 'Coffered ceilings, wainscoting, custom stairways, and heirloom furniture pieces crafted with generational expertise.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <BlurFade key={service.title} delay={0.4 + index * 0.1} inView>
                <motion.div
                  className="bg-[#252523] p-8 border border-gray-800 hover:border-[#296142] transition-colors duration-300"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[#296142] mb-6">{service.icon}</div>
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider - Services to Process */}
      <div className="relative bg-[#1D1D1B]">
        <svg className="w-full h-16 md:h-24 text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,60 C360,100 1080,20 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Our Process Section */}
      <section className="py-24 lg:py-32 bg-white relative">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #296142 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Our Process
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-[#4a4a48] max-w-2xl mx-auto">
                A collaborative approach from concept to completion
              </p>
            </BlurFade>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We meet onsite to discuss your vision, assess the space, and understand your goals and budget.',
              },
              {
                step: '02',
                title: 'Design',
                description: 'Our team creates detailed plans and 3D renderings, refining every detail until it\'s perfect.',
              },
              {
                step: '03',
                title: 'Build',
                description: 'Expert craftsmen bring your project to life with precision, quality materials, and attention to detail.',
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Final walkthrough ensures every element meets our standards and exceeds your expectations.',
              },
            ].map((item, index) => (
              <BlurFade key={item.step} delay={0.4 + index * 0.15} inView>
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#296142]/20 mb-4" style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    {item.step}
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#1D1D1B] mb-4"
                    style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#4a4a48] leading-relaxed">{item.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-[#F8F8F8] to-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#296142]/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Featured Projects
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-[#4a4a48] max-w-2xl mx-auto">
                Showcasing our finest work and attention to detail
              </p>
            </BlurFade>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.title}
                image={project.image}
                title={project.title}
                description={project.description}
                stats={project.stats}
                delay={0.4 + index * 0.15}
              />
            ))}
          </div>

          {/* View All Button */}
          <BlurFade delay={0.9} inView>
            <div className="text-center mt-12">
              <Link
                href="#our-work"
                className="inline-flex items-center gap-2 text-[#296142] font-semibold hover:gap-4 transition-all duration-300"
              >
                View All Projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-16 lg:py-20 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <p className="text-center text-[#4a4a48] uppercase tracking-widest text-sm font-medium mb-10">
              Trusted Partner Brands
            </p>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerLogos.map((partner, index) => (
              <BlurFade key={partner.name} delay={0.2 + index * 0.05} inView>
                <motion.div
                  className="text-center p-4 group cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-12 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-gray-300 group-hover:text-[#296142] transition-colors">
                      {partner.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{partner.description}</p>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Navigation Cards with hover lift effects */}
      <section id="our-work" className="py-24 lg:py-32 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Explore Our Portfolio
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-[#4a4a48] max-w-2xl mx-auto">
                Browse our galleries to see the quality craftsmanship we bring to every project
              </p>
            </BlurFade>
          </div>

          {/* Gallery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <GalleryCard
              href="/gallery/kitchens-baths-remodels"
              imageSrc="/images/gallery1-preview.jpg"
              imageAlt="Kitchen and bathroom remodeling portfolio"
              title="Kitchens, Baths & Remodels"
              description="Gourmet kitchens, spa-like bathrooms, and full home transformations"
              delay={0.4}
            />

            <GalleryCard
              href="/gallery/built-ins-furniture-stairways"
              imageSrc="/images/gallery2-card.jpg"
              imageAlt="Custom built-ins, furniture, and stairways portfolio"
              title="Built-ins, Furniture & Stairways"
              description="Custom millwork, entertainment centers, and heirloom pieces"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Angled Divider - Testimonials to Why Choose Us */}
      <div className="relative bg-[#F8F8F8]">
        <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0,100 1440,40 1440,100" />
        </svg>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Decorative side accent */}
        <div className="absolute left-0 top-1/4 w-1 h-48 bg-gradient-to-b from-transparent via-[#296142] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <BlurFade delay={0.1} inView>
                <div className="w-20 h-1 bg-[#296142] mb-10" />
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-[#1D1D1B] mb-8 tracking-tight"
                  style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                >
                  Why Choose Trump-Hollow Builders
                </h2>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-lg text-[#4a4a48] mb-10 leading-relaxed">
                  With over a century of combined experience, we bring unmatched expertise and dedication to every project. Our commitment to quality craftsmanship and client satisfaction sets us apart.
                </p>
              </BlurFade>

              <div className="space-y-6">
                {[
                  {
                    title: 'Design/Build Expertise',
                    description: 'Seamless integration from concept to completion under one roof.',
                  },
                  {
                    title: 'Master Craftsmen',
                    description: 'Skilled artisans with decades of experience in fine woodworking.',
                  },
                  {
                    title: 'Client Collaboration',
                    description: 'Your vision drives every decision throughout the process.',
                  },
                  {
                    title: 'Quality Materials',
                    description: 'Premium hardwoods and materials sourced for lasting beauty.',
                  },
                ].map((item, index) => (
                  <BlurFade key={item.title} delay={0.4 + index * 0.1} inView>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#296142] flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1D1D1B] mb-1">{item.title}</h4>
                        <p className="text-[#4a4a48]">{item.description}</p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <BlurFade delay={0.3} inView>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/dropbox/kelsey20220052-kelsey20220056-Edit.jpg"
                  alt="Custom walnut bar showcasing our craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1B]/20 to-transparent" />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-[#1D1D1B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <BlurFade delay={0.1} inView>
              <div className="w-20 h-1 bg-[#296142] mx-auto mb-10" />
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Frequently Asked Questions
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Answers to common questions about our services and process
              </p>
            </BlurFade>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                question: 'How long does a typical kitchen remodel take?',
                answer: 'A typical kitchen remodel takes 8-12 weeks depending on the scope of work. Custom cabinetry may add 4-6 weeks for fabrication. We provide detailed timelines during the design phase and keep you informed throughout the project.',
              },
              {
                question: 'Do you provide design services?',
                answer: 'Yes! As a design/build firm, we handle everything from initial concept and 3D renderings to final construction. Our team works collaboratively with you to create designs that match your vision and budget.',
              },
              {
                question: 'What areas do you serve?',
                answer: 'We serve the Greater Portland Metro Area and surrounding communities. If you\'re unsure whether we service your area, please give us a call and we\'ll be happy to discuss your project.',
              },
              {
                question: 'Do you offer free consultations?',
                answer: 'Yes, we offer free on-site consultations. We\'ll meet with you at your home to discuss your project, assess the space, understand your goals, and provide initial recommendations and rough estimates.',
              },
              {
                question: 'Can you work with my existing architect or designer?',
                answer: 'We frequently collaborate with architects and designers to bring their visions to life. Our team has extensive experience interpreting plans and can provide valuable input on constructability and material selections.',
              },
              {
                question: 'What sets your custom cabinetry apart?',
                answer: 'Our custom cabinetry is built in-house by master craftsmen using premium hardwoods and traditional joinery techniques. Each piece is made to your exact specifications, ensuring a perfect fit and finish that stock cabinets simply cannot match.',
              },
            ].map((faq, index) => (
              <BlurFade key={index} delay={0.4 + index * 0.1} inView>
                <FAQItem question={faq.question} answer={faq.answer} />
              </BlurFade>
            ))}
          </div>

          {/* Additional CTA */}
          <BlurFade delay={1.0} inView>
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-6">
                Have a question that&apos;s not answered here?
              </p>
              <motion.a
                href="tel:+1234567890"
                className="inline-flex items-center gap-2 text-[#7cb894] font-semibold hover:text-white transition-colors"
                whileHover={{ x: 4 }}
              >
                Contact us directly
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Wave Divider - FAQ to Contact */}
      <div className="relative bg-[#1D1D1B]">
        <svg className="w-full h-16 md:h-20 text-[#F8F8F8]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,40 C480,100 960,0 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-[#F8F8F8] relative">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#296142]/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div>
              <BlurFade delay={0.1} inView>
                <div className="w-20 h-1 bg-[#296142] mb-10" />
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-[#1D1D1B] mb-8 tracking-tight"
                  style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                >
                  Get In Touch
                </h2>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-lg text-[#4a4a48] mb-10 leading-relaxed">
                  Ready to transform your home? Contact us today for a free consultation. We&apos;ll discuss your project, answer your questions, and help you take the first step toward your dream space.
                </p>
              </BlurFade>

              <div className="space-y-6">
                <BlurFade delay={0.4} inView>
                  <a href="tel:+1234567890" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#296142] flex items-center justify-center group-hover:bg-[#1e4a32] transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-[#4a4a48] mb-1">Call Us</div>
                      <div className="text-xl font-semibold text-[#1D1D1B] group-hover:text-[#296142] transition-colors">(123) 456-7890</div>
                    </div>
                  </a>
                </BlurFade>

                <BlurFade delay={0.5} inView>
                  <a href="mailto:info@trumphollowbuilders.com" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#296142] flex items-center justify-center group-hover:bg-[#1e4a32] transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-[#4a4a48] mb-1">Email Us</div>
                      <div className="text-xl font-semibold text-[#1D1D1B] group-hover:text-[#296142] transition-colors">info@trumphollowbuilders.com</div>
                    </div>
                  </a>
                </BlurFade>

                <BlurFade delay={0.6} inView>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#296142] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-[#4a4a48] mb-1">Service Area</div>
                      <div className="text-xl font-semibold text-[#1D1D1B]">Greater Portland Metro Area</div>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Business Hours */}
              <BlurFade delay={0.7} inView>
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h4 className="font-semibold text-[#1D1D1B] mb-4">Business Hours</h4>
                  <div className="space-y-2 text-[#4a4a48]">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">7:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Right - Image or Map Placeholder */}
            <BlurFade delay={0.4} inView>
              <div className="relative h-full min-h-[500px] bg-[#1D1D1B] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-1 bg-[#296142] mx-auto mb-8" />
                  <h3
                    className="text-3xl font-bold text-white mb-6"
                    style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                  >
                    Let&apos;s Build Something Beautiful Together
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                    Schedule your free on-site consultation and take the first step toward transforming your home.
                  </p>
                  <motion.a
                    href="tel:+1234567890"
                    className="bg-[#296142] text-white px-8 py-4 inline-flex items-center gap-3 font-semibold hover:bg-[#1e4a32] transition-colors rounded-none"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </motion.a>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Curve Divider - Contact to CTA */}
      <div className="relative bg-[#F8F8F8]">
        <svg className="w-full h-16 md:h-24 text-[#296142]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,100 Q720,0 1440,100 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* CTA Section with fade animation */}
      <section className="py-24 lg:py-32 bg-[#296142] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1} inView>
            <div className="w-20 h-1 bg-white mx-auto mb-10" />
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
            >
              Ready to Start Your Project?
            </h2>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Let&apos;s discuss your wants, needs, and dreams. We&apos;ll craft a budget and provide creative options to enhance your largest investment.
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <motion.a
              href="tel:+1234567890"
              className="bg-white text-[#296142] text-lg px-12 py-5 inline-flex items-center gap-4 font-semibold hover:bg-gray-100 transition-colors rounded-none"
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Schedule a Free Consultation
            </motion.a>
          </BlurFade>
        </div>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery/kitchens-baths-remodels', label: 'Kitchens & Baths' },
  { href: '/gallery/built-ins-furniture-stairways', label: 'Built-ins & Woodwork' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll detection for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md transition-all duration-300',
        hasScrolled
          ? 'shadow-lg shadow-black/5 border-b border-stone-100'
          : 'shadow-none border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            {/* Desktop Logo */}
            <div className="hidden md:block relative">
              <Image
                src="/images/logo-horizontal.png"
                alt="Trump-Hollow Builders"
                width={220}
                height={48}
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
            {/* Mobile Logo */}
            <div className="md:hidden relative">
              <Image
                src="/images/logo-icon.png"
                alt="Trump-Hollow Builders"
                width={48}
                height={48}
                className="h-12 w-12 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[#1D1D1B] font-medium tracking-wide text-sm lg:text-base transition-colors duration-300 hover:text-[#296142] group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#296142] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}

            {/* CTA Button */}
            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-[#296142] to-[#1e4a32] text-white font-semibold shadow-md shadow-[#296142]/20 hover:shadow-lg hover:shadow-[#296142]/30 transition-all duration-300 flex items-center gap-2 rounded-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden lg:inline">Call Us</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors duration-300 border border-stone-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -6,
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-0.5 bg-[#1D1D1B] rounded-full"
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scale: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-0.5 bg-[#1D1D1B] rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 6,
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-0.5 bg-[#1D1D1B] rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-stone-100">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-[#1D1D1B] hover:text-[#296142] hover:bg-stone-50 rounded-lg font-medium transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-4"
                  >
                    <a
                      href="tel:+1234567890"
                      className="block w-full px-6 py-3.5 bg-gradient-to-r from-[#296142] to-[#1e4a32] text-white font-semibold text-center shadow-md shadow-[#296142]/20 transition-all duration-300 active:scale-[0.98] rounded-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Us Today
                      </span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

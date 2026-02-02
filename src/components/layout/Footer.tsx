'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const footerLinks = [
  {
    title: 'Our Work',
    links: [
      { label: 'Kitchens, Baths & Remodels', href: '/gallery/kitchens-baths-remodels' },
      { label: 'Built-ins, Furniture & Stairways', href: '/gallery/built-ins-furniture-stairways' },
    ],
  },
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: '(123) 456-7890',
    href: 'tel:+1234567890',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'info@trumphollowbuilders.com',
    href: 'mailto:info@trumphollowbuilders.com',
  },
];

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

function AnimatedLink({ href, children, className, isExternal = false }: AnimatedLinkProps) {
  const linkClasses = cn(
    'relative inline-block text-gray-300 transition-colors duration-300',
    'hover:text-[#7cb894]',
    className
  );

  const content = (
    <motion.span
      className="relative inline-block"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-[#7cb894] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%' }}
      />
    </motion.span>
  );

  if (isExternal) {
    return (
      <a href={href} className={linkClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {content}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1D1D1B] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info - Takes more space */}
          <div className="md:col-span-5 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <div className="mb-6">
                <Image
                  src="/images/logo-horizontal-white.png"
                  alt="Trump-Hollow Builders"
                  width={200}
                  height={56}
                  className="h-14 w-auto"
                />
              </div>

              {/* Tagline */}
              <p
                className="text-gray-300 text-lg mb-4 italic"
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              >
                Structure, durability, and development
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Full-service custom remodel contractor specializing in high-end finishes
                and architectural woodworking with over 100 years of combined experience.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold mb-5 text-[#7cb894] uppercase tracking-widest">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <AnimatedLink href={link.href}>
                          {link.label}
                        </AnimatedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold mb-5 text-[#7cb894] uppercase tracking-widest">
                Contact Us
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.li
                    key={index}
                    className="group"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span className="text-[#7cb894] group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Trump-Hollow Builders LLC. All rights reserved.
            </p>
            <motion.p
              className="text-gray-600 text-xs tracking-wider uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Crafted with precision since generations
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}

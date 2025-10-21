import React from 'react';
import Link from 'next/link';
import Container from './Container';
import Logo from '@/components/ui/Logo';
import FooterPattern from './FooterPattern';

const footerLinks = {
  navigation: [
    { href: '/posts', label: 'Posts' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  social: [
    { href: '#', label: 'Twitter' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'GitHub' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900">
      {/* Animated Pattern Section - Theme Aware */}
      <FooterPattern />

      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand with Spotlight */}
            <div>
              <Link
                href="/"
                className="inline-block hover:opacity-90 transition-opacity w-56"
              >
                <Logo withSpotlight />
              </Link>
              <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed">
                Stories worth reading. Thoughtful content delivered with clarity
                and purpose.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base md:text-lg text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                {footerLinks.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col items-center gap-3">
              <p className="text-base text-gray-400 text-center">
                &copy; {currentYear} LittleText. All rights reserved.
              </p>
              <p className="text-base text-gray-400 text-center">
                Designed and developed by{' '}
                <a
                  href="https://theaxient.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  The Axient
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

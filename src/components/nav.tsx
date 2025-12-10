'use client';

import Link from 'next/link';
import Terminal from './terminal';
import { useState } from 'react';
import { useToast } from './ToastProvider';
import { VALID_ROUTES } from '@/config/config';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { show404 } = useToast();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!VALID_ROUTES.includes(href)) {
      e.preventDefault();
      show404(href);
      closeMenu();
    }
  };

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Terminal Breadcrumb */}
            <Terminal />

            {/* Desktop Navigation Links - Hidden on mobile */}
            <ul className="hidden md:flex font-mono text-md gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hamburger Menu Button - Visible only on mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-zinc-600 dark:bg-zinc-400 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Behind the side menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Side Menu - Above overlay */}
      <aside
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-black border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <nav className="h-full overflow-y-scroll">
          <ul className="flex flex-col font-mono text-md p-6 gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-lg py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
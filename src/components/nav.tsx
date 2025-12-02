'use client';

import Link from 'next/link';
import Terminal from './terminal';

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Terminal Breadcrumb */}
          <Terminal />

          {/* Navigation Links */}
          <ul className="font-mono text-md flex gap-8 text-sm font-medium">
            <li>
              <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
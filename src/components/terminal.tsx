'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Terminal() {
  const pathname = usePathname();
  //breadcrumb path segments
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => ({
      name: segment,
      path: '/' + array.slice(0, index + 1).join('/'),
    }));

  return (
    <div className="font-mono text-md text-zinc-600 dark:text-zinc-400">
      <Link
        href="/"
        className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
      >
        ~
      </Link>

      {segments.map((segment) => (
        <span key={segment.path}>
          <span>/</span>
          <Link
            href={segment.path}
            className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            {segment.name}
          </Link>
        </span>
      ))}
      <span>/</span>
    </div>
  );
}

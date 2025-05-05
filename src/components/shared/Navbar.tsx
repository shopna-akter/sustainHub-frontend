'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const isLoggedIn = false;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://res.cloudinary.com/dyztyaztu/image/upload/v1746358341/ChatGPT_Image_May_4__2025__05_12_00_PM-removebg-preview_qk5wge.png"
            alt="Sustain Hub Logo"
            width={64}
            height={64}
          />
          <span className="text-2xl font-bold text-green-700">Sustain Hub</span>
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm hover:text-green-700 ${pathname === href ? 'text-green-600 font-semibold' : ''}`}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link href="/profile" className="text-sm text-gray-700 hover:text-green-700">My Profile</Link>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:text-green-700">Login / Register</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logoutUser } from '@/services/authService/index';
import { Button } from '../ui/button';

interface NavbarProps {
  user: {
    id: string;
    name: string;
    role: 'admin' | 'member';
  } | null;
}

export const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
  ];

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      toast.success(res.message || 'Logged out successfully');
      router.push('/');
    } else {
      toast.error(res.message || 'Failed to logout');
    }
  };

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
          {user ? (
            <>
              <Link
                href="/profile"
                className="text-sm text-gray-700 hover:text-green-700"
              >
                My Profile
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-red-600 text-gray-100 px-4 cursor-pointer py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-green-700"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

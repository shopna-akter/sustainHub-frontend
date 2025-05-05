import { ReactNode } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/services/authService/index';
import { LayoutDashboard, ShoppingCart, Box, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    roles: ['ADMIN', 'MEMBER'],
  },
  {
    label: 'Manage Orders',
    href: '/dashboard/orders',
    icon: <ShoppingCart className="w-4 h-4" />,
    roles: ['ADMIN'],
  },
  {
    label: 'Manage Products',
    href: '/dashboard/products',
    icon: <Box className="w-4 h-4" />,
    roles: ['ADMIN'],
  },
  {
    label: 'Manage Users',
    href: '/dashboard/users',
    icon: <User className="w-4 h-4" />,
    roles: ['ADMIN'],
  },
  {
    label: 'My Orders',
    href: '/dashboard/my-orders',
    icon: <ShoppingCart className="w-4 h-4" />,
    roles: ['MEMBER'],
  },
];

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login'); // Or handle unauthenticated user
  }

  const isADMIN = user?.role === 'ADMIN';

  const filteredRoutes = routes.filter((route) =>
    route.roles.includes(isADMIN ? 'ADMIN' : 'MEMBER')
  );

  return (
    <div className="min-h-screen grid grid-cols-[250px_1fr] bg-white">
      <aside className="bg-green-600 text-white min-h-screen p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">
            <Link href="/">🌱 Idea Hub</Link>
          </h1>
          <nav className="space-y-2">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-700'
                )}
              >
                {route.icon}
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-sm">Welcome, {user?.name || 'User'}</p>
        </div>
      </aside>

      <main className="p-6 bg-gray-50 w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;

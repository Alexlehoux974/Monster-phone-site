'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAdminSession, signOutAdmin } from '@/lib/supabase/admin';
import type { AdminUser } from '@/lib/supabase/admin';
import {
  LayoutDashboard,
  Package,
  DollarSign,
  Tag,
  Megaphone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navigation: NavItem[] = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { name: 'Gestion Stock', href: '/admin/stock', icon: Package },
  { name: 'Prix & Promotions', href: '/admin/pricing', icon: DollarSign },
  { name: 'Collections', href: '/admin/collections', icon: Tag },
  { name: 'Bannières', href: '/admin/banners', icon: Megaphone },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('🚀 [ADMIN LAYOUT] useEffect triggered, pathname:', pathname);

    // Skip auth check on login page
    if (pathname === '/admin/login') {
      console.log('⏭️ [ADMIN LAYOUT] Skipping auth check on login page');
      setLoading(false);
      return;
    }

    const checkAdmin = async () => {
      console.log('🔐 [ADMIN LAYOUT] Starting admin check...');
      try {
        const { session, admin: adminData, error } = await getAdminSession();

        console.log('🔍 [ADMIN LAYOUT] Session:', !!session, 'Admin:', !!adminData, 'Error:', error?.message);
        if (adminData) {
          console.log('📧 Email:', adminData.email, '👤 Rôle:', adminData.role);
        }

        if (error || !adminData || !session) {
          console.log('❌ [ADMIN LAYOUT] Redirecting to login, reason:', error?.message || 'No admin data');
          router.push('/admin/login');
          return;
        }

        console.log('✅ [ADMIN LAYOUT] Setting admin state');
        setAdmin(adminData);
      } catch (err) {
        console.error('❌ [ADMIN LAYOUT] Unexpected error:', err);
        router.push('/admin/login');
      } finally {
        console.log('🏁 [ADMIN LAYOUT] Setting loading to false');
        setLoading(false);
      }
    };

    checkAdmin();
  }, [pathname, router]); // Re-run when pathname changes

  const handleSignOut = async () => {
    await signOutAdmin();
    router.push('/admin/login');
    router.refresh();
  };

  // Ne pas afficher le layout sur la page de login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar mobile */}
      <div
        className={`fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo et titre */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Monster Phone</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700 text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info et déconnexion */}
        <div className="p-4 border-t border-gray-700">
          <div className="mb-3 px-4 py-2 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400">Connecté en tant que</p>
            <p className="text-sm font-medium text-white truncate mt-1">
              {admin?.email}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Rôle: Super Admin {admin?.role ? `(${admin.role})` : '(chargement...)'}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header mobile */}
        <header className="sticky top-0 z-30 bg-gray-800 border-b border-gray-700 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

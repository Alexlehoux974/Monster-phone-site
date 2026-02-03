'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAdminSession, signOutAdmin } from '@/lib/supabase/admin';
import type { AdminUser } from '@/lib/supabase/admin';
import {
  LayoutDashboard,
  Package,
  Tag,
  Megaphone,
  LogOut,
  Menu,
  X,
  ShoppingCart,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navigation: NavItem[] = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { name: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Gestion Stock', href: '/admin/stock', icon: Package },
  { name: 'Collections', href: '/admin/collections', icon: Tag },
  { name: 'Bannières', href: '/admin/banners', icon: Megaphone },
];

// Helper to safely read from sessionStorage
function getCachedAdmin(): AdminUser | null {
  try {
    const cached = sessionStorage.getItem('admin-user-data');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function wasAuthChecked(): boolean {
  try {
    return sessionStorage.getItem('admin-auth-checked') === 'true';
  } catch {
    return false;
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [admin, setAdmin] = useState<AdminUser | null>(() => getCachedAdmin());
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined' && wasAuthChecked()) {
      return false;
    }
    return true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth check: runs ONCE on mount, never on navigation.
  // Each API route has its own auth verification.
  // The middleware does a lightweight cookie check.
  // This effect only needs to verify admin status on initial load.
  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // If auth was already checked in this browser tab, skip entirely
    if (wasAuthChecked()) {
      setLoading(false);
      return;
    }

    // First time in this tab: do the full auth check
    const checkAdmin = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const { session, admin: adminData, error } = await getAdminSession();

        if (error || !adminData || !session) {
          router.push('/admin/login');
          return;
        }

        setAdmin(adminData);
        try {
          sessionStorage.setItem('admin-auth-checked', 'true');
          sessionStorage.setItem('admin-user-data', JSON.stringify(adminData));
        } catch { /* ignore */ }
      } catch (err) {
        console.error('❌ [ADMIN LAYOUT] Auth check failed:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps: only run on mount

  const handleSignOut = async () => {
    try {
      sessionStorage.removeItem('admin-auth-checked');
      sessionStorage.removeItem('admin-user-data');
    } catch { /* ignore */ }
    await signOutAdmin();
    router.push('/admin/login');
  };

  // Don't show admin layout on login page
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
          {navigation.map((item: any) => {
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

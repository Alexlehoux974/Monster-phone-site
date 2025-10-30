'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Créer le client Supabase UNE SEULE FOIS
  const supabase = useMemo(() => createClient(), []);

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || '',
        phone: profile?.phone || undefined,
        address: profile?.address && profile?.city && profile?.postal_code ? {
          street: profile.address,
          city: profile.city,
          postalCode: profile.postal_code,
          country: 'France',
        } : undefined,
        createdAt: profile?.created_at || supabaseUser.created_at,
      };

      return userData;
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      return null;
    }
  }, [supabase]);

  // Initialiser l'auth UNE SEULE FOIS au montage
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        console.log('🔐 [AuthSimple] Initializing...');

        // Attendre un peu pour que localStorage soit prêt
        await new Promise(resolve => setTimeout(resolve, 100));

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ [AuthSimple] Error getting session:', error);
          return;
        }

        if (!mounted) return;

        if (session?.user) {
          console.log('✅ [AuthSimple] Session found:', session.user.email);
          const userData = await loadUserProfile(session.user);
          if (mounted && userData) {
            setUser(userData);
          }
        } else {
          console.log('ℹ️ [AuthSimple] No session found');
        }
      } catch (error) {
        console.error('❌ [AuthSimple] Init error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('🔐 [AuthSimple] Auth event:', event);

      if (event === 'SIGNED_IN' && session?.user) {
        const userData = await loadUserProfile(session.user);
        if (mounted && userData) {
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, loadUserProfile]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    console.log('🔐 [AuthSimple] Logging in:', email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ [AuthSimple] Login error:', error);
      throw new Error(error.message);
    }

    if (data.user) {
      console.log('✅ [AuthSimple] Login successful');
      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }

      // Attendre que la session soit persistée
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('✅ [AuthSimple] Session persisted');
    }
  }, [supabase, loadUserProfile]);

  const register = useCallback(async (registerData: RegisterData) => {
    const { email, password, name, phone, address } = registerData;

    if (!email || !password || !name) {
      throw new Error('Tous les champs sont requis');
    }

    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email invalide');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      // Créer le profil
      const profileData: any = {
        id: data.user.id,
        email: data.user.email,
        full_name: name,
      };

      if (phone) profileData.phone = phone;
      if (address) {
        profileData.address = address.street;
        profileData.city = address.city;
        profileData.postal_code = address.postalCode;
      }

      await supabase.from('profiles').insert(profileData);

      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }, [supabase, loadUserProfile]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.info('Vous avez été déconnecté');
  }, [supabase]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    const profileUpdates: any = {};
    if (updates.name) profileUpdates.full_name = updates.name;
    if (updates.phone) profileUpdates.phone = updates.phone;
    if (updates.address) {
      profileUpdates.address = updates.address.street;
      profileUpdates.city = updates.address.city;
      profileUpdates.postal_code = updates.address.postalCode;
    }

    const { error } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', user.id);

    if (error) {
      throw new Error(error.message);
    }

    setUser({ ...user, ...updates });
    toast.success('Profil mis à jour');
  }, [user, supabase]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

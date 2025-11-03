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

  // Fonction pour charger le profil utilisateur - CODE ORIGINAL QUI MARCHAIT
  const loadUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Erreur lors du chargement du profil:', error);
      }

      // Mapper les données du profil vers notre interface User
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
      console.error('Erreur lors du chargement du profil:', error);
      return null;
    }
  }, [supabase]);

  // Initialiser l'auth - PAS DE TIMEOUT, laisser getSession terminer naturellement
  useEffect(() => {
    let mounted = true;
    let authCompleted = false;

    const initAuth = async () => {
      try {
        // Laisser getSession() se terminer sans timeout
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          // User minimal direct - pas d'attente profile
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.email?.split('@')[0] || 'User',
            createdAt: session.user.created_at,
          });
        }
      } catch (error) {
        console.error('[AuthSimple] Auth init error:', error);
      } finally {
        if (mounted && !authCompleted) {
          authCompleted = true;
          setIsLoading(false);
        }
      }
    };

    // Timeout de secours UNIQUEMENT si getSession() n'a pas terminé après 10s
    const emergencyTimeout = setTimeout(() => {
      if (mounted && !authCompleted) {
        authCompleted = true;
        console.error('[AuthSimple] EMERGENCY TIMEOUT - Force isLoading=false');
        setIsLoading(false);
      }
    }, 10000);

    initAuth().finally(() => clearTimeout(emergencyTimeout));

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user) {
        // CRITIQUE: Définir un user MINIMAL IMMÉDIATEMENT pour éviter la redirection
        const minimalUser = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.email?.split('@')[0] || 'User',
          createdAt: session.user.created_at,
        };
        setUser(minimalUser);

        // Débloquer isLoading immédiatement
        if (!authCompleted) {
          authCompleted = true;
          setIsLoading(false);
        }

        // Charger le profil complet en arrière-plan
        const userData = await loadUserProfile(session.user);
        if (mounted && userData) {
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setUser(null);
        }
      } else if (event === 'USER_UPDATED' && session?.user) {
        const userData = await loadUserProfile(session.user);
        if (mounted && userData) {
          setUser(userData);
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[AuthSimple] Login error:', error);
      throw new Error(error.message);
    }

    if (data.user) {
      // 🔗 RÉCONCILIATION: Lier les commandes guest lors de la connexion
      const { data: guestOrders, error: ordersCheckError } = await supabase
        .from('orders')
        .select('id')
        .eq('customer_email', email)
        .is('user_id', null);

      if (ordersCheckError) {
        console.error('[AuthSimple] Error checking guest orders:', ordersCheckError);
      } else if (guestOrders && guestOrders.length > 0) {
        const { error: linkError } = await supabase
          .from('orders')
          .update({ user_id: data.user.id })
          .eq('customer_email', email)
          .is('user_id', null);

        if (linkError) {
          console.error('[AuthSimple] Error linking guest orders:', linkError);
        }
      }

      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }

      // Attendre que Supabase persiste la session dans localStorage
      await new Promise(resolve => setTimeout(resolve, 100));
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
      // Créer le profil avec toutes les données
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

      const { error: profileError } = await supabase.from('profiles').insert(profileData);

      if (profileError) {
        console.error('Erreur lors de la création du profil:', profileError);
      }

      // 🔗 RÉCONCILIATION: Lier les commandes guest existantes au nouveau compte
      const { data: guestOrders, error: ordersCheckError } = await supabase
        .from('orders')
        .select('id')
        .eq('customer_email', email)
        .is('user_id', null);

      if (ordersCheckError) {
        console.error('[AuthSimple] Error checking guest orders:', ordersCheckError);
      } else if (guestOrders && guestOrders.length > 0) {
        // Lier toutes les commandes guest au nouveau user_id
        const { error: linkError } = await supabase
          .from('orders')
          .update({ user_id: data.user.id })
          .eq('customer_email', email)
          .is('user_id', null);

        if (linkError) {
          console.error('[AuthSimple] Error linking guest orders:', linkError);
        }
      }

      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }

      // Attendre que Supabase persiste la session dans localStorage
      await new Promise(resolve => setTimeout(resolve, 100));
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

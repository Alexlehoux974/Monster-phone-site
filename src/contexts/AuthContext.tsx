'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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

// Durée d'inactivité avant déconnexion (15 minutes en millisecondes)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
// Avertissement à 14 minutes (1 minute avant déconnexion)
const WARNING_TIMEOUT = 14 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const supabase = createClient();

  // Fonction pour charger le profil utilisateur depuis Supabase
  const loadUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
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
  };

  // Charger l'utilisateur au montage et écouter les changements d'auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const userData = await loadUserProfile(session.user);
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const userData = await loadUserProfile(session.user);
        if (userData) {
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED' && session?.user) {
        const userData = await loadUserProfile(session.user);
        if (userData) {
          setUser(userData);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    // Validation basique
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }
    }
  };

  const register = async (registerData: RegisterData) => {
    const { email, password, name, phone, address } = registerData;

    // Validation
    if (!email || !password || !name) {
      throw new Error('Tous les champs sont requis');
    }

    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    // Vérifier si l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email invalide');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      // Créer le profil utilisateur dans la table profiles avec toutes les données
      const profileData: any = {
        id: data.user.id,
        email: data.user.email,
        full_name: name,
      };

      // Ajouter le téléphone si fourni
      if (phone) {
        profileData.phone = phone;
      }

      // Ajouter l'adresse si fournie
      if (address) {
        profileData.address = address.street;
        profileData.city = address.city;
        profileData.postal_code = address.postalCode;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);

      if (profileError) {
        console.error('Erreur lors de la création du profil:', profileError);
      }

      const userData = await loadUserProfile(data.user);
      if (userData) {
        setUser(userData);
      }
    }
  };

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.info('Vous avez été déconnecté');
  }, []);

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    // Préparer les données pour Supabase
    const profileUpdates: any = {};

    if (updates.name) profileUpdates.full_name = updates.name;
    if (updates.phone !== undefined) profileUpdates.phone = updates.phone;
    if (updates.address) {
      profileUpdates.address = updates.address.street;
      profileUpdates.city = updates.address.city;
      profileUpdates.postal_code = updates.address.postalCode;
    }

    // Mettre à jour le profil dans Supabase
    const { error } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', user.id);

    if (error) {
      throw new Error(error.message);
    }

    // Mettre à jour l'état local
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
  };

  // Mettre à jour l'activité utilisateur
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Détecter l'activité utilisateur (desktop et mobile)
  useEffect(() => {
    // Ne tracker l'activité que si l'utilisateur est connecté
    if (!user) return;

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart', 'touchmove'];

    // Ajouter les event listeners
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true });
    });

    // Nettoyer les event listeners
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [user, updateActivity]);

  // Vérifier l'inactivité et déconnecter automatiquement
  useEffect(() => {
    // Ne vérifier que si l'utilisateur est connecté
    if (!user) return;

    let hasWarned = false;

    const checkInactivity = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;

      // Avertissement à 14 minutes (1 minute avant déconnexion)
      if (inactiveTime >= WARNING_TIMEOUT && !hasWarned) {
        hasWarned = true;
        toast.warning('Vous serez déconnecté dans 1 minute pour inactivité', {
          duration: 10000,
        });
      }

      // Déconnexion à 15 minutes
      if (inactiveTime >= INACTIVITY_TIMEOUT) {
        logout();
        toast.error('Vous avez été déconnecté pour inactivité', {
          duration: 5000,
        });
      }
    }, 1000); // Vérifier toutes les secondes

    return () => clearInterval(checkInactivity);
  }, [user, lastActivity, logout]);

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
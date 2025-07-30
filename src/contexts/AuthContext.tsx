'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const savedUser = localStorage.getItem('monsterphone-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder l'utilisateur dans localStorage à chaque changement
  useEffect(() => {
    if (user) {
      localStorage.setItem('monsterphone-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('monsterphone-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Dans un cas réel, ceci ferait un appel API
    // Pour cette démo, on simule une connexion réussie
    
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validation basique
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    // Simuler la vérification des identifiants
    if (password.length < 6) {
      throw new Error('Mot de passe incorrect');
    }

    // Créer un utilisateur simulé
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
  };

  const register = async (email: string, password: string, name: string) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
  };

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
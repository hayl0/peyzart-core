"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth as firebaseAuth } from '@/lib/firebase/config';

const auth = firebaseAuth;

interface AuthContextType {
  user: User | null;
  userRole: 'customer' | 'landscaper' | 'admin' | null;
  loading: boolean;
  signIn: (email: string, password: string, role?: 'customer' | 'landscaper') => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'customer' | 'landscaper') => Promise<void>;
  signInWithGoogle: (role: 'customer' | 'landscaper') => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const noop = async () => {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'landscaper' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const role = localStorage.getItem('peyzart_user_role') as 'customer' | 'landscaper' | 'admin' | null;
        setUserRole(role || 'customer');
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, role: 'customer' | 'landscaper' = 'customer') => {
    if (!auth) throw new Error('Firebase not initialized');
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('peyzart_user_role', role);
    setUserRole(role);
  };

  const signUp = async (email: string, password: string, name: string, role: 'customer' | 'landscaper') => {
    if (!auth) throw new Error('Firebase not initialized');
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    localStorage.setItem('peyzart_user_role', role);
    setUserRole(role);
  };

  const signInWithGoogle = async (role: 'customer' | 'landscaper') => {
    if (!auth) throw new Error('Firebase not initialized');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem('peyzart_user_role', role);
    setUserRole(role);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    localStorage.removeItem('peyzart_user_role');
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signInWithGoogle, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LoginButton } from './LoginButton';
import { CheckSquare } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <CheckSquare className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <CheckSquare className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Track Your Habits</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Log in to track your personal habits, streaks, and scores — all saved securely across sessions.
          </p>
        </div>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
}

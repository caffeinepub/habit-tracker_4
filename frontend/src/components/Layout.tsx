import { Outlet } from '@tanstack/react-router';
import { CheckSquare } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { LoginButton } from './LoginButton';

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky top header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground">Habit Tracker</span>
          </div>
          <LoginButton />
        </div>
      </header>

      {/* Main content — padded for bottom nav */}
      <main className="flex-1 pb-[72px] max-w-lg mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer — hidden on mobile, shown on larger screens */}
      <footer className="hidden sm:block border-t border-border py-4 bg-card/30 pb-[72px]">
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} • Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'habit-tracker'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}

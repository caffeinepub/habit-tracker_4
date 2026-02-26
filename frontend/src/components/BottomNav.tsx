import { Link, useRouterState } from '@tanstack/react-router';
import { Home, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { to: '/',        label: 'Habits',  Icon: Home },
  { to: '/summary', label: 'Summary', Icon: BarChart2 },
  { to: '/settings',label: 'Settings',Icon: Settings, disabled: true },
];

export function BottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom"
      style={{ boxShadow: '0 -2px 12px 0 rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {navItems.map(({ to, label, Icon, disabled }) => {
          const isActive = currentPath === to;
          return (
            <div key={to} className="flex-1">
              {disabled ? (
                <button
                  disabled
                  className="flex flex-col items-center justify-center gap-1 w-full py-3 min-h-[56px] opacity-40 cursor-not-allowed"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </button>
              ) : (
                <Link
                  to={to as '/'}
                  className={`flex flex-col items-center justify-center gap-1 w-full py-3 min-h-[56px] transition-colors duration-150 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}
                  />
                  <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>
                    {label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

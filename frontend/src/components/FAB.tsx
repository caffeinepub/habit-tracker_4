import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Add new habit"
      className="fixed bottom-[72px] left-5 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-fab active:scale-95 transition-transform duration-150"
      style={{ boxShadow: '0 4px 14px 0 rgba(0,0,0,0.22)' }}
    >
      <Plus className="w-7 h-7" strokeWidth={2.5} />
    </button>
  );
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { HabitForm } from './HabitForm';

interface HabitFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function HabitFormModal({ open, onClose }: HabitFormModalProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8 pt-4 max-h-[90vh] overflow-y-auto">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="text-xl font-semibold">New Habit</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Add a habit you want to track every day.
          </SheetDescription>
        </SheetHeader>
        <HabitForm onSuccess={onClose} />
      </SheetContent>
    </Sheet>
  );
}

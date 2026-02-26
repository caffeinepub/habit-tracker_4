import { useState, useMemo } from 'react';
import { HabitList } from '../components/HabitList';
import { DateStrip } from '../components/DateStrip';
import { FAB } from '../components/FAB';
import { HabitFormModal } from '../components/HabitFormModal';

function getDateLabel(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diff = (target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);
  if (diff === 0) return 'Today';
  if (diff === -1) return 'Yesterday';
  if (diff === 1) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export function HabitsPage() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [modalOpen, setModalOpen] = useState(false);

  const isToday = useMemo(() => {
    const sel = new Date(selectedDate);
    sel.setHours(0, 0, 0, 0);
    return sel.getTime() === today.getTime();
  }, [selectedDate, today]);

  const dateLabel = getDateLabel(selectedDate);

  return (
    <div className="flex flex-col min-h-full">
      {/* Date label */}
      <div className="px-4 pt-2 pb-1">
        <h2 className="text-2xl font-bold text-foreground">{dateLabel}</h2>
      </div>

      {/* Date strip */}
      <DateStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {/* Habit list */}
      <div className="flex-1 pb-4">
        <HabitList selectedDate={selectedDate} isToday={isToday} />
      </div>

      {/* FAB */}
      <FAB onClick={() => setModalOpen(true)} />

      {/* Add habit modal */}
      <HabitFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

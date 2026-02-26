import { useRef, useState, useCallback } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { useDateCheckIn } from '../hooks/useDateCheckIn';
import { CheckInButton } from './CheckInButton';
import { useDeleteHabit } from '../hooks/useQueries';
import type { HabitView } from '../backend';

interface HabitCardProps {
  habit: HabitView;
  index: number;
  selectedDate: Date;
  isToday: boolean;
}

const HABIT_ICONS = ['🏃', '💧', '📚', '🧘', '🥗', '😴', '🏋️', '✍️', '🎯', '🌿'];

const PASTEL_CLASSES = [
  'pastel-green',
  'pastel-blue',
  'pastel-pink',
  'pastel-peach',
  'pastel-purple',
  'pastel-teal',
];

const DELETE_THRESHOLD = 80; // px to drag before delete is triggered on release

export function HabitCard({ habit, index, selectedDate, isToday }: HabitCardProps) {
  const isCheckedIn = useDateCheckIn(habit.checkIns, selectedDate);
  const icon = HABIT_ICONS[Number(habit.id) % HABIT_ICONS.length];
  const pastelClass = PASTEL_CLASSES[index % PASTEL_CLASSES.length];
  const checkInCount = habit.checkIns.length;

  const deleteHabit = useDeleteHabit();

  // Drag/swipe state
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Don't initiate drag on the check-in button area
    const target = e.target as HTMLElement;
    if (target.closest('[data-checkin-button]')) return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    setIsDragging(true);

    // Capture pointer so we get events even if cursor leaves the element
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    currentXRef.current = e.clientX;
    const delta = e.clientX - startXRef.current;

    // Only allow left swipe (negative delta)
    if (delta < 0) {
      // Clamp to max reveal of 120px
      const clamped = Math.max(delta, -120);
      setTranslateX(clamped);
    } else {
      setTranslateX(0);
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const delta = currentXRef.current - startXRef.current;

    if (delta <= -DELETE_THRESHOLD) {
      // Passed threshold — animate out and delete
      setIsDeleting(true);
      setTranslateX(-400);
      deleteHabit.mutate(habit.id, {
        onError: () => {
          // Snap back on error
          setIsDeleting(false);
          setTranslateX(0);
        },
      });
    } else {
      // Snap back
      setTranslateX(0);
    }
  }, [deleteHabit, habit.id]);

  const handlePointerCancel = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setTranslateX(0);
  }, []);

  // How far we've dragged as a positive number (0–120)
  const dragAmount = Math.abs(Math.min(translateX, 0));
  // Show delete zone when dragged past threshold
  const showDeleteZone = dragAmount >= DELETE_THRESHOLD;

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ opacity: isDeleting ? 0 : 1, transition: isDeleting ? 'opacity 0.3s ease' : undefined }}>
      {/* Delete background */}
      <div
        className={`
          absolute inset-0 flex items-center justify-end pr-5 rounded-2xl
          transition-colors duration-150
          ${showDeleteZone ? 'bg-destructive' : 'bg-destructive/70'}
        `}
        aria-hidden="true"
      >
        {deleteHabit.isPending ? (
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <Trash2 className={`w-5 h-5 text-white transition-transform duration-150 ${showDeleteZone ? 'scale-110' : 'scale-100'}`} />
            <span className="text-white text-[10px] font-semibold uppercase tracking-wide">
              {showDeleteZone ? 'Release' : 'Delete'}
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div
        ref={cardRef}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl min-h-[64px]
          ${pastelClass}
          select-none touch-pan-y
        `}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: 'transform',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Icon */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 flex-shrink-0 text-xl pointer-events-none ${isCheckedIn ? 'opacity-60' : ''}`}>
          {icon}
        </div>

        {/* Name + count */}
        <div className={`flex-1 min-w-0 pointer-events-none ${isCheckedIn ? 'opacity-60' : ''}`}>
          <p className={`font-semibold text-base leading-tight truncate text-foreground ${isCheckedIn ? 'line-through' : ''}`}>
            {habit.name}
          </p>
          {habit.description ? (
            <p className="text-xs text-foreground/60 truncate mt-0.5">{habit.description}</p>
          ) : (
            <p className="text-xs text-foreground/50 mt-0.5">
              {checkInCount} check-in{checkInCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Check-in button — exempt from drag and opacity changes */}
        <div data-checkin-button>
          <CheckInButton
            habitId={habit.id}
            isCheckedIn={isCheckedIn}
            isToday={isToday}
          />
        </div>
      </div>
    </div>
  );
}

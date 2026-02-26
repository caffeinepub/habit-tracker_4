import { useMemo } from 'react';

interface DateStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function DateStrip({ selectedDate, onSelectDate }: DateStripProps) {
  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build current week Mon–Sun (7 days starting from Monday)
    const dayOfWeek = today.getDay(); // 0=Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, []);

  const todayStr = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t.toDateString();
  }, []);

  const selectedStr = selectedDate.toDateString();

  return (
    <div className="flex items-center gap-1 overflow-x-auto px-4 py-3 scrollbar-none">
      {days.map((day) => {
        const isToday    = day.toDateString() === todayStr;
        const isSelected = day.toDateString() === selectedStr;
        const dayLetter  = DAY_LETTERS[day.getDay()];
        const dayNum     = day.getDate();

        return (
          <button
            key={day.toDateString()}
            onClick={() => onSelectDate(day)}
            className={`
              flex flex-col items-center justify-center rounded-full min-w-[44px] min-h-[56px] px-1 py-1 flex-shrink-0
              transition-all duration-150 select-none
              ${isSelected
                ? 'bg-primary text-primary-foreground shadow-subtle'
                : isToday
                  ? 'border-2 border-primary text-primary bg-transparent'
                  : 'text-muted-foreground hover:bg-muted'
              }
            `}
          >
            <span className="text-xs font-medium leading-none mb-1">{dayLetter}</span>
            <span className="text-sm font-semibold leading-none">{dayNum}</span>
            {isToday && !isSelected && (
              <span className="w-1 h-1 rounded-full bg-primary mt-1" />
            )}
          </button>
        );
      })}
    </div>
  );
}

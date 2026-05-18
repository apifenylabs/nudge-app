'use client';

import { Star } from 'lucide-react';

interface StarInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  label?: string;
  disabled?: boolean;
}

export default function StarInput({
  value,
  onChange,
  size = 20,
  label,
  disabled = false,
}: StarInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-xs font-medium text-gray-700">{label}</span>}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' && value < 5) onChange(value + 1);
              if (e.key === 'ArrowLeft' && value > 1) onChange(value - 1);
            }}
            className={`transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 rounded-sm ${
              disabled ? 'cursor-default opacity-70' : 'cursor-pointer hover:scale-110'
            }`}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            tabIndex={0}
          >
            <Star
              size={size}
              className={`${
                star <= value
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-300 fill-gray-200'
              } transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-400 min-w-[1.5rem]">
          {value > 0 ? value : ''}
        </span>
      </div>
    </div>
  );
}

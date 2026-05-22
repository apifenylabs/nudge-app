'use client';

import { useState, useRef, useCallback } from 'react';
import { MessageSquareText, Star, Send, Camera, X, Image as ImageIcon, Upload } from 'lucide-react';

interface TipFormProps {
  stationId: string;
  stationName: string;
  onTipSubmitted?: () => void;
}

const CATEGORIES = [
  { value: 'family', label: '👨‍👩‍👧‍👦 Family' },
  { value: 'luxury', label: '👑 Luxury' },
  { value: 'wellness', label: '🧘 Wellness' },
  { value: 'charging', label: '🔋 Charging' },
  { value: 'general', label: '💬 General' },
];

export default function TipForm({ stationId, stationName, onTipSubmitted }: TipFormProps) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('general');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be under 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setError('');
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (text.length < 10) {
      setError('Please write at least 10 characters for your tip.');
      return;
    }

    if (text.length > 500) {
      setError('Tip must be under 500 characters.');
      return;
    }

    setSubmitting(true);
    try {
      let photoDataUrl: string | undefined;
      if (photoFile) {
        const reader = new FileReader();
        photoDataUrl = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(photoFile);
        });
      }

      const res = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationId,
          author: author || 'Anonymous',
          text,
          category,
          rating: rating > 0 ? rating : undefined,
          photoUrl: photoDataUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit tip');
      }

      setSubmitted(true);
      setAuthor('');
      setText('');
      setCategory('general');
      setRating(0);
      setPhotoPreview(null);
      setPhotoFile(null);
      onTipSubmitted?.();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <MessageSquareText size={28} className="mx-auto text-emerald-500 mb-2" />
        <h4 className="text-sm font-bold text-emerald-800 mb-1">Tip submitted! 🎉</h4>
        <p className="text-xs text-emerald-600 mb-3">Thanks for sharing your experience at {stationName}.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-emerald-700 underline hover:no-underline"
        >
          Submit another tip
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h4 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
        <MessageSquareText size={16} className="text-sky-500" />
        Submit Your EV Road Trip Tip
      </h4>
      <p className="text-xs text-gray-500 mb-4">
        Share your experience at this charging station — help other EV travelers!
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Photo upload with drag-and-drop */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
              e.target.value = '';
            }}
          />
          {photoPreview ? (
            <div className="relative mb-3 rounded-xl overflow-hidden border border-gray-200 group">
              <img
                src={photoPreview}
                alt="Upload preview"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null);
                  setPhotoFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors opacity-90"
              >
                <X size={14} />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
                {(photoFile!.size / 1024).toFixed(0)} KB
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-1.5 w-full px-3 py-5 text-sm border-2 border-dashed rounded-xl cursor-pointer transition-all mb-3 ${
                isDragOver
                  ? 'border-sky-400 bg-sky-50 text-sky-600'
                  : 'border-gray-300 text-gray-400 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50/50'
              }`}
            >
              {isDragOver ? (
                <Upload size={24} className="text-sky-500" />
              ) : (
                <Camera size={24} />
              )}
              <span className="text-xs font-medium">
                {isDragOver ? 'Drop photo here' : 'Drag & drop a photo or click to browse'}
              </span>
              <span className="text-[10px] text-gray-400">
                Optional — helps other travelers (max 5MB)
              </span>
            </div>
          )}
        </div>

        {/* Author */}
        <div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700 placeholder-gray-400"
            maxLength={50}
          />
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                category === cat.value
                  ? 'bg-sky-100 text-sky-700 border-sky-300'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-sky-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 mr-1">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`transition-all ${
                star <= rating ? 'text-amber-400 scale-110' : 'text-gray-200 hover:text-amber-300'
              }`}
            >
              <Star size={16} fill={star <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-[10px] text-gray-400 ml-1">
              ({rating}/5)
            </span>
          )}
        </div>

        {/* Tip text */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your tip — parking tips, nearby family restaurants, best time to visit, etc."
            className="w-full h-20 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none text-gray-700 placeholder-gray-400"
            maxLength={500}
          />
          <div className="flex items-center justify-between">
            {error && (
              <p className="text-[10px] text-red-500">{error}</p>
            )}
            <div className={`text-right text-[10px] ${text.length > 450 ? 'text-amber-500' : 'text-gray-400'} ml-auto`}>
              {text.length}/500
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || text.length < 10}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
        >
          {submitting ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={14} />
              Submit Tip
            </>
          )}
        </button>
      </form>
    </div>
  );
}

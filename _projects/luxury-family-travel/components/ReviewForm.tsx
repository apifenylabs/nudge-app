'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Star, Send, AlertCircle, Loader2 } from 'lucide-react';
import StarInput from './StarInput';

interface ReviewFormProps {
  destinationId: string;
  destinationName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

type Field = 'author_name' | 'overall_rating' | 'safety_rating' | 'fun_rating' | 'value_rating' | 'food_rating' | 'title' | 'content' | 'visit_date' | 'tips' | 'kids_ages' | 'would_recommend';

interface FormData {
  [key: string]: string | number | boolean;
  author_name: string;
  overall_rating: number;
  safety_rating: number;
  fun_rating: number;
  value_rating: number;
  food_rating: number;
  title: string;
  content: string;
  visit_date: string;
  tips: string;
  kids_ages: string;
  would_recommend: boolean;
}

const INITIAL: FormData = {
  author_name: '', overall_rating: 0, safety_rating: 0, fun_rating: 0,
  value_rating: 0, food_rating: 0, title: '', content: '',
  visit_date: '', tips: '', kids_ages: '', would_recommend: true,
};

export default function ReviewForm({ destinationId, destinationName, isOpen, onClose, onSubmitSuccess }: ReviewFormProps) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => { if (isOpen) { setForm(INITIAL); setErrors({}); setToast(null); } }, [isOpen]);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 4000); return () => clearTimeout(t); } }, [toast]);

  const update = useCallback(<K extends Field>(k: K, v: FormData[K]) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => { const c = { ...p }; delete c[k]; return c; });
  }, [errors]);

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!form.author_name.toString().trim()) e.author_name = 'Name required';
    if (form.overall_rating === 0) e.overall_rating = 'Rating required';
    if (!form.title.toString().trim()) e.title = 'Title required';
    if (!form.content.toString().trim()) e.content = 'Review content required';
    else if (form.content.toString().trim().length < 20) e.content = 'At least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const kids = form.kids_ages.toString().split(',').map(s => s.trim()).filter(Boolean);
      const payload: Record<string, unknown> = {
        destination_id: destinationId, author_name: form.author_name.toString().trim(),
        author_badge: 'parent', kids_ages: kids, overall_rating: form.overall_rating,
        safety_rating: form.safety_rating || null, fun_rating: form.fun_rating || null,
        value_rating: form.value_rating || null, food_rating: form.food_rating || null,
        title: form.title.toString().trim(), content: form.content.toString().trim(),
        visit_date: form.visit_date || null, would_recommend: !!form.would_recommend,
        tips: form.tips.toString().trim(),
      };
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed'); }
      setToast({ type: 'success', message: 'Submitted! It will appear after moderation.' });
      setTimeout(() => { onClose(); onSubmitSuccess(); }, 1500);
    } catch (err: unknown) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong' });
    } finally { setSubmitting(false); }
  };

  if (!isOpen) return null;

  const fields: { label: string; key: Field; placeholder?: string; type?: string; required?: boolean; rows?: number }[] = [
    { label: 'Your Name', key: 'author_name', placeholder: 'e.g. Sarah, mom of 2', required: true },
    { label: 'Review Title', key: 'title', placeholder: 'e.g. Amazing day out with our toddler', required: true },
    { label: 'Your Review', key: 'content', placeholder: 'Tell other parents about your experience...', required: true, rows: 4 },
    { label: 'When did you visit?', key: 'visit_date', type: 'date' },
    { label: "Kids' ages", key: 'kids_ages', placeholder: 'e.g. 2, 5, 8' },
    { label: 'Tips for other parents', key: 'tips', placeholder: 'Any advice? What to bring? Best time?', rows: 2 },
  ];

  const starFields: { label: string; key: Field; size: number }[] = [
    { label: 'Overall *', key: 'overall_rating', size: 22 },
    { label: 'Safety', key: 'safety_rating', size: 18 },
    { label: 'Fun', key: 'fun_rating', size: 18 },
    { label: 'Value', key: 'value_rating', size: 18 },
    { label: 'Food', key: 'food_rating', size: 18 },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={!submitting ? onClose : undefined} />
      <div className="fixed inset-x-0 bottom-0 z-50 sm:inset-y-0 sm:right-0 sm:left-auto sm:max-w-lg w-full sm:rounded-l-2xl bg-white shadow-2xl flex flex-col animate-slide-up sm:animate-slide-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Write a Review</h2>
            <p className="text-xs text-gray-500 mt-0.5">{destinationName}</p>
          </div>
          <button onClick={onClose} disabled={submitting} className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-40"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}{f.required && <span className="text-red-400">*</span>}
              </label>
              {f.key === 'content' || f.key === 'tips' ? (
                <textarea value={form[f.key].toString()} onChange={e => update(f.key, e.target.value)}
                  rows={f.rows || 3} placeholder={f.placeholder}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm resize-none ${errors[f.key] ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent`} />
              ) : (
                <input type={f.type || 'text'} value={form[f.key].toString()} onChange={e => update(f.key, f.type === 'date' ? e.target.value : e.target.value)}
                  placeholder={f.placeholder}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm ${errors[f.key] ? 'border-red-300 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent`} />
              )}
              {errors[f.key] && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors[f.key]}</p>}
              {f.key === 'kids_ages' && <p className="text-xs text-gray-400 mt-1">Comma-separated ages</p>}
            </div>
          ))}

          <div className="space-y-4">
            <div className="flex items-center gap-1"><Star size={14} className="text-amber-400" /><span className="text-sm font-medium text-gray-700">Ratings</span></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {starFields.map(sf => (
                <div key={sf.key} className={sf.key === 'overall_rating' ? 'col-span-2 sm:col-span-1' : ''}>
                  <StarInput value={form[sf.key] as number} onChange={v => update(sf.key, v)} size={sf.size} label={sf.label} />
                  {errors[sf.key] && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors[sf.key]}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Would you recommend this?</label>
            <button type="button" onClick={() => update('would_recommend', !form.would_recommend)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.would_recommend ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.would_recommend ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-600">{form.would_recommend ? 'Yes' : 'No'}</span>
          </div>

          {toast && (
            <div className={`fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-fade-in ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
              {toast.type === 'success' ? <Send size={14} /> : <AlertCircle size={14} />}
              {toast.message}
            </div>
          )}
        </form>

        <div className="border-t border-gray-200 px-5 py-4 shrink-0">
          <button type="submit" onClick={handleSubmit} disabled={submitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Review</>}
          </button>
        </div>
      </div>
    </>
  );
}

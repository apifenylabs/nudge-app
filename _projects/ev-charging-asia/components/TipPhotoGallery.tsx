'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from 'lucide-react';

interface PhotoTip {
  id: string;
  author: string;
  text: string;
  photoUrl: string;
  category: string;
  rating?: number;
  createdAt: string;
}

interface TipPhotoGalleryProps {
  stationId: string;
  refreshKey?: number;
}

/**
 * Displays user-submitted tip photos in a responsive collapsible gallery.
 * Opens a lightbox modal on click for full-view.
 * Composable additive component — no breaking changes to existing code.
 */
export default function TipPhotoGallery({ stationId, refreshKey = 0 }: TipPhotoGalleryProps) {
  const [photos, setPhotos] = useState<PhotoTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tips?stationId=${encodeURIComponent(stationId)}`);
      const data = await res.json();
      const tipsWithPhotos = (data.tips || []).filter((t: PhotoTip) => t.photoUrl);
      setPhotos(tipsWithPhotos);
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos, refreshKey]);

  if (loading || photos.length === 0) return null;

  const catEmojis: Record<string, string> = {
    family: '👨‍👩‍👧‍👦',
    luxury: '👑',
    wellness: '🧘',
    charging: '🔋',
    general: '💬',
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 mb-3 transition-colors"
      >
        <Camera size={16} className="text-purple-500" />
        Traveler Photos ({photos.length})
        <span className="text-xs text-gray-400">{collapsed ? '▶ Show' : '▼ Hide'}</span>
      </button>

      {!collapsed && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {photos.slice(0, 6).map((tip, idx) => (
              <button
                key={tip.id}
                onClick={() => setLightboxIndex(idx)}
                className="relative group rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all aspect-[4/3] bg-gray-100"
              >
                <img
                  src={tip.photoUrl}
                  alt={`Photo by ${tip.author}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {tip.author} · {catEmojis[tip.category] || '💬'}
                </div>
              </button>
            ))}
          </div>

          {photos.length > 6 && !showAllPhotos && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowAllPhotos(true); }}
              className="mt-2 w-full text-xs text-purple-600 hover:text-purple-700 font-medium bg-purple-50 hover:bg-purple-100 rounded-lg py-2 transition-colors"
            >
              + Show all {photos.length} photos
            </button>
          )}
          {photos.length > 6 && showAllPhotos && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {photos.slice(6).map((tip, idx) => (
                  <button
                    key={tip.id}
                    onClick={() => setLightboxIndex(idx + 6)}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all aspect-[4/3] bg-gray-100"
                  >
                    <img
                      src={tip.photoUrl}
                      alt={`Photo by ${tip.author}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity truncate">
                      {tip.author} · {catEmojis[tip.category] || '💬'}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowAllPhotos(false); }}
                className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 rounded-lg py-2 transition-colors"
              >
                Show less
              </button>
            </>
          )}
        </>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div
            className="max-w-3xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].photoUrl}
              alt={`Photo by ${photos[lightboxIndex].author}`}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <div className="mt-3 bg-black/40 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{photos[lightboxIndex].author}</span>
                <span className="text-xs text-white/60">
                  {catEmojis[photos[lightboxIndex].category] || '💬'} {photos[lightboxIndex].category}
                  {photos[lightboxIndex].rating ? ` · ${'★'.repeat(photos[lightboxIndex].rating)}${'☆'.repeat(5 - photos[lightboxIndex].rating!)}` : ''}
                </span>
              </div>
              <p className="text-sm text-white/80">{photos[lightboxIndex].text}</p>
              <span className="text-[10px] text-white/40 block mt-1">
                {new Date(photos[lightboxIndex].createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}

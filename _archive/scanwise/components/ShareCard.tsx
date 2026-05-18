"use client";

import { getScoreLabel, getScoreBadgeColor } from "@/lib/score";
import { Card } from "@/components/ui/card";

interface ShareCardProps {
  productName: string;
  brand: string;
  score: number;
  ingredientsCount: number;
  cleanCount: number;
  imageUrl?: string;
}

export default function ShareCard({
  productName,
  brand,
  score,
  ingredientsCount,
  cleanCount,
  imageUrl,
}: ShareCardProps) {
  const scoreLabel = getScoreLabel(score);
  const badgeColor = getScoreBadgeColor(score);
  const shareText = `I scanned "${productName}" by ${brand} on ScanWise — Score: ${score}/100 (${scoreLabel}) 💚`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    // Check Web Share API support (canShare may not exist in all TS libs)
    if ((navigator as any).canShare?.()) {
      try {
        await (navigator as any).share({
          title: `ScanWise: ${productName}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or Web Share not available
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Link copied to clipboard! 📋");
    } catch {
      // Clipboard not available
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-emerald-100 dark:border-emerald-900">
      {/* Card header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">
            ScanWise
          </span>
          {imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={productName}
              className="h-10 w-10 rounded-full border-2 border-white/50 object-cover"
            />
          )}
        </div>
        <h3 className="mt-2 text-lg font-bold leading-tight">{productName}</h3>
        <p className="text-sm opacity-80">{brand}</p>
      </div>

      {/* Score display */}
      <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <span
            className={`text-5xl font-black ${score >= 80 ? "text-emerald-500" : score >= 60 ? "text-yellow-500" : score >= 40 ? "text-orange-500" : "text-red-500"}`}
          >
            {score}
          </span>
          <span className="text-xs text-gray-400">/100</span>
          <span
            className={`mt-1 rounded-full px-3 py-0.5 text-xs font-semibold ${badgeColor}`}
          >
            {scoreLabel}
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="border-t border-gray-100 px-4 pb-4 pt-3 dark:border-gray-800">
        <div className="flex justify-around text-center text-xs">
          <div>
            <span className="block text-lg font-bold text-gray-800 dark:text-gray-200">
              {ingredientsCount}
            </span>
            <span className="text-gray-500">Ingredients</span>
          </div>
          <div>
            <span className="block text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {cleanCount}
            </span>
            <span className="text-gray-500">Clean</span>
          </div>
          <div>
            <span className="block text-lg font-bold">
              {ingredientsCount - cleanCount}
            </span>
            <span className="text-gray-500">Flagged</span>
          </div>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 bg-gray-50 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Share Result
      </button>
    </Card>
  );
}

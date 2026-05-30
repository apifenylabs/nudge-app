"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Blog page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-950 via-purple-950 to-slate-950 px-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-400" />
        <h1 className="mt-6 text-3xl font-bold text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-violet-300/70">
          We couldn&apos;t load the blog. Please try again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            className="border-violet-500/30 text-violet-200 hover:bg-violet-500/10"
            onClick={reset}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-fuchsia-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-violet-400/40">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}

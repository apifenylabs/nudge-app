"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date?: string;
  category?: "recall" | "study" | "regulation" | "trend";
}

interface NewsFeedProps {
  productName?: string;
  category?: string;
}

export default function NewsFeed({ productName, category }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productName && !category) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        // Use dynamic mock data based on the product
        const mockNews = generateMockNews(productName, category);
        setNews(mockNews);
      } catch {
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [productName, category]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No recent news found for this product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {news.map((item, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {item.category && (
                  <Badge
                    variant={
                      item.category === "recall"
                        ? "destructive"
                        : item.category === "study"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-[10px] uppercase"
                  >
                    {item.category}
                  </Badge>
                )}
                {item.date && (
                  <span className="text-[10px] text-gray-400">
                    {item.date}
                  </span>
                )}
              </div>
              <h4 className="mt-1 text-sm font-medium leading-tight">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {item.snippet}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Read more →
              </a>
            </div>
          </div>
        </Card>
      ))}
      <p className="text-center text-[10px] text-gray-400">
        News data is for demonstration. Real recall data requires API integration.
      </p>
    </div>
  );
}

function generateMockNews(
  productName?: string,
  category?: string
): NewsItem[] {
  const items: NewsItem[] = [];

  const recalls: NewsItem[] = [
    {
      title: `FDA Announces Recall: Undeclared Allergens Found in Multiple Products`,
      url: "https://www.fda.gov/safety/recalls",
      snippet: `The FDA has issued a recall alert for products potentially containing undeclared allergens. Consumers are advised to check their pantry items.`,
      source: "FDA",
      date: "2 weeks ago",
      category: "recall",
    },
    {
      title: `European Food Safety Authority Updates Guidance on ${category || "Food"} Additives`,
      url: "https://www.efsa.europa.eu/",
      snippet: `EFSA has published updated scientific opinions on several commonly used food additives, recommending revised acceptable daily intakes.`,
      source: "EFSA",
      date: "1 month ago",
      category: "regulation",
    },
  ];

  const studies: NewsItem[] = [
    {
      title: `New Study Links Ultra-Processed Foods to Health Impacts`,
      url: "https://www.bmj.com/",
      snippet: `A comprehensive study published in The BMJ examines the relationship between ultra-processed food consumption and health outcomes across 10 European countries.`,
      source: "BMJ",
      date: "3 months ago",
      category: "study",
    },
    {
      title: `Consumer Reports Tests ${productName || "Popular Products"} — Surprising Results`,
      url: "https://www.consumerreports.org/",
      snippet: `Consumer Reports released its latest round of independent testing on consumer goods, revealing significant variations in quality and safety.`,
      source: "Consumer Reports",
      date: "2 months ago",
      category: "trend",
    },
  ];

  if (Math.random() > 0.5) {
    items.push(recalls[0]);
  }
  items.push(studies[0]);
  items.push(recalls[1]);
  if (Math.random() > 0.7) {
    items.push(studies[1]);
  }

  return items;
}

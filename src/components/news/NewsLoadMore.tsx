"use client";

import { useState } from "react";
import type { NewsPost } from "@/lib/types";
import { NewsCard } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";

export function NewsLoadMore({ posts, pageSize = 6 }: { posts: NewsPost[]; pageSize?: number }) {
  const [visible, setVisible] = useState(pageSize);
  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {shown.map((post) => (
          <NewsCard key={post._id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + pageSize)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

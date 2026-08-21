"use client";

import { useState } from "react";

// Facade: carrega só a miniatura até o clique, pra não pesar a página com
// vários iframes do YouTube de uma vez.
export default function YouTubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-td-card">
      {loaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Assistir: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/40 transition group-hover:bg-black/25" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-td-cta text-td-bg-on-gold shadow-lg transition group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

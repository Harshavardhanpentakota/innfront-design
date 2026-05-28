import React, { useState } from "react";

export default function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="relative w-full h-full">
      <img
        src={images[idx]}
        alt={alt}
        className="h-full w-full object-cover rounded-2xl"
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 shadow hover:bg-background"
            onClick={() => setIdx((i) => (i === 0 ? images.length - 1 : i - 1))}
            aria-label="Previous image"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 shadow hover:bg-background"
            onClick={() => setIdx((i) => (i === images.length - 1 ? 0 : i + 1))}
            aria-label="Next image"
          >
            <span aria-hidden>›</span>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`inline-block h-2 w-2 rounded-full ${i === idx ? "bg-primary" : "bg-muted-foreground/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

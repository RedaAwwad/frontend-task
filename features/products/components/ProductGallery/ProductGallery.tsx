"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
}

export function ProductGallery({
  images,
  thumbnail,
  title,
}: ProductGalleryProps) {
  // Ensure the thumbnail is included in the gallery and remove duplicates
  const allImages = Array.from(new Set([thumbnail, ...images]));
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Large Image */}
      <div className="aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden p-8 border border-gray-100 dark:border-gray-700">
        <img
          src={selectedImage}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Thumbnails Grid */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.slice(0, 4).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative aspect-square rounded-xl bg-gray-50 dark:bg-gray-800 border p-2 flex items-center justify-center cursor-pointer transition-all ${
                selectedImage === img
                  ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md scale-[1.02]"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:scale-[1.02]"
              }`}
              aria-label={`View ${title} image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import type { GeneratedImage } from "@/lib/types";

export default function HouseImageDisplay({
  image,
}: {
  image: GeneratedImage;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg overflow-hidden border border-cream-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:${image.mimeType};base64,${image.base64Data}`}
          alt="AIが生成した外観イメージ"
          className="w-full h-auto"
        />
      </div>
      <p className="text-xs text-wood-400 text-center">
        AIが生成した外観イメージです（参考画像であり、実際の設計とは異なります）
      </p>
    </div>
  );
}

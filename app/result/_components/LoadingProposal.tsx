"use client";

export default function LoadingProposal() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-cream-200" />
        <div className="absolute inset-0 rounded-full border-4 border-forest-500 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🏠
        </div>
      </div>
      <h3 className="text-lg font-bold text-wood-600 mb-2">
        間取りプランを作成中...
      </h3>
      <p className="text-sm text-wood-500 text-center max-w-sm">
        AIがご家族に最適な間取りを設計しています。
        <br />
        しばらくお待ちください（約10〜20秒）。
      </p>
    </div>
  );
}

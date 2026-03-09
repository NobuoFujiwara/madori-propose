import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-cream-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className="font-bold text-lg text-wood-600">
            AI間取りプランナー
          </span>
        </Link>
        <Link
          href="/hearing"
          className="text-sm text-forest-600 hover:text-forest-700 font-medium transition-colors"
        >
          間取りを提案してもらう
        </Link>
      </div>
    </header>
  );
}

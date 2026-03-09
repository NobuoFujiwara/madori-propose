import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-wood-600 leading-tight">
            あなたの理想の住まいを、
            <br />
            AIがご提案します
          </h1>
          <p className="mt-4 text-wood-500 text-lg max-w-xl mx-auto">
            家族構成やライフスタイルをお伺いし、
            一級建築士レベルのAIが最適な間取りプランを作成します。
          </p>
          <Link
            href="/hearing"
            className="inline-block mt-8 px-8 py-3.5 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors shadow-sm"
          >
            無料で間取り提案を受ける
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-wood-600 text-center mb-12">
            かんたん3ステップ
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="ヒアリング"
              description="家族構成・ご予算・ご要望を6つのステップでお伺いします。"
              icon="📝"
            />
            <StepCard
              number="2"
              title="AI設計"
              description="AIが建築基準や動線を考慮し、最適な間取りを設計します。"
              icon="🤖"
            />
            <StepCard
              number="3"
              title="ご提案"
              description="間取り図・部屋詳細・設計ポイントをまとめてご提案します。"
              icon="🏡"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-wood-600 text-center mb-12">
            AI間取りプランナーの特徴
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <FeatureCard
              title="家族構成に最適化"
              description="お子さまの年齢や将来の成長、ご高齢のご家族への配慮など、ご家族の状況に合わせた間取りをご提案します。"
            />
            <FeatureCard
              title="何度でもやり直し可能"
              description="気になる点があれば、条件を変更して何度でも再提案を受けることができます。"
            />
            <FeatureCard
              title="日本の住宅設計に対応"
              description="建蔽率・日照・動線など、日本の住宅建築に精通したAIが設計を行います。"
            />
            <FeatureCard
              title="詳細な間取り情報"
              description="間取り図に加えて、各部屋のサイズ・用途・設計のポイントを詳しくご説明します。"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-wood-600 mb-4">
            さっそく始めましょう
          </h2>
          <p className="text-wood-500 mb-8">
            所要時間は約3分。お気軽にお試しください。
          </p>
          <Link
            href="/hearing"
            className="inline-block px-8 py-3.5 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors shadow-sm"
          >
            間取り提案を受ける
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-forest-50 flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <div className="text-xs text-forest-500 font-bold mb-1">
        STEP {number}
      </div>
      <h3 className="text-lg font-bold text-wood-600 mb-2">{title}</h3>
      <p className="text-sm text-wood-500">{description}</p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-200">
      <h3 className="font-bold text-wood-600 mb-2">{title}</h3>
      <p className="text-sm text-wood-500">{description}</p>
    </div>
  );
}

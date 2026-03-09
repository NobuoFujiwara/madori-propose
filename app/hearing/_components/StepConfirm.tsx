"use client";

import { useHearingStore } from "@/stores/hearing-store";

export default function StepConfirm() {
  const { hearingData } = useHearingStore();
  const { family, budget, rooms, requirements, lifestyle, lot } = hearingData;

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="p-4 bg-cream-100 rounded-lg">
      <h3 className="text-sm font-bold text-wood-600 mb-2">{title}</h3>
      <div className="text-sm text-wood-500 space-y-1">{children}</div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">入力内容の確認</h2>
      <p className="text-sm text-wood-500 mb-6">
        以下の内容でAIに間取りを提案してもらいます。内容をご確認ください。
      </p>

      <div className="space-y-4">
        <Section title="ご家族構成">
          <p>
            {family.members
              .map((m) => `${m.relationship}（${m.ageRange}）`)
              .join("、")}
          </p>
        </Section>

        <Section title="ご予算">
          <p>{budget.range}</p>
          {budget.note && <p className="text-wood-500/70">備考: {budget.note}</p>}
        </Section>

        <Section title="部屋数・構成">
          <p>
            {rooms.ldkType} / {rooms.floors} / 浴室{rooms.bathrooms}つ
          </p>
          {rooms.additionalRooms.length > 0 && (
            <p>追加: {rooms.additionalRooms.join("、")}</p>
          )}
        </Section>

        <Section title="ご要望">
          {requirements.features.length > 0 && (
            <p>{requirements.features.join("、")}</p>
          )}
          {requirements.parking && (
            <p>駐車場: {requirements.parkingSpaces}台分</p>
          )}
          {requirements.freeText && <p>その他: {requirements.freeText}</p>}
          {requirements.features.length === 0 && !requirements.freeText && (
            <p className="text-wood-500/50">特になし</p>
          )}
        </Section>

        <Section title="ライフスタイル">
          {lifestyle.pets && <p>ペット: {lifestyle.petDetails || "あり"}</p>}
          {lifestyle.hobbies && <p>趣味: {lifestyle.hobbies}</p>}
          {lifestyle.accessibility.length > 0 && (
            <p>バリアフリー: {lifestyle.accessibility.join("、")}</p>
          )}
          {lifestyle.multiGeneration && (
            <p>二世帯: {lifestyle.multiGenerationType}</p>
          )}
          {!lifestyle.pets &&
            !lifestyle.hobbies &&
            lifestyle.accessibility.length === 0 &&
            !lifestyle.multiGeneration && (
              <p className="text-wood-500/50">特になし</p>
            )}
        </Section>

        <Section title="土地情報">
          <p>
            面積: 約{lot.size}坪（{(lot.size * 3.306).toFixed(0)}m²）
          </p>
          <p>接道方角: {lot.orientation}</p>
          <p>形状: {lot.shape}</p>
          {lot.restrictions && <p>制限: {lot.restrictions}</p>}
        </Section>
      </div>
    </div>
  );
}

"use client";

import { useHearingStore } from "@/stores/hearing-store";
import { RELATIONSHIPS, AGE_RANGES } from "@/lib/constants";

export default function StepFamily() {
  const { hearingData, updateFamily } = useHearingStore();
  const { members } = hearingData.family;

  const addMember = () => {
    updateFamily({
      members: [...members, { relationship: "子供", ageRange: "7〜12歳（小学生）" }],
    });
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    updateFamily({ members: members.filter((_, i) => i !== index) });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    );
    updateFamily({ members: updated });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-wood-600 mb-2">ご家族構成</h2>
      <p className="text-sm text-wood-500 mb-6">
        一緒に住まわれるご家族の情報をお教えください。
      </p>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-cream-100 rounded-lg"
          >
            <div className="flex-1">
              <label className="text-xs text-wood-500 mb-1 block">続柄</label>
              <select
                value={member.relationship}
                onChange={(e) => updateMember(index, "relationship", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              >
                {RELATIONSHIPS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-wood-500 mb-1 block">年齢</label>
              <select
                value={member.ageRange}
                onChange={(e) => updateMember(index, "ageRange", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              >
                {AGE_RANGES.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeMember(index)}
              disabled={members.length <= 1}
              className="mt-5 p-2 text-wood-500 hover:text-red-500 disabled:opacity-30 transition-colors"
              aria-label="削除"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addMember}
        className="mt-4 px-4 py-2 rounded-lg border-2 border-dashed border-cream-300 text-wood-500 hover:border-forest-400 hover:text-forest-600 transition-colors w-full text-sm"
      >
        + 家族を追加
      </button>
    </div>
  );
}

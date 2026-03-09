"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useHearingStore } from "@/stores/hearing-store";
import type { FloorPlanProposal } from "@/lib/types";
import LoadingProposal from "./_components/LoadingProposal";
import FloorPlanResult from "./_components/FloorPlanResult";

export default function ResultPage() {
  const router = useRouter();
  const hearingData = useHearingStore((s) => s.hearingData);
  const [proposal, setProposal] = useState<FloorPlanProposal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const generateProposal = async (additionalInstructions?: string) => {
    setIsLoading(true);
    setError(null);
    setProposal(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      const response = await fetch("/api/propose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...hearingData,
          additionalInstructions: additionalInstructions || undefined,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "提案の生成に失敗しました");
      }
      const data = await response.json();
      setProposal(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("タイムアウトしました。もう一度お試しください。");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "提案の生成に失敗しました。もう一度お試しください。"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      generateProposal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <LoadingProposal />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                hasFetched.current = false;
                generateProposal();
              }}
              className="px-6 py-2.5 rounded-lg bg-forest-600 text-white font-medium hover:bg-forest-700 transition-colors"
            >
              もう一度試す
            </button>
            <button
              onClick={() => router.push("/hearing")}
              className="px-6 py-2.5 rounded-lg border border-cream-300 text-wood-600 hover:bg-cream-100 transition-colors"
            >
              条件を変更する
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <LoadingProposal />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-wood-600 mb-6">
        あなたへの間取りご提案
      </h1>
      <FloorPlanResult
        proposal={proposal}
        onRegenerate={(instructions) => generateProposal(instructions)}
        isLoading={isLoading}
      />
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            useHearingStore.getState().reset();
            router.push("/hearing");
          }}
          className="text-sm text-wood-500 hover:text-forest-600 transition-colors"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
}

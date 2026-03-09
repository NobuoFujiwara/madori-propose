import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt, extractJSON } from "@/lib/claude-prompt";
import type { HearingData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your-api-key-here") {
      return NextResponse.json(
        { error: "APIキーが設定されていません。.env.localにANTHROPIC_API_KEYを設定してください。" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const hearingData: HearingData = body;
    const additionalInstructions: string | undefined = body.additionalInstructions;

    const anthropic = new Anthropic({ apiKey });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: buildUserPrompt(hearingData, additionalInstructions),
        },
      ],
    });

    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    const jsonString = extractJSON(responseText);
    const proposal = JSON.parse(jsonString);

    return NextResponse.json(proposal);
  } catch (error) {
    console.error("Proposal generation failed:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AIからの応答を解析できませんでした。もう一度お試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "提案の生成に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}

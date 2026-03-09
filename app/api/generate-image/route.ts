import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import type { FloorPlanProposal } from "@/lib/types";

function buildImagePrompt(proposal: FloorPlanProposal): string {
  const floorCount = proposal.floors.length;
  const totalArea = proposal.totalFloorArea.sqm;
  const hasGarden = proposal.gardenArea.available;
  const parkingSpaces = proposal.parkingSpaces;

  const allRooms = proposal.floors.flatMap((f) => f.rooms);
  const hasBalcony = allRooms.some((r) => r.name.includes("バルコニー"));

  let prompt = `A photorealistic exterior view of a modern Japanese residential house. `;
  prompt += `${floorCount}-story house, approximately ${Math.round(totalArea)} square meters total floor area. `;
  prompt += `Contemporary Japanese architectural style with clean lines and natural materials, white and wood exterior. `;

  if (hasGarden) {
    prompt += `The house has a well-maintained small Japanese garden with plants. `;
  }
  if (parkingSpaces > 0) {
    prompt += `Includes a carport for ${parkingSpaces} car${parkingSpaces > 1 ? "s" : ""}. `;
  }
  if (hasBalcony) {
    prompt += `Features a visible balcony on the upper floor. `;
  }

  prompt += `Warm daylight, clear sky, Japanese residential neighborhood. `;
  prompt += `Professional architectural photography, high quality.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey || apiKey === "your-google-ai-api-key-here") {
      return NextResponse.json(
        {
          error:
            "Google AI APIキーが設定されていません。.env.localにGOOGLE_AI_API_KEYを設定してください。",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const proposal: FloorPlanProposal = body.proposal;
    const prompt = buildImagePrompt(proposal);

    const ai = new GoogleGenAI({ apiKey });

    // Imagen 4 で外観イメージを生成
    const response = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt,
      config: {
        numberOfImages: 1,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      return NextResponse.json(
        { error: "画像の生成に失敗しました。もう一度お試しください。" },
        { status: 500 }
      );
    }

    const generatedImage = response.generatedImages[0];

    return NextResponse.json({
      base64Data: generatedImage.image?.imageBytes || "",
      mimeType: "image/png",
      prompt,
    });
  } catch (error) {
    console.error("Image generation failed:", error);
    return NextResponse.json(
      {
        error:
          "外観イメージの生成に失敗しました。もう一度お試しください。",
      },
      { status: 500 }
    );
  }
}

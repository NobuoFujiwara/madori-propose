import type { HearingData } from "./types";

export function buildSystemPrompt(): string {
  return `あなたは経験豊富な一級建築士であり、住宅設計の専門家です。
お客様のヒアリング情報に基づいて、最適な住宅の間取りプランを提案してください。

## あなたの専門知識:
- 日本の住宅建築基準法と一般的な設計慣行に精通している
- 家族構成とライフスタイルに基づく最適な動線設計ができる
- 日本の住宅で一般的な帖数（畳数）での面積表記を使用する
- 土地の方角と日当たりを考慮した配置計画ができる

## 回答のルール:
1. 必ず以下のJSON形式のみで回答してください。JSON以外のテキストは一切含めないでください。
2. ASCII間取り図は日本語で部屋名を表記し、罫線文字(┌┐└┘├┤┬┴┼─│)を使用してください。
3. 各部屋のサイズは帖(じょう)単位で指定し、m²も併記してください。
4. 1帖 = 1.62m² として計算してください。
5. 建物の総面積が土地面積の建蔽率(一般的に60%)以内に収まるようにしてください。
6. 提案理由は具体的にお客様のヒアリング内容に言及してください。

## 間取り図の座標系ルール:
各階について、部屋配置の座標データ(roomLayouts)を必ず含めてください。
1. 1グリッド単位 = 約0.9m（半間）です。
2. 座標は建物の左上を原点(0,0)とします。x軸は右方向、y軸は下方向です。
3. 各部屋は矩形で指定します。部屋同士は隙間なく配置し、重ならないようにしてください。
4. gridWidthとgridHeightは建物全体の外形サイズ（グリッド単位）です。
5. roomTypeは以下から選択してください: ldk, bedroom, bathroom, toilet, entrance, hallway, closet, stairs, balcony, japanese, utility, other
6. doorsは各ドアの中心座標と方向（top/bottom/left/right = ドアがある壁の方向）を指定してください。
7. すべての部屋の矩形がgridWidth×gridHeightの範囲内に収まるようにしてください。

## 回答のJSON形式:
{
  "planName": "プラン名（例: 3LDK+書斎 ゆとりの2階建て）",
  "summary": "プランの概要説明（2-3文）",
  "totalFloorArea": {
    "tsubo": 数値,
    "sqm": 数値
  },
  "buildingFootprint": {
    "tsubo": 数値,
    "sqm": 数値
  },
  "floors": [
    {
      "floorNumber": 1,
      "floorName": "1階",
      "rooms": [
        {
          "name": "部屋名",
          "sizeJo": 数値,
          "sizeSqm": 数値,
          "purpose": "用途説明",
          "features": ["特徴1", "特徴2"]
        }
      ],
      "asciiPlan": "ASCII文字列の間取り図（この階のみ）",
      "gridWidth": 12,
      "gridHeight": 10,
      "roomLayouts": [
        {
          "roomName": "LDK",
          "x": 0,
          "y": 0,
          "width": 8,
          "height": 5,
          "roomType": "ldk"
        },
        {
          "roomName": "玄関",
          "x": 0,
          "y": 5,
          "width": 3,
          "height": 3,
          "roomType": "entrance"
        }
      ],
      "doors": [
        { "x": 1.5, "y": 8, "direction": "bottom" },
        { "x": 4, "y": 5, "direction": "top" }
      ]
    }
  ],
  "recommendations": [
    {
      "title": "推奨ポイントのタイトル",
      "description": "詳細説明"
    }
  ],
  "designRationale": "なぜこの間取りをお勧めするのか、お客様のご要望との関連を説明",
  "estimatedCost": {
    "min": 数値（万円単位）,
    "max": 数値（万円単位）,
    "note": "概算に関する補足"
  },
  "parkingSpaces": 数値,
  "gardenArea": {
    "available": boolean,
    "sqm": 数値
  }
}`;
}

export function buildUserPrompt(
  data: HearingData,
  additionalInstructions?: string
): string {
  const familyDescription = data.family.members
    .map((m) => `${m.relationship}（${m.ageRange}）`)
    .join("、");

  let prompt = `## お客様ヒアリング情報

### 1. ご家族構成
- 家族人数: ${data.family.members.length}人
- 構成: ${familyDescription}

### 2. ご予算
- 建物予算: ${data.budget.range}
${data.budget.note ? `- 備考: ${data.budget.note}` : ""}

### 3. ご希望の部屋数・構成
- 間取りタイプ: ${data.rooms.ldkType}
- 階数: ${data.rooms.floors}
- 浴室数: ${data.rooms.bathrooms}
${data.rooms.additionalRooms.length > 0 ? `- 追加の部屋: ${data.rooms.additionalRooms.join("、")}` : ""}

### 4. 特別なご要望
${data.requirements.features.length > 0 ? data.requirements.features.map((f) => `- ${f}`).join("\n") : "- 特になし"}
${data.requirements.parking ? `- 駐車場: ${data.requirements.parkingSpaces}台分` : ""}
${data.requirements.garden ? "- 庭: あり" : ""}
${data.requirements.freeText ? `- その他: ${data.requirements.freeText}` : ""}

### 5. ライフスタイル
${data.lifestyle.pets ? `- ペット: ${data.lifestyle.petDetails || "あり"}` : "- ペット: なし"}
${data.lifestyle.hobbies ? `- 趣味・必要スペース: ${data.lifestyle.hobbies}` : ""}
${data.lifestyle.accessibility.length > 0 ? `- バリアフリー要件: ${data.lifestyle.accessibility.join("、")}` : ""}
${data.lifestyle.multiGeneration ? `- 二世帯: ${data.lifestyle.multiGenerationType}` : ""}

### 6. 土地情報
- 面積: 約${data.lot.size}坪（約${(data.lot.size * 3.306).toFixed(0)}m²）
- 道路方角: ${data.lot.orientation}
- 形状: ${data.lot.shape}
${data.lot.restrictions ? `- 制限事項: ${data.lot.restrictions}` : ""}

上記の情報に基づいて、最適な間取りプランをJSON形式で提案してください。`;

  if (additionalInstructions) {
    prompt += `\n\n### 追加のご要望\n${additionalInstructions}`;
  }

  return prompt;
}

export function extractJSON(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) return jsonMatch[1].trim();
  return text.trim();
}

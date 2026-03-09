export const RELATIONSHIPS = [
  "本人",
  "配偶者",
  "子供",
  "父",
  "母",
  "祖父",
  "祖母",
  "その他",
] as const;

export const AGE_RANGES = [
  "0〜2歳",
  "3〜6歳（未就学）",
  "7〜12歳（小学生）",
  "13〜18歳（中高生）",
  "19〜29歳",
  "30代",
  "40代",
  "50代",
  "60代",
  "70歳以上",
] as const;

export const BUDGET_OPTIONS = [
  "1500万円〜2000万円",
  "2000万円〜2500万円",
  "2500万円〜3000万円",
  "3000万円〜3500万円",
  "3500万円〜4000万円",
  "4000万円〜4500万円",
  "4500万円〜5000万円",
  "5000万円〜6000万円",
  "6000万円〜7000万円",
  "7000万円〜8000万円",
  "8000万円以上",
  "未定・相談したい",
] as const;

export const LDK_TYPES = [
  "1LDK",
  "2LDK",
  "3LDK",
  "4LDK",
  "5LDK以上",
] as const;

export const FLOOR_OPTIONS = [
  "平屋（1階建て）",
  "2階建て",
  "3階建て",
] as const;

export const ADDITIONAL_ROOMS = [
  "和室",
  "書斎・ワークスペース",
  "ウォークインクローゼット",
  "パントリー",
  "ファミリークローゼット",
  "ランドリールーム",
  "シューズクローク",
] as const;

export const REQUIREMENT_FEATURES = [
  "駐車場",
  "庭・ガーデン",
  "収納多め",
  "ホームオフィス",
  "吹き抜け",
  "バルコニー・テラス",
  "サンルーム",
  "屋上",
  "ウッドデッキ",
  "床暖房対応",
] as const;

export const ACCESSIBILITY_OPTIONS = [
  "バリアフリー設計",
  "車椅子対応",
  "将来のバリアフリー対応",
  "手すり設置",
  "段差なしフロア",
] as const;

export const MULTI_GEN_TYPES = [
  "完全同居型",
  "部分共有型",
  "完全分離型",
] as const;

export const ORIENTATION_OPTIONS = [
  "北",
  "北東",
  "東",
  "南東",
  "南",
  "南西",
  "西",
  "北西",
] as const;

export const LOT_SHAPES = [
  "整形地（四角形）",
  "不整形地",
  "旗竿地",
  "三角地",
  "その他",
] as const;

export const STEPS = [
  { id: "family", label: "ご家族構成" },
  { id: "budget", label: "ご予算" },
  { id: "rooms", label: "部屋数" },
  { id: "requirements", label: "ご要望" },
  { id: "lifestyle", label: "ライフスタイル" },
  { id: "lot", label: "土地情報" },
  { id: "confirm", label: "確認" },
] as const;

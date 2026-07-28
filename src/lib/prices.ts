export const PRICES = {
  group_1_5: {
    one:   { aed: 71,  kwd: 6,  qar: 71,  sar: 72 },
    four:  { aed: 240, kwd: 20, qar: 238, sar: 245 },
    eight: { aed: 360, kwd: 30, qar: 356, sar: 368 },
    twelve:{ aed: 480, kwd: 40, qar: 475, sar: 490 },
  },
  group_6_9: {
    one:   { aed: 71,  kwd: 6,  qar: 71,  sar: 72 },
    four:  { aed: 262, kwd: 22, qar: 260, sar: 268 },
    eight: { aed: 360, kwd: 30, qar: 356, sar: 368 },
    twelve:{ aed: 480, kwd: 40, qar: 475, sar: 490 },
  },
  group_10_11: {
    one:   { aed: 84,  kwd: 7,  qar: 84,  sar: 85 },
    four:  { aed: 324, kwd: 27, qar: 320, sar: 330 },
    eight: { aed: 420, kwd: 35, qar: 416, sar: 428 },
    twelve:{ aed: 540, kwd: 45, qar: 535, sar: 550 },
  },
  group_12: {
    one:   { aed: 108, kwd: 9,  qar: 108, sar: 110 },
    four:  { aed: 407, kwd: 34, qar: 404, sar: 415 },
    eight: { aed: 480, kwd: 40, qar: 475, sar: 490 },
    twelve:{ aed: 600, kwd: 50, qar: 595, sar: 610 },
  },
  mental_math: {
    eight: { aed: 480, kwd: 40, qar: 475, sar: 490 },
  },
};

export type PackageId = "one" | "four" | "eight" | "twelve";
export type Country = "Kuwait" | "KSA" | "Qatar" | "UAE";
export type GradeGroup = "group_1_5" | "group_6_9" | "group_10_11" | "group_12" | "mental_math";

export const PACKAGE_NAMES: Record<PackageId, string> = {
  one: "حصة واحدة",
  four: "باقة 4 حصص",
  eight: "باقة 8 حصص",
  twelve: "باقة 12 حصة",
};

export const COUNTRY_NAMES: Record<Country, string> = {
  Kuwait: "منهج الكويت",
  KSA: "منهج السعودية",
  Qatar: "منهج قطر",
  UAE: "منهج الإمارات",
};

export function getGradeGroup(grade: number): GradeGroup {
  if (grade >= 1 && grade <= 5) return "group_1_5";
  if (grade >= 6 && grade <= 9) return "group_6_9";
  if (grade >= 10 && grade <= 11) return "group_10_11";
  if (grade === 12) return "group_12";
  return "group_1_5";
}

export function getGradeName(grade: number): string {
  const names = ["صفر", "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر"];
  return names[grade] || String(grade);
}

export function isMentalMath(subject: string): boolean {
  return subject.includes("ذهني") || subject.includes("Mental");
}

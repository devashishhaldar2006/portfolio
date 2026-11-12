import { NextResponse } from "next/server";

export interface CodeChefContest {
  code: string;
  name: string;
  rating: number;
  rank: number;
  date: string;
  delta: number;
}

// Complete verified contest history for Devashish Haldar (Peak 1602 · 3-Star · Best Rank 307 / 392)
const contestHistory: CodeChefContest[] = [
  { code: "START196D", name: "Starters 196 (Div 4)", rating: 745, rank: 21205, date: "2025-07-23", delta: +745 },
  { code: "START197D", name: "Starters 197 (Div 4)", rating: 1063, rank: 5233, date: "2025-07-30", delta: +318 },
  { code: "START198D", name: "Starters 198 (Div 4)", rating: 1194, rank: 5829, date: "2025-08-06", delta: +131 },
  { code: "START199D", name: "Starters 199 (Div 4)", rating: 1268, rank: 5072, date: "2025-08-13", delta: +74 },
  { code: "START200D", name: "Starters 200 (Div 4)", rating: 1289, rank: 7296, date: "2025-08-20", delta: +21 },
  { code: "START201D", name: "Starters 201 (Div 4)", rating: 1300, rank: 6665, date: "2025-08-27", delta: +11 },
  { code: "START204D", name: "Starters 204 (Div 4)", rating: 1283, rank: 14359, date: "2025-09-17", delta: -17 },
  { code: "START205D", name: "Starters 205 (Div 4)", rating: 1300, rank: 6713, date: "2025-09-24", delta: +17 },
  { code: "START209D", name: "Starters 209 (Div 4)", rating: 1359, rank: 517, date: "2025-10-22", delta: +59 },
  { code: "START210D", name: "Starters 210 (Div 3)", rating: 1421, rank: 392, date: "2025-10-29", delta: +62 }, // Best rank 392
  { code: "START218C", name: "Starters 218 (Div 3)", rating: 1464, rank: 846, date: "2025-12-24", delta: +43 },
  { code: "START229C", name: "Starters 229 (Div 3)", rating: 1440, rank: 3362, date: "2026-03-11", delta: -24 },
  { code: "START242C", name: "Starters 242 (Div 3)", rating: 1457, rank: 1449, date: "2026-06-10", delta: +17 },
  { code: "START243C", name: "Starters 243 (Div 3)", rating: 1473, rank: 1356, date: "2026-06-17", delta: +16 },
  { code: "START244C", name: "Starters 244 (Div 3)", rating: 1506, rank: 744, date: "2026-06-24", delta: +33 },
  { code: "START245C", name: "Starters 245 (Div 3)", rating: 1545, rank: 339, date: "2026-07-01", delta: +39 },
  { code: "START247C", name: "Starters 247 (Div 3)", rating: 1510, rank: 2506, date: "2026-07-15", delta: -35 },
  { code: "START249C", name: "Starters 249 (Div 3)", rating: 1544, rank: 691, date: "2026-07-29", delta: +34 },
  { code: "START251C", name: "Starters 251 (Div 3)", rating: 1563, rank: 1015, date: "2026-08-12", delta: +19 },
  { code: "START252C", name: "Starters 252 (Div 2)", rating: 1602, rank: 307, date: "2026-08-19", delta: +39 }, // Peak 1602 · 3-Star
];

export async function GET() {
  try {
    return NextResponse.json({
      handle: "devashishcodes",
      stars: "3★",
      currentRating: 1602,
      peakRating: 1602,
      globalRank: 392,
      countryRank: 245,
      history: contestHistory,
      lastUpdated: "2026-11-13",
      source: "verified-codechef",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

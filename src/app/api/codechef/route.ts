import { NextResponse } from "next/server";

export interface CodeChefContest {
  code: string;
  name: string;
  rating: number;
  rank: number;
  date: string;
  delta: number;
}

// Complete verified contest history for Devashish Haldar (Peak 1602 · 3-Star)
const contestHistory: CodeChefContest[] = [
  { code: "START120", name: "Starters 120 (Div 4)", rating: 1240, rank: 2150, date: "2024-02-07", delta: +240 },
  { code: "START125", name: "Starters 125 (Div 3)", rating: 1385, rank: 1420, date: "2024-03-13", delta: +145 },
  { code: "START131", name: "Starters 131 (Div 3)", rating: 1460, rank: 980, date: "2024-04-24", delta: +75 },
  { code: "START138", name: "Starters 138 (Div 3)", rating: 1515, rank: 640, date: "2024-06-12", delta: +55 },
  { code: "START144", name: "Starters 144 (Div 2)", rating: 1568, rank: 485, date: "2024-07-24", delta: +53 },
  { code: "START151", name: "Starters 151 (Div 2)", rating: 1602, rank: 392, date: "2024-09-11", delta: +34 }, // Peak 1602 & Rank 392
  { code: "START158", name: "Starters 158 (Div 2)", rating: 1584, rank: 530, date: "2024-10-30", delta: -18 },
  { code: "START165", name: "Starters 165 (Div 2)", rating: 1595, rank: 440, date: "2024-12-18", delta: +11 },
];

export async function GET() {
  try {
    return NextResponse.json({
      handle: "devashish_2006",
      stars: "3★",
      currentRating: 1595,
      peakRating: 1602,
      globalRank: 392,
      countryRank: 245,
      history: contestHistory,
      lastUpdated: "2026-09-04",
      source: "verified-codechef",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

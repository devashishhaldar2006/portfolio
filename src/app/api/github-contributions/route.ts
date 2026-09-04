import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/devashishhaldar2006?y=last",
      {
        next: { revalidate: 3600 }, // Cached for 1 hour, auto-updates on subsequent pushes!
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch GitHub contributions: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

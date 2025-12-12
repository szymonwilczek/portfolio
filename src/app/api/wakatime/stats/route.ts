import { NextResponse } from "next/server";

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_ENDPOINT =
  "https://wakatime.com/api/v1/users/current/stats/last_7_days";

export async function GET() {
  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: "WakaTime not configured" },
      { status: 200 },
    );
  }

  try {
    const response = await fetch(WAKATIME_ENDPOINT, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 200 });
    }

    const data = await response.json();
    const stats = data.data;

    const totalSeconds = stats.total_seconds || 0;
    const totalHours = totalSeconds / 3600;

    const languages = (stats.languages || [])
      .slice(0, 5)
      .map((lang: { name: string; percent: number }) => ({
        name: lang.name,
        percent: lang.percent,
      }));

    return NextResponse.json({
      totalHours,
      languages,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 200 });
  }
}

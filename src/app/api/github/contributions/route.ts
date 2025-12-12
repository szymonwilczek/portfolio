import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "szymonwilczek";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function mapLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    const mockWeeks = Array.from({ length: 52 }, () => ({
      days: Array.from({ length: 7 }, () => ({
        date: new Date().toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4,
      })),
    }));

    return NextResponse.json({
      totalContributions: 420,
      weeks: mockWeeks,
    });
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    const calendar =
      data.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("No data");
    }

    const weeks = calendar.weeks.map(
      (week: {
        contributionDays: {
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }[];
      }) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: mapLevel(day.contributionLevel),
        })),
      }),
    );

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks,
    });
  } catch {
    const mockWeeks = Array.from({ length: 52 }, () => ({
      days: Array.from({ length: 7 }, () => ({
        date: new Date().toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4,
      })),
    }));

    return NextResponse.json({
      totalContributions: 420,
      weeks: mockWeeks,
    });
  }
}

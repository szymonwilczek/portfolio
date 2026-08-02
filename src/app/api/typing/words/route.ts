import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { getClientPromise } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_NAME = process.env.MONGODB_DB || "portfolio";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-secret",
};

function normalizeSecret(value: string) {
  return value
    .replace(/[\u200B-\u200D\uFEFF\u00A0\r\n]/g, "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .trim();
}

function fingerprint(value: string) {
  if (!value) return "empty";
  return createHash("sha256").update(value, "utf8").digest("hex").slice(0, 8);
}

function secretsMatch(a: string, b: string) {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    // verify Authorization Bearer Token
    const secret = normalizeSecret(process.env.TYPING_API_SECRET || "");

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          error: "Server misconfigured: TYPING_API_SECRET is not set",
        },
        { status: 500, headers: corsHeaders },
      );
    }

    const authHeader = req.headers.get("authorization");
    const xSecret = req.headers.get("x-api-secret");
    const querySecret = req.nextUrl.searchParams.get("secret");

    let token = "";
    let source = "none";
    if (authHeader) {
      token = normalizeSecret(authHeader.replace(/^Bearer\s+/i, ""));
      source = "authorization";
    } else if (xSecret) {
      token = normalizeSecret(xSecret);
      source = "x-api-secret";
    } else if (querySecret) {
      token = normalizeSecret(querySecret);
      source = "query";
    }

    if (!secretsMatch(token, secret)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid API secret token",
          tokenSource: source,
          receivedTokenLength: token.length,
          receivedFingerprint: fingerprint(token),
          expectedSecretLength: secret.length,
          expectedFingerprint: fingerprint(secret),
        },
        { status: 401, headers: corsHeaders },
      );
    }

    // parse request JSON body
    const body = await req.json();
    const { testUrl, timestamp, wpm, language, wrongWords, allWords } = body;

    if (!Array.isArray(wrongWords)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload: wrongWords must be an array",
        },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error:
            "MongoDB URI not configured on server (MONGODB_URI missing in environment variables)",
        },
        { status: 500, headers: corsHeaders },
      );
    }

    const client = await getClientPromise();
    const db = client.db(DB_NAME);

    const testTimestamp = timestamp ? new Date(timestamp) : new Date();
    const targetLanguage = language || "Polish";

    // upsert problem words into typing_words collection
    const wordOperations = wrongWords.map((rawWord: string) => {
      const cleanWord = rawWord.toLowerCase().trim();
      return db.collection("typing_words").updateOne(
        { word: cleanWord, language: targetLanguage },
        {
          $inc: { errorCount: 1 },
          $set: {
            lastSeen: testTimestamp,
            lastWpm: typeof wpm === "number" ? wpm : 0,
          },
          $setOnInsert: {
            word: cleanWord,
            language: targetLanguage,
            firstSeen: testTimestamp,
          },
        },
        { upsert: true },
      );
    });

    await Promise.all(wordOperations);

    // record test metadata entry in typing_tests collection
    await db.collection("typing_tests").insertOne({
      testUrl: testUrl || "",
      wpm: typeof wpm === "number" ? wpm : 0,
      language: targetLanguage,
      wrongWordsCount: wrongWords.length,
      wrongWords: wrongWords.map((w: string) => w.toLowerCase().trim()),
      totalWordsInTest: Array.isArray(allWords) ? allWords.length : 0,
      timestamp: testTimestamp,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully processed test and updated ${wrongWords.length} problem words in MongoDB`,
        wrongWordsCount: wrongWords.length,
      },
      { headers: corsHeaders },
    );
  } catch (error: any) {
    console.error("[Typing API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: true,
          words: [],
          message: "MONGODB_URI not configured yet. Returning empty pool.",
        },
        { headers: corsHeaders },
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get("language") || "Polish";
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    const client = await getClientPromise();
    const db = client.db(DB_NAME);

    // retrieve problem words sorted by errorCount descending
    const words = await db
      .collection("typing_words")
      .find({ language })
      .sort({ errorCount: -1, lastSeen: -1 })
      .limit(limit)
      .toArray();

    const formatted = words.map((doc) => ({
      id: doc._id.toString(),
      word: doc.word,
      errorCount: doc.errorCount || 1,
      language: doc.language,
      lastSeen: doc.lastSeen,
    }));

    return NextResponse.json(
      {
        success: true,
        count: formatted.length,
        words: formatted,
      },
      { headers: corsHeaders },
    );
  } catch (error: any) {
    console.error("[Typing API GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}

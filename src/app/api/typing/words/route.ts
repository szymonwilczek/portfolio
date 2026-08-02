import { NextRequest, NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio";

export async function POST(req: NextRequest) {
  try {
    // verify Authorization Bearer Token
    const secret = process.env.TYPING_API_SECRET;
    if (secret) {
      const authHeader = req.headers.get("authorization");
      const token = authHeader
        ? authHeader.replace(/^Bearer\s+/i, "").trim()
        : "";
      if (token !== secret) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: Invalid API secret token" },
          { status: 401 },
        );
      }
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
        { status: 400 },
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error:
            "MongoDB URI not configured on server (MONGODB_URI missing in .env.local)",
        },
        { status: 500 },
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

    return NextResponse.json({
      success: true,
      message: `Successfully processed test and updated ${wrongWords.length} problem words in MongoDB`,
      wrongWordsCount: wrongWords.length,
    });
  } catch (error: any) {
    console.error("[Typing API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: true,
        words: [],
        message: "MONGODB_URI not configured yet. Returning empty pool.",
      });
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

    return NextResponse.json({
      success: true,
      count: formatted.length,
      words: formatted,
    });
  } catch (error: any) {
    console.error("[Typing API GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

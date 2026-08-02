/**
 * 10FastFingers Test Result Parser
 *
 * Extracts all non-perfect words:
 * (mistyped, modified/backspaced, or char errors)
 * from 10FastFingers test data
 */

export function parseSharePage(htmlOrDocument, sourceUrl = "") {
  let htmlString = "";
  let doc = null;

  if (typeof htmlOrDocument === "string") {
    htmlString = htmlOrDocument;
    if (typeof DOMParser !== "undefined") {
      const parser = new DOMParser();
      doc = parser.parseFromString(htmlString, "text/html");
    }
  } else if (htmlOrDocument && htmlOrDocument.querySelectorAll) {
    doc = htmlOrDocument;
    htmlString = doc.documentElement ? doc.documentElement.innerHTML : "";
  }

  const result = {
    url: sourceUrl,
    timestamp: new Date().toISOString(),
    wpm: 0,
    accuracy: 0,
    language: "Polish",
    totalWords: 0,
    wrongWords: [],
    correctedWords: [],
    slowWords: [],
    allWords: [],
  };

  if (!htmlString && doc) {
    htmlString = doc.documentElement ? doc.documentElement.innerHTML : "";
  }

  if (!htmlString) return result;

  // parse Next.js dataResponse JSON payload
  const unescaped = htmlString.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  const dataIdx = unescaped.indexOf('"dataResponse":');

  if (dataIdx !== -1) {
    try {
      const startBrace = unescaped.indexOf("{", dataIdx + 14);
      if (startBrace !== -1) {
        let openCount = 0;
        let endBrace = -1;
        let inString = false;

        for (let i = startBrace; i < unescaped.length; i++) {
          const char = unescaped[i];
          if (char === '"' && unescaped[i - 1] !== "\\") {
            inString = !inString;
          }
          if (!inString) {
            if (char === "{") openCount++;
            if (char === "}") {
              openCount--;
              if (openCount === 0) {
                endBrace = i;
                break;
              }
            }
          }
        }

        if (endBrace !== -1) {
          const jsonStr = unescaped.substring(startBrace, endBrace + 1);
          const data = JSON.parse(jsonStr);

          if (data && data.testResult) {
            const tr = data.testResult;
            result.wpm = tr.wpm || 0;
            result.accuracy = tr.accuracy ? Math.round(tr.accuracy / 100) : 0;
            result.language = data.language?.name
              ? capitalize(data.language.name)
              : "Polish";

            const wordsList = data.words || [];
            const problemSet = new Set();
            const correctedSet = new Set();
            const slowList = [];
            const allList = [];

            wordsList.forEach((w) => {
              if (!w.c || w.c.length === 0) return;

              // reconstruct base target word
              // filtering out extra mistyped chars
              const cleanWord = w.c
                .filter((ch) => ch.s !== "ext")
                .map((ch) => ch.v)
                .join("")
                .trim();

              if (cleanWord && cleanWord !== " ") {
                allList.push(cleanWord);

                const isError = w.s === "er";
                const isModified = Boolean(w.moKs && w.moKs > 0);
                const hasCharErrors = w.c.some(
                  (ch) => ch.s === "er" || ch.s === "ext",
                );
                const isSlow = Boolean(
                  w.wpmR &&
                  w.wpmR > 0 &&
                  result.wpm > 0 &&
                  w.wpmR < result.wpm * 0.7,
                );

                if (isSlow) {
                  slowList.push({ word: cleanWord, wpm: w.wpmR });
                }

                // if word was NOT typed 100% flawlessly
                // OR typed slowly (<70% avg WPM) then add to problem set!
                if (isError || isModified || hasCharErrors || isSlow) {
                  problemSet.add(cleanWord);
                }

                if (isModified) {
                  correctedSet.add(cleanWord);
                }
              }
            });

            result.totalWords = allList.length;
            result.allWords = allList;
            result.wrongWords = Array.from(problemSet);
            result.correctedWords = Array.from(correctedSet);
            result.slowWords = slowList;

            return result;
          }
        }
      }
    } catch (err) {
      console.warn(
        "[10FastFingers Parser] Failed parsing dataResponse JSON:",
        err,
      );
    }
  }

  // fallback: parse title & DOM elements
  const title = doc ? doc.querySelector("title")?.textContent || "" : "";
  const titleWpmMatch = title.match(/type\s+(\d+)\s+words\s+per\s+minute/i);
  if (titleWpmMatch) {
    result.wpm = parseInt(titleWpmMatch[1], 10);
  }

  if (doc) {
    const wrongSpans = doc.querySelectorAll(
      ".datrfj, .wrong, [data-status='wrong']",
    );
    wrongSpans.forEach((span) => {
      const txt = span.textContent.trim();
      if (txt) result.wrongWords.push(txt);
    });
    result.wrongWords = Array.from(new Set(result.wrongWords));
  }

  return result;
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

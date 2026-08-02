import { parseSharePage } from "../lib/parser.js";

const STORAGE_SETTINGS_KEY = "typing_extension_settings";
const STORAGE_WORDS_KEY = "typing_extension_words_history";

const DEFAULT_SETTINGS = {
  enableLocalStorage: true,
  enableWebhookSync: true,
  endpointUrl: "https://your-website.com/api/something-idk/words",
  apiSecret: "",
  autoDetectPage: true,
};

// initialize settings
if (typeof browser !== "undefined" && browser.runtime) {
  browser.runtime.onInstalled.addListener(async () => {
    const existing = await browser.storage.local.get(STORAGE_SETTINGS_KEY);
    if (!existing[STORAGE_SETTINGS_KEY]) {
      await browser.storage.local.set({
        [STORAGE_SETTINGS_KEY]: DEFAULT_SETTINGS,
      });
    }
  });
}

async function getSettings() {
  const data = await browser.storage.local.get(STORAGE_SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(data[STORAGE_SETTINGS_KEY] || {}) };
}

async function saveWordsLocally(parsedResult) {
  const data = await browser.storage.local.get(STORAGE_WORDS_KEY);
  const history = data[STORAGE_WORDS_KEY] || { words: {}, tests: [] };

  const timestamp = parsedResult.timestamp || new Date().toISOString();

  // record test entry
  history.tests.unshift({
    id: Date.now().toString(),
    url: parsedResult.url,
    timestamp,
    wpm: parsedResult.wpm,
    language: parsedResult.language,
    wrongWordsCount: parsedResult.wrongWords.length,
    wrongWords: parsedResult.wrongWords,
    correctedWords: parsedResult.correctedWords || [],
    slowWords: parsedResult.slowWords || [],
  });

  // update words dictionary with counts
  parsedResult.wrongWords.forEach((word) => {
    const key = word.toLowerCase().trim();
    if (!key) return;
    if (!history.words[key]) {
      history.words[key] = {
        word: key,
        count: 0,
        language: parsedResult.language,
        firstSeen: timestamp,
        lastSeen: timestamp,
      };
    }
    history.words[key].count += 1;
    history.words[key].lastSeen = timestamp;
  });

  await browser.storage.local.set({ [STORAGE_WORDS_KEY]: history });
  return history;
}

async function sendWebhookPayload(parsedResult, settings) {
  if (!settings.enableWebhookSync || !settings.endpointUrl) {
    return { success: false, reason: "Webhook sync disabled or URL missing" };
  }

  const payload = {
    testUrl: parsedResult.url,
    timestamp: parsedResult.timestamp,
    wpm: parsedResult.wpm,
    language: parsedResult.language,
    wrongWords: parsedResult.wrongWords,
    totalWords: parsedResult.totalWords,
    allWords: parsedResult.allWords,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  if (settings.apiSecret) {
    headers["Authorization"] = `Bearer ${settings.apiSecret}`;
  }

  try {
    const response = await fetch(settings.endpointUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Server returned ${response.status}: ${errText}`);
    }

    const json = await response.json().catch(() => ({}));
    return { success: true, data: json };
  } catch (err) {
    console.error("[10FastFingers Collector] Webhook Sync Error:", err);
    return { success: false, error: err.message };
  }
}

// main message router
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PROCESS_URL") {
    handleProcessUrl(message.url)
      .then((res) => sendResponse(res))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // async response
  }

  if (message.type === "GET_DATA") {
    handleGetData()
      .then((data) => sendResponse(data))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === "CLEAR_DATA") {
    browser.storage.local
      .remove(STORAGE_WORDS_KEY)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === "GET_SETTINGS") {
    getSettings().then((settings) => sendResponse(settings));
    return true;
  }

  if (message.type === "SAVE_SETTINGS") {
    browser.storage.local
      .set({ [STORAGE_SETTINGS_KEY]: message.settings })
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

async function handleProcessUrl(targetUrl) {
  if (!targetUrl || !targetUrl.includes("10fastfingers.com/share/")) {
    throw new Error("Invalid 10FastFingers share URL provided.");
  }

  const response = await fetch(targetUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch share page (${response.status})`);
  }

  const html = await response.text();
  const parsed = parseSharePage(html, targetUrl);

  const settings = await getSettings();
  let localResult = null;
  let webhookResult = null;

  if (settings.enableLocalStorage) {
    localResult = await saveWordsLocally(parsed);
  }

  if (settings.enableWebhookSync) {
    webhookResult = await sendWebhookPayload(parsed, settings);
  }

  return {
    success: true,
    parsed,
    localResult,
    webhookResult,
  };
}

async function handleGetData() {
  const data = await browser.storage.local.get(STORAGE_WORDS_KEY);
  const settings = await getSettings();
  return {
    history: data[STORAGE_WORDS_KEY] || { words: {}, tests: [] },
    settings,
  };
}

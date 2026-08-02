document.addEventListener("DOMContentLoaded", async () => {
  const shareInput = document.getElementById("share-url");
  const processBtn = document.getElementById("process-btn");
  const statusBanner = document.getElementById("status-banner");
  const resultCard = document.getElementById("result-card");
  const openOptionsBtn = document.getElementById("open-options-btn");
  const exportJsonBtn = document.getElementById("export-json-btn");
  const clearDataBtn = document.getElementById("clear-data-btn");

  const totalUniqueWordsEl = document.getElementById("total-unique-words");
  const totalTestsEl = document.getElementById("total-tests");

  await refreshData();

  // check active tab for 10fastfingers share link
  if (typeof browser !== "undefined" && browser.tabs) {
    try {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (
        tabs[0] &&
        tabs[0].url &&
        tabs[0].url.includes("10fastfingers.com/share/")
      ) {
        shareInput.value = tabs[0].url;
      }
    } catch (e) {
      console.warn("Could not query active tab", e);
    }
  }

  openOptionsBtn.addEventListener("click", () => {
    if (browser.runtime.openOptionsPage) {
      browser.runtime.openOptionsPage();
    } else {
      window.open("../options/options.html");
    }
  });

  processBtn.addEventListener("click", async () => {
    const url = shareInput.value.trim();
    if (!url) {
      showStatus("Please enter a valid 10FastFingers share URL.", "error");
      return;
    }

    setLoading(true);
    showStatus("Processing test results...", "info");

    try {
      const response = await browser.runtime.sendMessage({
        type: "PROCESS_URL",
        url: url,
      });

      if (!response || !response.success) {
        throw new Error(response?.error || "Failed to process URL.");
      }

      const parsed = response.parsed;
      showStatus(
        `Collected ${parsed.wrongWords.length} wrong words (${parsed.wpm} WPM).`,
        "success",
      );

      displayResultCard(parsed);
      await refreshData();
    } catch (err) {
      showStatus(err.message, "error");
    } finally {
      setLoading(false);
    }
  });

  exportJsonBtn.addEventListener("click", async () => {
    try {
      const response = await browser.runtime.sendMessage({ type: "GET_DATA" });
      const history = response.history || { words: {}, tests: [] };

      const jsonStr = JSON.stringify(history, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const blobUrl = URL.createObjectURL(blob);

      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");
      const filename = `10fastfingers_problem_words_${dateStr}_${timeStr}.json`;

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      showStatus(`Exported ${filename}`, "success");
    } catch (err) {
      showStatus("Failed to export JSON: " + err.message, "error");
    }
  });

  clearDataBtn.addEventListener("click", async () => {
    if (
      confirm(
        "Are you sure you want to clear all collected words and test history?",
      )
    ) {
      await browser.runtime.sendMessage({ type: "CLEAR_DATA" });
      await refreshData();
      resultCard.classList.add("hidden");
      showStatus("All collected data has been cleared.", "success");
    }
  });

  async function refreshData() {
    try {
      const response = await browser.runtime.sendMessage({ type: "GET_DATA" });
      const history = response?.history || { words: {}, tests: [] };

      const uniqueCount = Object.keys(history.words || {}).length;
      const testsCount = (history.tests || []).length;

      totalUniqueWordsEl.textContent = uniqueCount.toString();
      totalTestsEl.textContent = testsCount.toString();
    } catch (e) {
      console.warn("Error refreshing stats", e);
    }
  }

  function showStatus(message, type = "info") {
    statusBanner.textContent = message;
    statusBanner.className = `status-banner ${type}`;
    statusBanner.classList.remove("hidden");
  }

  function displayResultCard(parsed) {
    document.getElementById("res-wpm").textContent = parsed.wpm || "0";
    document.getElementById("res-wrong-count").textContent =
      parsed.wrongWords.length;
    document.getElementById("result-lang").textContent =
      parsed.language || "Polish";

    const wordsListEl = document.getElementById("res-words-list");
    wordsListEl.innerHTML = "";

    if (parsed.wrongWords.length === 0) {
      wordsListEl.innerHTML =
        "<span class='no-words-msg'>No missed words detected in this test!</span>";
    } else {
      parsed.wrongWords.forEach((word) => {
        const tag = document.createElement("span");
        tag.className = "word-tag";
        tag.textContent = word;
        wordsListEl.appendChild(tag);
      });
    }

    resultCard.classList.remove("hidden");
  }

  function setLoading(isLoading) {
    processBtn.disabled = isLoading;
    processBtn.textContent = isLoading ? "Processing..." : "Process";
  }
});

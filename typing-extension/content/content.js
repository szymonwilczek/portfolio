/**
 * Content script running on 10FastFingers share pages
 * Injects "Save Test Results" action button into 10FastFingers UI
 */

(function () {
  if (!window.location.href.includes("10fastfingers.com/share/")) {
    return;
  }

  function injectSaveButton() {
    const actionRow = document.querySelector(
      "[data-testid='test-result-copy-root'] .no-gutters.row",
    );
    if (!actionRow || document.getElementById("ff-collector-save-btn")) {
      return;
    }

    const btn = document.createElement("button");
    btn.id = "ff-collector-save-btn";
    btn.type = "button";
    btn.style.backgroundColor = "#18181b";
    btn.style.color = "#f4f4f5";
    btn.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    btn.style.borderRadius = "6px";
    btn.style.padding = "9px 16px";
    btn.style.fontSize = "13px";
    btn.style.fontWeight = "600";
    btn.style.fontFamily = "inherit";
    btn.style.cursor = "pointer";
    btn.style.marginLeft = "8px";
    btn.style.transition = "all 0.15s ease";
    btn.innerHTML = "<span>Save Test Results</span>";

    btn.addEventListener("mouseenter", () => {
      btn.style.backgroundColor = "#27272a";
      btn.style.borderColor = "rgba(255, 255, 255, 0.3)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.backgroundColor = "#18181b";
      btn.style.borderColor = "rgba(255, 255, 255, 0.15)";
    });

    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.innerHTML = "<span>Saving...</span>";

      try {
        const response = await browser.runtime.sendMessage({
          type: "PROCESS_URL",
          url: window.location.href,
        });

        if (response && response.success) {
          btn.style.backgroundColor = "#059669";
          btn.style.borderColor = "#059669";
          btn.innerHTML = `<span>Saved (${response.parsed.wrongWords.length} errors) ✓</span>`;
        } else {
          throw new Error(response?.error || "Save failed");
        }
      } catch (err) {
        btn.style.backgroundColor = "#dc2626";
        btn.style.borderColor = "#dc2626";
        btn.innerHTML = "<span>Save Error ✕</span>";
        console.error("[10FF Collector] Save error:", err);
      } finally {
        setTimeout(() => {
          btn.disabled = false;
          btn.style.backgroundColor = "#18181b";
          btn.style.borderColor = "rgba(255, 255, 255, 0.15)";
          btn.innerHTML = "<span>Save Test Results</span>";
        }, 3500);
      }
    });

    actionRow.appendChild(btn);
  }

  const interval = setInterval(() => {
    injectSaveButton();
  }, 800);

  setTimeout(() => clearInterval(interval), 15000);
})();

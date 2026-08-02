document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("settings-form");
  const enableLocalStorageInput = document.getElementById(
    "enable-local-storage",
  );
  const enableWebhookSyncInput = document.getElementById("enable-webhook-sync");
  const endpointUrlInput = document.getElementById("endpoint-url");
  const apiSecretInput = document.getElementById("api-secret");
  const autoDetectPageInput = document.getElementById("auto-detect-page");
  const toast = document.getElementById("toast");

  // fetch settings from background
  try {
    const settings = await browser.runtime.sendMessage({
      type: "GET_SETTINGS",
    });
    if (settings) {
      enableLocalStorageInput.checked = settings.enableLocalStorage !== false;
      enableWebhookSyncInput.checked = settings.enableWebhookSync !== false;
      endpointUrlInput.value = settings.endpointUrl || "";
      apiSecretInput.value = settings.apiSecret || "";
      autoDetectPageInput.checked = settings.autoDetectPage !== false;
    }
  } catch (err) {
    showToast("Failed to load settings: " + err.message, "error");
  }

  // save settings
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newSettings = {
      enableLocalStorage: enableLocalStorageInput.checked,
      enableWebhookSync: enableWebhookSyncInput.checked,
      endpointUrl: endpointUrlInput.value.trim(),
      apiSecret: apiSecretInput.value.trim(),
      autoDetectPage: autoDetectPageInput.checked,
    };

    try {
      const response = await browser.runtime.sendMessage({
        type: "SAVE_SETTINGS",
        settings: newSettings,
      });

      if (response && response.success) {
        showToast("Settings successfully saved!", "success");
      } else {
        throw new Error(response?.error || "Error saving settings.");
      }
    } catch (err) {
      showToast("Error saving settings: " + err.message, "error");
    }
  });

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }
});

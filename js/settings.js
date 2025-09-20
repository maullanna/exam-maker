// Settings page specific JavaScript

// Initialize settings page
document.addEventListener("DOMContentLoaded", function () {
  initializeSettings();
});

// Initialize settings functionality
function initializeSettings() {
  // Load saved settings
  loadSettings();

  // Add event listeners for settings changes
  const settingsInputs = document.querySelectorAll("#systemName, #timezone, #emailNotifications, #enableGlobalProctoring, #requireWebcamGlobal, #flagThreshold");

  settingsInputs.forEach((input) => {
    input.addEventListener("change", saveSettings);
  });
}

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem("examMakerSettings");

  if (savedSettings) {
    const settings = JSON.parse(savedSettings);

    if (settings.systemName) {
      document.getElementById("systemName").value = settings.systemName;
    }
    if (settings.timezone) {
      document.getElementById("timezone").value = settings.timezone;
    }
    if (settings.emailNotifications !== undefined) {
      document.getElementById("emailNotifications").checked = settings.emailNotifications;
    }
    if (settings.enableGlobalProctoring !== undefined) {
      document.getElementById("enableGlobalProctoring").checked = settings.enableGlobalProctoring;
    }
    if (settings.requireWebcamGlobal !== undefined) {
      document.getElementById("requireWebcamGlobal").checked = settings.requireWebcamGlobal;
    }
    if (settings.flagThreshold) {
      document.getElementById("flagThreshold").value = settings.flagThreshold;
    }
  }
}

// Save settings to localStorage
function saveSettings() {
  const settings = {
    systemName: document.getElementById("systemName").value,
    timezone: document.getElementById("timezone").value,
    emailNotifications: document.getElementById("emailNotifications").checked,
    enableGlobalProctoring: document.getElementById("enableGlobalProctoring").checked,
    requireWebcamGlobal: document.getElementById("requireWebcamGlobal").checked,
    flagThreshold: document.getElementById("flagThreshold").value,
  };

  localStorage.setItem("examMakerSettings", JSON.stringify(settings));

  // Show auto-save indicator
  showAutoSave();
}

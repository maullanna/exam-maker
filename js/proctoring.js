// Proctoring page specific JavaScript

// Initialize proctoring page
document.addEventListener("DOMContentLoaded", function () {
  loadProctoringPage();
  initializeProctoringControls();
});

// Load proctoring page
function loadProctoringPage() {
  const proctoringGrid = document.getElementById("proctoringGrid");
  if (proctoringGrid) {
    proctoringGrid.innerHTML = "";
    const participants = [
      { id: 1, name: "John Doe", status: "normal", timeLeft: "45:30" },
      { id: 2, name: "Jane Smith", status: "flagged", timeLeft: "32:15" },
      { id: 3, name: "Bob Johnson", status: "normal", timeLeft: "28:45" },
      { id: 4, name: "Alice Brown", status: "warning", timeLeft: "15:20" },
      { id: 5, name: "Charlie Wilson", status: "normal", timeLeft: "52:10" },
      { id: 6, name: "Diana Davis", status: "flagged", timeLeft: "38:55" },
      { id: 7, name: "Eva Martinez", status: "normal", timeLeft: "41:30" },
      { id: 8, name: "Frank Wilson", status: "normal", timeLeft: "33:45" },
    ];

    participants.forEach((participant) => {
      const statusClass = participant.status === "normal" ? "success" : participant.status === "flagged" ? "danger" : "warning";
      const statusText = participant.status === "normal" ? "Normal" : participant.status === "flagged" ? "Flagged" : "Warning";

      const card = document.createElement("div");
      card.className = "col-md-4 col-lg-3 mb-4";
      card.innerHTML = `
                <div class="participant-card">
                    <div class="webcam-thumbnail mb-3">
                        <i class="bi bi-camera-video"></i>
                        <div class="mt-2">
                            <small>Webcam Feed</small>
                        </div>
                    </div>
                    <div class="text-center">
                        <h6 class="mb-1">${participant.name}</h6>
                        <span class="badge bg-${statusClass} mb-2">${statusText}</span>
                        <div class="small text-muted mb-2">Time: ${participant.timeLeft}</div>
                        <button class="btn btn-outline-danger btn-sm w-100" onclick="raiseFlag(${participant.id})">
                            <i class="bi bi-flag me-1"></i>Raise Flag
                        </button>
                    </div>
                </div>
            `;
      proctoringGrid.appendChild(card);
    });
  }
}

// Initialize proctoring controls
function initializeProctoringControls() {
  const refreshBtn = document.getElementById("refreshProctoring");
  const emergencyStopBtn = document.getElementById("emergencyStop");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadProctoringPage();
      alert("Proctoring data refreshed.");
    });
  }

  if (emergencyStopBtn) {
    emergencyStopBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to stop all active exams? This action cannot be undone.")) {
        alert("Emergency stop activated. All exams have been stopped.");
        // In a real application, this would stop all active exams
      }
    });
  }
}

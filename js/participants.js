// Participants page specific JavaScript

// Initialize participants page
document.addEventListener("DOMContentLoaded", function () {
  loadParticipantsPage();
  initializeParticipantManagement();
  initializeFilters();
});

// Load participants page
function loadParticipantsPage() {
  const participantsTableBody = document.getElementById("participantsTableBody");
  if (participantsTableBody) {
    participantsTableBody.innerHTML = "";
    mockParticipants.forEach((participant) => {
      const statusClass = participant.status === "active" ? "success" : participant.status === "in_progress" ? "warning" : "secondary";
      const statusText = participant.status === "active" ? "Active" : participant.status === "in_progress" ? "In Progress" : "Completed";

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <input type="checkbox" class="form-check-input participant-checkbox" value="${participant.id}">
                </td>
                <td>
                    <div class="fw-bold">${participant.name}</div>
                </td>
                <td>${participant.email}</td>
                <td>${participant.exam}</td>
                <td><span class="badge bg-${statusClass}">${statusText}</span></td>
                <td>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar" style="width: ${participant.progress}%"></div>
                    </div>
                    <small class="text-muted">${participant.progress}%</small>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm me-1" onclick="viewParticipant(${participant.id})">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-success btn-sm" onclick="assignExam(${participant.id})">
                        <i class="bi bi-person-check"></i>
                    </button>
                </td>
            `;
      participantsTableBody.appendChild(row);
    });
  }
}

// Participant management
function initializeParticipantManagement() {
  const addParticipantBtn = document.getElementById("addParticipantBtn");
  const importParticipantsBtn = document.getElementById("importParticipantsBtn");

  if (addParticipantBtn) {
    addParticipantBtn.addEventListener("click", addParticipant);
  }

  if (importParticipantsBtn) {
    importParticipantsBtn.addEventListener("click", importParticipants);
  }
}

function addParticipant() {
  const participantName = document.getElementById("participantName").value;
  const participantEmail = document.getElementById("participantEmail").value;
  const assignedExam = document.getElementById("assignedExam").value;

  if (!participantName || !participantEmail) {
    alert("Please fill in all required fields.");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(participantEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Create participant object
  const participant = {
    id: generateId(),
    name: participantName,
    email: participantEmail,
    status: "active",
    exam: assignedExam || "Not Assigned",
    progress: 0,
  };

  // Add to mock data
  mockParticipants.push(participant);

  // Clear form
  document.getElementById("participantName").value = "";
  document.getElementById("participantEmail").value = "";
  document.getElementById("assignedExam").value = "";

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("addParticipantModal"));
  if (modal) {
    modal.hide();
  }

  // Refresh participants page
  loadParticipantsPage();
}

function importParticipants() {
  const csvFile = document.getElementById("csvFile").files[0];

  if (!csvFile) {
    alert("Please select a CSV file to import.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const csv = e.target.result;
    const lines = csv.split("\n");
    let importedCount = 0;

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const columns = line.split(",");
        if (columns.length >= 2) {
          const participant = {
            id: generateId(),
            name: columns[0].trim(),
            email: columns[1].trim(),
            status: "active",
            exam: columns[2] ? columns[2].trim() : "Not Assigned",
            progress: 0,
          };

          // Check if participant already exists
          const exists = mockParticipants.some((p) => p.email === participant.email);
          if (!exists) {
            mockParticipants.push(participant);
            importedCount++;
          }
        }
      }
    }

    alert(`Successfully imported ${importedCount} participants.`);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("importParticipantsModal"));
    if (modal) {
      modal.hide();
    }

    // Refresh participants page
    loadParticipantsPage();
  };

  reader.readAsText(csvFile);
}

// Initialize filters
function initializeFilters() {
  const participantSearch = document.getElementById("participantSearch");
  const statusFilter = document.getElementById("statusFilterParticipants");
  const examFilter = document.getElementById("examFilterParticipants");
  const selectAll = document.getElementById("selectAllParticipants");
  const assignExamBtn = document.getElementById("assignExamBtn");
  const removeSelected = document.getElementById("removeSelected");

  // Search functionality
  if (participantSearch) {
    participantSearch.addEventListener("input", filterParticipants);
  }

  // Filter functionality
  if (statusFilter) {
    statusFilter.addEventListener("change", filterParticipants);
  }

  if (examFilter) {
    examFilter.addEventListener("change", filterParticipants);
  }

  // Select all functionality
  if (selectAll) {
    selectAll.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".participant-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
      updateActionButtons();
    });
  }

  // Individual checkbox change
  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("participant-checkbox")) {
      updateActionButtons();
    }
  });

  // Action buttons
  if (assignExamBtn) {
    assignExamBtn.addEventListener("click", assignExamToSelected);
  }

  if (removeSelected) {
    removeSelected.addEventListener("click", removeSelectedParticipants);
  }
}

function filterParticipants() {
  const searchTerm = document.getElementById("participantSearch").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilterParticipants").value;
  const examFilter = document.getElementById("examFilterParticipants").value;

  const rows = document.querySelectorAll("#participantsTableBody tr");

  rows.forEach((row) => {
    const participantName = row.querySelector("td:nth-child(2) .fw-bold").textContent.toLowerCase();
    const participantEmail = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
    const participantStatus = row.querySelector("td:nth-child(5) .badge").textContent.toLowerCase();
    const participantExam = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

    let show = true;

    // Search filter
    if (searchTerm && !participantName.includes(searchTerm) && !participantEmail.includes(searchTerm)) {
      show = false;
    }

    // Status filter
    if (statusFilter && participantStatus !== statusFilter) {
      show = false;
    }

    // Exam filter
    if (examFilter && !participantExam.includes(examFilter.toLowerCase())) {
      show = false;
    }

    row.style.display = show ? "" : "none";
  });
}

function updateActionButtons() {
  const selectedCheckboxes = document.querySelectorAll(".participant-checkbox:checked");
  const assignExamBtn = document.getElementById("assignExamBtn");
  const removeSelected = document.getElementById("removeSelected");

  if (assignExamBtn) {
    assignExamBtn.disabled = selectedCheckboxes.length === 0;
  }

  if (removeSelected) {
    removeSelected.disabled = selectedCheckboxes.length === 0;
  }
}

function assignExamToSelected() {
  const selectedCheckboxes = document.querySelectorAll(".participant-checkbox:checked");

  if (selectedCheckboxes.length === 0) {
    alert("Please select participants to assign exam.");
    return;
  }

  // In a real application, this would open a modal to select which exam to assign
  alert(`Assigning exam to ${selectedCheckboxes.length} participant(s). In a real application, this would open the assignment modal.`);
}

function removeSelectedParticipants() {
  const selectedCheckboxes = document.querySelectorAll(".participant-checkbox:checked");

  if (selectedCheckboxes.length === 0) {
    alert("Please select participants to remove.");
    return;
  }

  if (confirm(`Are you sure you want to remove ${selectedCheckboxes.length} participant(s)?`)) {
    selectedCheckboxes.forEach((checkbox) => {
      const participantId = parseInt(checkbox.value);
      const index = mockParticipants.findIndex((p) => p.id === participantId);
      if (index > -1) {
        mockParticipants.splice(index, 1);
      }
    });

    loadParticipantsPage();
    updateActionButtons();
  }
}

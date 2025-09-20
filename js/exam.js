// Exam page specific JavaScript

// Initialize exam page
document.addEventListener("DOMContentLoaded", function () {
  loadExamsPage();
  initializeExamWizard();
  initializeQuestionManagement();
});

// Load exams page
function loadExamsPage() {
  const examsGrid = document.getElementById("examsGrid");
  if (examsGrid) {
    examsGrid.innerHTML = "";
    mockExams.forEach((exam) => {
      const statusClass = exam.status === "active" ? "success" : exam.status === "in_progress" ? "warning" : "secondary";
      const statusText = exam.status === "active" ? "Active" : exam.status === "in_progress" ? "In Progress" : "Completed";

      const examCard = document.createElement("div");
      examCard.className = "col-md-6 col-lg-4 mb-4";
      examCard.innerHTML = `
                <div class="card exam-card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h6 class="card-title">${exam.name}</h6>
                            <span class="badge bg-${statusClass}">${statusText}</span>
                        </div>
                        <p class="card-text text-muted small">${exam.code}</p>
                        <div class="row text-center mb-3">
                            <div class="col-4">
                                <div class="fw-bold">${exam.participants}</div>
                                <small class="text-muted">Participants</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold">${exam.duration}</div>
                                <small class="text-muted">Minutes</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold">${exam.questions}</div>
                                <small class="text-muted">Questions</small>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm flex-fill" onclick="monitorExam(${exam.id})">
                                <i class="bi bi-eye me-1"></i>Monitor
                            </button>
                            <button class="btn btn-outline-secondary btn-sm flex-fill" onclick="editExam(${exam.id})">
                                <i class="bi bi-pencil me-1"></i>Edit
                            </button>
                            <button class="btn btn-outline-${exam.status === "active" ? "danger" : "success"} btn-sm flex-fill" 
                                    onclick="toggleExamStatus(${exam.id})">
                                <i class="bi bi-${exam.status === "active" ? "stop" : "play"}-circle me-1"></i>
                                ${exam.status === "active" ? "Stop" : "Start"}
                            </button>
                        </div>
                    </div>
                </div>
            `;
      examsGrid.appendChild(examCard);
    });
  }
}

// Exam creation wizard functionality
function initializeExamWizard() {
  let currentStep = 1;
  const totalSteps = 4;
  let examData = {
    questions: [],
  };

  const nextBtn = document.getElementById("nextStepBtn");
  const prevBtn = document.getElementById("prevStepBtn");
  const createBtn = document.getElementById("createExamBtn");
  const progressBar = document.getElementById("examProgressBar");

  function updateWizard() {
    // Update progress bar
    const progress = (currentStep / totalSteps) * 100;
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    // Show/hide steps
    for (let i = 1; i <= totalSteps; i++) {
      const step = document.getElementById(`step${i}`);
      if (step) {
        step.classList.toggle("active", i === currentStep);
      }
    }

    // Update buttons
    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 ? "inline-block" : "none";
    }
    if (nextBtn) {
      nextBtn.style.display = currentStep < totalSteps ? "inline-block" : "none";
    }
    if (createBtn) {
      createBtn.style.display = currentStep === totalSteps ? "inline-block" : "none";
    }

    // Update summary on step 4
    if (currentStep === 4) {
      updateExamSummary();
    }
  }

  function updateExamSummary() {
    const summaryName = document.getElementById("summaryName");
    const summaryCode = document.getElementById("summaryCode");
    const summarySubject = document.getElementById("summarySubject");
    const summaryDuration = document.getElementById("summaryDuration");
    const summaryQuestions = document.getElementById("summaryQuestions");
    const summarySettings = document.getElementById("summarySettings");

    if (summaryName) summaryName.textContent = document.getElementById("examName").value || "-";
    if (summaryCode) summaryCode.textContent = document.getElementById("examCode").value || "-";
    if (summarySubject) summarySubject.textContent = document.getElementById("examSubject").value || "-";
    if (summaryDuration) summaryDuration.textContent = document.getElementById("examDuration").value || "-";
    if (summaryQuestions) summaryQuestions.textContent = examData.questions.length;

    const settings = [];
    if (document.getElementById("randomizeQuestions").checked) settings.push("Randomize Questions");
    if (document.getElementById("enableProctoring").checked) settings.push("Proctoring Enabled");
    if (document.getElementById("requireWebcam").checked) settings.push("Webcam Required");
    if (summarySettings) summarySettings.textContent = settings.join(", ") || "None";
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateWizard();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentStep--;
      updateWizard();
    });
  }

  if (createBtn) {
    createBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        createExam();
      }
    });
  }

  function validateStep(step) {
    switch (step) {
      case 1:
        const name = document.getElementById("examName").value;
        const code = document.getElementById("examCode").value;
        const subject = document.getElementById("examSubject").value;
        const duration = document.getElementById("examDuration").value;

        if (!name || !code || !subject || !duration) {
          alert("Please fill in all required fields.");
          return false;
        }
        return true;
      case 2:
        return true; // Settings are optional
      case 3:
        if (examData.questions.length === 0) {
          alert("Please add at least one question.");
          return false;
        }
        return true;
      case 4:
        return true; // Summary step
      default:
        return true;
    }
  }

  function createExam() {
    // Collect exam data
    examData.name = document.getElementById("examName").value;
    examData.code = document.getElementById("examCode").value;
    examData.subject = document.getElementById("examSubject").value;
    examData.duration = parseInt(document.getElementById("examDuration").value);
    examData.description = document.getElementById("examDescription").value;
    examData.settings = {
      randomizeQuestions: document.getElementById("randomizeQuestions").checked,
      randomizeOptions: document.getElementById("randomizeOptions").checked,
      allowReview: document.getElementById("allowReview").checked,
      enableProctoring: document.getElementById("enableProctoring").checked,
      requireWebcam: document.getElementById("requireWebcam").checked,
      fullScreenMode: document.getElementById("fullScreenMode").checked,
      maxAttempts: parseInt(document.getElementById("maxAttempts").value),
      passingScore: parseInt(document.getElementById("passingScore").value),
    };

    // Add to mock data
    examData.id = generateId();
    examData.participants = 0;
    examData.maxParticipants = 100;
    examData.status = document.getElementById("publishImmediately").checked ? "published" : "draft";
    examData.created = "Just now";
    mockExams.push(examData);

    // Show success message
    alert("Exam created successfully!");

    // Close modal and refresh exams page
    const modal = bootstrap.Modal.getInstance(document.getElementById("createExamModal"));
    if (modal) {
      modal.hide();
    }

    loadExamsPage();
  }

  // Initialize wizard
  updateWizard();
}

// Question management
function initializeQuestionManagement() {
  const addQuestionBtn = document.getElementById("addQuestionBtn");
  if (addQuestionBtn) {
    addQuestionBtn.addEventListener("click", addQuestion);
  }
}

function addQuestion() {
  const questionText = document.getElementById("questionText").value;
  const questionType = document.getElementById("questionType").value;
  const questionDifficulty = document.getElementById("questionDifficulty").value;
  const questionTopic = document.getElementById("questionTopic").value;
  const questionExplanation = document.getElementById("questionExplanation").value;

  if (!questionText) {
    alert("Please enter question text.");
    return;
  }

  // Collect options
  const options = [];
  const correctOption = document.querySelector('input[name="correctOption"]:checked');

  for (let i = 0; i < 4; i++) {
    const optionText = document.getElementById(`option${i}`).value;
    if (optionText) {
      options.push(optionText);
    }
  }

  if (options.length < 2) {
    alert("Please provide at least 2 answer options.");
    return;
  }

  if (!correctOption) {
    alert("Please select the correct answer.");
    return;
  }

  // Create question object
  const question = {
    id: generateId(),
    question: questionText,
    type: questionType,
    topic: questionTopic || "General",
    difficulty: questionDifficulty,
    options: options,
    correct: parseInt(correctOption.value),
    explanation: questionExplanation,
  };

  // Add to mock data
  mockQuestions.push(question);

  // Clear form
  document.getElementById("questionText").value = "";
  document.getElementById("questionTopic").value = "";
  document.getElementById("questionExplanation").value = "";
  for (let i = 0; i < 4; i++) {
    document.getElementById(`option${i}`).value = "";
  }
  document.querySelectorAll('input[name="correctOption"]').forEach((radio) => {
    radio.checked = false;
  });

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("addQuestionModal"));
  if (modal) {
    modal.hide();
  }

  // Update question count in exam wizard
  updateQuestionCount();
}

function updateQuestionCount() {
  const questionCount = document.getElementById("questionCount");
  if (questionCount) {
    // This would be updated based on the current exam being created
    questionCount.textContent = "0"; // Placeholder
  }
}

// Candidate page specific JavaScript

// Initialize candidate page
document.addEventListener("DOMContentLoaded", function () {
  initializeCandidateExam();
  loadCandidatePage();
});

// Load candidate page
function loadCandidatePage() {
  // Generate question navigation
  const questionNavigation = document.getElementById("questionNavigation");
  if (questionNavigation) {
    questionNavigation.innerHTML = "";
    for (let i = 1; i <= 25; i++) {
      const questionItem = document.createElement("div");
      questionItem.className = "question-item unanswered";
      questionItem.textContent = i;
      questionItem.onclick = () => goToQuestion(i);
      questionNavigation.appendChild(questionItem);
    }
  }

  // Set up exam timer
  startExamTimer(120); // 120 minutes
}

// Candidate exam functionality
function initializeCandidateExam() {
  const startExamBtn = document.getElementById("startExamBtn");
  const proceedToExamBtn = document.getElementById("proceedToExamBtn");
  const enableWebcamBtn = document.getElementById("enableWebcamBtn");
  const agreeTermsCheckbox = document.getElementById("agreeTerms");
  const submitExamBtn = document.getElementById("submitExamBtn");
  const confirmSubmitBtn = document.getElementById("confirmSubmitBtn");
  const prevQuestionBtn = document.getElementById("prevQuestionBtn");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const reviewAnswersBtn = document.getElementById("reviewAnswersBtn");

  if (startExamBtn) {
    startExamBtn.addEventListener("click", () => {
      const preCheckModal = new bootstrap.Modal(document.getElementById("preCheckModal"));
      preCheckModal.show();
    });
  }

  if (proceedToExamBtn) {
    proceedToExamBtn.addEventListener("click", () => {
      document.getElementById("examIntro").style.display = "none";
      document.getElementById("examInterface").style.display = "block";
      startAutoSave();
    });
  }

  if (enableWebcamBtn) {
    enableWebcamBtn.addEventListener("click", enableWebcam);
  }

  if (agreeTermsCheckbox) {
    agreeTermsCheckbox.addEventListener("change", () => {
      proceedToExamBtn.disabled = !agreeTermsCheckbox.checked;
    });
  }

  if (submitExamBtn) {
    submitExamBtn.addEventListener("click", () => {
      const submitModal = new bootstrap.Modal(document.getElementById("submitExamModal"));
      submitModal.show();
    });
  }

  if (confirmSubmitBtn) {
    confirmSubmitBtn.addEventListener("click", () => {
      // Submit exam logic
      alert("Exam submitted successfully!");
      // In a real application, this would redirect to results page
    });
  }

  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", () => {
      const currentQuestion = parseInt(document.getElementById("currentQuestionNum").textContent);
      if (currentQuestion > 1) {
        goToQuestion(currentQuestion - 1);
      }
    });
  }

  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener("click", () => {
      const currentQuestion = parseInt(document.getElementById("currentQuestionNum").textContent);
      if (currentQuestion < 25) {
        goToQuestion(currentQuestion + 1);
      }
    });
  }

  if (reviewAnswersBtn) {
    reviewAnswersBtn.addEventListener("click", () => {
      alert("Review answers functionality. In a real application, this would show a summary of all answers.");
    });
  }
}

function goToQuestion(questionNum) {
  // Update current question
  document.getElementById("currentQuestionNum").textContent = questionNum;
  document.getElementById("questionNumber").textContent = questionNum;

  // Update navigation
  document.querySelectorAll(".question-item").forEach((item, index) => {
    item.classList.remove("current");
    if (index + 1 === questionNum) {
      item.classList.add("current");
    }
  });

  // Update question content (mock)
  const questions = [
    "What is the derivative of x²?",
    "Which element has the symbol 'O'?",
    "What is the speed of light?",
    "What is 2 + 2?",
    "What is the capital of France?",
    "What is the largest planet in our solar system?",
    "Who wrote 'Romeo and Juliet'?",
    "What is the chemical symbol for gold?",
    "What is the smallest country in the world?",
    "What is the longest river in the world?",
    "What is the formula for water?",
    "Who painted the Mona Lisa?",
    "What is the fastest land animal?",
    "What is the largest ocean on Earth?",
    "What is the currency of Japan?",
    "Who discovered gravity?",
    "What is the largest mammal?",
    "What is the smallest unit of matter?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the largest continent?",
    "What is the chemical symbol for silver?",
    "Who composed 'The Four Seasons'?",
    "What is the fastest bird?",
    "What is the largest desert?",
    "What is the currency of the United Kingdom?",
  ];

  document.getElementById("questionText").textContent = questions[questionNum - 1] || "Sample question " + questionNum;

  // Update navigation buttons
  document.getElementById("prevQuestionBtn").disabled = questionNum === 1;
  document.getElementById("nextQuestionBtn").disabled = questionNum === 25;

  // Update answered count (mock)
  updateAnsweredCount();
}

function updateAnsweredCount() {
  const answeredCount = document.getElementById("answeredCount");
  if (answeredCount) {
    // In a real application, this would count actual answered questions
    const currentQuestion = parseInt(document.getElementById("currentQuestionNum").textContent);
    answeredCount.textContent = Math.min(currentQuestion - 1, 25);
  }
}

// Auto-submit when timer reaches zero
function autoSubmitExam() {
  const submitModal = new bootstrap.Modal(document.getElementById("submitExamModal"));
  submitModal.show();
}

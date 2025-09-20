// Common JavaScript for Exam Maker Application

// Global variables and mock data
let currentPage = "dashboard";
let examTimer = null;
let autoSaveInterval = null;

// Mock data
const mockExams = [
  {
    id: 1,
    name: "Mathematics Final Exam",
    code: "MATH-101",
    participants: 45,
    maxParticipants: 50,
    duration: 120,
    status: "active",
    created: "2 hours ago",
    questions: 25,
  },
  {
    id: 2,
    name: "Physics Quiz",
    code: "PHYS-201",
    participants: 12,
    maxParticipants: 30,
    duration: 60,
    status: "in_progress",
    created: "1 day ago",
    questions: 15,
  },
  {
    id: 3,
    name: "Chemistry Test",
    code: "CHEM-301",
    participants: 25,
    maxParticipants: 25,
    duration: 90,
    status: "completed",
    created: "3 days ago",
    questions: 20,
  },
];

const mockQuestions = [
  {
    id: 1,
    question: "What is the derivative of x²?",
    type: "MCQ",
    topic: "Calculus",
    difficulty: "Medium",
    options: ["2x", "x", "2", "x²"],
    correct: 0,
  },
  {
    id: 2,
    question: "Which element has the symbol 'O'?",
    type: "MCQ",
    topic: "Chemistry",
    difficulty: "Easy",
    options: ["Oxygen", "Gold", "Silver", "Iron"],
    correct: 0,
  },
  {
    id: 3,
    question: "What is the speed of light?",
    type: "MCQ",
    topic: "Physics",
    difficulty: "Hard",
    options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁹ m/s", "3×10⁷ m/s"],
    correct: 0,
  },
];

const mockParticipants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    status: "active",
    exam: "Mathematics Final Exam",
    progress: 75,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    status: "in_progress",
    exam: "Physics Quiz",
    progress: 45,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@email.com",
    status: "completed",
    exam: "Chemistry Test",
    progress: 100,
  },
];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeSidebar();
  initializeCommonFeatures();
});

// Sidebar functionality
function initializeSidebar() {
  const sidebarToggle = document.querySelector('[data-bs-target="#sidebar"]');
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("show");
    });
  }
}

// Common features initialization
function initializeCommonFeatures() {
  // Auto-save functionality
  startAutoSave();
}

// Auto-save functionality
function showAutoSave() {
  const indicator = document.getElementById("autoSaveIndicator");
  if (indicator) {
    indicator.style.display = "block";
    setTimeout(() => {
      indicator.style.display = "none";
    }, 3000);
  }
}

function startAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
  autoSaveInterval = setInterval(() => {
    // Simulate auto-save
    localStorage.setItem(
      "examProgress",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        page: currentPage,
      })
    );
    showAutoSave();
  }, 30000); // Auto-save every 30 seconds
}

// Timer functionality for exams
function startExamTimer(duration) {
  let timeLeft = duration * 60; // Convert minutes to seconds
  const timerElement = document.getElementById("examTimer");

  if (timerElement) {
    examTimer = setInterval(() => {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      timerElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(examTimer);
        autoSubmitExam();
      }

      timeLeft--;
    }, 1000);
  }
}

function autoSubmitExam() {
  // Auto-submit when timer reaches zero
  const submitModal = new bootstrap.Modal(document.getElementById("submitExamModal"));
  submitModal.show();
}

// Utility functions
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Common utility functions for exam actions
function monitorExam(examId) {
  alert(`Monitoring exam ${examId}. In a real application, this would open the proctoring view.`);
}

function editExam(examId) {
  alert(`Editing exam ${examId}. In a real application, this would open the exam editor.`);
}

function toggleExamStatus(examId) {
  const exam = mockExams.find((e) => e.id === examId);
  if (exam) {
    exam.status = exam.status === "active" ? "completed" : "active";
    // Refresh the current page if it's the exams page
    if (typeof loadExamsPage === "function") {
      loadExamsPage();
    }
  }
}

function editQuestion(questionId) {
  alert(`Editing question ${questionId}. In a real application, this would open the question editor.`);
}

function deleteQuestion(questionId) {
  if (confirm("Are you sure you want to delete this question?")) {
    const index = mockQuestions.findIndex((q) => q.id === questionId);
    if (index > -1) {
      mockQuestions.splice(index, 1);
      // Refresh the current page if it's the questions page
      if (typeof loadQuestionsPage === "function") {
        loadQuestionsPage();
      }
    }
  }
}

function viewParticipant(participantId) {
  alert(`Viewing participant ${participantId}. In a real application, this would show participant details.`);
}

function assignExam(participantId) {
  alert(`Assigning exam to participant ${participantId}. In a real application, this would open the assignment modal.`);
}

function raiseFlag(participantId) {
  alert(`Flag raised for participant ${participantId}. In a real application, this would notify proctors.`);
}

// Webcam functionality
function enableWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("webcamVideo");
        const canvas = document.getElementById("webcamCanvas");
        const placeholder = document.getElementById("webcamPlaceholder");

        if (video && canvas && placeholder) {
          video.srcObject = stream;
          video.style.display = "block";
          placeholder.style.display = "none";

          // Take a snapshot
          setTimeout(() => {
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, 320, 240);
            canvas.style.display = "block";
            video.style.display = "none";

            // Stop the stream
            stream.getTracks().forEach((track) => track.stop());
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        alert("Could not access webcam. Please use the upload option instead.");
        const uploadBtn = document.getElementById("uploadPhotoBtn");
        if (uploadBtn) {
          uploadBtn.style.display = "inline-block";
        }
      });
  } else {
    alert("Webcam not supported. Please use the upload option instead.");
    const uploadBtn = document.getElementById("uploadPhotoBtn");
    if (uploadBtn) {
      uploadBtn.style.display = "inline-block";
    }
  }
}

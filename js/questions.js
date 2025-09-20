// Questions page specific JavaScript

// Initialize questions page
document.addEventListener("DOMContentLoaded", function () {
  loadQuestionsPage();
  initializeQuestionManagement();
  initializeFilters();
});

// Load questions page
function loadQuestionsPage() {
  const questionsTableBody = document.getElementById("questionsTableBody");
  if (questionsTableBody) {
    questionsTableBody.innerHTML = "";
    mockQuestions.forEach((question) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <input type="checkbox" class="form-check-input question-checkbox" value="${question.id}">
                </td>
                <td>
                    <div class="fw-bold">${question.question}</div>
                    <small class="text-muted">${question.topic}</small>
                </td>
                <td><span class="badge bg-info">${question.type}</span></td>
                <td>${question.topic}</td>
                <td>
                    <span class="badge bg-${question.difficulty === "Easy" ? "success" : question.difficulty === "Medium" ? "warning" : "danger"}">
                        ${question.difficulty}
                    </span>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm me-1" onclick="editQuestion(${question.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteQuestion(${question.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
      questionsTableBody.appendChild(row);
    });
  }
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

  // Refresh questions page
  loadQuestionsPage();
}

// Initialize filters
function initializeFilters() {
  const questionSearch = document.getElementById("questionSearch");
  const typeFilter = document.getElementById("typeFilter");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const topicFilter = document.getElementById("topicFilterQuestions");
  const clearFilters = document.getElementById("clearFilters");
  const selectAll = document.getElementById("selectAll");
  const deleteSelected = document.getElementById("deleteSelected");

  // Search functionality
  if (questionSearch) {
    questionSearch.addEventListener("input", filterQuestions);
  }

  // Filter functionality
  if (typeFilter) {
    typeFilter.addEventListener("change", filterQuestions);
  }

  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", filterQuestions);
  }

  if (topicFilter) {
    topicFilter.addEventListener("change", filterQuestions);
  }

  // Clear filters
  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      if (questionSearch) questionSearch.value = "";
      if (typeFilter) typeFilter.value = "";
      if (difficultyFilter) difficultyFilter.value = "";
      if (topicFilter) topicFilter.value = "";
      filterQuestions();
    });
  }

  // Select all functionality
  if (selectAll) {
    selectAll.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".question-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
      updateDeleteButton();
    });
  }

  // Individual checkbox change
  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("question-checkbox")) {
      updateDeleteButton();
    }
  });

  // Delete selected functionality
  if (deleteSelected) {
    deleteSelected.addEventListener("click", deleteSelectedQuestions);
  }
}

function filterQuestions() {
  const searchTerm = document.getElementById("questionSearch").value.toLowerCase();
  const typeFilter = document.getElementById("typeFilter").value;
  const difficultyFilter = document.getElementById("difficultyFilter").value;
  const topicFilter = document.getElementById("topicFilterQuestions").value;

  const rows = document.querySelectorAll("#questionsTableBody tr");

  rows.forEach((row) => {
    const questionText = row.querySelector("td:nth-child(2) .fw-bold").textContent.toLowerCase();
    const questionType = row.querySelector("td:nth-child(3) .badge").textContent;
    const questionDifficulty = row.querySelector("td:nth-child(5) .badge").textContent;
    const questionTopic = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

    let show = true;

    // Search filter
    if (searchTerm && !questionText.includes(searchTerm)) {
      show = false;
    }

    // Type filter
    if (typeFilter && questionType !== typeFilter) {
      show = false;
    }

    // Difficulty filter
    if (difficultyFilter && questionDifficulty !== difficultyFilter) {
      show = false;
    }

    // Topic filter
    if (topicFilter && !questionTopic.includes(topicFilter.toLowerCase())) {
      show = false;
    }

    row.style.display = show ? "" : "none";
  });
}

function updateDeleteButton() {
  const selectedCheckboxes = document.querySelectorAll(".question-checkbox:checked");
  const deleteSelected = document.getElementById("deleteSelected");

  if (deleteSelected) {
    deleteSelected.disabled = selectedCheckboxes.length === 0;
  }
}

function deleteSelectedQuestions() {
  const selectedCheckboxes = document.querySelectorAll(".question-checkbox:checked");

  if (selectedCheckboxes.length === 0) {
    alert("Please select questions to delete.");
    return;
  }

  if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} question(s)?`)) {
    selectedCheckboxes.forEach((checkbox) => {
      const questionId = parseInt(checkbox.value);
      const index = mockQuestions.findIndex((q) => q.id === questionId);
      if (index > -1) {
        mockQuestions.splice(index, 1);
      }
    });

    loadQuestionsPage();
    updateDeleteButton();
  }
}

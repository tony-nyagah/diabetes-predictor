// Fill sample data function
function fillSampleData() {
  const sampleData = {
    age: 0.05,
    sex: 0.05,
    bmi: 0.06,
    bp: 0.02,
    s1: -0.04,
    s2: -0.04,
    s3: -0.02,
    s4: -0.01,
    s5: 0.01,
    s6: 0.02,
  };

  for (const [key, value] of Object.entries(sampleData)) {
    const input = document.getElementById(key);
    if (input) {
      input.value = value;
      // Add a subtle animation to show the field was filled
      input.style.backgroundColor = "#e0f2fe";
      input.style.transition = "background-color 0.3s ease";
      setTimeout(() => {
        input.style.backgroundColor = "";
      }, 1000);
    }
  }

  // Show a brief success message
  const button = document.querySelector('button[onclick="fillSampleData()"]');
  if (button) {
    const originalText = button.innerHTML;
    button.innerHTML = "✅ Sample Data Filled!";
    button.style.backgroundColor = "#10b981";
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.backgroundColor = "";
    }, 1500);
  }
}

// Form validation and enhancement
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".prediction-form");
  const inputs = document.querySelectorAll(".form-input");

  // Make sure fillSampleData is available globally
  window.fillSampleData = fillSampleData;

  if (form) {
    // Add loading state to form submission
    form.addEventListener("submit", function (e) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = "⏳ Processing...";
        submitBtn.disabled = true;
      }
    });

    // Add input validation feedback
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateInput(this);
      });

      input.addEventListener("input", function () {
        // Clear validation styling on input
        this.style.borderColor = "";
        this.style.backgroundColor = "";
      });
    });

    // Also add event listener for the sample data button as backup
    const sampleButton = document.querySelector(
      'button[onclick="fillSampleData()"]'
    );
    if (sampleButton) {
      sampleButton.addEventListener("click", function (e) {
        e.preventDefault();
        fillSampleData();
      });
    }
  }

  // Add smooth scrolling for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

function validateInput(input) {
  const value = parseFloat(input.value);

  if (isNaN(value)) {
    input.style.borderColor = "#ef4444";
    input.style.backgroundColor = "#fee2e2";
    return false;
  }

  // Basic range validation (these are typical ranges for normalized data)
  let isValid = true;
  const fieldName = input.name;

  switch (fieldName) {
    case "age":
    case "sex":
    case "bmi":
    case "bp":
      if (value < -0.2 || value > 0.3) {
        isValid = false;
      }
      break;
    case "s1":
    case "s2":
    case "s3":
    case "s4":
    case "s5":
    case "s6":
      if (value < -0.2 || value > 0.2) {
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    input.style.borderColor = "#f59e0b";
    input.style.backgroundColor = "#fef3c7";
    return false;
  }

  input.style.borderColor = "#10b981";
  input.style.backgroundColor = "#d1fae5";
  return true;
}

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const form = document.querySelector(".prediction-form");
    if (form) {
      form.submit();
    }
  }

  // Escape to clear form
  if (e.key === "Escape") {
    const inputs = document.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = "";
      input.style.backgroundColor = "";
    });
  }

  // F key to fill sample data
  if (e.key === "f" || e.key === "F") {
    if (e.target.tagName !== "INPUT") {
      // Don't trigger if typing in an input
      e.preventDefault();
      fillSampleData();
    }
  }
});

// Add animation when page loads
window.addEventListener("load", function () {
  const elements = document.querySelectorAll(
    ".form-container, .result-container"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 100 + index * 200);
  });
});

// Add some utility functions for better UX
function clearForm() {
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.value = "";
    input.style.borderColor = "";
    input.style.backgroundColor = "";
  });
}

// Add clear form button functionality if needed
document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector('button[onclick="clearForm()"]');
  if (clearButton) {
    clearButton.addEventListener("click", function (e) {
      e.preventDefault();
      clearForm();
    });
  }
});

// Generate realistic random data for diabetes prediction
function generateRandomPatientData() {
    // Helper function to generate random number in range
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    
    // Helper function to round to 3 decimal places
    const round3 = (num) => Math.round(num * 1000) / 1000;
    
    return {
        // Age: normalized, typically between -0.1 to 0.1 (covering various adult ages)
        age: round3(randomInRange(-0.08, 0.08)),
        
        // Sex: binary, normalized to approximately -0.04 (female) or 0.05 (male)
        sex: Math.random() > 0.5 ? 0.05 : -0.044,
        
        // BMI: normalized, wider range to cover underweight to obese
        bmi: round3(randomInRange(-0.09, 0.17)),
        
        // Blood Pressure: normalized average arterial pressure
        bp: round3(randomInRange(-0.08, 0.12)),
        
        // Serum measurements: various blood chemistry values, normalized
        s1: round3(randomInRange(-0.13, 0.13)), // Total cholesterol
        s2: round3(randomInRange(-0.15, 0.20)), // LDL cholesterol  
        s3: round3(randomInRange(-0.08, 0.14)), // HDL cholesterol
        s4: round3(randomInRange(-0.05, 0.18)), // Thyroid stimulating hormone
        s5: round3(randomInRange(-0.08, 0.22)), // Lamotrigine (medication level)
        s6: round3(randomInRange(-0.11, 0.17))  // Blood glucose level
    };
}

// Fill sample data function with random realistic data
function fillSampleData() {
    const randomData = generateRandomPatientData();

    for (const [key, value] of Object.entries(randomData)) {
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
        button.innerHTML = "✅ Random Data Generated!";
        button.style.backgroundColor = "#10b981";
        button.style.color = "white";
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = "";
            button.style.color = "";
        }, 1500);
    }
}

// Alternative function to fill with a specific example (for testing)
function fillExampleData() {
    const exampleData = {
        age: 0.038,
        sex: 0.05,
        bmi: 0.062,
        bp: 0.021,
        s1: -0.044,
        s2: -0.034,
        s3: -0.026,
        s4: -0.009,
        s5: 0.012,
        s6: 0.024
    };

    for (const [key, value] of Object.entries(exampleData)) {
        const input = document.getElementById(key);
        if (input) {
            input.value = value;
            input.style.backgroundColor = "#fef3c7";
            input.style.transition = "background-color 0.3s ease";
            setTimeout(() => {
                input.style.backgroundColor = "";
            }, 1000);
        }
    }
}

// Form validation and enhancement
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".prediction-form");
    const inputs = document.querySelectorAll(".form-input");

    // Make sure functions are available globally
    window.fillSampleData = fillSampleData;
    window.fillExampleData = fillExampleData;

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

    // Realistic range validation for normalized diabetes dataset
    let isValid = true;
    const fieldName = input.name;

    switch (fieldName) {
        case "age":
            // Age: typically -0.1 to 0.1 for normalized adult ages
            if (value < -0.15 || value > 0.15) {
                isValid = false;
            }
            break;
        case "sex":
            // Sex: should be close to -0.044 (female) or 0.05 (male)
            if (value < -0.1 || value > 0.1) {
                isValid = false;
            }
            break;
        case "bmi":
            // BMI: wider range for underweight to obese
            if (value < -0.15 || value > 0.25) {
                isValid = false;
            }
            break;
        case "bp":
            // Blood pressure: reasonable range for normalized values
            if (value < -0.15 || value > 0.2) {
                isValid = false;
            }
            break;
        case "s1":
        case "s2":
        case "s3":
        case "s4":
        case "s5":
        case "s6":
            // Serum measurements: based on actual diabetes dataset ranges
            if (value < -0.2 || value > 0.25) {
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        input.style.borderColor = "#f59e0b";
        input.style.backgroundColor = "#fef3c7";
        showTooltip(input, "Value seems outside typical range");
        return false;
    }

    input.style.borderColor = "#10b981";
    input.style.backgroundColor = "#d1fae5";
    return true;
}

// Show validation tooltip
function showTooltip(element, message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.validation-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'validation-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        white-space: nowrap;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.bottom + 5 + 'px';

    document.body.appendChild(tooltip);

    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);

    // Hide tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 300);
        }
    }, 3000);
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

    // Ctrl/Cmd + R to fill random data
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        fillSampleData();
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
});

// Add animation when page loads
window.addEventListener("load", function () {
    const elements = document.querySelectorAll(".form-container, .result-container");
    elements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.6s ease";

        // Trigger animation
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, 100);
    });
});

// Add some helper functions for better UX
function clearForm() {
    const inputs = document.querySelectorAll(".form-input");
    inputs.forEach((input) => {
        input.value = "";
        input.style.borderColor = "";
        input.style.backgroundColor = "";
    });

    // Show feedback
    const clearBtn = document.querySelector('button[onclick="clearForm()"]');
    if (clearBtn) {
        const originalText = clearBtn.innerHTML;
        clearBtn.innerHTML = "🗑️ Cleared!";
        setTimeout(() => {
            clearBtn.innerHTML = originalText;
        }, 1000);
    }
}

// Export functions for global access
window.fillSampleData = fillSampleData;
window.fillExampleData = fillExampleData;
window.clearForm = clearForm;

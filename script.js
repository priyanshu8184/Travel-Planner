// 
//   Travel Planner - Client-side form handling and validation
//   Submit to n8n webhook. Replace WEBHOOK_URL with your n8n webhook URL.
//  

(function () {
  "use strict";

  // Replace this with your n8n Webhook URL after deploying the workflow
  const WEBHOOK_URL =
    "https://priyanshu8184.app.n8n.cloud/webhook/4d53439d-97a4-45ea-be16-8194ce7a957b";

  const form = document.getElementById("itinerary-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const feedbackEl = document.getElementById("feedback");

  const fields = {
    destination: document.getElementById("destination"),
    days: document.getElementById("days"),
    travelers: document.getElementById("travelers"),
    budget: document.getElementById("budget"),
    mode: document.getElementById("mode"),
    email: document.getElementById("email"),
    preferences: document.getElementById("preferences"),
  };

  const errorEls = {
    destination: document.getElementById("destination-error"),
    days: document.getElementById("days-error"),
    travelers: document.getElementById("travelers-error"),
    budget: document.getElementById("budget-error"),
    mode: document.getElementById("mode-error"),
    email: document.getElementById("email-error"),
  };

  // Show feedback banner (success or error)
  function showFeedback(type, message) {
    feedbackEl.className = "feedback " + type;
    feedbackEl.classList.remove("hidden");
    feedbackEl.querySelector(".feedback-message").textContent = message;
    feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideFeedback() {
    feedbackEl.classList.add("hidden");
  }

  // Set error for a single field
  function setFieldError(fieldKey, message) {
    var el = errorEls[fieldKey];
    if (el) el.textContent = message || "";
  }

  // Clear all field errors
  function clearAllErrors() {
    Object.keys(errorEls).forEach(function (key) {
      errorEls[key].textContent = "";
    });
  }

    // Client-side validation rules
  function validateDestination(value) {
    var trimmed = (value || "").trim();
    if (trimmed.length === 0) return "Destination is required.";
    if (trimmed.length < 2) return "Please enter a valid destination.";
    return null;
  }

  function validateDays(value) {
    var num = parseInt(value, 10);
    if (isNaN(num) || value === "") return "Number of days is required.";
    if (num < 1 || num > 90) return "Please enter between 1 and 90 days.";
    return null;
  }

  function validateTravelers(value) {
    var num = parseInt(value, 10);
    if (isNaN(num) || value === "") return "Number of travelers is required.";
    if (num < 1 || num > 50) return "Please enter between 1 and 50 travelers.";
    return null;
  }

  function validateBudget(value) {
    var trimmed = (value || "").trim();
    if (trimmed.length === 0) return "Budget is required.";
    if (trimmed.length < 2)
      return "Please enter a valid budget (e.g. $1500 or 50000 INR).";
    return null;
  }

  function validateMode(value) {
    var valid = ["bus", "train", "flight", "car"].indexOf(value) !== -1;
    if (!value) return "Please select a mode of travel.";
    if (!valid) return "Invalid mode selected.";
    return null;
  }

  function validateEmail(value) {
    var trimmed = (value || "").trim();
    if (trimmed.length === 0) return "Email is required.";
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(trimmed)) return "Please enter a valid email address.";
    return null;
  }

  
  // Run all validations and return first error key or null

  function validateForm() {
    clearAllErrors();
    var errors = {
      destination: validateDestination(fields.destination.value),
      days: validateDays(fields.days.value),
      travelers: validateTravelers(fields.travelers.value),
      budget: validateBudget(fields.budget.value),
      mode: validateMode(fields.mode.value),
      email: validateEmail(fields.email.value),
    };

    var hasError = false;
    Object.keys(errors).forEach(function (key) {
      if (errors[key]) {
        errorEls[key].textContent = errors[key];
        hasError = true;
      }
    });
    return hasError ? false : true;
  }

  // Build payload for n8n webhook
  function getPayload() {
    return {
      destination: fields.destination.value.trim(),
      days: parseInt(fields.days.value, 10),
      travelers: parseInt(fields.travelers.value, 10),
      budget: fields.budget.value.trim(),
      mode: fields.mode.value,
      email: fields.email.value.trim().toLowerCase(),
      preferences: (fields.preferences.value || "").trim() || undefined,
    };
  }

  // Submit form to n8n webhook
  function handleSubmit(e) {
    e.preventDefault();
    hideFeedback();

    if (!validateForm()) {
      showFeedback("error", "Please correct the errors below and try again.");
      return;
    }

    var payload = getPayload();
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing…";

    showFeedback(
      "info",
      "Your request has been submitted successfully. Please wait a few minutes while we generate your itinerary and send it to your email.",
    );

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (res.ok) {
          showFeedback(
            "success",
            "Request received! Your itinerary will be sent to " +
              payload.email +
              " shortly. Check your inbox (and spam folder).",
          );
          form.reset();
          clearAllErrors();
        } else {
          return res.text().then(function (text) {
            throw new Error(text || "Request failed with status " + res.status);
          });
        }
      })
      .catch(function (err) {
        var message = "Could not send your request. ";
        if (err.message && err.message.indexOf("Failed to fetch") !== -1) {
          message +=
            "Check your connection and that the webhook URL is correct.";
        } else {
          message += err.message || "Please try again later.";
        }
        showFeedback("error", message);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Generate Itinerary";
      });
  }

  function handleReset() {
    clearAllErrors();
    hideFeedback();
  }

  form.addEventListener("submit", handleSubmit);
  resetBtn.addEventListener("click", handleReset);

  // Optional: clear field error on input for better UX
  Object.keys(fields).forEach(function (key) {
    if (errorEls[key] && fields[key]) {
      fields[key].addEventListener("input", function () {
        errorEls[key].textContent = "";
      });
      fields[key].addEventListener("change", function () {
        errorEls[key].textContent = "";
      });
    }
  });
})();




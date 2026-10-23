import AppComponent from "../../../lib/AppComponent.js";
import postIndicatorCountry from "../../services/indicatorService.js";

class IndicatorCountries extends AppComponent {
  /**
   * Prepares component data prior to rendering
   */
  beforeRender() {
    // Extract country ID from component attribute or query parameters
    this.countryId = this.getAttribute("country-id") || new URLSearchParams(window.location.search).get("id");

    // Configure environmental indicators setup
    this.indicators = [
      {
        key: "co2_emissions",
        label: "CO₂ emissions",
        unit: "metric tons per capita",
        placeholder: "e.g. 4.5",
        min: 0,
        max: 100,
        step: 0.01
      },
      {
        key: "renewable_energy_share",
        label: "Renewable energy share",
        unit: "%",
        placeholder: "e.g. 25.0",
        min: 0,
        max: 100,
        step: 0.1
      },
      {
        key: "forest_area",
        label: "Forest area",
        unit: "%",
        placeholder: "e.g. 30.5",
        min: 0,
        max: 100,
        step: 0.1
      },
      {
        key: "pm25_exposure",
        label: "PM2.5 exposure",
        unit: "µg/m³",
        placeholder: "e.g. 12.4",
        min: 0,
        max: 500,
        step: 0.1
      }
    ];

    // Default to current year
    this.currentYear = new Date().getFullYear();
  }

  /**
   * Renders the component HTML layout
   */
  template() {
    const indicatorFieldsHTML = this.indicators
      .map(
        (ind) => `
        <div class="mb-3">
          <label for="input-${ind.key}" class="form-label font-weight-bold">
            ${ind.label} <span class="text-muted">(${ind.unit})</span>
          </label>
          <div class="input-group">
            <input 
              type="number" 
              class="form-control indicator-input" 
              id="input-${ind.key}" 
              name="${ind.key}"
              placeholder="${ind.placeholder}" 
              min="${ind.min}" 
              max="${ind.max}" 
              step="${ind.step}"
              required
            >
            <span class="input-group-text">${ind.unit}</span>
          </div>
        </div>
      `
      )
      .join("");

    return `
      <div class="card p-4 shadow-sm">
        <h4 class="mb-3">Add Yearly Environmental Indicators</h4>
        
        <!-- Feedback alert container -->
        <div id="feedback-message" class="d-none alert" role="alert"></div>

        <form id="indicator-form" novalidate>
          <!-- Year input field -->
          <div class="mb-3">
            <label for="input-year" class="form-label font-weight-bold">Year</label>
            <input 
              type="number" 
              class="form-control" 
              id="input-year" 
              name="year" 
              value="${this.currentYear}" 
              min="1900" 
              max="${this.currentYear}" 
              required
            >
          </div>

          <hr class="my-4">

          <!-- Dynamic indicator input fields -->
          ${indicatorFieldsHTML}

          <!-- Form actions -->
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" id="btn-reset" class="btn btn-outline-secondary px-4">
              Reset
            </button>
            <button type="submit" id="btn-save" class="btn btn-primary px-4">
              Save Indicators
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * Binds event listeners after initial DOM render
   */
  afterRender() {
    const form = this.querySelector("#indicator-form");
    const resetBtn = this.querySelector("#btn-reset");

    if (!form) return;

    // Handle form submit event
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      this.hideFeedback();

      // Form validation check
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        this.showFeedback("Please fill out all fields correctly.", "danger");
        return;
      }

      // Format payload data for submission
      const formData = new FormData(form);
      const payload = {
        year: parseInt(formData.get("year"), 10),
        indicators: {
          co2_emissions: parseFloat(formData.get("co2_emissions")),
          renewable_energy_share: parseFloat(formData.get("renewable_energy_share")),
          forest_area: parseFloat(formData.get("forest_area")),
          pm25_exposure: parseFloat(formData.get("pm25_exposure"))
        }
      };

      // Submit indicators payload
      await this.saveIndicators(payload, form);
    });

    // Handle reset button click event
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetForm(form));
    }
  }

  /**
   * Resets form fields, validation states, and default values
   */
  resetForm(form) {
    form.reset();
    form.classList.remove("was-validated");

    // Restore default current year value
    const yearInput = this.querySelector("#input-year");
    if (yearInput) {
      yearInput.value = this.currentYear;
    }

    this.hideFeedback();
  }

  /**
   * Sends indicators payload using the external service
   */
  async saveIndicators(payload, form) {
    const saveBtn = this.querySelector("#btn-save");
    saveBtn.disabled = true;
    saveBtn.innerText = "Saving...";

    try {
      if (!this.countryId) {
        throw new Error("Missing target country identifier.");
      }

      // Call API service
      const result = await postIndicatorCountry(this.countryId, payload);

      // Handle successful operation
      this.showFeedback("Environmental indicators saved successfully!", "success");
      this.resetForm(form);

      // Notify parent/sibling components of data updates
      this.dispatchEvent(new CustomEvent("indicators-updated", { bubbles: true, detail: result }));

    } catch (error) {
      // Handle failed operations
      this.showFeedback(error.message || "An unexpected error occurred. Please try again.", "danger");
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerText = "Save Indicators";
    }
  }

  /**
   * Displays alert feedback message
   */
  showFeedback(message, type = "danger") {
    const feedbackEl = this.querySelector("#feedback-message");
    if (!feedbackEl) return;

    feedbackEl.className = `alert alert-${type} mb-4`;
    feedbackEl.innerText = message;
    feedbackEl.classList.remove("d-none");
  }

  /**
   * Hides alert feedback container
   */
  hideFeedback() {
    const feedbackEl = this.querySelector("#feedback-message");
    if (feedbackEl) {
      feedbackEl.classList.add("d-none");
    }
  }
}

customElements.define("indicator-countries", IndicatorCountries);
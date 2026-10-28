import AppComponent from "../../../lib/AppComponent.js";
import postIndicatorCountry from "../../services/indicatorService.js";
import externalization from "../../services/externalization.js";

class IndicatorCountries extends AppComponent {
  /**
   * Prepares component data prior to rendering
   */
  beforeRender() {
    // Extract country ID from component attribute or query parameters
    this.countryId = this.getAttribute("country-id") || new URLSearchParams(window.location.search).get("id");

    // Configure environmental indicators setup with externalized strings
    this.indicators = [
      {
        key: "co2Emissions",
        label: externalization("indicator.label_co2_emissions"),
        unit: externalization("indicator.unit_co2_emissions"),
        placeholder: externalization("indicator.placeholder_co2_emissions"),
        min: 0,
        max: 100,
        step: 0.01
      },
      {
        key: "renewableEnergyShare",
        label: externalization("indicator.label_renewable_energy_share"),
        unit: externalization("indicator.unit_renewable_energy_share"),
        placeholder: externalization("indicator.placeholder_renewable_energy_share"),
        min: 0,
        max: 100,
        step: 0.1
      },
      {
        key: "forestArea",
        label: externalization("indicator.label_forest_area"),
        unit: externalization("indicator.unit_forest_area"),
        placeholder: externalization("indicator.placeholder_forest_area"),
        min: 0,
        max: 100,
        step: 0.1
      },
      {
        key: "pm25Exposure",
        label: externalization("indicator.label_pm25_exposure"),
        unit: externalization("indicator.unit_pm25_exposure"),
        placeholder: externalization("indicator.placeholder_pm25_exposure"),
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
        (ind) => /*html*/ `
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
            >
            <span class="input-group-text">${ind.unit}</span>
          </div>
        </div>
      `
      )
      .join("");

    return /*html*/ `
      <div class="card p-4 shadow-sm">
        <h4 class="mb-3">${externalization("indicator.title")}</h4>
        
        <!-- Feedback alert container -->
        <div id="feedback-message" class="d-none alert" role="alert"></div>

        <form id="indicator-form" novalidate>
          <!-- Year input field -->
          <div class="mb-3">
            <label for="input-year" class="form-label font-weight-bold">${externalization("indicator.label_year")}</label>
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
              ${externalization("indicator.btn_reset")}
            </button>
            <button type="submit" id="btn-save" class="btn btn-primary px-4">
              ${externalization("indicator.btn_save")}
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
        this.showFeedback(externalization("indicator.validation_error"), "danger");
        return;
      }

      // Format payload data flat structure matching Spring Boot DTO
      const formData = new FormData(form);
      
      const parseValue = (val) => (val && val.trim() !== "" ? parseFloat(val) : null);

      const payload = {
        year: parseInt(formData.get("year"), 10),
        co2Emissions: parseValue(formData.get("co2Emissions")),
        renewableEnergyShare: parseValue(formData.get("renewableEnergyShare")),
        forestArea: parseValue(formData.get("forestArea")),
        pm25Exposure: parseValue(formData.get("pm25Exposure"))
      };

      // Check client side if at least one indicator is filled
      const hasValue = payload.co2Emissions !== null || 
                       payload.renewableEnergyShare !== null || 
                       payload.forestArea !== null || 
                       payload.pm25Exposure !== null;

      if (!hasValue) {
        this.showFeedback(externalization("indicator.validation_error"), "danger");
        return;
      }

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
    saveBtn.innerText = externalization("indicator.btn_saving");

    try {
      if (!this.countryId) {
        throw new Error(externalization("indicator.missing_country_id"));
      }

      // Call API service
      const result = await postIndicatorCountry(this.countryId, payload);

      // Handle successful operation
      this.showFeedback(externalization("indicator.save_success"), "success");
      this.resetForm(form);

      // Notify parent/sibling components of data updates
      this.dispatchEvent(new CustomEvent("indicators-updated", { bubbles: true, detail: result }));

    } catch (error) {
      // Handle failed operations
      this.showFeedback(error.message || externalization("indicator.unexpected_error"), "danger");
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerText = externalization("indicator.btn_save");
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
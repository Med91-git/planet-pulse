import AppComponent from "../../../lib/AppComponent.js";
import "../../components/saveButtonIndicator/SaveButtonIndicator.js";
class IndicatorCountries extends AppComponent {
  beforeRender() {
    // Usually fetch some data
    // return; // Default does nothing
  }

  template() {
    return ` <div class="form-field">
  <label for="exampleFormControlInput1" class="form-label">CO2 emissions</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="e.g. 4.5 metric tons" min="1" max="100" step=".01">
  <label for="exampleFormControlInput1" class="form-label">Renewable energy share</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="e.g. 25%" min="1" max="100" step=".01">
  <label for="exampleFormControlInput1" class="form-label">Forest area</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="e.g. 30%" min="1" max="100" step=".01">
  <label for="exampleFormControlInput1" class="form-label">PM2.5 exposure</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="e.g. 12 µg/m³" min="1" max="100" step=".01">
  <br>
<save-button-indicator></save-button-indicator>
</div>
`;
  }

  afterRender() {
    // Usually parent-child communication, event listeners registration
    // return; // Default does nothing
  }
}

customElements.define("indicator-countries", IndicatorCountries);

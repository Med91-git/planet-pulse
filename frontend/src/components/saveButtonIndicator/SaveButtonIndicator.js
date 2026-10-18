import AppComponent from "../../../lib/AppComponent.js";

class SaveButtonIndicator extends AppComponent {
  beforeRender() {
    // Usually fetch some data
    // return; // Default does nothing
  }

  template() {
    return ` <button type="button" class="btn btn-primary">Save</button>`;
  }

  afterRender() {
    // Usually parent-child communication, event listeners registration
    // return; // Default does nothing
  }
}

customElements.define("save-button-indicator", SaveButtonIndicator);

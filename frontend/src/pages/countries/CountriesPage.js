import AppComponent from "../../../lib/AppComponent.js";
import "../../components/indicator/IndicatorCountries.js";

class CountriesPage extends AppComponent {
  template() {
    return /*html*/ `
            <h2>Country indicator</h2>
            <indicator-countries></indicator-countries>
        `;
  }
}

customElements.define("countries-page", CountriesPage);

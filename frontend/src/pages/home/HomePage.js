import AppComponent from '../../../lib/AppComponent.js';
import '../../components/import/ImportCountries.js';

class HomePage extends AppComponent {

    template() {
        return /*html*/`
            <h1>Planet Pulse</h1>
            <p>Track various environmental indicators by country</p>
            <import-countries></import-countries>
        `;
    }

}

customElements.define('home-page', HomePage);

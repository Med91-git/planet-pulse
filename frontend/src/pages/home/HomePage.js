import AppComponent from '../../../lib/AppComponent.js';
import '../../components/import/ImportCountries.js';
import externalization from '../../services/externalization.js';

class HomePage extends AppComponent {

    template() {
        return /*html*/`
            <h1>${externalization("homepage.title")}</h1>
            <p>${externalization("homepage.subtitle")}</p>
            <import-countries></import-countries>
        `;
    }

}

customElements.define('home-page', HomePage);

import AppComponent from '../../../lib/AppComponent.js';

class ImportCountries extends AppComponent {

    beforeRender() {
       // this.state = {}; TODO! Import countries here
    }

    template() {
        return /*html*/`
            <button type="button" class="btn btn-primary btn-lg">Import Countries 🌍</button>
        `;
    }


}

customElements.define('import-countries', ImportCountries);

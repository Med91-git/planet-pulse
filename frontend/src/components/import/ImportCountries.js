import AppComponent from '../../../lib/AppComponent.js';

class ImportCountries extends AppComponent {

    beforeRender() {
       // this.state = {}; TODO! Import countries here
    }

    template() {
        return /*html*/`
            <button type="button" class="btn btn-primary btn-lg import_button">Import Countries 🌍</button>
        `;
    }

    afterRender(){
        document.addEventListener(type, listener, options)

    }

}

customElements.define('import-countries', ImportCountries);

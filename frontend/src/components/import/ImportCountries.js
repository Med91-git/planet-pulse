import AppComponent from '../../../lib/AppComponent.js';
import getAllCountries from '../../services/api.js';
import externalization from '../../services/externalization.js';

class ImportCountries extends AppComponent {

    beforeRender() {
       // this.state = {}; 
    }

    template() {
        return /*html*/`
            <button id="country-import" type="button" class="btn btn-primary btn-lg">${externalization("import.button")}</button>
        `;
    }

    afterRender(){
        const countryImportButton = document.querySelector("#country-import");
        countryImportButton.addEventListener('click',getAllCountries);
    }
    

}

customElements.define('import-countries', ImportCountries);

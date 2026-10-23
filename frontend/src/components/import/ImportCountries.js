import AppComponent from '../../../lib/AppComponent.js';
import getAllCountries from '../../services/api.js';
class ImportCountries extends AppComponent {

    beforeRender() {
       // this.state = {}; 
    }

    template() {
        return /*html*/`
            <button id="country-import" type="button" class="btn btn-primary btn-lg">Import Countries 🌍</button>
        `;
    }

    afterRender(){
        const countryImportButton = document.querySelector("#country-import");
        countryImportButton.addEventListener('click',getAllCountries);
    }
    

}

customElements.define('import-countries', ImportCountries);

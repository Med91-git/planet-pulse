import AppComponent from '../../../lib/AppComponent.js';
import externalization from '../../services/externalization.js';

class Header extends AppComponent {

    template() {
        return /*html*/`
            <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom py-3">
                <div class="container-fluid position-relative">
                    
                    <a class="navbar-brand fw-bold m-0" href="/frontend/src/pages/home">${externalization("header.title")}</a>
                    
                    <div class="navbar-nav d-flex flex-row gap-4 position-absolute start-50 translate-middle-x">
                        <a class="nav-link active" href="/frontend/src/pages/home">${externalization("header.home")}</a>
                        <a class="nav-link" href="/frontend/src/pages/countries">${externalization("header.countries")}</a>
                    </div>
                    
                </div>
            </nav>
        `;
    }
}

customElements.define('header-nav', Header);

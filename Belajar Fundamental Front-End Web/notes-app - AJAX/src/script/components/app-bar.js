class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
  
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
          :host {
            display: grid;
            grid-template-columns: minmax(200px,800px) ;
            justify-content: center;  
            margin: 25px;
            color: white;
          }
    
          div {
            background-color: #153448;  
            padding: 25px;
            border-radius: 20px;
          }
    
          .brand-name {
            margin: 0;
            text-align: center;
            font-size: 2em;
          }
        `;
      }

      _emptyContent() {
        this._shadowRoot.innerHTML = '';
      }
    
      connectedCallback() {
        this.render();
      }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div>
            <h1 class="brand-name">Simple Notes App </h1>
        </div>
        `;
    }
}

customElements.define('app-bar', AppBar)
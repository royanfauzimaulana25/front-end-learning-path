class FooterBar extends HTMLElement {
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
          margin: 0;
          text-align: center;
          font-size: 1em;
          font-weight: bold;
          color: white;
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
          Simple Note App &copy; 2024
        </div>
      `;
    }
  }
  
  customElements.define('footer-bar', FooterBar);
  
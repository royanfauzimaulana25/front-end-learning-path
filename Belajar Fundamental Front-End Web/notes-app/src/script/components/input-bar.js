class InputBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
  
    _submitEvent = 'submit';
    _addNoteEvent = 'addNote';
  
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
  
      this.render();
    }
  
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
  
    connectedCallback() {
      this._shadowRoot
        .querySelector('form')
        .addEventListener('submit', (event) => this._onFormSubmit(event, this));
      this.addEventListener(this._submitEvent, this._onFormInputSubmit);
    }
  
    disconnectedCallback() {
      this._shadowRoot
        .querySelector('form')
        .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
      this.removeEventListener(this._submitEvent, this._onFormInputSubmit);
    }
  
    _onFormSubmit(event, formInputInstance) {
      formInputInstance.dispatchEvent(new CustomEvent('submit'));
  
      event.preventDefault();
    }
  
    _onFormInputSubmit() {
      const title = this._shadowRoot.querySelector('#input_title').value;
      const body = this._shadowRoot.querySelector('#input_desc').value;
  
      this.dispatchEvent(
        new CustomEvent(this._addNoteEvent, {
          detail: { title, body },
          bubbles: true,
        }),
      );

      this._shadowRoot
          .querySelector('form')
          .reset();

    }
  
    _updateStyle() {
      this._style.textContent = `
        :host {

        }
      
        .input_bar {
          display: flex;
          flex-direction: column;
          padding: 16px;
        }
        
        .input_bar > form > .input {
          margin: 8px 0px;
        }
        
        .input_bar > form > button {
          background-color: #153448;
          border: solid 2px;
          color: white;
          border-radius: 10px;
          display: block;
          width: 100%;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 1em;
        }
        
        .input_bar > form > button:hover {
          background-color: white;
          border: solid 2px;
          color: #153448;
          border-radius: 10px;
          display: block;
          width: 100%;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 1em;
          transition: 0.3s;
        }
        
        .input_bar form > .input > input {
          display: block;
          width: 100%;
          padding: 8px;
          border-radius: 10px;
          font-family: 'Noto Sans';
        }
        
        
        .input_bar > form > .input > label {
          color: #153448;
          font-weight: bold;
          margin: 5px;
        }
        
        .input_bar > form > .input > textarea {
          resize: none;
          width: 100%;
          padding: 8px;
          border-radius: 10px;
          font-family: 'Noto Sans';
        }
      `;
    }
  
    render() {
      this._emptyContent();
      this._updateStyle();
  
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
      <div class="input_bar">
        <form id="input_note" class="form-input">

          <div class="input">
            <label for="input_title">Title</label>
            <input id="input_title" name="input_title" type="text" required>
          </div>

          <div class="input">
            <label for="input_desc">Insert Your Note</label>
            <textarea name="input_desc" id="input_desc" cols="30" rows="10" required></textarea>
          </div>

          <button>Add Note</button>
        </form>
      </div>
      `;
    }
  }
  
  customElements.define('input-bar', InputBar);
  
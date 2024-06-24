class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        id: null,
        title: null,
        body: null,
        createdAt:null,
        archived:null,
    };
  
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
    }
  
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
  
    set note(value) {
      this._note = value;
  
      // Render ulang
      this.render();
    }
  
    get note() {
      return this._note;
    }
  
    _updateStyle() {
      this._style.textContent = `
        :host {
            display: block;
            border-radius: 16px;
            box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
            overflow: hidden;
            padding: 16px;
        }
        
        .card {
          border-radius: 16px;          
          overflow: hidden;
          padding: 16px;
        }

        .card .note-title h2{
            font-weight: bold;
          }
          
        .card .note-description p {
            margin-top: 10px;
            display: -webkit-box; 
            -webkit-box-orient: vertical; 
            -webkit-line-clamp: 5; 
            overflow: hidden; 
            text-overflow: ellipsis; 
          }
      `;
    }
  
    render() {
      this._emptyContent();
      this._updateStyle();
  
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
        <div class="card">
            <div class="note-title">
              <h2>${this._note.title}</h2>
            </div>
            <div class="note-description">
              <p>${this._note.body}</p>
            </div>
        </div>
      `;
    }
  }
  
  customElements.define('note-item', NoteItem);
  
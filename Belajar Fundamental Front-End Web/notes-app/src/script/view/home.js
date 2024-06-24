import Utils from '../utils.js';
import Notes from '../data/notes.js';
const home = () => {
  const inputFormElement = document.querySelector('input-bar')

  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const showNotes = () => {
    const result = Notes.getAll();
    displayResult(result);
    showNoteList();
  };

  const addNoteHandler = (event) => {
    event.preventDefault();

    const { title, body } = event.detail;

    const newNote = {
      id: `note-${Date.now()}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false
    };
    console.log(newNote);
    Notes.addNote(newNote);
    showNotes();

  }

  const displayResult = (notes) => {
    const noteItemElements  = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;
      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  inputFormElement.addEventListener('addNote', addNoteHandler);

  showNotes();
};

export default home;

import Utils from '../utils.js';
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const inputFormElement = document.querySelector('input-bar')
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector(".note-loading");
  const noteListElement = noteListContainerElement.querySelector('note-list');
  const noteErrorElement = noteListContainerElement.querySelector("note-error");

  const showNotes = async () => {
    showLoading();

    try {
      const notes = await NotesApi.getNotes();
      displayResult(notes);

      showNoteList();
    } catch (error) {
      noteErrorElement.textContent = error.message;
      showNoteError();
    }
  };

  const addNoteHandler = async (event) => {
    event.preventDefault();

    const { title, body } = event.detail;

    const newNote = {
      title: title,
      body: body
    };
    console.log(newNote);
    try {
      await NotesApi.addNote(newNote);
      showNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteNoteHandler = async (noteId) => {
    try {
      await NotesApi.deleteNote(noteId);
      showNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const displayResult = (notes) => {
    const noteItemElements  = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

      noteItemElement.addEventListener("deleteNote", () => {
        console.log(note.id);
        onDeleteNoteHandler(note.id);
      });
      
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

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showNoteError = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteErrorElement);
  };

  inputFormElement.addEventListener('addNote', addNoteHandler);
  showNotes();
};

export default home;

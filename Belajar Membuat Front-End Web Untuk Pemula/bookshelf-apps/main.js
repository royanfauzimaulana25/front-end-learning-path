const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });    

    if (isStorageExist()) {
      loadDataFromStorage();
    }
});

function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = parseInt(document.getElementById('inputBookYear').value);
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateID();
    const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function generateID() {
    return +new Date();
};

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
};

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';
   
    const completedBookList = document.getElementById('completeBookshelfList');
    completedBookList.innerHTML = '';
   
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isComplete){
        uncompletedBookList.append(bookElement);
      }
      else {
        completedBookList.append(bookElement);
      }
    }
});

function makeBook(bookObject) {
    const title = document.createElement('h3');
    title.innerText = bookObject.title;

    const author = document.createElement('p');
    author.innerText = 'Penulis : ' + bookObject.author;

    const year = document.createElement('p');
    year.innerText = 'Tahun : ' + bookObject.year;

    const articleContainer = document.createElement('article');
    articleContainer.classList.add('book_item');
    articleContainer.setAttribute('id', `book-${bookObject.id}`);
        
    if (bookObject.isComplete) {

        const buttonFinish = document.createElement('button');
        buttonFinish.innerText = 'Belum Selesai Dibaca' ;
        buttonFinish.classList.add('green');

        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Hapus Buku' ;
        buttonDelete.classList.add('red');

        
        buttonFinish.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });
        
        buttonDelete.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(buttonFinish, buttonDelete);

        articleContainer.append(title, author, year, actionContainer);
     
      } else {
        const buttonFinish = document.createElement('button');
        buttonFinish.innerText = 'Selesai Dibaca' ;
        buttonFinish.classList.add('green');

        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Hapus Buku' ;
        buttonDelete.classList.add('red');


        buttonFinish.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        buttonDelete.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(buttonFinish, buttonDelete);
        
        articleContainer.append(title, author, year, actionContainer);   
    };    

    return articleContainer;
};

function addBookToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = true;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  };

  function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
        return bookItem;
        }
    }
    return null;
};

function removeBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isComplete = false;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

  };

function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

};

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
        return index;
        }
    }

    return -1;
};

function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  };

const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
    };

    document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
    alert("Data Berhasil Tersimpan");
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
        books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
};
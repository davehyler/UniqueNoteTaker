//STARTER CODE PRESENT - DO NOT MODIFY UNLESS BROKEN/REDUNDANT (added clearButton)
//EDIT: a LOT of nonsensical broken starter code present that looks more troublesome to fix than to write document elements from scratch
//Adding document elements even if they already exist in starter code, will leave in case they have backend functionality that I am not seeing.
let noteForm;
let noteTitle;
let noteText;
let saveButton;
let newButton;
let listContainer;
let clearButton;

if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveButton = document.querySelector('.save-note');
  newButton = document.querySelector('.new-note');
  clearButton = document.querySelector('.clear-btn');
  listContainer = document.querySelectorAll('.list-container .list-group');
}

//TODO: END STARTER CODE, BEGIN DOCUMENT CONTENT (no form elements currently work on page, adding element and function for each one)
//Make Event Listener to connect to Form Elements/Buttons on page:

document.addEventListener("DOMContentLoaded", function() {
listContainer = document.querySelector("#list-container ul");
noteTitle = document.querySelector(".note-title");
noteText = document.querySelector(".note-textarea");

saveButton = document.querySelector(".save-note");
saveButton.style.display = "inline-block";

newButton = document.querySelector(".new-note");
newButton.style.display = "none";

clearButton = document.querySelector(".clear-btn");
clearButton.style.display = "inline-block";


    // // OLD FUNCTION KEEP COMMENTED OUT FOR REFERENCE Function to create a new note list item
    // // Function to create a new note list item
  //   function createlistContainerItem(title, content) {
  //     //create list item
  //     const noteEntry = document.createElement('li');
  //     //See HTML document index.html for information on item names like "list-group-item d flex..." for more info and reference.
  //     noteEntry.className = 'list-group-item d-flex justify-content-between align-items-center';
  //     //Do NOT change "style" tags within JS as it will BREAK THE LINK between function of the HTML
  //     noteEntry.innerHTML = `<span><strong>${title}</strong></span>`;
  //     noteEntry.dataset.content =  content;
  //     //Append delete button directly onto element (preventing from persistently showing up if added directly in html/css)
  //     const deleteBtn = document.createElement('button');
  //     deleteBtn.className = 'btn btn-sm btn-outline-danger delete-note';
  //     deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  //     noteEntry.appendChild(deleteBtn);
  //     return noteEntry;
  // }
  

  // Begin adding notes (and dynamic form elements)
  function createlistContainerItem(title, content) {
    //create list item
    const noteEntry = document.createElement('li');
    //See HTML document index.html for information on item names like "list-group-item d flex..." for more info and reference.
    noteEntry.className = 'list-group-item d-flex justify-content-between align-items-center';
    //Do NOT change "style" tags within JS as it will BREAK THE LINK between function of the HTML
    noteEntry.innerHTML = `<span><strong>${title}</strong></span>`;
    noteEntry.dataset.content =  content;
    //Append delete button directly onto element (preventing from persistently showing up if added directly in html/css)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger delete-note';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    noteEntry.appendChild(deleteBtn);
    return noteEntry;
}
//Load currently stored notes on Page Open (For loop did not work, static if statement seems to fix it yet does not work without the statement)
let savedEntries = JSON.parse(localStorage.getItem("notes"));
  if (savedEntries) {
    savedEntries.forEach(note => newNote(note.title, note.content));
  }
// Edit: function will now add a new note to the list
function newNote(title, content) {
  const listContainerItem = createlistContainerItem(title, content);
  listContainer.appendChild(listContainerItem);
}
//DELETE BUTTON Event (finally working, do NOT edit unless necessary)
listContainer.addEventListener('click', function(event) {
  const deleteBtn = event.target.closest('.delete-note');
  //if user selects delete button for event
  if (deleteBtn) 
  {
    const noteEntry = event.target.closest('.list-group-item');
    if (noteEntry) 
    {
        let title = noteEntry.querySelector('strong').innerText;
        let content = noteEntry.dataset.content;
        //If statement to verify deleted note is current note clicked on
        //EDIT: multiple titles were not unique, adding "noteText.value" as an AND modifier to if statement, should prevent conflict. Could also prevent multiple identical titles, but less efficient and user-unfriendly
        if (noteTitle.value === title && noteText.value === content) 
        {
            noteTitle.value = "";
            noteText.value = "";
        }
        noteEntry.remove();
        let notes = Array.from(listContainer.querySelectorAll("li")).map(li => (
          {
          title: li.querySelector('strong').innerText,
          content: li.dataset.content
          }));
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  } else
  {
    let noteEntry = event.target.closest('.list-group-item'); //use closest tag to target selected note
    if (noteEntry) //if user selects
      {
          noteTitle.value = noteEntry.querySelector('strong').innerText;
          noteText.value = noteEntry.dataset.content;
      }
  }
});
// SAVE BUTTON event
saveButton.addEventListener("click", function() {
  let title = noteTitle.value.trim();
  let content = noteText.value.trim();
  newNote(title, content);
  let notes = Array.from(listContainer.querySelectorAll("li")).map(li => ({
    title: li.querySelector('strong').innerText,
    content: li.dataset.content
    }));  
  localStorage.setItem("notes", JSON.stringify(notes));
    noteTitle.value = "";
    noteText.value = "";
  }
  );
});

//END TODO, BEGIN STARTER CODE BELOW (redundancies may be present as several form elements were present but not working, 
//but finally working with minimal errors so do NOT edit unless necessary)
//DO NOT DELETE CONTENT. has API and other elements present in addition to the now redundancies


// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {
  hide(saveButton);
  hide(clearButton);

  if (activeNote.id) {
    show(newButton);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newButton);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};



// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearButton);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearButton);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearButton);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveButton);
  } else {
    show(saveButton);
  }
};

// Render the list of note titles
const renderlistContainer = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    listContainer.forEach((el) => (el.innerHTML = ''));
  }

  let listContainerItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    listContainerItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    listContainerItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    listContainerItems.forEach((note) => listContainer[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderlistContainer);

if (window.location.pathname === '/notes') {
  saveButton.addEventListener('click', handleNoteSave);
  newButton.addEventListener('click', handleNewNoteView);
  clearButton.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();

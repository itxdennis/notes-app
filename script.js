function popup() {
  // adding new element in html file
  const popupContainer = document.createElement('div');
  // using backticks, not the single quotes
  popupContainer.innerHTML = `
  <div id = "popupContainer">
     <h1> New Note </h1>
     <textarea id = "note-text" placeholder = "Enter your note...."></textarea>
    
     <div id ="btn-container">
        <button id="submitBtn" onclick="createNote()"> Create Note </button>
        <button id="closeBtn" onclick="closePopup()"> Close </button>
     </div>
  </div>
  `;
  document.body.appendChild(popupContainer);
}

function closePopup() {
  const popupContainer = document.getElementById('popupContainer');
  if (popupContainer) {
    popupContainer.remove();
  }
}

function createNote() {
  const popupContainer = document.getElementById('popupContainer');
  const noteText = document.getElementById('note-text').value;
  if (noteText.trim() !== '') {
    const note = {
      id: new Date().getTime(),
      text: noteText,
    };

    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    existingNotes.push(note);

    localStorage.setItem('notes', JSON.stringify(existingNotes));

    document.getElementById('note-text').value = '';
    popupContainer.remove();
    displayNotes();
  }
}

function displayNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach((note) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <span>${note.text}</span>
    <div id = "noteBtns-container">
            <button id = "editBtn" oncliick = "editNote(${note.id})"><i class = "fa-solid fa-pen"> </i></button>
            <button id = "deleteBtn" oncliick = "deleteNote(${note.id})"><i class = "fa-solid fa-trash"></i></button>
    </div>
    `;
    jnotesList.appendChild(listItem);
  });
}

function editNote(noteId) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteToEdit = notes.find((note) => note.id == noteId);
  const noteText = noteToEdit ? noteToEdit.text : '';
  const editingPopup = document.createElement('div');

  editingPopup.innerHTML = `
    <div id= "editing-container" data-note-id ="${noteId}">
         <h1> Edit Note</h1>
         <textarea id = "node-text">${noteText}</textarea>

         <div id = 'btn-container'>
         <button id ="submitBtn" onclick = "updateNote()"> Done </button>
         <button id ="closeBtn" onclick = "closeEditPopup()"> Cancel </button>

         </div>
    </div>
    `;
  document.body.appendChild(editingPopup);
}

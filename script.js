let myLibrary = [];

function Book(
  dataId = 0,
  title = 'Unknown',
  author = 'Unkown',
  totalpages = 0,
  readpages = 0,
  completed = false
) {
  this.dataId = dataId;
  this.title = title;
  this.author = author;
  this.totalpages = totalpages;
  this.readpages = readpages;
  this.completed = completed;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.totalpages} pages,  ${this.readpages} lues`;
}

Book.prototype.stateRead = function () {
  switch (this.readpages) {
    case "0":
      this.completed = 'Not Read';
      this.color = '#8A111F';
      break;
    case this.totalpages:
      this.completed = 'Read';
      this.color = '#0D7A25';
      break;
    default:
      this.completed = 'Reading';
      this.color = '#A25B19';
  }
};

/* Formulaire */

fieldButton = document.getElementById('fieldSubmit');

fieldButton.addEventListener('click', function(e) {
  e.preventDefault();
  addBookToLibrary();
  e.stopPropagation();

});


function addBookToLibrary() {
  
  let inputValues = [];
  inputValues.push(0);
  for (let i of document.querySelectorAll('.field > input')) {
    inputValues.push(i.value);
    i.value = "";
  }
  let mybook = new Book(...inputValues);
  myLibrary.push(mybook);
  myLibrary[myLibrary.length - 1].stateRead();
  console.table(myLibrary);
  createTile(mybook);
};


function createTile(book) {
  let tile = document.createElement('div');
  let icons = document.createElement('p');
  let iconPen = document.createElement('i');
  let iconTrash = document.createElement('i');
  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let bookPages = document.createElement('p');
  let pageCounter = document.createElement('p');
  let iconMinus = document.createElement('i');
  let iconPlus = document.createElement('i');
  let bookPagesRead = document.createElement('span');
  let button = document.createElement('button');

  tile.classList.add("tile");
  button.classList.add('stateReadingBtn');
  icons.classList.add('icons');
  iconPen.classList.add('fa-solid', 'fa-pen');
  iconTrash.classList.add('fa-solid', 'fa-trash-can');
  iconMinus.classList.add('fa-solid', 'fa-minus');
  iconPlus.classList.add('fa-solid', 'fa-plus');
  bookTitle.classList.add('bookTitle');
  bookAuthor.classList.add('bookAuthor');
  bookPages.classList.add('bookPages');
  bookPagesRead.classList.add('bookPagesRead');

  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  bookPages.innerText = book.totalpages;
  bookPagesRead.innerText = book.readpages + "/" + book.totalpages + " ";
  button.innerText = book.completed;
  button.style.backgroundColor = book.color;

  icons.appendChild(iconPen);
  icons.appendChild(iconTrash);
  tile.appendChild(icons);
  tile.appendChild(bookTitle);
  tile.appendChild(bookAuthor);
  tile.appendChild(bookPages);
  pageCounter.appendChild(iconMinus);
  pageCounter.appendChild(bookPagesRead);
  pageCounter.appendChild(iconPlus);
  tile.appendChild(pageCounter);
  tile.appendChild(button);


  button.addEventListener('click', function (e) {
    udapteReadingStatus(button)
    e.stopPropagation();
  });

  iconPlus.addEventListener('click', function (e) {
    plusOnePage(book, bookPagesRead);
    e.stopPropagation();
  });

  iconMinus.addEventListener('click', function (e) {
    minusOnePage(book, bookPagesRead);
    e.stopPropagation();
  });


  document.getElementById('library').insertBefore(tile, document.getElementById('plus'));

}


function plusOnePage(book, bookPagesRead) {
  book.readpages++
  bookPagesRead.innerText = book.readpages + "/" + book.totalpages + " ";
}

function minusOnePage(book, bookPagesRead) {
  book.readpages--
  bookPagesRead.innerText = book.readpages + "/" + book.totalpages + " ";
}



function udapteReadingStatus(button) {
  if (button.innerText == 'Read') {
    button.style.backgroundColor = '#8A111F';
    button.innerText = 'Not Read';
  } else {
    button.style.backgroundColor = '#0D7A25';
    button.innerText = 'Read';
  }
};












/* Animation bouton état lecture */

btn1 = document.getElementsByClassName('stateReadingBtn');
btn2 = document.getElementsByClassName('fa-plus');
btn3 = document.getElementsByClassName('fa-minus');
bookPagesRead = document.getElementsByClassName('bookPagesRead');

const flag = {
  value: 0
};

const state = {
  0: {
    name: "Not read",
    color: "red"
  },
  1: {
    name: "Reading",
    color: "orange"
  },
  2: {
    name: "Read",
    color: "green"
  }
};

btn1[0].addEventListener('click', function (e) {
  e.stopPropagation();
  updateButton();
});

btn2[0].addEventListener('click', function (e) {
  e.stopPropagation();
  plusOnePage2();
});

btn3[0].addEventListener('click', function (e) {
  e.stopPropagation();
  minusOnePage2();
});

function updateButton() {
  btn1[0].innerText = state[flag.value].name;
  btn1[0].style.backgroundColor = state[flag.value].color;
  btn1[0].style.color = "white";
  if (flag.value < 2) {
    flag.value++;
  } else {
    flag.value = 0;
  }
};

function plusOnePage2() {
  bookPagesRead[0].innerText++;
}

function minusOnePage2() {
  bookPagesRead[0].innerText--;
}





updateButton()





/* Footer */
const year = document.getElementById('current-year');
year.innerHTML = new Date().getFullYear();
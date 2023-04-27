import init from "./chat.js";

import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000");

const gridTableContainer = document.querySelector('#grid-table') 
const userName = document.getElementById('userName');

// landingpage
const firstPageContainer = document.getElementById('firstPageContainer');

function landingPage() {
    let landingPage = document.createElement('div');
    landingPage.className = 'landing-page-container';
    landingPage.innerHTML = `
    <form id="form" class="row gx-3 gy-2 align-items-center">
      <label class="visually-hidden" for="inputNickName">What's your nickname?</label></br>
        <input type="text" class="form-control" id="inputNickName"> </br></br>
      <label class="visually-hidden" for="colorInput">Choose a color</label>
        <input type="color" class="form-control form-control-color" id="colorInput" value="#563d7c" title="Choose your color"></br></br>

        <button id="submitBtn">Join</button>
    </form>
  `;


    firstPageContainer.appendChild(landingPage);

    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const nickname = inputNickName.value;
        const color = colorInput.value;
        
        // Emit the nickname event to the server
        socket.emit('nickname', nickname);

        console.log(nickname + " " + color);

        //show grid-and-chat-container if submit is pressed
        const gridChatContainer = document.getElementById('gridChatContainer');
        gridChatContainer.style.display = "flex";
        landingPage.style.display = "none";
        getUserName();
        createGrid();
    });

};

landingPage();

function getUserName () {
  userName.innerText = inputNickName.value;
}

const table = document.createElement('table');

function createGrid (){

console.log("table", table);
for (let i = 1; i <= 15; i++) {
    const row = document.createElement('tr');
    for (let r = 1; r <= 15; r++) {
        const cell = document.createElement('td');
        let cellID = `cell_${i}_${r}`;
        cell.id = cellID;
        cell.addEventListener('click', () => {
            //console.log(cellID + colorInput.value);
            cell.style.background = colorInput.value;
            socket.emit('cellClicked', { cellID: cellID, color: colorInput.value }); // << sending each cell clicked with cellID and color to server
        });
        row.appendChild(cell);
    }
    table.appendChild(row);
}

gridTableContainer.appendChild(table);

const saveBtn = document.createElement('button');
saveBtn.innerText = "Save";
gridTableContainer.appendChild(saveBtn);

saveBtn.addEventListener("click", saveTable);

}

// << listen for the updateCell event and update cell with color
socket.on('updateCell', (data) => {
  const cell = document.getElementById(data.cellID);
  cell.style.background = data.color;
});



let savedTables = [];
let savedTable = []

function saveTable() {
  
  savedTable
  const tdId = document.querySelectorAll("td")

  savedTable = []
    
  for (let i = 0; i < tdId.length ; i++) {
    let id = tdId[i].id
    let color = tdId[i].style.background
    
    let obj = {
      id: id,
      color: color
    }

    if(id && color){
      savedTable.push(obj)
    }
  }
  
  // Kontrollerar om "grid" är tom innan "save"
  if (savedTable.length > 0) {
    savedTables.push(savedTable);
    console.log(savedTables);
  } else {
    console.log('Table is empty. Not saving.');
  }  

  //savedTables.push(savedTable)
  //console.log(savedTables)
  table.innerHTML = ""
  gridTableContainer.innerHTML = ""
  createGrid()
  createSavedTableButtons();
}

function restoreSavedTable(savedTable) {
  for (let i = 0; i < savedTable.length; i++) {
    let cell = document.getElementById(savedTable[i].id)
    cell.style.background = savedTable[i].color
  }
}


function createSavedTableButtons() {
 
  for (let i = 0; i < savedTables.length; i++) {
    let savedTableData = savedTables[i]


    let buttonExists = false
    let buttons = document.querySelectorAll("button[data-saved-table]")
    buttons.forEach(function(button) {
      let buttonSavedTable = JSON.parse(button.getAttribute("data-saved-table"))
      if (JSON.stringify(buttonSavedTable) === JSON.stringify(savedTableData)) {
        buttonExists = true
      }
    })

    if (!buttonExists) {

      let button = document.createElement("button")
      button.setAttribute("data-saved-table", JSON.stringify(savedTableData))
      button.innerHTML = "Restore saved table " + (i + 1)


      button.addEventListener("click", function() {

        let savedTableData = this.getAttribute("data-saved-table")
        let savedTable = JSON.parse(savedTableData)


        table.innerHTML = ""
        gridTableContainer.innerHTML = ""
        createGrid()
        restoreSavedTable(savedTable)
      })


      document.body.appendChild(button)
    }
  }
}


const clearGridBtn = document.getElementById("clear-grid-btn")


clearGridBtn.addEventListener("click", function() {

  table.innerHTML = ""
  gridTableContainer.innerHTML = ""
  socket.on('clear board', () => {
    console.log('Clearing board for all players')
  
    table.innerHTML = ""
    gridTableContainer.innerHTML = ""
    socket.emit('clear board')
    createGrid()
    clearBoard()
  })

  //createGrid()
})

function clearBoard() {
  socket.emit('clear board')
}


init();
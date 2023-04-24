import init from "./chat.js";

import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000");

const gridTableContainer = document.querySelector('#grid-table') 

const table = document.createElement('table');

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

        //console.log(nickname + " " + color);

        //show grid-and-chat-container if submit is pressed
        const gridChatContainer = document.getElementById('gridChatContainer');
        gridChatContainer.style.display = "flex";
        landingPage.style.display = "none";
    });

};

landingPage();
showGrid();

function showGrid() {
  console.log("showGrid");
  for (let i = 1; i <= 15; i++) {
    const row = document.createElement('tr');
    for (let r = 1; r <= 15; r++) {
        const cell = document.createElement('td');
        let cellId = `cell_${i}_${r}`;
        cell.id = cellId
        cell.addEventListener("click", test);
        row.appendChild(cell);
    }
    table.appendChild(row);
  }
  //socket.emit("grid", {grid: table})
  //console.log("table 1", table);

  gridTableContainer.appendChild(table); 
}

function test(e) {
  const cellId = e.currentTarget.id;
  const cell = e.currentTarget;

  socket.emit("table", {color: colorInput.value, cellId: cellId})

  console.log("cellId", cellId);
  console.log("cell", cell);
  console.log("colorInput", colorInput.value, colorInput);
  
  socket.on("table", function(grid) {
    console.log("table", table);
    //cell.style.background = grid.color;
    console.log("grid", grid.color);
    if(cellId === grid.cellId) {
      console.log("ja", grid.color);
      cell.style.background = grid.color;
    } else {
      //cell.style.background = colorInput.value;
    }
  })
}

const saveBtn = document.createElement('button');
saveBtn.innerText = "Save";
gridTableContainer.appendChild(saveBtn);

saveBtn.addEventListener("click", saveTable);

function saveTableToServer(cellId) {
  console.log("cellId saveTableToServer", cellId);
  socket.emit("table", {table: table, color: colorInput.value, cellId: cellId})
  
  getTable();
}

function getTable() {
  socket.on("table", function(table) {
    console.log("table", table);

    
  })
}

function saveTable() {
  const tdId = document.querySelectorAll("td");
  let savedTable = [];

  for (let i = 0; i < tdId.length ; i++) {
    let id = tdId[i].id;
    let color = tdId[i].style.background;

    // går igenom en if-sats och kolla om varje cell som ha en background-style property(dvs om den är färglagd), så läggs den till i savedTable arrayn.
    if(color) {
      const obj = { 
        id, color 
      };
      savedTable.push(obj)
    }

  }
  // savedTable sparar id och color som ett objekt, därför måste vi konvertera det till en JSON string.
  console.log('sparad tabell: ' + JSON.stringify(savedTable));
}

init();
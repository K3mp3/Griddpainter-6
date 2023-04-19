import init from "./chat.js";

// landingpage
const firstPageContainer = document.getElementById('firstPageContainer');

function landingPage() {
    let landingPage = document.createElement('div');
    landingPage.className = 'landing-page-container';
    landingPage.innerHTML = `
    <form>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-3">Gridpainter 6</h1>
      <p class="lead">Select a nickname and a color!!!</p>
    </div>
  </div>
  <form id="form" class="row gx-3 gy-2 align-items-center">
    <div class="col-sm-3">
      <label class="visually-hidden" for="inputNickName">Username</label>
      <div class="input-group">
        <div class="input-group-text">@</div>
        <input type="text" class="form-control" id="inputNickName" placeholder="Nickname">
      </div>
    </div>
    <div class="col-sm-1">
      <input type="color" class="form-control form-control-color" id="colorInput" value="#563d7c" title="Choose your color">
    </div>

    <div class="col-auto">
      <button id="submitBtn">Submit</button>
    </div>
    </form>
`;


    firstPageContainer.appendChild(landingPage);

    const submitBtn = document.getElementById('submitBtn');
    const inputNickName = document.getElementById('inputNickName');
    const colorInput = document.getElementById('colorInput');

    submitBtn.addEventListener('click', () => {
        console.log('click');
        console.log(inputNickName.value + " " + colorInput.value);
    })

};

landingPage();


const table = document.createElement('table');
for (let i = 1; i <= 15; i++) {
    const row = document.createElement('tr');
    for (let r = 1; r <= 15; r++) {
        const cell = document.createElement('td');
        let cellID = `cell_${i}_${r}`;
        cell.id = cellID;
        cell.addEventListener('click', () => {
            console.log(cellID);
            cell.classList.add('red');  // add class "red" to the clicked cell (change later to the color that user pick)

        });
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);

const saveBtn = document.createElement('button');
saveBtn.innerText = "Save";
document.body.appendChild(saveBtn);


init();
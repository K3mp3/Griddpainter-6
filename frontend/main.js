import init from "./chat.js";

const gridTableContainer = document.querySelector('#grid-table') 

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
gridTableContainer.appendChild(table);

const saveBtn = document.createElement('button');
saveBtn.innerText = "Save";
document.body.appendChild(saveBtn);

init();
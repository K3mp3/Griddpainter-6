import './style.css'

const table = document.createElement('table');
for (let i = 1; i <= 15; i++) {
    const row = document.createElement('tr');
    for (let r = 1; r <= 15; r++) {
        const cell = document.createElement('td');
        cell.id = `cell_${i}_${r}`;
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);
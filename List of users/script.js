const container = document.getElementById('container');
const header = document.createElement('h1');
header.textContent = "List of Users: \n"
container.appendChild(header);

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => response.json())
.then((users) =>{
    const table = document.createElement('table');
    for(let user of users) {
        const tableRow = document.createElement('tr');
        const userId = document.createElement('td');
        userId.textContent = user.id;
        const userName = document.createElement('td');
        userName.textContent = user.name;
        tableRow.appendChild(userId);
        tableRow.appendChild(userName);
        table.appendChild(tableRow);
    }
    container.appendChild(table);
})

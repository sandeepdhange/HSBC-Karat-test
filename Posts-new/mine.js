const container = document.getElementById("container");

const heading = document.createElement('h2');
heading.textContent = 'Editable Posts:';
container.appendChild(heading);

const table = document.createElement('table');
container.appendChild(table);

const thead = document.createElement('thead');
thead.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        <th>Action</th>
    </tr>
`
table.appendChild(thead);

const tbody = document.createElement('tbody');
table.appendChild(tbody);

const dialog = document.createElement('dialog');
dialog.innerHTML = `
    <h3>Are you sure ?</h3>
    <button id="confirm" > YES </button>
`
container.appendChild(dialog);
document.getElementById('confirm').addEventListener('click', () => {
    loadPosts();
    dialog.close();
})

async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    tbody.innerHTML = "";

    data.slice(0,5).forEach(post => {
        let row = createRow(post);
        tbody.appendChild(row);
    })
}

function createRow(post) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${post.id}</td>
        <td class="title">${post.title}</td>
        <td class="body">${post.body}</td>
        <td>
         <button class="edit"> Edit </button>
        </td>
    `;
    const editBtn = tr.querySelector('.edit');
    editBtn.addEventListener('click', () => {
        handleEdit(tr, post);
    })
    return tr;
}

function handleEdit(tr, post) {
    const titleCell = tr.querySelector('.title');
    const bodyCell = tr.querySelector('.body');
    const actionCell = tr.querySelector('td:last-child');

    titleCell.innerHTML = `<input id="editedTitle" value="${titleCell.textContent}"/>`;
    bodyCell.innerHTML = `<input id="editedBody" value="${bodyCell.textContent}"/>`;
    actionCell.innerHTML = `
    <button class="save"> Save </button>
    <button class="cancel"> Cancel </button>
    `;

    actionCell.querySelector('.save').addEventListener('click', () => handleSave(tr, post));
    actionCell.querySelector('.cancel').addEventListener('click', () => {
         dialog.showModal();
    });
}

async function handleSave(tr, post) {
    const title = document.getElementById('editedTitle').value;
    const body = document.getElementById('editedBody').value;
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    const updated = await res.json();
    tr.innerHTML = `
        <td>${updated.id}</td>
        <td class="title">${updated.title}</td>
        <td class="body">${updated.body}</td>
        <td>
         <button class="edit"> Edit </button>
        </td>
    `;
    const editBtn = tr.querySelector('.edit');
    editBtn.addEventListener('click', () => {
        handleEdit(tr, post);
    })
}

loadPosts();
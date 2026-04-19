const container = document.getElementById("container");

const title = document.createElement("h2");
title.textContent = "Editable Posts Table";
container.appendChild(title);

const table = document.createElement("table");
container.appendChild(table);

const thead = document.createElement("thead");
thead.innerHTML = `
<tr>
  <th>ID</th>
  <th>Title</th>
  <th>Body</th>
  <th>Action</th>
</tr>`;
table.appendChild(thead);

const tbody = document.createElement("tbody");
table.appendChild(tbody);

// Fetch data
async function loadPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  tbody.innerHTML = "";

  data.slice(0, 10).forEach(post => {
    const row = createRow(post);
    tbody.appendChild(row);
  });
}

function createRow(post) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${post.id}</td>
    <td class="title">${post.title}</td>
    <td class="body">${post.body}</td>
    <td>
      <button class="edit">Edit</button>
    </td>
  `;

  const editBtn = tr.querySelector(".edit");

  editBtn.addEventListener("click", () => handleEdit(tr, post.id));

  return tr;
}

function handleEdit(tr, id) {
  const titleCell = tr.querySelector(".title");
  const bodyCell = tr.querySelector(".body");
  const actionCell = tr.querySelector("td:last-child");

  const titleText = titleCell.textContent;
  const bodyText = bodyCell.textContent;

  titleCell.innerHTML = `<input value="${titleText}">`;
  bodyCell.innerHTML = `<input value="${bodyText}">`;

  actionCell.innerHTML = `
    <button class="save">Save</button>
    <button class="cancel">Cancel</button>
  `;

  actionCell.querySelector(".save").addEventListener("click", () => saveRow(tr, id));
  actionCell.querySelector(".cancel").addEventListener("click", loadPosts);
}

async function saveRow(tr, id) {
  const newTitle = tr.querySelector(".title input").value;
  const newBody = tr.querySelector(".body input").value;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: newTitle, body: newBody }),
    headers: { "Content-type": "application/json" }
  });

  const updated = await res.json();

  tr.querySelector(".title").textContent = updated.title;
  tr.querySelector(".body").textContent = updated.body;

  const actionCell = tr.querySelector("td:last-child");
  actionCell.innerHTML = `<button class="edit">Edit</button>`;

  actionCell.querySelector(".edit").addEventListener("click", () => handleEdit(tr, id));
}

// Init
loadPosts();
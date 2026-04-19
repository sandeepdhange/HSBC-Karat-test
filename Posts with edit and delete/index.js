const container = document.getElementById('posts-container');

let allPosts = [];
let visible = 10;

async function fetchPosts() {
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
        allPosts = data;
        renderPosts();
    })
}
fetchPosts();

function updatePost(post) {
    const filteredPost = allPosts.filter(p => p.id !== post.id);
    allPosts = [
        post,
        ...filteredPost
    ]
    allPosts.sort((a,b) => a.id - b.id)
    console.log('Updated succussfully..')
    renderPosts();
}

function deletePost(postId) {
    allPosts = allPosts.filter(p => p.id !== postId);
    console.log('Deleted succussfully..', postId)
    renderPosts();
}
function renderPosts() {
    container.innerHTML = ""
    const table = document.createElement('table');
    allPosts.forEach(post => {
        const tableRow = document.createElement('tr');
        const postId = document.createElement('td');
        postId.textContent = post.id;
        tableRow.appendChild(postId)

        const postBody = document.createElement('td');
        const textArea = document.createElement('textarea');
        textArea.rows = 5;
        textArea.cols = 100;
        textArea.readOnly = true;
        textArea.value = post.body
        postBody.appendChild(textArea);
        tableRow.appendChild(postBody)

        const postEdit = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit"
        postEdit.appendChild(editBtn);
        tableRow.appendChild(postEdit)

        const postSave = document.createElement('td');
        const saveBtn = document.createElement('button');
        saveBtn.textContent = "Save"
        postSave.appendChild(saveBtn);
        tableRow.appendChild(postSave)

        const postDelete = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete'
        postDelete.appendChild(deleteBtn);
        tableRow.appendChild(postDelete)

        table.appendChild(tableRow)

        editBtn.addEventListener('click', () => {
            textArea.readOnly = false;
        })

        saveBtn.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...post,
                    body: textArea.value
                }),
                headers: {
                    'Content-type': 'application/json',
                },
                })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(err => console.log(err));

            updatePost({
                ...post,
                body: textArea.value
            });
        })

        deleteBtn.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'DELETE',
                })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(err => console.log(err));

            deletePost(post.id)
        })

    })
    container.appendChild(table);
    
}
const container = document.getElementById('post-container');
const searchInp = document.getElementById('search');
const loadMoreBtn = document.getElementById('load-more');

let posts = [];
let allPosts = [];
let visiblePosts = 10;

fetch('https://jsonplaceholder.typicode.com/posts')
.then((res) => res.json())
.then((data) => {
    posts = data;
    allPosts = data;
    renderPosts();
})

function renderPosts() {
     container.innerHTML = "";

     if(posts.length === 0) {
        container.innerHTML = `
        <p> Not found</p>
        `
        return;
     }

     posts.slice(0,visiblePosts).forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h1> id: ${post.id}</h1>
            <h2>${post.title}</h2>
            <p>${post.body.slice(0,100)}...</p>
        `
        container.appendChild(card);
        
     })
}

loadMoreBtn.addEventListener('click', () => {
    visiblePosts += 10;
    renderPosts();
})

searchInp.addEventListener('input', () => {
    const searchValue = searchInp.value.toLowerCase();
    filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(searchValue));
    posts = filteredPosts;
    visiblePosts = 10;
    renderPosts();
})

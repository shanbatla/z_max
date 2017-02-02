const urlPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums?userId=1';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos?userId=1';

let numOfUserPosts;
let numOfUserAlbums;
let numOfUserTodos;
let userPosts;

const initFetchGet = {
  method: 'GET'
};

function logUserDesc(numPosts, numAlbums, numTodos) {
  console.log('Bret has ' + numPosts + ' posts, ' + numAlbums + ' albums, and ' + numTodos + ' todos');
}

function logUserPosts(posts) {
  posts.forEach(function(post, index) {
    if((index + 1) <= 5) {
      console.log('Post ' + (index + 1) + ': ' + post.title);
    } else {
      return;
    }
  });
}

function fetchPosts() {
  fetch(urlPosts, initFetchGet)
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      numOfUserPosts = posts.length;
      userPosts = posts;
      fetchAlbums();
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}

function fetchAlbums() {
  fetch(urlAlbums, initFetchGet)
  .then(function(response) {
    return response.json();
  })
  .then(function(albums) {
    numOfUserAlbums = albums.length;
    fetchTodos();
  })
  .catch(function(error) {
    console.log('Request failed: ' + error);
  });
}

function fetchTodos() {
  fetch(urlTodos, initFetchGet)
    .then(function(response) {
      return response.json();
    })
    .then(function(todos) {
      numOfUserTodos = todos.length;
      logUserDesc(numOfUserPosts, numOfUserAlbums, numOfUserTodos);
      logUserPosts(userPosts);
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}


fetchPosts();
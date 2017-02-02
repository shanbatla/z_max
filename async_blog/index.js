const urlPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums?userId=1';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos?userId=1';

let numOfUserPosts = 0;
let numOfUserAlbums = 0;
let numOfUserTodos = 0;

const initFetchGet = {
  method: 'GET'
};

function userDesc(posts, albums, todos) {
  console.log('Bret has ' + posts + ' posts, ' + albums + ' albums, and ' + todos + ' todos');
}

function fetchPosts() {
  fetch(urlPosts, initFetchGet)
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      numOfUserPosts = posts.length;
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
      userDesc(numOfUserPosts, numOfUserAlbums, numOfUserTodos);
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}


fetchPosts();
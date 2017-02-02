const urlUserPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos';

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
      posts.forEach(function(post) {
        if(post.userId === 1) {
          numOfUserPosts++;
        }
      });

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
      todos.forEach(function(todo) {
        if(todo.userId === 1) {
          numOfUserTodos++;
        }
      });

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
      albums.forEach(function(album) {
        if(album.userId === 1) {
          numOfUserAlbums++;
        }
      });

      userDesc(numOfUserPosts, numOfUserAlbums, numOfUserTodos)
      
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}

fetchPosts();
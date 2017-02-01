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

fetch(urlUserPosts, initFetchGet)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log('Request failed: ' + error);
  });
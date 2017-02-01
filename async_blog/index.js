const urlUserPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

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
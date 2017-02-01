const urlUserPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';

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
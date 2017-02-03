/**
* Usage:
*
* Load index.html (located in the same directory as this file) into a browser and open the console.  The script will execute upon load.
*/

// Declare variables
const urlPosts = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const urlAlbums = 'https://jsonplaceholder.typicode.com/albums?userId=1';
const urlTodos = 'https://jsonplaceholder.typicode.com/todos?userId=1';
const urlPostComments = 'https://jsonplaceholder.typicode.com/comments?postId=1';
const urlCreateComment = 'https://jsonplaceholder.typicode.com/comments?postId=1';

const comment = 'Great post!';

let numOfUserPosts;
let numOfUserAlbums;
let numOfUserTodos;
let userPosts;
let userPostComments;

// Initialize/configure fetch params
const initFetchGet = {
  method: 'GET'
};

const initFetchPost = {
  method: 'POST',
  body: JSON.stringify(comment)
};

// Declare logging functions
function logUserDesc(numPosts, numAlbums, numTodos) {
  console.log('Bret has ' + numPosts + ' posts, ' + numAlbums + ' albums, and ' + numTodos + ' todos');
}

function logUserPosts(posts) {
  for(var i = 0; i <= 4; i++) {
    console.log('Post ' + (i + 1) + ': ' + posts[i].title);
  }
}

function logCommentDetails(comments) {
  console.log('Viewing "' + userPosts[4].title + '" which has ' + comments.length + ' comments');
}

function logCreateCommentSuccess(comment) {
  console.log('You commented "' + comment + '"' );
}

// Declare fetch functions
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

function fetchPostComments() {
  fetch(urlPostComments, initFetchGet)
    .then(function(response) {
      return response.json();
    })
    .then(function(postComments) {
      logCommentDetails(postComments);
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}

function createComment() {
  fetch(urlCreateComment, initFetchPost)
    .then(function() {
      logCreateCommentSuccess(comment);
    })
    .catch(function(error) {
      console.log('Request failed: ' + error);
    });
}

// Init script
fetchPosts();
setTimeout(fetchPostComments, 2000);
setTimeout(createComment, 4000);
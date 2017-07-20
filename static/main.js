navigator.serviceWorker.register('service-worker.js', {
  scope: './'
});

document.getElementById('submit').addEventListener('click', function(e) {
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/whatever');
  xhr.onload = function() {
    console.log(xhr.responseText);
  };
  xhr.send();
  e.preventDefault();
});

document.getElementById('http-submit').addEventListener('click', function(e) {
  // e.preventDefault();
  // var xhr = new XMLHttpRequest();
  // xhr.open('post', 'http://localhost:8080/whatever');
  // xhr.onload = function() {
  //   console.log(xhr.responseText);
  // };
  // xhr.send();
});

var counter = 0;
self.addEventListener('fetch', function(evt) {
  console.log('counter', counter);
  counter += 1;
  console.log('mode', evt.request.mode);
  console.log('fetch', evt.request.method, evt.request.url);
  let httpUrl = '' + evt.request.url;
  httpUrl = httpUrl.replace('https', 'http').replace('4443', '8080');
  console.log('moving on over to', httpUrl);

  if (evt.request.method !== 'POST') {
    evt.respondWith(fetch(evt.request));
    return;
  }

  let fakeResponse = new Response('http but fake', {
    status: 200,
    statusText: ':)'
  });

  evt.respondWith(Promise.resolve(fakeResponse));
  return;

  let httpRequest = new Request(httpUrl, {
    method: evt.request.method,
    mode: evt.request.mode,
  });
  fetch(httpRequest).then(res => {
    console.log('first', res);
    return res.text();
  }).then(res => {
    console.log('and then', res);
  }).catch(err => {
    console.log('harumph');
    console.log(err);
  });
  // evt.respondWith(fetch(httpRequest));
});

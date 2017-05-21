// require the express package for our app
const express = require('express');

// instantiate our express app
const app = express();

////////////////////////////////////////////////////////////////////
// CUSTOM MIDDLEWARE FUNCTIONS
////////////////////////////////////////////////////////////////////
function requestLogger(request, response, next) {
  const now = new Date();

  console.log(`/////////////////////////////////////////////////////////////////\nRequest Information:\n${now.toLocaleDateString()}\n${now.toLocaleTimeString()}\n${request.method}\n${request.url}\n/////////////////////////////////////////////////////////////////`);

  next();
}

function checkQueryParams(request, response, next) {
  if (request.query.notAMember === 'true') {
    return response.json({notAMember: true});
  }
  next();
}

function urlBMiddleware1(request, response, next) {
  console.log(`urlBMiddleware1`);
  next();
}

function urlBMiddleware2(request, response, next) {
  console.log(`urlBMiddleware2`);
  next();
}

function urlBMiddleware3(request, response, next) {
  console.log(`urlBMiddleware3`);
  next();
}

const urlBMiddlewares = [urlBMiddleware1, urlBMiddleware2, urlBMiddleware3];

app.use(requestLogger);

app.use(checkQueryParams);

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
  console.log(request.hostname);
});

app.get('/urlA', (request, response) => { response.send('response for urlA'); });

app.get('/urlB', urlBMiddlewares, (request, response) => { response.send('response for urlB'); });


app.listen(process.env.PORT || 8080, () => {
  console.log(`listening on port ${process.env.PORT || 8080}`);
});
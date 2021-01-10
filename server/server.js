'use strict';

const http = require('http');
const db = require('./dbhandle.js');
const { parse } = require('querystring');

const getRoutes = (midUrl, endUrl = '') =>  ({
  'main': db.mainPage,
  'movie': () => db.moviesFullInfo('Movie', +endUrl),
  'director': () => db.moviesFullInfo('Director', +endUrl),
  'genre': () => db.moviesFullInfo('Genre' ,+endUrl),
  'distributor': () => db.moviesFullInfo('Distributor', +endUrl),
  'studio': () => db.moviesFullInfo('Studio', +endUrl),
  'awards': () => db.getAwards(...endUrl.split('-'))
})[midUrl] || db.mainPage;

const postRoutes = {
  '/deleteUser': db.deleteUser,
  '/createUser': db.createUser,
  '/review': db.postReview
};

const splitRoutes = (str) => str.slice(1).split('/').slice(-2)

const handleRequest = async (req, res) => {
  if (req.method === 'GET') {
    console.log(`${req.url} is url`);
    const [midUrl, endUrl] = splitRoutes(req.url);
    return getRoutes(midUrl, endUrl)();
  } else if (req.method === 'POST') {
    collectRequestData(req, result => {
      const data = JSON.parse(Object.keys(result)[0]);
      console.log(data);
      postRoutes[req.url](data);

      res.end(`Data parsed`);
      return Promise.resolve({id: 1});
    });
  }
  return Promise.resolve({id:5});

}

const collectRequestData = (request, callback) => {
  try {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      callback(parse(body));
    });
  } catch (e) {
    console.log('POST request error' + e.toString());
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  handleRequest(req, res).then((data) => {
    // console.log(JSON.stringify(data));
    res.write(JSON.stringify(data));
  }).then(() => res.end());
})

server.listen(8080);


//handling rejections in promises
process.on('unhandledRejection', error => {
  console.log('rejection: ', error);
});

process.on('rejectionHandled', promise => {
  console.log('rejection handled: ' + promise);
});
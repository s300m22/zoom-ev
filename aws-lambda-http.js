const express = require('express');
const next = require('next');
const { createServer, proxy } = require('aws-serverless-express');
const { eventContext } = require('aws-serverless-express/middleware');

let cachedServer;

function getCachedServer() {
  try {
    const nextApp = next({});
    const nextRequestHandler = nextApp.getRequestHandler();

    const expressApp = express();

    expressApp.use(express.static('build'));

    expressApp.all('*', (req, res) => {
      return nextRequestHandler(req, res);
    });

    expressApp.use(eventContext());

    return createServer(expressApp, undefined, []);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.handler = (event, context) => {
  if (!cachedServer) {
    cachedServer = getCachedServer();
  }

  proxy(cachedServer, event, context);
};

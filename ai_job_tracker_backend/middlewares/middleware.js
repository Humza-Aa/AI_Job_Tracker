// middleware.js
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString("hex");

const setupMiddleware = (app) => {
  // Setup CORS
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // Parse JSON request bodies
  app.use(express.json());

  // Setup session handling
  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
};

module.exports = setupMiddleware;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");

const credentials = JSON.parse(
  fs.readFileSync("../Creds/gmail_credentials.json")
);

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.client_id,
      clientSecret: credentials.project_id,
      callbackURL: "http://localhost:3000/",
    },
    (accessToken, refreshToken, profile, done) => {
      // Perform user lookup and creation logic here
      return done(null, profile);
    }
  )
);

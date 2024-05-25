const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const credentialsPath = path.join(__dirname, "../Creds/gmail_credentials.json");

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8")).web;

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.client_id,
      clientSecret: credentials.client_secret,
      callbackURL: "http://localhost:5000/auth/google/callback",
      accessType: "offline",
      prompt: "consent",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("Google profile:", profile);
        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
            accessToken,
            refreshToken,
          });
          await user.save();
        } else {
          user.accessToken = accessToken;
          if (refreshToken) {
            user.refreshToken = refreshToken;
          }
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id);
  try {
    const user = await User.findById(id);
    console.log("User found during deserialization:"); // Log the user object found
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err); // Log any errors that occur
    done(err, null);
  }
});

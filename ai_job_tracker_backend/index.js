const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const Application = require("./models/ApplicationS");
const User = require("./models/User");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const crypto = require("crypto");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");
const jobRoutes = require("./routes/jobRoutes");
const googleRoutes = require("./routes/googleAuthRoute")

app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from localhost:3000
    credentials: true, // allow credentials
  })
);
app.use(express.json());

const secret = crypto.randomBytes(64).toString("hex");

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "Jobs",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const credentials = JSON.parse(
  fs.readFileSync("Creds/gmail_credentials.json")
).web;

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.client_id,
      clientSecret: credentials.client_secret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            accessToken,
            refreshToken,
          });
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
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id);
  try {
    const user = await User.findById(id);
    console.log("User found during deserialization:", user); // Log the user object found
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err); // Log any errors that occur
    done(err, null);
  }
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: [
//       "profile",
//       "email",
//       "https://www.googleapis.com/auth/gmail.readonly",
//     ],
//   })
// );

// Route for handling the callback from Google OAuth 2.0
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     req.session.save((err) => {
//       if (err) {
//         console.error("Error saving session:", err);
//         res.redirect("/login");
//       } else {
//         res.redirect("http://localhost:3000/homepage");
//       }
//     });
//   }
// );

// Route for logging out
// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error("Error logging out:", err);
//       return res.status(500).json({ error: "Failed to logout" });
//     }
//     res.redirect("/");
//   });
// });
app.use("/auth", googleRoutes)
app.use("/api/jobs", jobRoutes);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

app.get("/current_user", (req, res) => {
  console.log("Authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

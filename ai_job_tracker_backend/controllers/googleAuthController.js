const passport = require("passport");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.readonly"],
});

exports.googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.redirect("/login");
          }
          return res.redirect("http://localhost:3000/homepage");
        });
      });
    }
  )(req, res, next);
};

exports.googleLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.redirect("/");
  });
};

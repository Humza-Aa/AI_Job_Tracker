const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
const jobRoutes = require("./routes/jobRoutes");
const googleRoutes = require("./routes/googleAuthRoute");
const setupMiddleware = require("./middlewares/middleware");

require("./config/passport");

setupMiddleware(app);

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

app.use("/auth", googleRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

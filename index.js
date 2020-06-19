const express = require("express");
const mongoose = require("mongoose");
const env = require("./env/env");
const bodyParser = require("body-parser");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const morgan = require("morgan");
const UserRoute = require("./routes/user.route");
// app initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
// morgan("tiny");

// database connection
mongoose.connect(
  env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;
    console.log("db Working");
  }
);

// index route
app.get("/", (req, res) => res.send("Hello"));
app.use("/", JobRoutes);
app.use("/", UserRoute);
// server initialization
app.listen(env.PORT, (err) =>
  console.log(`Server Working At Port: ${env.PORT}`)
);

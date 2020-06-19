const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const morgan = require("morgan");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
// app initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config({ path: "./config/config.env" });

// database connection
connectdb();

// index route
app.get("/", (req, res) => res.send("Hello"));
app.use("/", JobRoutes);
app.use("/", UserRoute);

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(port, (err) =>
  console.log(`Server Working At Port: ${process.env.PORT}`)
);

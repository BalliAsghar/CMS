const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const morgan = require("morgan");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const colors = require("colors");
// app initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config({ path: "./config/config.env" });

// database connection
connectdb();

// index route
app.get("/", (req, res) => res.render("login", { layout: "login" }));
app.use("/api", JobRoutes);
app.use("/", UserRoute);

// Hbs
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "/public")));

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(port, (err) =>
  console.log(`Server Working At Port:`.bold + `${process.env.PORT.blue.bold}`)
);

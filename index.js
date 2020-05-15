//impot dotenv
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8800;

const booksRoute = require("./src/routes/books");
const authorsRoute = require("./src/routes/authors");
const genresRoute = require("./src/routes/genres");
const statusRoute = require("./src/routes/status");
const userRoute = require("./src/routes/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/image", express.static("upload"));

app.use("/api/v1/books", booksRoute);
app.use("/api/v1/authors", authorsRoute);
app.use("/api/v1/genres", genresRoute);
app.use("/api/v1/status", statusRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

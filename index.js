const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
require("dotenv").config("./.env");
require("./mail/transporter");
require("./processors/index");
const app = express();

app.use(express.json());

app.use("/users", userRoutes);



mongoose
  .connect("mongodb://localhost/emailsend")
  .then((success) => console.log("Mongodb connected successfully..."))
  .catch((error) => console.log(error));

const PORT = 4000;

app.listen(PORT, () => console.log(`App is running on ${PORT}...`));

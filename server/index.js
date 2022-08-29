// Imports:
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router.js");
require("dotenv").config({ path: "variables.env" });

// DataBase Connection:
mongoose.connect(`${process.env.URI}${process.env.DATABASE}`);

// App Settings:
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router());

// Connection:
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log("La aplicación esta corriendo en el puerto %d", server_port);
});

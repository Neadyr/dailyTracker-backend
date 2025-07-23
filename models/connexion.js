const mongoose = require("mongoose");

const connexionString = process.env.CONNEXION_STRING;

mongoose
  .connect(connexionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));

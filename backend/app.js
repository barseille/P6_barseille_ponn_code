// importation des packages
const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user"); // importation du router
const sauceRoutes = require("./routes/sauce"); // importation du router
const path = require('path');

// importation de mongoose pour me connecter à la base de donnée mongo DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5mma3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//(CORS) ajout des headers pour que tous les origines puissent communiquer entre eux
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

const sauces = require("./models/sauces");



app.use(cors());
app.use(express.json()); // accéder au corps de la req.body
app.use("/api/sauces", sauceRoutes); // route d'authentification
app.use("/api/auth", userRoutes); // route d'authentification
app.use('/images',express.static(path.join(__dirname,'images'))) // gestion des fichiers avec multer

module.exports = app;

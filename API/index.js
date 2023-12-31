// ------------------------------------------------------------ Importações Externas ------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

// ------------------------------------------------------------ Importações Internas ------------------------------------------------------------
const config = require("./src/configs/env");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/controllers/swagger-controller");
const routes = require("./src/routes/Routes");

// ------------------------------------------------------------ Instânciação ------------------------------------------------------------
const app = express();
const sessionOptions = {
  secret: "my top secret key",
  resave: false,
  saveUninitialized: true,
};

// ------------------------------------------------------------ cors/bodyparser ------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(express.static(__dirname + "/public"));

// ------------------------------------------------------------ endpoints docs ------------------------------------------------------------

app.get("/docs/swagger.json", (req, res) => res.json(swaggerSpec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------------------------------------------------ utilização rotas ------------------------------------------------------------
app.use("/", routes); //to use the routes

// start server
app.listen(config.port, function () {
  console.log(`App running on http://localhost:${config.port}`);
});

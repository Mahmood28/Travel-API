const db = require("./db/models");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);

//yarn add express cors sequelize sequelize-cli pg pg-hstore

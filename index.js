const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const routes = require("./routes");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
var cors = require('cors')

const app = express();

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors())

routes(app);

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});


const express = require("express");

const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//environment variables
require("dotenv").config();
const userRoute = require('./routes/user')

const productRoute = require('./routes/product')

app.use(userRoute)
app.use(productRoute)

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

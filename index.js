const express = require('express');
const app = express();
const helmet = require("helmet");
const cors = require("cors");
require('dotenv').config();
const walletRoute = require('./src/routes/wallet');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api",walletRoute);


app.use("/",(req,res) =>{
  res.send('home route');
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
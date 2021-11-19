const express = require("express");
const mongoose = require('mongoose');

const MongoURI = 'mongodb+srv://borsigwerke:3ezbetna@cluster0.6t7tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/admin');

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

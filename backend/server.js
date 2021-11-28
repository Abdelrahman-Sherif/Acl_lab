const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true}
);

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));

const flightsRouter = require('./routes/flightsRouter');
const Flight = require('./models/flight');
const User = require('./models/user');
app.use('/flights', flightsRouter);

app.get("/users", (req, res) => {
      const Admin = new User({
        Admin : true,
        Email: "Admin@admin.com",
        Password: "Password",
        Age: 21,
        BornIn: "Cairo",
        Name: "Admin",
        PhoneNumber: "01000",
      });
    Admin.save();
      res.send(Admin);
    })


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
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

app.use('/flights', flightsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
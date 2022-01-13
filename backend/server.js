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
const userRouter = require('./routes/userRouter');
const bookingsRouter = require('./routes/bookingsRouter');
const Flight = require('./models/flight');
const User = require('./models/user');
const Booking = require('./models/booking');
app.use('/flights', flightsRouter);
app.use('/users', userRouter);
app.use('/bookings', bookingsRouter);



// app.get("/users", (req, res) => {
//       const Admin = new User({
//         isAdmin : true,
//     email: "Admin@admin.com",
//         password: "Password",
//     firstName: "Ahmed",
//     lastName: "Mohamed",
//     passportNumber: "1000",
//       });
//     Admin.save();
//       res.send(Admin);
//     })


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
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
const AuthRouter = require('./routes/AuthRouter');
const User = require('./models/user');
const Booking = require('./models/booking');
app.use('/flights', flightsRouter);
app.use('/users', userRouter);
app.use('/bookings', bookingsRouter);
app.use('/auth', AuthRouter);


  
  app.get('/users', authenticateToken, (req, res) => {
    res.json(User.filter(user => user.email === req.user.email))
  })

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
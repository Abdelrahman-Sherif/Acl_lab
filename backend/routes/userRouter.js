
const router = require('express').Router();
const Flight = require('../models/flight');
let User = require('../models/user');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config

router.route('/getUser/:username').get((req, res) => {
  console.log("Getting user details from db username: "+ req.params.username);
  User.findOne({username: req.params.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async(req, res) => {
   const hashedPassword = await bcrypt.hash(req.body.password, 10) 
   User.findOne({
   $or: [{
        email: req.body.email
    }, {
        username: req.body.username
    }]
}).then((user)=>{ 

    if (user) {
      
      if (user.username === req.body.username) {
        return res.status(400).json("Username exists");
      } else {
        return res.status(400).json("Email exists");
      }
    }
  else 
  {
    const user = new User ({ email: req.body.email, username: req.body.username, password: hashedPassword, firstName: req.body.firstName, lastName:req.body.lastName, passportNumber:req.body.passportNumber, isAdmin:req.body.isAdmin })
      user.save();
      res.status(201).json("Added successfully")

  }
  }
  )
  })

router.route('/:id').get((req, res) => {

  console.log("Getting user details from db Id: "+ req.params.id);
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Old update router 
// router.route('/update/:id').post((req, res) => {
//   console.log("Called update user method");
 
//   User.findByIdAndUpdate(
//     { _id: req.params.id },
//     {
//       username: req.body.username,
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       passportNumber: req.body.passportNumber,
//       phoneNumber:req.body.phoneNumber,
//       address:req.body.address,
//       countryCode: req.body.countryCode,
//     }
     
//   )
//     .then(()=> {console.log("Updated User succesffully");
//   return res.status(200).json('Updated User successfully');})
//     .catch(err => {
//       console.log("Error finding User: " + err);
//       return res.status(400).json('Couldnt find User,Error: ' + err);});
// });



//New update router (repeated chuncks of code)
router.route('/update/:id').post((req, res) => {
  console.log("Called update user method");
User.findOne({email: req.body.email}).then((user)=>{ 
if (user) {
    if ((user.email === req.body.email) && (user._id != req.params.id) ) {
      return res.status(400).json("Email exists");
    } else{
      User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          passportNumber: req.body.passportNumber,
          phoneNumber:req.body.phoneNumber,
          address:req.body.address,
          countryCode: req.body.countryCode,
        }
         
      )
        .then(()=> {console.log("Updated User succesffully");
      return res.status(200).json('Updated User successfully');})
        .catch(err => {
          console.log("Error finding User: " + err);
          return res.status(400).json('Couldnt find User,Error: ' + err);});
    }
  }
else 
{
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passportNumber: req.body.passportNumber,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      countryCode: req.body.countryCode,
    }
     
  )
    .then(()=> {console.log("Updated User succesffully");
  return res.status(200).json('Updated User successfully');})
    .catch(err => {
      console.log("Error finding User: " + err);
      return res.status(400).json('Couldnt find User,Error: ' + err);});

}
}
)
  
});


module.exports = router;



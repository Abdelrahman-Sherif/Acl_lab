
const router = require('express').Router();
let User = require('../models/user');


//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

// exports.addUser = (req, res) => {
//     const user = new User({
//       Name: req.body.Name,
//       username: req.body.Email,
//       isAdmin: req.body.isAdmin,
//       password: req.body.password,
//     });

//     user.save()
//       .then(result => {
//         res.send(result);
//         console.log("user added");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// // getting all the users

// exports.viewUsers = (req, res) => {
//     User.find({})
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     };

//     exports.getUser = (req, res) => {
//       User.find({Name:req.params.name})
//         .then(result => {
//           res.send(result);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     };

//     exports.updateUser = (req,res)=>{
//       User.findByIdAndUpdate(req.params.id,req.body).then(result =>{

//           res.status(200).send("User updated ");
//           console.log('The User is Updated successfully !');
//       }).catch(err => {
//           console.log(err);
//         });

//     };

//     //Deleting an existing user
//     exports.deleteUser = (req,res)=>{
//       User.findByIdAndRemove(req.params.id).then(result =>{

//           res.status(200).send("User Deleted ");
//           console.log("The User is deleted successfully !");
//       }).catch(err => {
//           console.log(err);
//         });

//     };

// //LOGIN
// exports.login = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   // console.log(process.env.TOKEN_SECRET);
//   try {
//     let user = await User.findOne({username: email})
//     .then( (user) => {
//       // console.log(user);
//       if (user) {
//         // console.log(user.password);
//         // console.log(password);

//         var result = bcrypt.compareSync(password, user.password);

//         if (result) {
//           const isAdmin = user.isAdmin;
//           const token = jwt.sign(
//             {
//               email: user.email,
//               id: user._id,
//               // name: user.firstName,
//             },
//             process.env.TOKEN_SECRET,
//             {
//               expiresIn: '5h',
//             }
//           );

//           res.setHeader('authToken', token);
//           res.setHeader('isAdmin', isAdmin);
//           return res.json({
//             user,
//           });
//         } else {
//           return res.json({ message: 'wrong password' });
//         }
//       }
//     });


//     if (!user) {
//       console.log("no user");
//       return res.json({
//         statusCode: 0,
//         message: 'email does not exist, please sign up',
//       });
//     }
//   } catch (exception) {
//     console.log(exception);
//     return res.json({
//       statusCode: 1,
//       error: 'exception',
//     });
//   }
// };

// exports.logout = async (req, res) => {
//   try {
//     const token = req.headers.token;
//     // console.log(token);
//     jwt.verify(token, process.env.TOKEN_SECRET);
//     return res.json({
//       status: 0,
//       message: 'Success',
//     });
//   } catch (err) {
//     console.log(err);
//     return res.json({
//       status: 1,
//       message: 'Error',
//     });
//   }
// };

// exports.signup = async (req, res) => {
//   // const { email, password} = req.body;
// let user = false;
// console.log("METHOD ACTIVE");
//   try {
//     // let user = await User.findOne({
//     //   email,
//     // });
//     if (user) {
//       return res.json({
//         statusCode: 0,
//         message: 'email already exists, please sign in',
//       });
//     } else {
//       var newUser = new User({
//         username: "admin@flightreservation.com",
//         Name: "Admin",
//         password: "adminpassword",
//         isAdmin: true
//       });
//       newUser.password = bcrypt.hashSync("adminpassword", 10);
//       newUser.save(function (err, user) {
//         if (err) {
//           return (res.status = (400).send({
//             message: err,
//           }));
//         } else {
//           // user.password = undefined;
//           return res.json(user);
//         }
//       });
//     }
//   } catch (err) {
//     if (err) {
//       return res.json({
//         statusCode: 1,
//         error: 'error caught ',
//       });
//     }
//   }
// };

router.route('/get').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/delete').deleteMany((req, res) => {
//   User.deleteMany({})
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').get((req, res) => {

  console.log("Getting user details from db Id: "+ req.params.id);
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  console.log("Called update user method");
 
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
    email : req.body.email ,
    firstName  : req.body.firstName ,
    lastName  : req.body.lastName ,
    passportNumber  : req.body.passportNumber,
    }
     
  )
    .then(()=> {console.log("Updated User succesffully");
  return res.status(200).json('Updated User successfully');})
    .catch(err => {
      console.log("Error finding User: " + err);
      return res.status(400).json('Couldnt find User,Error: ' + err);});
});

router.route('/add').post((req, res) => {
  console.log("Adding new user details to db");
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const passportNumber = req.body.passportNumber;
 

  const newUser = new User({
    email:email  , firstName:firstName , lastName:lastName , passportNumber: passportNumber
  });

  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err))

 
});





module.exports = router;
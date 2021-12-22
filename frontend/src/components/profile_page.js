import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { TextField, Button } from '@mui/material';




const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};






export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userId: "",
      email:"",
      firstName:"",
      lastName:"",
      passportNumber:"",

      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passportNumberError: "",
      errorMessage: ""
    }
  }



  ///Get user data, currently hardcoding to 1 until authentication is done next
  async getUser( userId) {
    await axios
      .get("http://localhost:5000/users/" )
      .then((response) => {
        console.log("User gotten: " + response.data.firstName);
        this.setState({
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          passportNumber: response.data.passportNumber,
        });
        // console.log("Arrival date: " + this.state.DateArrival.);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // async getAllUsers(){

  //   await axios
  //   .get("http://localhost:5000/users/")
  //   .then((response) => {
  //     console.log("Users gotten: " + response.data._id);
  //     this.setState({
  //       email: response.data.email,
  //       firstName: response.data.firstName,
  //       lastName: response.data.lastName,
  //       passportNumber: response.data.passportNumber,
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // }
  componentDidMount() {
    ///Hardcoding user id for now to 1 till auth is setup
    
    // var url = window.location.href;
    // var fetchedUserId = /[^/]*$/.exec(url)[0];
    // this.state.userId = fetchedUserId;

    // this.getAllUsers();
  
    //Current hardcoded user id
    this.state.userId = "61c323a43bf21687300ddb0f";
    this.getUser(this.state.userId);

  }


  validate() {

    this.setState({
      emailError: this.state.email ? "" : "error"
    })

    this.setState({
      firstNameError: this.state.firstName ? "" : "error"
    })

    this.setState({
      lastNameError: this.state.lastName ? "" : "error"
    })

    this.setState({
      passportNumberError: this.state.passportNumber ? "" : "error"
    })


    if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.passportNumber) {
      
      console.log("emptyFields")
      this.setState({
        errorMessage: "Please fill all fields",
      });
      return false
    }
    if (this.state.email == "" ) {
      console.log("Empty email")
      this.setState({
        errorMessage: "Email must be given",
      });

      return false
    }

    if (this.state.firstName == "" ) {
      console.log("Empty firstName")
      this.setState({
        errorMessage: "First Name must be given",
      });

      return false
    }
    if (this.state.lastName == "" ) {
      console.log("Empty lastName")
      this.setState({
        errorMessage: "Last Name must be given",
      });

      return false
    }
    if (this.state.passportNumber == "" ) {
      console.log("Empty passport number")
      this.setState({
        errorMessage: "Passport Number must be given",
      });

      return false
    }


    return true
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })

    this.setState({
      emailError: ""
    })

  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    })

    this.setState({
      firstNameError: ""
    })

  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    })

    this.setState({
      lastNameError: ""
    })

  }
  onChangePassportNumber(e) {
    this.setState({
      passportNumber: e.target.value
    })

    this.setState({
      passportNumberError: ""
    })

  }

 

  async onSubmit(e) {
    console.log(this.validate())
    if (this.validate()) {
      e.preventDefault();
      const updatedUser = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        passportNumber: this.state.passportNumber,
      };


      await axios.post('http://localhost:5000/users/update/' + this.state.userId, updatedUser)
        .then(res => {

          console.log(res.data);

          window.location = '/flights/users/list';

          // this.setState = {
          //   email: "",
          //   firstName: "",
          //   lastName: "",
          //   passportNumber: "",
          //   emailError: "",
          //   firstNameError: "",
          //   lastNameError: "",
          //   passportNumberError: "",
    
          // }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.message });
        });



    }

  }

  render() {

    return (
      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-4 mx-auto  p-5">
            <h2 className="text-center mb-4">Edit Profile</h2>
            <div className="form-group">

              <TextField label="Email" value={this.state.email} variant="outlined" size="small" type="text" required style={{ width: 300 }} onChange={this.onChangeEmail} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.emailError ? true : false} />
            </div>

            <div>
              <TextField label="First Name" value={this.state.firstName} variant="outlined" size="small" type="text" required style={{ width: 300 }} onChange={this.onChangeFirstName} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.firstNameError ? true : false} />
            </div>

            <div>
              <TextField label="Last Name" value={this.state.lastName} variant="outlined" size="small" type="text" required style={{ width: 300 }} onChange={this.onChangeLastName} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.lastNameError ? true : false} />
            </div>


            <div>
              <TextField label="Passport Number" value={this.state.passportNumber} variant="outlined" size="small" type="text" required style={{ width: 300 }} onChange={this.onChangePassportNumber} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.passportNumberError ? true : false} />
            </div>

            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}

            <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>Edit Profile </Button>
          </div>
        </div>
      </div>
    );

  }
}
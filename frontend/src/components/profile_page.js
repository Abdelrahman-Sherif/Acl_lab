import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { TextField, Button, InputAdornment } from '@mui/material';
import { Link } from "react-router-dom";
import RegexTextField from './RegexTextField';
const onlyAlphanumericRegex = /[^a-z0-9]/gi;
const onlyAlphaRegex = /[^a-z]/gi;
const onlynumericRegex = /[^0-9]/gi;
const onlyEmailRegex = /[^a-z0-9@._]/gi;
const onlyUserRegex = /[^a-z0-9._]/gi;



const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};
var currUser = sessionStorage.getItem("currUser")

console.log("session:" + currUser)





export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);  
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userId: "",
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      passportNumber: "",
      phoneNumber: "",
      address: "",
      countryCode: "",

      usernameError: "",
      emailError: "",
      firstNameError: "",
      lastNameError: "",
      passportNumberError: "",
      phoneNumberError: "",
      addressError: "",
      countryCodeError: "",
    }
  }



  ///Get user data, currently hardcoding to 1 until authentication is done next
  async getUser( userId) {
    await axios
      .get("http://localhost:5000/users/"+ this.state.userId )
      .then((response) => {
        console.log("Fetched user: " + JSON.stringify(response.data));
        this.setState({
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        passportNumber: response.data.passportNumber,
        phoneNumber:response.data.phoneNumber,
        address:response.data.address,
        countryCode: response.data.countryCode,
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.state.userId = currUser;
  
    this.getUser(this.state.userId);

  }


  validate(){
    this.setState({
      usernameError: this.state.username?"":"error"
    })
  
    this.setState({
      emailError: this.state.email?"":"error"
    })
  
    this.setState({
      firstNameError: this.state.firstName?"":"error"
    })
  
    this.setState({
      lastNameError: this.state.lastName?"":"error"
    })
  
    this.setState({
      passportNumberError: this.state.passportNumber? "": "error"
    })
  
    this.setState({
      phoneNumberError: (this.state.phoneNumber.length!=0 && this.state.phoneNumber.length < 7)? "error": ""
    })

    this.setState({
      countryCodeError: (this.state.countryCode.length!=0 && this.state.countryCode.length > 1)? "error": ""
    })


   
    if (!this.state.username || !this.state.email || !this.state.passportNumber
      || !this.state.firstName || !this.state.lastName ) {
    
      console.log("emptyFields")
      this.setState({
        errorMessage: "Please fill stated fields",
      });
      return false
    }
    if ((this.state.phoneNumber.length!=0 && this.state.phoneNumber.length < 7)) {
      console.log("phone number error")
      this.setState({
        errorMessage: "Phone number must be at least 7 digits",
      });
  
      return false
    }
    if (this.state.countryCode.length!=0 && this.state.countryCode.length > 1) {
      console.log("Country code error")
      this.setState({
        errorMessage: "Country code must be 1 digits ",
      });
  
      return false
    } 
    return true
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value.toLowerCase()
    })

    this.setState({
      usernameError: ""
    })   
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value.toLowerCase()
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

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
    this.setState({
      addressError: ""
    })

  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    })
    this.setState({
      phoneNumberError: (e.target.value.length != 0 && e.target.value.length < 7) ? "error": ""

    })
  }

  onChangeCountryCode(e) {
    this.setState({
      countryCode: e.target.value
    })
    this.setState({
      countryCodeError: (e.target.value.length != 0 && e.target.value.length > 1)? "error": ""
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
        username: this.state.username,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        passportNumber: this.state.passportNumber,
        phoneNumber:this.state.phoneNumber,
        address:this.state.address,
        countryCode: this.state.countryCode,
      };

      await axios.post('http://localhost:5000/users/update/' + this.state.userId, updatedUser)
        .then(res => {
          console.log(res.data);
           window.location = '/flights/users/list';
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.response.data });
        });

        //Update users bookings
        await axios.post('http://localhost:5000/bookings/updateUserNames/' + this.state.userId, updatedUser)
        .then(res => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.response.datae });
        });



    }

  }

  render() {
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto  p-5">
          <h2 className="text-center mb-4">Edit Info</h2>
          
          
            <div className="form-group">
             
              <RegexTextField regex={onlyUserRegex} disabled={true}label="Username " value={(this.state.username).toLowerCase()} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeUsername} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.usernameError? true : false}/>
            </div>

            
              <div>
              <RegexTextField regex={onlyEmailRegex} label="Email " disabled={false} value={(this.state.email).toLowerCase()} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeEmail} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.emailError? true : false} />
            </div>
           
            
            <div>
              <RegexTextField regex={onlyAlphaRegex} label="First Name " value={this.state.firstName} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeFirstName} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.firstNameError? true : false}/>
            </div>
  

            <div>
            <RegexTextField regex={onlyAlphaRegex} label="Last Name " value={this.state.lastName} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeLastName} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.lastNameError? true : false}/>
            </div>

            <div>
              <RegexTextField regex={onlyAlphanumericRegex} label="Passport Number " value={this.state.passportNumber} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangePassportNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.passportNumberError? true : false}/>
            </div>
                         
            <div>
              <RegexTextField regex={onlynumericRegex} label="Country Code" value={this.state.countryCode} variant="outlined" size="small" type="text"  style={{width:300}} onChange={this.onChangeCountryCode} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.countryCodeError? true : false} InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}/>
            </div>
                       
            <div>
              <RegexTextField regex={onlynumericRegex} label="Phone Number" value={this.state.phoneNumber} variant="outlined" size="small" type="number"  style={{width:300}} onChange={this.onChangePhoneNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.phoneNumberError? true : false}/>
            </div>

            <div>
              <RegexTextField label="Address" value={this.state.address} variant="outlined" size="small" type="text"  style={{width:300}} onChange={this.onChangeAddress} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.addressError? true : false}/>
            </div>
  
            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}

    <Link to='/flights/users/profile/changePassword/'>
      <Button  color='primary' > Change Password</Button>
      </Link>

            <Button variant="contained" color = "primary" onClick = {this.onSubmit.bind(this)}>Done </Button>
        </div>
         
        </div>
        </div>
      
    );

  }
}
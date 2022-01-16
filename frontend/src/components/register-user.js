import React, { Component, useState} from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {TextField, Button, InputAdornment} from '@mui/material';
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


export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);  
    this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
    this.togglePass = this.togglePass.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      errorMessage: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      passportNumber: "",
      phoneNumber: "",
      address: "",
      countryCode: "",
      showPass: true,
     
      usernameError: "",
      passwordError: "",
      emailError: "",
      firstNameError: "",
      lastNameError: "",
      passportNumberError: "",
      phoneNumberError: "",
      addressError: "",
      countryCodeError: "",
     
    }
  }


  validate(){
    this.setState({
      usernameError: this.state.username?"":"error"
    })
  
    this.setState({
      passwordError: this.state.password?"":"error"
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


   
    if (!this.state.username || !this.state.password || !this.state.email || !this.state.passportNumber
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
      username: e.target.value
    })

    this.setState({
      usernameError: ""
    })   
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    }) 
    this.setState({
        passwordError: ""
      })  
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

  togglePass(e){
    e.preventDefault();
    this.setState({showPass: !this.state.showPass})
    console.log(this.state.showPass);
  }
  

  async onSubmit(e) {
    console.log(this.validate())
    console.log("Submit Pressed")

    if (this.validate()){
    e.preventDefault();
    const newUser = {
    username: this.state.username,
    password: this.state.password,
    email: this.state.email,
    passportNumber: this.state.passportNumber,
    address: this.state.address,
    countryCode: this.state.countryCode,
    phoneNumber: this.state.phoneNumber,
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    };
   await axios.post('http://localhost:5000/users/add', newUser)
      .then(res =>{
        console.log(res.data);
       window.location = '/login';
      this.setState({
        username: "",
        password: "",
        email: "",
        passportNumber: "",
        address: "",
        countryCode: "",
        phoneNumber: "",
        firstName: "",
        firstName: "",

        usernameError: "",
        passwordError: "",
        emailError: "",
        passportNumberError: "",
        addressError: "",
        countryCodeError: "",
        phoneNumberError: "",
        firstNameError: "",
        firstNameError: "",

      })
      })
      .catch((error) => {
        console.log('setting error message');
        this.setState({
          errorMessage: error.response.data,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          passportNumber: this.state.passportNumber,
          address: this.state.address,
          countryCode: this.state.countryCode,
          phoneNumber: this.state.phoneNumber,
          firstName: this.state.firstName,
          lastName: this.state.lastName,

          usernameError: this.state.usernameError,
          passwordError: this.state.passwordError,
          emailError: this.state.emailError,
          passportNumberError: this.state.passportNumberError,
          addressError: this.state.addressError,
          countryCodeError: this.state.countryCodeError,
          phoneNumberError: this.state.phoneNumberError,
          firstNameError: this.state.firstNameError,
          lastNameError: this.state.lastNameError,
         


        })
    });
    }
  }

  render() {
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto  p-5">
          <h2 className="text-center mb-4">Register</h2>
          
          
            <div className="form-group">
             
              <RegexTextField regex={onlyUserRegex} label="Username " value={this.state.username} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeUsername} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.usernameError? true : false}/>
            </div>

            <div>
              <RegexTextField regex={onlyAlphanumericRegex} label="Password " value={this.state.password} variant="outlined" size="small" type={this.state.showPass? "password": "text"} required style={{width:300}} onChange={this.onChangePassword} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.passwordError? true : false}/>
          <Button variant="text" color='primary' size = "small" onClick={this.togglePass} style={{marginLeft: 170, fontSize: '10px'}}>Show Password</Button>
            </div>
            
              <div>
              <RegexTextField regex={onlyEmailRegex} label="Email " value={this.state.email} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeEmail} margin="narrow"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.emailError? true : false} />
            </div>
           
            
            <div>
              <RegexTextField regex={onlyAlphaRegex}  label="First Name " value={this.state.firstName} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeFirstName} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.firstNameError? true : false}/>
            </div>
  

            <div>
              <RegexTextField regex={onlyAlphaRegex}  label="Last Name " value={this.state.lastName} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeLastName} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.lastNameError? true : false}/>
            </div>

            <div>
              <RegexTextField regex={onlyAlphanumericRegex}  label="Passport Number " value={this.state.passportNumber} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangePassportNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.passportNumberError? true : false}/>
            </div>
                         
            <div>
              <RegexTextField regex={onlynumericRegex}  label="Country Code" value={this.state.countryCode} variant="outlined" size="small" type="text"  style={{width:300}} onChange={this.onChangeCountryCode} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.countryCodeError? true : false} InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}/>
            </div>
                       
            <div>
              <RegexTextField regex={onlynumericRegex} label="Phone Number" value={this.state.phoneNumber} variant="outlined" size="small" type="text"  style={{width:300}} onChange={this.onChangePhoneNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.phoneNumberError? true : false}/>
            </div>

            <div>
              <RegexTextField  label="Address" value={this.state.address} variant="outlined" size="small" type="text"  style={{width:300}} onChange={this.onChangeAddress} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.addressError? true : false}/>
            </div>
  
            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}



            <Button variant="contained" color = "primary" onClick = {this.onSubmit.bind(this)}>Register </Button>
        </div>
         
        </div>
        </div>
      
    );

  }
}
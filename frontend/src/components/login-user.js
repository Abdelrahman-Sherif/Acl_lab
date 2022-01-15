import React, { Component, useState} from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {TextField, Button, InputAdornment} from '@mui/material';



const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};


export default class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.togglePass = this.togglePass.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      errorMessage: "",
      username: "",
      password: "",
      showPass: true,
     
      usernameError: "",
      passwordError: "",
     
    }
  }


  validate(){
    this.setState({
      usernameError: this.state.username?"":"error"
    })
  
    this.setState({
      passwordError: this.state.password?"":"error"
    })
  
   
    if (!this.state.username || !this.state.password) {
    
      console.log("emptyFields")
      this.setState({
        errorMessage: "Please fill all fields",
      });
      return false
    } 
    return true
  }

  async getLoggedinUser(){
    return this.state.username
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
    const chkUser = {
    username: this.state.username,
    password: this.state.password,
   
    };
   await axios.post('http://localhost:5000/auth/login', chkUser)
      .then(res =>{
        console.log(res.data);
        sessionStorage.setItem("LoggedinUser", this.state.username);

       window.location = '/flights/users/list';
      this.setState({
        username: "",
        password: "",
        showPass: true,
       

        usernameError: "",
        passwordError: "",
        

      })
      })
      .catch((error) => {
        console.log('setting error message');
        this.setState({
          errorMessage: error.response.data,
          username: this.state.username,
          password: this.state.password,

        })
    });
    }
  }

  render() {
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto  p-5">
          <h2 className="text-center mb-4">Login</h2>
          
          
            <div className="form-group">
             
              <TextField label="Username " value={this.state.username} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeUsername} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.usernameError? true : false}/>
            </div>

            <div>
              <TextField label="Password " value={this.state.password} variant="outlined" size="small" type={this.state.showPass? "password": "text"} required style={{width:300}} onChange={this.onChangePassword} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.passwordError? true : false}/>
          <Button variant="text" color='primary' size = "small" onClick={this.togglePass} style={{marginLeft: 170, fontSize: '10px'}}>Show Password</Button>
            </div>
            
            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}

            <Button variant="contained" color = "primary" onClick = {this.onSubmit.bind(this)}>Login </Button>
        </div>
         
        </div>
        </div>
      
    );
  }
}
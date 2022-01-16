import React, { Component, useState} from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {TextField, Button, InputAdornment} from '@mui/material';



const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};

var currUser = sessionStorage.getItem("currUser")

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.togglePass = this.togglePass.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
     userId: "",
      errorMessage: "",
      oldpassword: "",
      newpassword: "",
      showPass: true,
     
      oldpasswordError: "",
      newpasswordError: "",
     
    }
  }
 



  componentDidMount() {
    this.state.userId = currUser;

  }


  validate(){
    this.setState({
        oldpasswordError: this.state.oldpassword?"":"error"
    })
  
    this.setState({
        newpasswordError: this.state.newpassword?"":"error"
    })
  
   
    if (!this.state.oldpassword || !this.state.newpassword) {
    
      console.log("emptyFields")
      this.setState({
        errorMessage: "Please fill all fields",
      });
      return false
    } 
    return true
  }


  onChangeOldPassword(e) {
    this.setState({
      oldpassword: e.target.value
    })

    this.setState({
        oldpasswordError: ""
    })   
  }

  onChangeNewPassword(e) {
    this.setState({
        newpassword: e.target.value
    }) 
    this.setState({
        newpasswordError: ""
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
    password: this.state.oldpassword,
    newpass: this.state.newpassword,
   
    };
   await axios.post('http://localhost:5000/auth/changePassword/'+ this.state.userId, chkUser)
      .then(res =>{
        console.log(res.data);

       window.location = '/login';
      this.setState({
        oldpassword: "",
        newpassword: "",
        errorMessage: "",
        showPass: true,
       

        oldpasswordError: "",
        newpasswordError: "",
      })
      })
      .catch((error) => {
        console.log('setting error message');
        this.setState({
          errorMessage: error.response.data,
          oldpassword: this.state.oldpassword,
          newpassword: this.state.newpassword,

        })
    });
    }
  }

  render() {
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto  p-5">
          <h2 className="text-center mb-4">Change Password</h2>
          
          
            <div className="form-group">
             
            <TextField label="Old Password " value={this.state.oldpassword} variant="outlined" size="small" type={this.state.showPass? "password": "text"} required style={{width:300}} onChange={this.onChangeOldPassword} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.oldpasswordError? true : false}/>
            </div>

            <div>
              <TextField label="New Password " value={this.state.newpassword} variant="outlined" size="small" type={this.state.showPass? "password": "text"} required style={{width:300}} onChange={this.onChangeNewPassword} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.newpasswordError? true : false}/>
          <Button variant="text" color='primary' size = "small" onClick={this.togglePass} style={{marginLeft: 170, fontSize: '10px'}}>Show Passwords</Button>
            </div>
            
            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}

            <Button variant="contained" color = "primary" onClick = {this.onSubmit.bind(this)}>Change Password </Button>
        </div>
         
        </div>
        </div>
      
    );
  }
}
import React from 'react';
//import { WithContext } from './Context/';

class UserSignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                firstName:"",
                lastName:"", 
                emailAddress:"",
                password:"",
                confirmPassword:""
        }
    

    

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    confirmPassword = ()=>{
        if(this.state.password === this.state.confirmPassword){
            console.log('works');
        } else{
            console.log('dontmatch');
        }

    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
       
        console.log(name, value);
        this.setState({
            [name]: value 
        });
  
    }

    handleSubmit = (event) =>{
        
         event.preventDefault();
         this.props.value.data.createUser(this.state); // this is a service coming from the data file
     }

    cancel = () => {
        this.props.history.push('/');
      }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                
                <div>
                    <form onSubmit = {this.handleSubmit}>
                    <div>
                        <input id="firstName" 
                                name="firstName" 
                                type="text" 
                                className="" 
                                onChange={this.handleChange}
                                placeholder="First Name" 
                                value={this.state.firstName} / >
                    </div>
                    <div>
                        <input id="lastName" 
                                name="lastName" 
                                type="text" 
                                className="" 
                                onChange={this.handleChange}
                                placeholder="Last Name" 
                                value={this.state.lastName} / >
                    </div>
                    <div>
                        <input id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                className="" 
                                onChange={this.handleChange}
                                placeholder="Email Address" 
                                value={this.state.emailAddress} / >
                    </div>
                    <div>
                        <input id="password" 
                                name="password" 
                                type="password" 
                                className="" 
                                onChange={this.handleChange}
                                placeholder="Password" 
                                value={this.state.password} / >
                    </div>
                    <div>
                        <input id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                className="" 
                                onChange={this.handleChange}
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}/ >

                                </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Sign Up</button>
                       <button className="button button-secondary">Cancel</button></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default UserSignUp;
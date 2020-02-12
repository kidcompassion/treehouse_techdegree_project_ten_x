import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserSignUp extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            firstName:"",
            lastName:"", 
            emailAddress:"",
            password:"",
            confirmPassword:"",
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    /**
     * Add form values to state
     * TO DO: inline field validation
     */
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value 
        });
    }

    /**
     * Post user info from state to the API via AXIOS
     * TO DO: upon successful sign up, trigger a welcome message in SignIn component indicating user should sign up with new credentials
     */

    handleSubmit = (event) =>{
         event.preventDefault();
         // Post state to api
         const createUser = axios.post('http://localhost:5000/api/users', this.state);
            createUser.then( errors => {
                console.log(`${this.state.firstName} ${ this.state.lastName} is successfully signed up and authenticated!`);
                // Redirect user so they can log in with new credentials
                this.props.history.push('/signin')
            }).catch( (err) => {
              console.log(err.response);
              if(err.response.status === 500){
                  // if it's a 500 error, show the correct component
                    this.props.history.push('/error')
                }else {
                    // otherwise show the api validation error msgs
                    this.setState({errors: err.response.data.errors});
                }
            })    
        }
    /**
     * If user cancels, send them back to the class list
     * @param {*} event 
     */

    handleCancel(event){
        event.preventDefault();
        this.props.history.push("/courses");
    }
      
    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>   
                        {/* If errors exist, loop through and render them*/}
                        {this.state.errors ?
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors.map((error, index)=>{
                                            return(<li key={index}>{error}</li>)
                                        })}
                                    </ul>
                                </div>
                            </div>
                        :null}
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
                            <button 
                                className="button button-secondary" 
                                type="button"
                                onClick={this.handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
    </div>);
    }
}

export default UserSignUp;
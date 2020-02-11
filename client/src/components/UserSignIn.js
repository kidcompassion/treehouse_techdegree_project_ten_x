import React from 'react';
//
//import { Data } from './Data';

class UserSignIn extends React.Component{

    constructor(props){

        super(props)

        this.state = {
            emailAddress: '',
            password:'',
            showErrors: false,
            emailError: false,
            passError: false,
        }
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value 
        });
    }

    /**
     * Handle Sign In Submit
     * @param {*} event 
     */
    handleSubmit(event){
        event.preventDefault();
        // Run the API request to check if user exists
        this.props.context.actions.signIn(this.state);
        this.props.history.goBack();
    }

    handleCancel(event){
        event.preventDefault();
        this.props.history.push("/courses");
      }
      

    render(){
        return(
            
            <div className="bounds">
                 <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>

                     {this.state.showErrors ?
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                            <ul>
                                {this.state.emailError? <li>Problem with email</li> : null}
                                {this.state.passError?<li>Problem with password</li> : null}
                            </ul>
                            </div>
                        </div>
                        :null}
                        <form onSubmit = {(e)=>{this.handleSubmit(e)}}>
                        <input id="emailAddress" 
                                name="emailAddress" 
                                type="text" 
                                onChange={this.handleChange}
                                className="" 
                                placeholder="Email Address" 
                                value={this.state.emailAddress}/ >
                        <input id="password" 
                                name="password" 
                                type="password" 
                                onChange={this.handleChange}
                                className="" 
                                placeholder="Password" 
                                value={this.state.password}/ >
                        <div className ="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign In</button>
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
              <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
        </div>);
        
    }
}

export default UserSignIn;
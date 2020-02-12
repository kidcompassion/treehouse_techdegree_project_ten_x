import React from 'react';
import { Link } from 'react-router-dom';


class UserSignIn extends React.Component{

    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            authenticatedUser:{},
            emailAddress: '',
            password:'',
            errors: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    /**
     * Add form values to state
     * TO DO: inline field validation
     */
    handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value 
        });
    }

    /**
     * Handle user signin 
     * TO DO: 
     * upon successful sign up, trigger a welcome message in SignIn component indicating user should sign up with new credentials
     * show inline error msgs (not required for project, but still should do it)
     */

    handleSubmit(event){
        event.preventDefault();
        this.props.context.actions.signIn(this.state);
        // Redirect user to page they were on when they clicked sign in
        this.props.history.push('/courses'); 
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
                    <h1>Sign In</h1>
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
              <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>);
    }
}

export default UserSignIn;
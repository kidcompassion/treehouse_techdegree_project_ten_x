import React from 'react';
import AuthContext from './Context/index';




class UserSignIn extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            emailAddress: '',
            password:'',
            authKey:''
        }
    }


    componentDidMount(){
        
    }

    handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        
     //   console.log(name, value);
        this.setState({
            authKey:'',
            [name]: value 
        });
    }

    handleSubmit = (event) =>{
        
        try{
            const getAuthHeader = this.props.value.services.signIn(this.state); // this is a service coming from the data file
            this.setState({
                authKey: getAuthHeader()
            });
            
            

        } catch(err){

        }
        
        //https://stackoverflow.com/questions/44245588/how-to-send-authorization-header-with-axios
        event.preventDefault();

        // what endpoint to send it to on first submit? 
        // get/set headers
        // save them as a cookie
        
/*
        let webApiUrl = 'http://localhost:5000/api/';
        let tokenStr = 'xxyyzz';
        axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
*/

        //I think I have to set auth headers
        console.log(this.state);

    }

    render(){

        
        return(
            <AuthContext.Consumer>
            {
                (context)=>{
                    
                    return(
                    <div className="bounds">
             <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                    <div>
                        <form onSubmit = {(e)=>{context.signIn(this.state); e.preventDefault()}}>
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
                        </div>
                        </form>
                    </div>
                <p>&nbsp;</p>
              <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
            </div>
            </div>);
            
                }
            }
            </AuthContext.Consumer>
        );
    }
}

export default UserSignIn;
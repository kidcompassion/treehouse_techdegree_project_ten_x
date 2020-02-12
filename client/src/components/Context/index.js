import React, { Component } from 'react';
import axios from 'axios';


const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    
    this.state = {
      authenticatedUser: JSON.parse(localStorage.getItem('authenticatedUser')) || null
    };
    this.errorHandling = this.errorHandling.bind(this);
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      actions: {
        createUser: this.createUser,
        signIn: this.signIn,
        signOut: this.signOut,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
        errorHandling: this.errorHandling
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }


  /**
   * Context Methods
   */

  
  
  signIn = ( user )=>{
     
    // Encode form values
    const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`);
    // Set encoded values as authorization header in login request
    const authorized = axios.get('http://localhost:5000/api/users', { user, headers: {"Authorization" : `Basic ${encodedCredentials}`} });
    
    authorized.then(                
        (response) => { 
            // once logged in, save user data in localStorage
            localStorage.setItem('authenticatedUser', JSON.stringify(response.data));
            // save encoded credentials for use in other API calls
            localStorage.setItem('authHeader', encodedCredentials);
            // Add authenticated user to the current state
            
            //this.setState({authenticatedUser: response.data});
        }
    ).catch(
        (err)=>{
            // If error, log it to the console
            console.log(err.response.data.message);
            // If server error, redirect to expected error msg
            if(err.response.status === 500){
                this.props.history.push('/error')
            } else { // else show inline validation errors
                this.setState({errors: [err.response.data.message]});
            }
        }
    )
}


      /**
       * 
       */
      signOut = () =>{
        let currentComponent = this;
      
        localStorage.removeItem('authenticatedUser');
        currentComponent.setState({authenticatedUser: null});   
      }

      createUser = (user) =>{
        axios.post('http://localhost:5000/api/users', user)
            .then( errors => {
                if ( errors.length ) {
                console.log(errors);
                } else {
                console.log(`${user.firstName} ${ user.lastName} is successfully signed up and authenticated!`);
                }
            })
            .catch( (err) => {
              console.log(err.response);
              if(err.response.status === 500){
                this.props.history.push('/error')
            }else {
              this.setState({errors: err.response.data.errors});
            }
            })  
        };
      


      createCourse = (courseDetails) =>{
     //   console.log(courseDetails);
     let payload;
        const encodedCredentials = localStorage.getItem('authHeader');
       const createCourse =  axios.post('http://localhost:5000/api/courses', courseDetails, {headers: {"Authorization" : `Basic ${encodedCredentials}`} });
                    createCourse.then( 
                      
                      (response) => { 
                        payload = response;
                        console.log(response);
                       }
                    ).catch(
                      (err)=>{
                        console.log(err.response.data.errors);
                        payload =  err.response.data.errors;
                      }
                    )
                return payload;
      }

      updateCourse = (courseDetails) =>{
        console.log(courseDetails);
        const encodedCredentials = localStorage.getItem('authHeader');
        axios.put(`http://localhost:5000/api/courses/${courseDetails.courseData.id}`,  courseDetails.courseUpdate, {headers: {"Authorization" : `Basic ${encodedCredentials}`} });
      }

      deleteCourse = (courseDetails) => {
        console.log(courseDetails);
        const encodedCredentials = localStorage.getItem('authHeader');
        axios.delete(`http://localhost:5000/api/courses/${courseDetails.courseData.id}`, {headers: {"Authorization" : `Basic ${encodedCredentials}`} });
      }
  
      

      errorHandling = (error, state) => {
          // Handling axios errors 
          // https://stackoverflow.com/questions/9156176/what-is-the-difference-between-throw-new-error-and-throw-someobject
          if(error.response){
            state.setState({
              errors: error.response
            });
            // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
             // props.history.push("/error");
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
      }



}

   


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


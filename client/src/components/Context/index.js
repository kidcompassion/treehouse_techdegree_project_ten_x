import React, { Component } from 'react';
import axios from 'axios';
import { Data } from '../Data';

const Context = React.createContext(); 

export class Provider extends Component {

  

  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: JSON.parse(localStorage.getItem('authenticatedUser')) || null
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        createUser: this.createUser,
        signIn: this.signIn,
        signOut: this.signOut,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
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
        .catch( err => {
            console.log(err);
        });  
    };
  

  signIn = ( user )=>{
     // console.log(user);
     let currentComponent = this;
      const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`);
      const authorized = axios.get('http://localhost:5000/api/users', { user, headers: {"Authorization" : `Basic ${encodedCredentials}`} });
      
      //If authorized, add a cookie and store the encoded credentials for Contex
      authorized.then(function (response) {
          console.log('async response', response);
          localStorage.setItem('authenticatedUser', JSON.stringify(response.data));
          localStorage.setItem('authHeader', encodedCredentials);
          currentComponent.setState({authenticatedUser: response.data})
       
        })
      //else, log the error
        .catch(function (error) {
          console.log(error);
        })
      }  


      createCourse = (courseDetails) =>{
        const encodedCredentials = localStorage.getItem('authHeader');
        axios.post('http://localhost:5000/api/courses',  courseDetails, {headers: {"Authorization" : `Basic ${encodedCredentials}`} });
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
  
      signOut = () =>{
        let currentComponent = this;
        console.log('contextsignout');
        localStorage.removeItem('authenticatedUser');
        currentComponent.setState({authenticatedUser: null});
       /* let currentComponent = this;
        currentComponent.setState({authenticatedUser: null});
        localStorage.removeItem('authenticatedUser');*/
        
      }



}

    /*
console.log('sigin');

    setTimeout(()=>{ //this forces header to rerender. updating state in context triggers it.
      xthis.setState({authenticatedUser: {blerep: 'bloop'}})
    }, 3000);
*/

    


  //  console.log(this.authenticatedUser);
    //return this.data.getUser(user)


  

  /*
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
    }
    return user;
  }
*/


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


//import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
const Services = {

    isAuth : false,

    authCreds: '',


    createUser(user){
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
        
    },




    
    signIn(user){
        
        const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`);
        const authorized = axios.get('http://localhost:5000/api/users', { user, headers: {"Authorization" : `Basic ${encodedCredentials}`} });
        
        //If authorized, add a cookie and store the encoded credentials for Contex
        authorized.then(function (response) {
            console.log(response);
            this.isAuth = encodedCredentials;
            Cookies.set('isAuth', 'true');
          })
        //else, log the error
          .catch(function (error) {
            console.log(error);
          })
    }    
}

export default Services;
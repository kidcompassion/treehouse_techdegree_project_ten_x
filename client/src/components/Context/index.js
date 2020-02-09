import React from 'react';
import Services from '../Services';
import Cookies from 'js-cookie';

const AuthContext = React.createContext('auth');



export default AuthContext;


/*

export const WithContext = (Component) => {
    
    return (props) => (
        
        <AuthContext.Consumer>
             {value => <Component {...props} value={value} />}
        </AuthContext.Consumer>
    )
  }

*/

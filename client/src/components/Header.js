import React from 'react';
//import {WithContext} from './Context';//https://stackoverflow.com/questions/49870098/how-to-get-the-data-from-react-context-consumer-outside-the-render

import { 
    Link 
} from 'react-router-dom';
const Header = (props) => {

    
    return(
        

                    <div className="header">
                        <div className="bounds">
                    <h1 className="header--logo">
                        <Link to="/courses">Courses</Link>
                        
                    </h1>
                    <nav>
                        <span>Welcome {/*props.value.data.firstName} {props.value.data.lastName*/}</span>
                        <Link to="/signout" className="signout">
                            Sign Out
                        </Link>
                    </nav>
                </div>
            </div>
           
        
        
        
            
            
        
    );
}

export default Header;
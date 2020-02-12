import React from 'react';

const UnhandledError = (props) =>{
    console.log(props);
    return(
        <div className="grid-100">
             <div className="bounds">
                <h1>Error</h1>
                <p>Sorry! We just encountered an unexpected error.</p>
            </div>
      </div>
    )
}
export default UnhandledError;
import React, { Component } from 'react';
import axios from 'axios';
import {
    Route,
    BrowserRouter,
    Switch,
    Redirect
  } from 'react-router-dom';



class Courses extends Component{

    constructor(props){
        super(props);
        this.state = {
            courses:[]
        }
        
       
    }

    componentDidMount(){
        let currentComponent = this;
        axios.get(`http://localhost:5000/api/courses`)
            .then((response)=>{
                console.log(response.data);
                currentComponent.setState({
                    courses: response.data
                });
            });
    }




    render(){
        
        return(
           <div className="grid-33">

                {this.state.courses.map((course, index)=>{

                    return <a key={course.id} className="course--module course--link" href={course.id}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </a>

                })}
           </div>
                
           
           
        )
    }
}

export default Courses;
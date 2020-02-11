import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    NavLink,
    withRouter
  } from 'react-router-dom';



class Courses extends Component{

    constructor(props){
        super(props);
        this.state = {
            courses:[],
            isAuth: ''
        }
        
        

    }

    componentDidMount(){
       // console.log('test');
        let currentComponent = this;
        axios.get(`http://localhost:5000/api/courses`)
            .then((response)=>{
             //   console.log(response.data);
                currentComponent.setState({
                    courses: response.data,
                    isAuth: Cookies.get('isAuth')
                });
            });

    }





    render(){
        
        return(
                
                    <div className="bounds">
                        
                            {this.state.courses.map((course, index)=>{
                                
                                return <NavLink key={course.id} to={`/courses/${course.id}`}>
                                <div className="grid-33">
                                <div className="course--module course--link" href={course.id}>
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{course.title}</h3>
                                </div>
                                </div> 
                                </NavLink>
                            
                            })}

                            <div className="grid-33">
                            <NavLink to="/courses/create" className="course--module course--add--module">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </NavLink></div>
                        
                    </div>

                
           
           
        )
    }
}

export default withRouter(Courses);
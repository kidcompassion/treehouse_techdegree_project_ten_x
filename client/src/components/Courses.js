import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Courses extends Component{
    constructor(props){
        super(props);
        this.state = {
            courses:[],
        }
    }

    /**
     * Request courses from API
     */

    componentDidMount(){
        let currentComponent = this; // prevents context collisions with 'this'
        const allCourses = axios.get(`http://localhost:5000/api/courses`);
        allCourses.then(
            (response)=>{
                // If successful, update state with course list
                currentComponent.setState({
                    courses: response.data,
                })
            }
        ).catch(
            // If error, log the response and redirect user to the correct spot
            (err)=>{
                // If there's an error, push the user to undefined error route, since error here indicate a server side issue
                console.log(err);
                this.props.history.push('/error')
            }
        )    
    }

    render(){
        return(
            <div className="bounds">
                {this.state.courses.map((course)=>{
                return (
                    <NavLink key={course.id} to={`/courses/${course.id}`}>
                        <div className="grid-33">
                            <div className="course--module course--link" href={course.id}>
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                            </div>
                        </div> 
                    </NavLink>
                )
            })}
            {/* Generate new course link */}
            <div className="grid-33">
                <NavLink to="/courses/create" className="course--module course--add--module">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                </NavLink>
            </div>
        </div>
        )
    }
}

export default Courses;
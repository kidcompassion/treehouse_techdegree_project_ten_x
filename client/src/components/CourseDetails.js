import React, { Component } from 'react';
import {
    withRouter,
    Link
  } from 'react-router-dom';
import axios from 'axios';

class CourseDetails extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            courseId:this.props.match.params.id,
            courseData: {},
            materialsNeeded: []
        }
    }

    componentDidMount(){
        const currentCourseId = this.props.match.params.id;
        let currentComponent = this;
        axios.get(`http://localhost:5000/api/courses/${currentCourseId}`)
            .then((response)=>{
                
                currentComponent.setState({
                    
                    courseData: response.data,
                    materialsNeeded: this.formatList(response.data.materialsNeeded)
                });
            });
    }

    formatList(rawList){
      let formattedList = [];
      if(rawList!=null){
         formattedList= rawList.split("* ");
        formattedList.shift();
        return formattedList;
      } else {
        formattedList.push('Not available');
        return formattedList;
      }
    }


    render(){
      
        return(
<React.Fragment>
            <hr></hr>
      <div>
      
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link to={ `${this.props.match.url}/update`} className="button">
                  Update Course
                </Link>
                <Link to={ `${this.props.match.url}/delete`}  className="button">
                  Delete Course
                </Link>
              </span>
              <Link to="/courses/" className="button button-secondary">
                Return to List
              </Link>
              </div>
          </div>
        </div>
        
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.courseData.title}</h3>
              <p>By Joe Smith/username</p>
            </div>
            <div className="course--description">
            {this.state.courseData.description}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.courseData.estimatedTime}</h3>
                </li>

                

                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                  
                    {this.state.materialsNeeded.map((material, index)=>{
                      return(<li key={index}>{material}</li>)
                    })}  
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          </div>
          </div>
          </React.Fragment>
        );
    }
}

export default withRouter(CourseDetails);
import React, { Component } from 'react';
import {
    withRouter,
    Link
  } from 'react-router-dom';
import axios from 'axios';

class CourseDetails extends Component{

  constructor(props){
      super(props);

      this.state = {
          authenticatedUser: this.props.context.authenticatedUser || {},
          courseId:this.props.match.params.id,
          courseData: {},
          courseOwner: {},
          materialsNeeded: []
      }
  }

  componentDidMount(){
    const currentCourseId = this.props.match.params.id;
    let currentComponent = this; // to avoid problem with accessing 'this'
    
    axios.get(`http://localhost:5000/api/courses/${currentCourseId}`)
        .then((response)=>{
            currentComponent.setState({
                courseData: response.data,
                courseOwner: response.data.User,
                materialsNeeded: this.formatList(response.data.materialsNeeded)
            });
        });
  }

  /**
   * Formats the markdown formatted list into HTML, or provides a fallback if not populated
   * @param {String} rawList 
   */

  formatList(rawList){
    let formattedList = [];
    if(rawList!=null){
        formattedList= rawList.split("* ");
      formattedList.shift();
      return formattedList;
    } 
  }

  deleteCourse(event){
    event.preventDefault();
    this.props.context.actions.deleteCourse(this.state);
    console.log('deleted');
  }

  render(){
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              { 
                // Check if currently logged in user owns this course before letting them edit it
              }
              {this.state.authenticatedUser.id === this.state.courseOwner.id && (
                  <span>
                    <Link to={ `${this.props.match.url}/update`} className="button">
                      Update Course
                    </Link>
                    <button  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCourse(e) } }>
                      Delete
                    </button>
                    
                    <Link to={ `${this.props.match.url}/delete`}  className="button">
                      Delete Course
                    </Link>
                  </span>
                )}
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
                <p>By { this.state.courseOwner.firstName} { this.state.courseOwner.lastName}</p>
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
                    {
                      // Check to see if this is populated. If so, show data; if not, show "materials to come" so user knows it's not an error
                    }
                    {this.state.courseData.estimatedTime ?<h3>{this.state.courseData.estimatedTime}</h3>: <h3>Details coming soon</h3>}
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    {
                      // Check to see if this is populated. If so, show data; if not, show "materials to come" so user knows it's not an error
                    }
                    {this.state.materialsNeeded ? 
                      <React.Fragment>
                        <ul>
                          {this.state.materialsNeeded.map((material, index)=>{
                            return(<li key={index}>{material}</li>)
                          })}  
                        </ul>
                      </React.Fragment>
                    : 
                      <React.Fragment>
                        <h3>Details coming soon</h3>
                      </React.Fragment>
                    }
                  </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>        
    );
  }
}

export default withRouter(CourseDetails);
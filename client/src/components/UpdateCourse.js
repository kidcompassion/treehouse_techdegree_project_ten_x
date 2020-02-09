import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends React.Component {
    constructor(props){
      
        super(props);
        console.log(this.props.match);
        this.state = {
          courseUpdates:{
            title:{
              value: ''
            },
            description:{
              value: ''
            },
            estimatedTime:{
              value: ''
            },
            materialsNeeded:{
              value: ''
            },
          }
          
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount(){
      const currentCourseId = this.props.match.params.id;
      let currentComponent = this;
      axios.get(`http://localhost:5000/api/courses/${currentCourseId}`)
          .then((response)=>{
              
              currentComponent.setState({
                  
                  courseData: response.data,
                  
              });

              
          })
          .then(console.log(currentComponent.state));

  }

    //https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825
    handleChange(event){
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
          showErrors: false,
          titleError: false,
          descriptionError: false,
          courseUpdates: {
            ...this.state.courseUpdates,
            [name]: {
              ...this.state.courseUpdates[name],
              value
            }
          }
      });

    }

handleSubmit(event){
  
  event.preventDefault();
  //https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
  console.log(this.state.courseUpdates);


  if(this.state.courseUpdates.title.value === ""){
    console.log('nada');
    this.setState({
      showErrors: true,
      titleError:true
    });
  }

  if(this.state.courseUpdates.description.value === ""){
    this.setState({
      showErrors: true,
      descriptionError:true
    });
  }
  const options = {
    url: 'http://localhost:5000/api/courses',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'multipart/form-data'
    },
    data: {
      title: this.state.courseUpdates.title,
      description: this.state.courseUpdates.description,
      estimatedTime: this.state.courseUpdates.estimatedTime,
      materialsNeeded: this.state.courseUpdates.materialsNeeded,
      userId: 3 //make curr user
    }
  };
  
  axios(options)
    .then(response => {
      console.log(response.status);
    });
}

handleClick(event){
  // Add redirect, possibly something to do with pushing the history

  event.preventDefault();

  

}

    render(){
        return(
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        {this.state.showErrors ?
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {this.state.titleError? <li>Please provide a value for "Title"</li> : null}
                {this.state.descriptionError?<li>Please provide a value for "Description"</li> : null}
              </ul>
            </div>
          </div>
          :null}
        <form onSubmit={this.handleSubmit}>
          <div className="grid-66">

                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input id="title" 
                            name="title" 
                            type="text" 
                            onChange={this.handleChange}
                            className="input-title course--title--input" 
                            placeholder="Course title..."
                            value={this.state.courseUpdates.title.value} />
                      </div>
                    </div>
            <div className="course--description">
              <div>
                <textarea id="description" 
                          name="description"
                          onChange={this.handleChange}
                          className="" 
                          placeholder="Course description..."
                          value={this.state.courseUpdates.description.value}>
                </textarea></div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input id="estimatedTime"
                            name="estimatedTime"
                            onChange={this.handleChange}
                            type="text" 
                            className="course--time--input"
                            placeholder="Hours" 
                            value={this.state.courseUpdates.estimatedTime.value}
                            /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea id="materialsNeeded" 
                              name="materialsNeeded"
                              onChange={this.handleChange} 
                              className="" 
                              placeholder="List materials..."
                              value={this.state.courseUpdates.materialsNeeded.value}
                              >
                      </textarea>
                              </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" 
                    type="submit">
            Update Course</button>
            
            <button 
              className="button button-secondary" 
              type="button"
              onClick={this.handleClick}>
                Cancel
              </button>
            
            </div>
      </form></div>
    </div>
        );
    }
}

export default withRouter(UpdateCourse);
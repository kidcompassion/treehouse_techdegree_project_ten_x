import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends React.Component {
    constructor(props){
      
        super(props);
        console.log(this.props);
        this.state = {
          showErrors: false,
          showTitle: false,
          showDescription: false,
          courseCreate:{
            title:'',
            description: '',
            estimatedTime:'',
            materialsNeeded:''
          }
          
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    //https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825
    handleChange(event){
      const name = event.target.name;
      const value = event.target.value;
      
      this.setState({
        courseCreate:{
          ...this.state.courseCreate,
          [name]: value 
        }
      });

    }

handleSubmit(event){
  
  event.preventDefault();
  //https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
  

  const data = {
      title: this.state.courseCreate.title,
      description: this.state.courseCreate.description,
      estimatedTime: this.state.courseCreate.estimatedTime,
      materialsNeeded: this.state.courseCreate.materialsNeeded,
      userId: this.props.context.authenticatedUser.id
    }

    console.log(data);
    this.props.context.actions.createCourse(data);
 
}

handleCancel(event){
  event.preventDefault();
  this.props.history.push("/courses");
}

    render(){
        return(
      <div className="bounds course--detail">
      <h1>Create Course</h1>
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
                            value={this.state.courseCreate.title.value} />
                      </div>
                    </div>
            <div className="course--description">
              <div>
                <textarea id="description" 
                          name="description"
                          onChange={this.handleChange}
                          className="" 
                          placeholder="Course description..."
                          value={this.state.courseCreate.description.value}>
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
                            value={this.state.courseCreate.estimatedTime.value}
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
                              value={this.state.courseCreate.materialsNeeded.value}
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
            Create Course</button>
            
            <button 
              className="button button-secondary" 
              type="button"
              onClick={this.handleCancel}>
                Cancel
              </button>
            
            </div>
      </form></div>
    </div>
        );
    }
}

export default withRouter(CreateCourse);
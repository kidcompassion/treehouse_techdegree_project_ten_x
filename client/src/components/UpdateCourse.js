import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends React.Component {
    constructor(props){
      
        super(props);
       // console.log(this.props);
        this.state = {
          currId:'',
          courseData:{},
          courseUpdate:{
            title:'',
            description: '',
            estimatedTime:'',
            materialsNeeded:'',
            userId: this.props.context.authenticatedUser.id
          },
          errors: null,
          data: null
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }


    componentDidMount(){
      const currentCourseId = this.props.match.params.id;
      this.setState({
        currId: currentCourseId
      });
      let currentComponent = this;
      axios.get(`http://localhost:5000/api/courses/${currentCourseId}`)
          .then((response)=>{
          //  console.log(response);
            
            
            
            if(response.data != null){

            if(response.data.User.id !== this.props.context.authenticatedUser.id){
              
              this.props.history.push("/forbidden");
            } else {
              currentComponent.setState({
                  courseData: response.data,
              });
            }

            } else{
              this.props.history.push("/notfound");
            }

             // console.log(this.state.courseUpdate);
          })
          .then();

  }

    //https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825
    handleChange(event){
      
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
          courseUpdate:{
            ...this.state.courseUpdate,
            [name]: value 
          }
        });
    

    }

handleSubmit(event){
  
  event.preventDefault();
  const encodedCredentials = localStorage.getItem('authHeader');
  const updateCourse =  axios.put(`http://localhost:5000/api/courses/${this.state.currId}`, this.state.courseUpdate, {headers: {"Authorization" : `Basic ${encodedCredentials}`} });
  
  updateCourse.then(                
    (response) => { 
      this.setState({data: response.data});
    }
  ).catch(
    (err)=>{ 
      if(err.response.status === 500){
      this.props.history.push('/error')
  }else {
      this.setState({errors: err.response.data.errors});
  }
    }
  );

}

handleCancel(event){
  event.preventDefault();
  this.props.history.push("/courses");
}


//if value is empty, set it to placeholder value

    render(){
        return(
          <div className="grid-100">
      <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        {this.state.errors ?
          <div className="validation-errors">
              <ul>
                {this.state.errors.map((error, index)=>{
                    return(<li key={index}>{error}</li>)
                })
                }
              </ul>
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
                            placeholder={this.state.courseData.title}
                            value={this.state.courseUpdate.title.value} />
                      </div>
                    </div>
            <div className="course--description">
              <div>
                <textarea id="description" 
                          name="description"
                          onChange={this.handleChange}
                          className="" 
                          placeholder={this.state.courseData.description}
                          value={this.state.courseUpdate.description.value}>
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
                            placeholder={this.state.courseData.estimatedTime}
                            value={this.state.courseUpdate.estimatedTime.value}
                            /></div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea id="materialsNeeded" 
                              name="materialsNeeded"
                              onChange={this.handleChange} 
                              className="" 
                              placeholder={this.state.courseData.materialsNeeded}
                              value={this.state.courseUpdate.materialsNeeded.value}
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
              onClick={this.handleCancel}>
                Cancel
              </button>
            
            </div>
      </form></div>
    </div>
    </div>
        );
    }
}

export default withRouter(UpdateCourse);
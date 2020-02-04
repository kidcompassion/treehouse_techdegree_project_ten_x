import React from 'react';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse'
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

function App() {
/*
  // Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:5000/api/courses', true)

request.onload = function() {
  var data = JSON.parse(this.response);
  console.log(data);

}

// Send request
request.send()
*/
  return (
        <div className="container">
          <Header/>
          <div className="bounds">
            <BrowserRouter>
              <Switch>
                <Route exact path='/' render={()=> <Redirect to='/courses' /> }/>
                <Route exact path='/courses' component={Courses}/>
                <Route exact path="/courses/create" component={CreateCourse} />
                <Route exact path="/courses/:id/update" component={UpdateCourse} />
                <Route path="/courses/:id" component={CourseDetails} />
                <Route path='/signin' component={UserSignIn}/>
                <Route path='/signup' component={UserSignUp}/>
                <Route path='/signout' component = {UserSignOut}/>
              </Switch>
            </BrowserRouter>
            </div>
        </div>
         

  );
}

export default App;

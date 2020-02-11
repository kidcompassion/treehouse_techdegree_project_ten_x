import React from 'react';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse'
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import { Header } from './components/Header';
import { Data } from './components/Data';

import { withContext }  from './components/Context';
import PrivateRoute from './PrivateRoute';

import {
  Route,
  Switch
} from 'react-router-dom';
import './App.css';


const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailsWithContext = withContext(CourseDetails);
const PrivateRouteWithContext = withContext(PrivateRoute);

const data = new Data();

function App(props) {
  //console.log(props.context.authenticatedUser);
  
  return (
    
        <div>
          
          <HeaderWithContext />
        
            <Switch>
              <Route exact path='/' component={CoursesWithContext} />
              <Route exact path='/courses' component={CoursesWithContext}/>
              <Route path='/signin' component={UserSignInWithContext}/>
              <Route path='/signup' component={UserSignUpWithContext}/>
              <Route path='/signout' component = {UserSignOutWithContext}/>
              <PrivateRouteWithContext exact path="/courses/create" component={CreateCourseWithContext} />
              <PrivateRouteWithContext exact path="/courses/:id/update" component={UpdateCourseWithContext} />
              <PrivateRouteWithContext exact path="/courses/:id/delete" component={UpdateCourseWithContext} />
              <Route path="/courses/:id" render={
                  ({match})=>
                    <React.Fragment>
                      <CourseDetailsWithContext match={match} />
                    </React.Fragment>
                  } />
                <Route component = {NotFound} />
              </Switch>
          </div>
      

  );
}

export default App;

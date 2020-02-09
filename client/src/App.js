import React from 'react';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse'
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import Services from './components/Services';
import  AuthContext  from './components/Context';


import {
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <AuthContext.Provider value={Services}>
        <div>
        
          <Header/>
            
              <Switch>
                <Route exact path='/' component={Courses} />
                
                <Route exact path='/courses' component={Courses}/>

                <Route path='/signin' component={UserSignIn}/>
                <Route path='/signup' component={UserSignUp}/>
                <Route path='/signout' component = {UserSignOut}/>
                <Route exact path="/courses/create" component={CreateCourse} />
                <Route exact path="/courses/:id/delete" component={UpdateCourse} />
                <Route exact path="/courses/:id/update" render={
                    ({match})=>
                      <React.Fragment>
                        <UpdateCourse match={match} />
                      </React.Fragment>
                    } />
                <Route path="/courses/:id" render={
                    ({match})=>
                      <React.Fragment>
                        <CourseDetails match={match} />
                      </React.Fragment>
                    } />
              </Switch>
              
            </div>
            </AuthContext.Provider>

  );
}

export default App;

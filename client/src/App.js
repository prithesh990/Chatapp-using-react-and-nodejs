import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './css/App.css';
import Room from './components/Room';
import Chat from './components/Chat';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <Router>
      <Route path='/' exact  >
        <Redirect to="/home" />
      </Route>
      <Route path='/home' component={Room} />
      {/* <Route path='/login' component={SignInSide} /> */}
      <Route path='/chat' component={Chat} />
    </Router>
  )
}

export default App;

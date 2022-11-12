import React, { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Connect from './components/Connect'
import Activity from './components/Activity'
import PostPage from './components/PostPage'
import Error from './Error'
import { UserContext } from './Context'


export default function App() {
  const user = useContext(UserContext);
  return (
    <Router>
        <Routes>
          {user ? 
            <>
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/connect" element={<Connect />} />
              <Route exact path="/activity" element={<Activity />} />
              <Route exact path="/posts/:id" element={<PostPage />} />
            </>
          :
            <>
              <Route exact path="/register" element={<Register />}/>
              <Route exact path="/login" element={<Login />} />
            </>
          }
          <Route exact path="/" element={<Home />} /> 
          <Route path="*" element={<Error />} />        
        </Routes>
    </Router>
  );
}



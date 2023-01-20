import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Homepage from './components/Homepage';

const AppRoute = () => {
  return (
    <>
    
    <Router>
        <Routes>

        <Route path='/'  element={<Homepage/>}></Route>
        <Route path='/authfailed'  element={<Homepage/>}></Route>
        </Routes>
    </Router>
    <div>AppRoute</div>
    </>
  )
}

export default AppRoute
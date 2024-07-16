import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Main from './components/Main';
// import router from '../../backend/Allroutes';
import React from 'react';
import MyFrontpage from './components/MyFrontpage';
import Doctor from './components/Doctors';
import Upload from './components/Upload';
import Caretakers from './components/Caretakers';
import Login from './components/Login';
import Profile from './components/Profile';
import Analysis from './components/Analysis';
import AnalysisDoctor from './components/AnalysisDoctor';
import DoctorProfile from './components/DoctorProfile';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<MyFrontpage/>}></Route>
        <Route path='/Doctors' element ={<Doctor/>}></Route>
        <Route path='/Caretakers' element={<Caretakers/>}></Route>
        <Route path='/Upload' element={<Upload/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Profile/:id' element={<Profile/>}></Route>
        <Route path='/report/:id' element={<Analysis/>}/>
        <Route path='/reportdoctor/:id' element={<AnalysisDoctor/>}/>
        <Route path='/doctorprofile/:id' element={<DoctorProfile/>}></Route>

        

        
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

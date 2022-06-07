import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from '../client/pages/login.jsx';


const Main = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
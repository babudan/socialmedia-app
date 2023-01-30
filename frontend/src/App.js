import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Contact from './components/pages/Contact';
  import Category from './components/pages/Category';
  import About from './components/pages/About';
  import SignUp from './components/pages/SignUp';
  import Home from './components/pages/Home';
  import Categories_data from './components/pages/Categories_data';
  

  function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/Apple' element={<Category data={Categories_data.Apple} />} />
          <Route path='/Banana' element={<Category data={Categories_data.Banana} />} />
          <Route path='/cabage' element={<Category data={Categories_data.cabage} />} />
          <Route path='/bringel' element={<Category data={Categories_data.bringel} />} />
          <Route path='/orange' element={<Category data={Categories_data.orange} />} />
        </Routes>
      </Router>
  
    )
  }
  
  export default App;


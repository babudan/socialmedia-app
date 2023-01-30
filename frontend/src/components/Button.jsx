import React from 'react';
  import { Link } from 'react-router-dom'
  import './button.css'
  
  function Button() {
      return (
          <Link to="sign-up">
              <button className='btn-dark'>Sign Up</button>
          </Link>
      )
  }
  export default Button

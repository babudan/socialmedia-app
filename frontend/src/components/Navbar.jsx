import React, { useState } from 'react'
  import DropDown from './DropDown'
  import Button from './Button'
  import { Link } from 'react-router-dom'
  import './navbar.css'
  
  function Navbar() {
  
      const [click, setClick] = useState(false)
      const [dropdown, setDropdown] = useState(false)
      const changeClick = () => setClick(!click)
      const closeMobileMenu = () => setClick(false)
  
      const onMouseEnter = () => {
          setDropdown(true)
      }
  
      const onMouseLeave = () => {
          setDropdown(false)
      }
  
      return (
          <>
              <section>
                  <nav className="navbar">
  
                      <Link to='/' className='logo'><i className='fas fa-home' /> Pro-Blog </Link>
  
                      <div className="menu-icon" onClick={changeClick}>
                          <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
                      </div>
  
                      <ul className={click ? 'nav-side-menu start' : 'nav-side-menu'}>
  
                          <li className='nav-items'>
                              <Link to="/" className='nav-links' onClick={closeMobileMenu}> Home </Link>
                          </li>
  
                          <li className='nav-items'>
                              <Link to="/about" className='nav-links' onClick={closeMobileMenu}> About </Link>
                          </li>
  
                          <li className='nav-items' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                              <Link className='nav-links' onClick={closeMobileMenu}> Category <i className='fas fa-caret-down' />
                                  {dropdown && <DropDown />}
                              </Link>
                          </li>
  
                          <li className='nav-items'>
                              <Link to="/contact" className='nav-links' onClick={closeMobileMenu}> Contact </Link>
                          </li>
  
                          <li className='nav-items'>
                              <Link to="/sign-up" className='nav-links-button' onClick={closeMobileMenu}> Sign Up </Link>
                          </li>
  
                      </ul>
  
                      <Button />
  
                  </nav>
              </section>
          </>
      )
  }
  
  export default Navbar;

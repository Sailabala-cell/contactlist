import React,{useState} from 'react'
import './Header.css'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
// import Home from '../homes/Home';
import '../homes/Home.css'
import background from "../image/front.png";
const Header = () => {
  const [sidebar,setSidebar]=useState(false)

  // window.addEventListener("scroll", function(){
  //   const header = document.querySelector('.header')
  //   header.classList.toggle('active',window.screenY > 200)
  // })
  
  return (
    <div className='App' style={{backgroundImage: `url(${background})`}} >
        <header className='header'>
            <div className='container flex'>
          
                <div className='logo'>
                    
                    <img className='logo-size' src='logo.png' alt=''/>
                </div>
                <div className='nav'>
                  <ul className={sidebar?'nav-links-sidebar':'nav-links'} onClick={()=>setSidebar(true)}>
                  
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/pages'>About Us</Link></li>
                    <li><Link to='/blog'>Courses</Link></li>
                    <li><Link to='/portfolio'>Fun and Learn</Link></li>
                    <li><Link to='/shop'>Testimonials</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                   
                  </ul>
                </div>
                <button className='navbar-items-icon' onClick={()=> setSidebar(!sidebar)}>
                  {sidebar? <CloseIcon/> :<MenuIcon/>}
                </button>
                
            </div>
            <div className='heading'>
            <h1 >Let's Keep Learning</h1>
              <button  className='primary-btn'>Get Started</button>
             <nav>
             <Link to='Signup/*'>
             <button className='Secondary-btn'>
              Signup
               </button>
             </Link>
             </nav>
            </div>
            
             
          
        </header>
       
    </div>
  )
}

export default Header
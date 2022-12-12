import React from 'react'
import {Link} from 'react-router-dom';
import './Home.css'
const Home = () => {

  return (
    <div className='home'>
       <h1>Let's Keep Learning</h1>
              <button className='primary-btn'>Get Started</button>
             <nav>
             <Link to='Signup/*'>
             <button className='Secondary-btn'>
              Signup
               </button>
             </Link>
             </nav>
             </div>
    
  )
}
export default Home

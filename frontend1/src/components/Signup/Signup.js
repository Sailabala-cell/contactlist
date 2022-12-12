import React from 'react'
import background from '../home/image/side.jpg'
import './Signup.css'
import FetchData from './FetchData'
function Signup() {
  return (
    <div style={{backgroundImage: `url(${background})`}}  className='container' >
    <div className='flex_container'>
    <div className='title'>
    <h5>Sign_up</h5>
    <FetchData/>
    </div>
    
    </div>
   

    
    
    
    
    </div>
  )
}

export default Signup
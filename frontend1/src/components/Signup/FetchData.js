import React,{useState,useEffect} from 'react'
import axios from "axios"
// import res from 'express/lib/re sponse'
function FetchData() {
    const [profiles,setProfiles]=useState([])
    const getProfiles = ()=>{
     const config={
        headers : {
            "Content-Type":"application/json",
            authorization:"Access-Control-Allow-Origin"
        }}
        try{  
         
            axios.get("http://localhost:5000/profiles",config)
            .then(function (response) {
                console.log(response.data)
                setProfiles(response.data)
                // console.log(setProfiles(profiles))
            
            }
            
            )
        }catch(error){
          console.log(error)
        }
    }
useEffect(()=>{
    getProfiles()
    // console.log(profiles)
},[])

  return (
     <>
         <ul>
         {/* console.log(profiles) */}
            {profiles.length>0 ? 
            
            (profiles.map((profile)=>
            <li key={profile.userId}>{profile.firstName}</li>
            
            )) : (
                <h1>No profiles found</h1>
            )
            
            }
         </ul>
     </>
  )
}

export default FetchData
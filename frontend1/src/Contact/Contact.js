import axios from 'axios';
import React,{useState, useEffect} from 'react';
import "./Contact.css"
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
// import axios from "axios"
const Contact = () =>{
  const [formData,setFormData]=useState({
    firstName:" ",
    lastName:" ",
    email:"",
    company:"",
    phone:"", 

  }) 
  

  const {firstName,lastName,email,company,phone}=formData
  const onChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onSubmit=async (e)=>{
    e.preventDefault()
    const newContact = {
      firstName:firstName,
    lastName:lastName,
    email:email,
    company:company,
    phone:phone, 
    }
  const config = {
    headers:{
      "Content-Type" : "application/json"
    },
  };
  try{
     const body = JSON.stringify(newContact)
     await axios.post('/contact',body,config)
     setFormData(
       {firstName:" ",
       lastName:" ",
       email:"",
       company:"",
       phone:"", 
       } 
     )
     window.location.reload()
  }catch(err){
    console.log("error",err.response.data)
  }
  } 
 const [contacts,setContacts] = useState([]) 

const getAllContacts=  async () =>{
   const config = {
     headers:{
      "Content-Type":"application/json"
     }
   }
   try{
     const res = await axios.get('/contact',config)
      setContacts(res.data)
    }catch(err){
     console.log("error",err)
   }
 }
 useEffect(()=>{
   getAllContacts()
 },[])

 const [currentContact,setCurrentContact] = useState({})
 const [id,setId]=useState("");
 const getContactById = async (id) =>{
  const config = {
    headers:{
     "Content-Type":"application/json"
    }
  };
  try{
    const res = await axios.get(`/contact/${id}`,config)
    setCurrentContact(res.data)
  } catch (err){
    console.log("error",err)
  }
 }
 useEffect(()=>{
   getContactById(id)
 },[id])

 const [open,setOpen]=useState(false)

 function handleClose(){
   setOpen(false)
 }

 function handleClickOpen(){
   setOpen(true)
 }

 const handleEdit = async (id)=>{
   const config = {
     headers:{
       "Contact-Type":"application/json"     }
   }
   try{
     await axios.put(`/contact/${id}`, 
    currentContact,config)
     
     setCurrentContact({
       firstName:currentContact.firstName,
       lastName:currentContact.lastName,
       email:currentContact.email,
       company:currentContact.company,
       phone:currentContact.phone,
     })
     setOpen(false)
     window.location.reload()
   }catch(err){
     console.log('error',err)
   }
 }
 const handleDelete = async (id)=>{
    await axios.delete(`/contact/${id}`).then((res)=>{
      const del = contacts.filter((contact) => id !==contact.id)
      setContacts(del)
      setOpen(false);
      window.location.reload()
    })
 }
 const handleInputChange = (event)=>{
   setCurrentContact({
     ...currentContact,
     [event.target.name]:event.target.value
   })
 }
 
  return (
        <>
        <form className='contact-form' onSubmit={(e)=>onSubmit(e)}>
          
          <input 
          type="text" 
          name="firstName" 
          value={firstName}
          placeholder="Enter your firstName"
          onChange = { (e) => onChange(e)}
          required
          ></input>
          <br/>
          <input 
          type="text" 
          name="lastName" 
          value={lastName}
          placeholder="Enter your lastName"
          onChange = {(e) => onChange(e)}  
          required
          ></input>
          <br/>
          <input 
          type="text" 
          name="email" 
          value={email}
          placeholder="Enter your email"
          onChange = {(e) => onChange(e)}  
          required
          ></input>
          <br/>
          <input 
           type="text"
           name="company"
           value={company}
           placeholder="Enter your company name"
           onChange={(e) => onChange(e)}
           required>
           </input>
           <br/>
           <input 
          type="tel" 
          name="phone" 
          value={phone}
          placeholder="Enter your phone no"
          onChange = {(e) => onChange(e)}  
          required
          ></input>
         <button type="submmit">Add New Contact</button>
          </form>  
        
               <div className='contacts-container'>
               <h1 style={{textAlign : "center"}}> Contact List</h1>
                   <Dialog 
                   open={open} 
                   onClose={handleClose}
                   aria-labelledby="form-dialog-title">
                     <DialogContent>
                       <DialogContentText component={"div"} style={{textAlign:'center'}}>
                       <form className='contact-form'>
          
          <input 
          type="text" 
          name="firstName" 
          value={currentContact.firstName}
          placeholder="Enter your firstName"
          onChange = { handleInputChange  }
          ></input>
          <br/>
          <input 
          type="text" 
          name="lastName" 
          value={currentContact.lastName}
          placeholder="Enter your lastName"
          onChange = {handleInputChange}  
          required
          ></input>
          <br/>
          <input 
          type="text" 
          name="email" 
          value={currentContact.email}
          placeholder="Enter your email"
          onChange = {handleInputChange}  
          required
          ></input>
          <br/>
          <input 
           type="text"
           name="company"
           value={currentContact.company}
           placeholder="Enter your company name"
           onChange={handleInputChange}
           required>
           </input>
           <br/>
           <input 
          type="tel" 
          name="phone" 
          value={currentContact.phone}
          placeholder="Enter your phone no"
          onChange = {handleInputChange}  
          required
          ></input>
          <Button className='btn' onClick={()=>handleEdit(id)}>
            <Typography className='text-primary'>Save</Typography>
          </Button>

          <Button className='btn' onClick={()=>handleDelete(id)}>
            <Typography className='text-primary'>Delete</Typography>
          </Button>

          <Button className='btn' onClick={()=>handleClose()}>
            <Typography className='text-primary'>Cancel</Typography>
          </Button>
           

               </form>  
                       </DialogContentText>
                     </DialogContent>
                   </Dialog>
                    <ul className='contact-list'>
                   
                      {contacts.length >0 ?contacts.map((contact)=>(
                        <li key={contact._id} onClick={()=>handleClickOpen()}>
                        <div className='left' onClick={()=>setId(contact._id)}>
                      
                        <p>
                            {contact.firstName}
                            &nbsp;{contact.lastName}
                          </p>
                          <p>{contact.email}</p>
                          <p> Works at {contact.company}</p>
                          <p>{contact.phone}</p>
                        </div> 
                         </li>
                      )):(<h1 style={{textAlign:"center",width:"90%",margin:"auto"}}>
                        No contacts found
                      </h1>)}
                   </ul>
               </div>
        </>
    )
}
export default Contact
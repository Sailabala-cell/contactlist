const express= require("express")
const dotenv=require("dotenv")
const connectDB = require("./config/db.js")
const data=require("./data/people.json")
const favicon=require("serve-favicon")
const path = require("path");
const cors=require("cors")
const bodyParser=require("body-parser")

const Contact = require("./models/contactModel")

dotenv.config(); 
const app=express()

connectDB()
const PORT = process.env.PORT || 5000
// app.use(cors())
app.use(express.static(__dirname + "/public"))
app.use("/images",express.static(__dirname + "/images"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


// app.use(bodyParser.json())
// app.use(favicon(path.join(__dirname,"public","favicon.ico")))
// app.use(cors())
// Crud operations contact routes


//path/contact
// @desc adding new contact
// @method post
// @access public
app.route("/contact").post((req,res)=>{
    let newContact= new Contact(req.body)
    newContact.save((err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
}) 

//path/contact
// @desc get all contact
// @method get
// @access public
app.route("/contact").get((req,res)=>{
    Contact.find( {},(err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
}) 

//path/contact/:contactId
// @desc get contact by Id
// @method get
// @access public
app.route("/contact/:contactId").get((req,res)=>{
    Contact.findById( req.params.contactId,(err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
}) 

//path/contact/:contactId
// @desc edit contact by Id
// @method put
// @access public 
app.route("/contact/:contactId").put((req,res)=>{
    Contact.findOneAndUpdate( 
        {_id:req.params.contactId}, req.body,
        {new:true, useFindAndModify:false},
        (err,contact)=>{
        if(err){
            res.send(err)
        }
        res.json(contact)
    })
}) 

//path/contact/:contactId
// @desc delete contact by Id
// @method delete
// @access public 
app.route("/contact/:contactId").delete((req,res)=>{
    Contact.remove( 
        {_id:req.params.contactId},
        (err,message)=>{
        if(err){
            res.send(err)
        }
        res.json({message:"Contact Succesfully Deleted"})
    })
}) 
// Crud operations contact routes end

app.get('/user/:id',(req,res,next)=>{
    // res.send(` get request is sending on port ${PORT}`)
    console.log(req.params.id);
    let user = Number(req.params.id)
    console.log(user)
    console.log(data[user])
    res.json(data[user])
    next();
}, (res,req) =>{
    console.log("The second function")
}

)
app.route ("/profiles")
.get((req,res)=>{
    // res.end()
    console.log(`Request from:${req.originalUrl}`);
    console.log(`Request type:${req.method}`)
     res.json(data)
    })
    .post ((req,res)=>{
        console.log(req.body);
        res.send(req.body)
    })
.put((req,res)=>{
    res.send(`put request is sending on port ${PORT}`)
})
.delete((req,res)=>{
    res.send(`delete request is sending on port ${PORT}`)
})

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
// app.listen(5000,console.log('running'))
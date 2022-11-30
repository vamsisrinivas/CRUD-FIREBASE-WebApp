import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import firebaseDB from './firebase'
 
const Edit = () => {
    let query= new URLSearchParams(useLocation().search)

    const [data,setData] = useState({
        firstname:"",
        lastname:"",
        email:"",
    })
    const {firstname,lastname,email} = {...data}
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        setData({...data,
            firstname:query.get('firstname'),
            lastname:query.get('lastname'),
            email:query.get('email'),
        })
    },[])
    const submitHandler = e =>{
        e.preventDefault();
        firebaseDB.child(`register-crud/${query.get('key')}`).set(
            data,
           err =>{
               if (err){
                   console.log(err);
               }
               else{
                   alert("Data Updated")
                   
               }

           } 
           
        )
        setData({
            firstname:"",
            lastname:"",
            email:""
        })
    }
    return (
        <div>
        <h2 style={{"textAlign":"center"}}>Update Form</h2><br />
        <form  onSubmit={submitHandler} className="container" autoComplete="off">
            <div className="form-group">
            {/* <label className="control-label col-sm-2">First Name:</label> */}
            <div className="col-sm-4">
                <input type="text" value={firstname} className="form-control" placeholder="First Name" name="firstname" onChange={changeHandler} />
            </div>
            </div>
            <br/>
            <div className="form-group">
            {/* <label className="control-label col-sm-2">Last Name:</label> */}
            <div className="col-sm-4">          
                <input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={changeHandler} value={lastname} />
            </div>
            </div>
            <br/>
            <div className="form-group">
            {/* <label className="control-label col-sm-2">Email:</label> */}
            <div className="col-sm-4">          
                <input type="email" className="form-control" placeholder="Enter Email" name="email" value={email}
               onChange={changeHandler} />
            </div>
            </div>
            <br/>
            <div className="form-group">        
            <div className="col-sm-4">
                <input type="submit" className="btn btn-success" 
                value="Submit" />
            </div>
            </div>
    </form>
   
    </div>
    )
}

export default Edit

import React, { useEffect, useState } from 'react'
import firebaseDB from './firebase'
import './App.css'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    let history=useNavigate()
    const[data,setData]=useState({
        firstname:"",
        lastname:"",
        email:""
    })
    const [getData,setGetData]=useState({})
    useEffect(()=>{
        firebaseDB.child('register-crud').on('value',details=>{
            // console.log(details.val())
            setGetData(details.val())
        })
    },[])

    const{firstname,lastname,email}={...data}

    const changeHandler=(e)=>{
        setData({...data,[e.target.name]:[e.target.value]})
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        await firebaseDB.child('register-crud').push(
        data,
            err=>{
                if(err){
                    console.log(err)
                }
                else{
                    alert("Data Added")
                }
            }
            )
        console.log(data)
        setData({
            firstname:"",
            lastname:"",
            email:""

        })
    }
    const deleteHandler=(key)=>{
        firebaseDB.child(`register-crud/${key}`).remove(
            err=>{
                if (err){
                        console.log(err)
                }
                else{
                    alert("Data Record Deleted Successfully")
                }
            }
        )
    }

    return (
        <div>
        <h2 style={{"textAlign":"center"}}>Register Form</h2><br />
        <form onSubmit={submitHandler} className="container" autoComplete="off">
            <div className="form-group">
            {/* <label className="control-label col-sm-2">First Name:</label> */}
            <div className="col-sm-4">
                <input type="text" className="form-control"placeholder="First Name" name="firstname" value={firstname} onChange={changeHandler}/>
            </div>
            </div>
            <br/>
            <div className="form-group">
            {/* <label className="control-label col-sm-2">Last Name:</label> */}
            <div className="col-sm-4">          
                <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={lastname} 
                onChange={changeHandler}/>
            </div>
            </div>
            <br/>
            <div className="form-group">
            {/* <label className="control-label col-sm-2">Email:</label> */}
            <div className="col-sm-4">          
                <input type="email" className="form-control" placeholder="Enter Email" name="email" value={email} 
                onChange={changeHandler}/>
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
    <div>
        {
            getData&&
            Object.keys(getData).map(key=>
                <div className="border" >
                    <p>FirstName: {getData[key].firstname}</p>
                    <p>LastName: {getData[key].lastname}</p>
                    <p>Email: {getData[key].email}</p>
                    <button className="btn btn-success" 
                    onClick={() => history(`/edit?firstname=${getData[key].firstname}&lastname=${getData[key].lastname}&email=${getData[key].email}&key=${key}`
                    )}
                    >Update</button>
                    &nbsp;
                    <button className="btn btn-danger" 
                    onClick={()=>deleteHandler(key)}> Delete</button>

                    </div>
                    )
        }
    </div>
    </div>
    )
}

export default Home

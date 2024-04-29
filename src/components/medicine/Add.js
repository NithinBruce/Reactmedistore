import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from 'react-redux';
import checkAuth from "../auth/checkAuth";

function Add() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            navigate('/list/posts');
        }).catch(error => {
            console.error('Error adding post:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <br></br><br></br>
                    <h1 className="text-center"><b>Add Medicine</b></h1>
                    <hr></hr>
                    <div className="form-group">
                        <label><b>Name</b></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label><b>Company</b></label>
                        <input 
                         type="text" 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div>
                         <label><b>Expiry Date</b></label>
                           <input 
                            type="date" 
                            className="form-control" 
                            value={expiry_date} 
                            onChange={(event)=>{setExpiry_date(event.target.value)}}
                            />
                   </div>
                     <div className="form-group mt-3">
                     <button className="btn btn-primary" onClick={addPost}>Add </button>
                     <Link to="/list/posts" className="btn btn-dark float-right">Back</Link>

                     </div>  

            </div>
        </div>
        </div>
                  
        </div>
    ); 
}

export default checkAuth(Add);

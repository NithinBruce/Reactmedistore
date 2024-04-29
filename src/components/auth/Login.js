import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            console.log(user.token)
            dispatch(setUser(user));
    navigate("/list/posts");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (<div>
        <Navbar/>
        <div className="container card mt-5 p-5 ">

            <div className="row mt-5">
                <div className="col-8 offset-2">
                    <h1 className="text-center">LOGIN</h1><hr></hr>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <br></br>
                        <label>Email:</label>
                        <input type="text"
                        className="form-control"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <button className="btn btn-primary btn-block float-right" onClick={attemptLogin}>Login</button>
                        <p className="text-center">Don't have an Account? <Link to={'/register'}>Register</Link> </p>
                    </div>
                
                </div>
            </div>
        </div>
    </div>)
}

export default Login
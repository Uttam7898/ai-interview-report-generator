import React, { useState } from 'react';
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import {useNavigate,Link} from "react-router-dom";
'react-router-dom';
const Login = () => {
  
 const { handleLogin, loading} = useAuth()
 const navigate = useNavigate()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await handleLogin ({email,password})
    if(success) navigate("/")


  }
     
  
    return (
       <main> 
        <div className="form-container">
           <h1>Login</h1>  
           
             <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder='Enter your email' value={email} 
                onChange={(e) => setEmail(e.target.value)} />
               
                </div>
                <div className="input-group">

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder='Enter your password' value={password}
                 onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className="button primary-button">login</button>
                
                </form><p>Don't have an account? <Link to="/register">Register</Link></p>

             </div>
           </main>
        )
};


export default Login;
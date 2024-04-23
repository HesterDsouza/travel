import "./login.css";
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined, 
  })

  const {loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setCredentials(prev =>({...prev, [e.target.id]: e.target.value}))
  }

  const handleLogin = async(e) =>{
    e.preventDefault()
    dispatch( {type:"LOGIN_START"} )

    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({type: "LOGIN_SUCCESS", payload:res.data.details});
      navigate("/");
    } 
    
    catch (error) {
      dispatch( {type:'LOGIN_FAILURE', payload: error.response.data})
    }
  };

  return (
    <div className="login">
      <div className="lcontainer">
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
        {error && <span>{error.message}</span>}
        <p>
            Don't have an account yet? <Link to="/register">Register</Link> here!
        </p>
        <p>
          <Link to="/forgot_password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;

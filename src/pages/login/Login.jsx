import "./login.scss";
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate} from "react-router-dom";

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
      if(res.data.isAdmin){
        dispatch({type: "LOGIN_SUCCESS", payload:res.data.details});

        navigate("/");
      }else{
        dispatch( {type:'LOGIN_FAILURE', payload: {message: "You are not allowed!"}})

      }
    } 
    
    catch (error) {
      dispatch( {type:'LOGIN_FAILURE', payload: error.response.data})
    }
  };

  console.log("Details: ",credentials);

  return (
    <div className="login">
      <div className="lcontainer">
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
        <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
        {/* <p>
            Don't have an account yet? <Link to="/register" style={{textDecoration: "none"}}>Register</Link> here!
        </p> */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login;

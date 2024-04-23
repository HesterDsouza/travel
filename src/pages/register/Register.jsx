import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [credentials, setCredentials] = useState({
      full_name: "", username:"", phone: "", email: "", password: "" ,
      securityQuestion: "", securityAnswer: "",
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev =>({...prev, [e.target.id]: e.target.value}))
      };

    const handleRegister = async(e) =>{
        e.preventDefault();
        dispatch({type: "REGISTER_START"})

        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({type: "REGISTER_SUCCESS", payload:res.data});
            navigate("/login");
        } catch (error) {
            dispatch({type: "REGISTER_FAILURE", payload: error.response.data});
        }
    }

    console.log(credentials)

  return (
    <div className="registration">
      <div className="rgcontainer">
        <input type="text" placeholder="full name" id="full_name" onChange={handleChange} className="rInput" />
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="rInput" />
        <input type="email" placeholder="email" id="email" onChange={handleChange} className="rInput" />
        <input type="text" placeholder="mobile number" id="phone" onChange={handleChange} className="rInput" />
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="rInput" />
        <select id="securityQuestion" onChange={handleChange} className="rInput">
          <option value="">Select security Question</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
          <option value="In what city were you born?">In what city were you born?</option>
          <option value="What is your favorite book?">What is your favorite book?</option>
          <option value="What is the name of your best childhood friend?">What is the name of your best childhood friend?</option>
        </select>
        <input type="text" placeholder="Security Answer" id="securityAnswer" onChange={handleChange} className="rInput"/>
        <button disabled={loading} onClick={handleRegister} className="rButton">
            Register
        </button>
        {error && <span className="error">{error.message}</span>}
        <p>
            Already have an account? <Link to="/login">Login</Link> here!
        </p>
      </div>
    </div>
  )
}

export default Register

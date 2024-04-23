import "./register.scss"
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="registration">
      <div className="rgcontainer">
        <input type="text" placeholder="username" id="username" className="rInput" />
        <input type="email" placeholder="email" id="email" className="rInput" />
        <input type="password" placeholder="password" id="password" className="rInput" />
        <button className="rButton">
            Register
        </button>
        <p>
            Already have an account? <Link to="/login">Login</Link> here!
        </p>
      </div>
    </div>
  )
}

export default Register
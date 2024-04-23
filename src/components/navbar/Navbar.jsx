import "./navbar.css";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";


const Navbar = () => {

  // const {user, dispatch} = useContext(AuthContext);

  // const handleLogout = async(e) =>{
  //   e.preventDefault()
  //   dispatch( {type:"LOGOUT"} );
  // };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/"> 
          <span className="logo">
            <img className="logoImg" src="https://tsprodimages.s3.ap-south-1.amazonaws.com/v/02771015/profileimages/ts_20240115061224000000253887302.jpg" alt="" />
          </span>
        </Link>
        {/* {user ? (
          <div className="navItems">
            <span className="username">{user.username}</span>
            <button onClick={handleLogout} className="navButton">
              LogOut
            </button>
          </div>
        ) : (
        <div className="navItems">
          <Link to="/login" >
            <button className="navButton">
              Sign In/ Register
            </button>
          </Link>
        </div>
        )} */}
        <div className="navItems">
            <FontAwesomeIcon icon={faPhone} />
            <span>8793082326, 9175334792</span>
            <span>|</span>
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faWhatsapp} />
            <FontAwesomeIcon icon={faGoogle} />                    
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

    const {dispatch} = useContext(DarkModeContext);

    const {user} = useContext(AuthContext);
    
    // console.log(user);
    
    const navigate = useNavigate();

    const handleLogOut = () => {

        // clear the localStorage
        localStorage.clear();

        //Clear cookies
        document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        })

        //reload page to remove revisting prevous page.
        window.location.reload();

        //Navigate to LogIn Page
        navigate("/login");
    }

  return (
    <div className = "sidebar">
        <div className="top">
            <Link to="/users/profile" style={{"textDecoration": "none"}}>
               {user && <span className="logo">
                    {user.username}
                    </span>}
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{"textDecoration": "none"}}>
                <li>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/users" style={{"textDecoration": "none"}}>
                <li>
                    <GroupIcon className="icon"/>
                    <span>Users</span>
                </li>
                </Link>
                <Link to="/packages" style={{"textDecoration": "none"}}>
                <li>
                    <CategoryIcon className="icon"/>
                    <span>Packages</span>
                </li>
                </Link>
                <li onClick={() => {navigate("/enquiry")}}>
                    <FeedbackIcon className="icon"/>
                    <span>Enquiries</span>
                </li>
                <p className="title">UPDATES</p>
                <li onClick={() => {navigate("/notifications")}}>
                    <NotificationsActiveIcon className="icon"/>
                    <span>Notifications</span>
                </li>
                <li onClick={() => {navigate("/checked")}}>
                    <CheckCircleOutlineOutlinedIcon className="icon"/>
                    <span>Checked</span>
                </li>
                <li onClick={() => {navigate("/contacted")}}>
                    <ContactPhoneOutlinedIcon className="icon"/>
                    <span>Contacted</span>
                </li>
                <p className="title">USER</p>
                <li onClick={() => {navigate("/users/profile")}}>
                    <AccountCircleIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li onClick={() => {navigate("/assignedTo")}}>
                    <AssignmentOutlinedIcon className="icon" />
                    <span>Assigned Enquiries</span>
                </li>
                <li onClick={handleLogOut}>
                    <LogoutIcon className="icon"/>
                    <span>LogOut</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div 
                className="colorOptions" 
                onClick={() => dispatch({type:"LIGHT"})}></div>
            <div 
                className="colorOptions" 
                onClick={() => dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar;
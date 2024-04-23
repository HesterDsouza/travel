import { useContext, useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./profile.scss"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

const Profile = () => {

  const [editMode, setEditMode] = useState(false)
  const {user, dispatch} = useContext(AuthContext);
  const [updatedUser, setUpdateUser] = useState({...user});
  // console.log(user);
  
  const handleEditClick = async () => {
    setEditMode(!editMode)
  };

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUpdateUser((prevUser) => ({...prevUser, [name]: value}))
  };

  const handleSaveChanges = async () => {
    try {
      dispatch({type: "LOGIN_START"}); //Start Loading State
      const response = await axios.put(`/users/${user._id}`, updatedUser);
      dispatch({type: "LOGIN_SUCCESS", payload: response.data})
      setEditMode(false);
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
    }
  };
  
  if(!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileContent">
          <div className="profileBox">
            <div className="editButton" onClick={handleEditClick}>{editMode ? "Cancel" : "Edit"}</div>
            <h1 className="title">Profile</h1>
            <div className="item">
              {/* <img/> */}
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Username: </span>
                  <span className="itemValue">{editMode ? (<input type="text" name="username" value={updatedUser.username} onChange={handleChange}/>) : (user.username)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Full Name: </span>
                  <span className="itemValue">{editMode ? (<input type="text" name="full_name" value={updatedUser.full_name} onChange={handleChange}/>) : user.full_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{editMode ? (<input type="text" name="email" value={updatedUser.email} onChange={handleChange}/>) : user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{editMode ? (<input type="text" name="phone" value={updatedUser.phone} onChange={handleChange}/>) : user.phone}</span>
                </div>
              </div>
            </div>
            {editMode && (<button className="save" onClick={handleSaveChanges}>Save changes</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
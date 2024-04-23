import "./user.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
// import DataTable from "../../components/dataTable/DataTable"
// import { enquiryColumns } from "../../dataTableSource"
import Tables from "../../components/tables/Tables"
import { ToastContainer, toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

const User = () => {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    //console.log(userId);
    const [userData, setUserData] = useState(null);
    const [userEnquiries, setUserEnquiries] = useState([]);
    const [isAdminUpdated, setIsAdminUpdated] = useState(false);

    const statusFilter = ["Pending", "Checked", "Contacted"]

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                //Fetch userId
                const response = await axios.get(`/users/find/${userId}`);
                setUserData(response.data);

                //Fetch enquiries of userId
                const enquiryRes = await axios.get(`/enquiry/user/${userId}`);
                setUserEnquiries(enquiryRes.data);
            } catch(error){
                console.error("Error fetching user data",error);
            }
        };

        if(userId){
            fetchUserData();
        }
    },[userId, isAdminUpdated]);

    const handleAdminUpdate = async () => {
        try {
            const updatedUser = {...userData, isAdmin: !userData.isAdmin};
            await axios.put(`/users/${userId}`,updatedUser);
            setIsAdminUpdated(true)
            setUserData(updatedUser)
            toast.success("Admin status updated successfully!");
        } catch (error) {
            console.error("Error updating status", error)
            toast.error("Failed to update admin status");
        }
    }

    if(!userData) return <div>Loading...</div>
    console.log(userData);

  return (
    <div className="user">
        <Sidebar />
        <div className="userContainer">
            <Navbar />
            <div className="profile">
                <div className="userBox">
                    <button className={`adminBtn ${userData.isAdmin? 'removeAdmin' : 'makeAdmin'}`} onClick={handleAdminUpdate}>{userData.isAdmin ? "Remove Admin" : "Make Admin"}</button>
                    <h1 className="title">User Profile</h1>
                    <div className="userDetails">
                        <div className="detailItem">
                            <span className="itemKey">Username: </span>
                            <span className="itemValue">{userData.username}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Email: </span>
                            <span className="itemValue">{userData.email}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Full Name: </span>
                            <span className="itemValue">{userData.full_name}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Mobile  Number: </span>
                            <span className="itemValue">{userData.phone}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Is Admin?: </span>
                            <span className="itemValue">{userData.isAdmin ?  "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
                <div className="enquiriesBox">
                    <h2 className="enquiryTitle">Enquiries</h2>
                    {userEnquiries && (<Tables statusFilter={statusFilter} userIdFilter={userId} />)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default User
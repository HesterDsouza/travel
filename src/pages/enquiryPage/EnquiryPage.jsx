import { useLocation } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./enquiryPage.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

const EnquiryPage = () => {

  const location = useLocation();
  const enquiryId = location.pathname.split("/")[2];
  // console.log(enquiryId);
  const [enquiryData, setEnquiryData] = useState({
    userID: "",
    username: "",
    full_name: "",
    email: "",
    phone: "",
    dates: "",
    options: "",
    packageID: "",
    duration: "",
    price: "",
    destinationName: "",
    packageType: "",
    query: "",
    days: "",
    status: "",
  });

  const {user} = useContext(AuthContext)
  console.log(user);

  useEffect(() => {
    const fetchEnquiryData = async () => {
      try {
        const response = await axios.get(`/enquiry/find/${enquiryId}`);
        setEnquiryData(response.data)
      } catch (error) {
        console.error("Error fetching enquiry data: ",error)
      }
    };
    if(enquiryId) fetchEnquiryData()
  },[enquiryId]);

  if(!enquiryData) return <div>Loading...</div>

  // console.log(enquiryData);

  const handleStatusUpdate = async (status) => {
    try {
      const adminName = user.full_name;
      await axios.put(`/enquiry/${enquiryId}`, {
        status,
        handledByName: adminName,
      });
      setEnquiryData({...enquiryData, status, handledByName: adminName})
    } catch (error) {
      console.error(`Error updating status to ${status}`,error)
    }
  }

  const handleContacted = () => handleStatusUpdate("Contacted");
  const handleChecked  = () => handleStatusUpdate("Checked") ;

  return (
    <div className="enquiryPage">
      <Sidebar />
      <div className="enquiryPageContainer">
        <Navbar />
        <div className="enquiries">
          <div className="enquiryBox">
            <div className="enquiryButtons">
              <button className="contacted" onClick={handleContacted}>Contacted</button>
              <button className="checked" onClick={handleChecked}>Checked</button>
            </div>
            <h1 className="title">Enquiries</h1>
            <div className="enquiryDetails">
              <div className="detailItem">
                <span className="itemKey">Username: </span>
                <span className="itemValue">{enquiryData.username}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Full Name: </span>
                <span className="itemValue">{enquiryData.full_name}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Email: </span>
                <span className="itemValue">{enquiryData.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone: </span>
                <span className="itemValue">{enquiryData.phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Destination: </span>
                <span className="itemValue">{enquiryData.destinationName}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Package Type: </span>
                <span className="itemValue">{enquiryData.packageType}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Dates(start-date selected): </span>
                <span className="itemValue">{enquiryData.dates}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Options(Adult, Children, Infant): </span>
                <span className="itemValue">{enquiryData.options}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Duration: </span>
                <span className="itemValue">{enquiryData.duration}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Price: </span>
                <span className="itemValue">{enquiryData.price}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Days(if selected): </span>
                <span className="itemValue">{enquiryData.days}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Query: </span>
                <span className="itemValue">{enquiryData.query}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Status: </span>
                <span className="itemValue">{enquiryData.status}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Handled By: </span>
                <span className="itemValue">{enquiryData?.handledByName || "Not Handled."}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Assigned To: </span>
                <span className="itemValue">{enquiryData?.assignedTo?.full_name || "Not Assigned."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryPage
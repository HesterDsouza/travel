import { useContext, useEffect, useState } from "react"
import "./enquiry.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Enquiry = ({ setOpen, userID, packageID, days }) => {
  
  const location = useLocation();
  const fdates = (date) => (date ? new Date(date).toDateString() : "No Dates selected")
  //location.state.dates ? location.state.dates.map(date => date.startDate) : "No Dates selected";
  console.log(fdates);
  const foptions = location.state?.options;
  const selectedOptions = foptions ? `Adult(s): ${foptions.adult}, Child(ren): ${foptions.children}, Infant(s): ${foptions.infant}` : "No Options selected";
  console.log(foptions);
  //? location.state.options.map(option => option.adult) : "No Options found";

  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userID: userID || "",
    username: "",
    full_name: "",
    email: "",
    phone: "",
    dates: fdates(location.state?.dates ? location.state.dates[0]?.startDate : null),
    //startDate: fdates(dates.length > 0 ? dates[0]?.startDate : null),
    options: selectedOptions || "No options selected",
    //options ? JSON.stringify(options) : "No options selected",
    packageID: packageID || "",
    duration: "",
    price: "",
    destinationName: "",
    packageType:"",
    query: "",
    days: days || ""
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`/packages/find/${packageID}`);
        const {data} = response;
        setFormData((prev) => ({
          ...prev,
          packageID,
          packageType: data.packageType,
          destinationName: data.destinationName,
          price: data.price,
          duration: data.duration,
        }));
      } catch (error) {
        console.error("Error fetching details: ",error)
      };
    };
    fetchPackageDetails();
  },[packageID]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if(user) {
          const response = await axios.get(`/users/find/${user._id}`);
          const userData = response.data;
          setFormData((prev) => ({
            ...prev,
            userID: userData._id,
            email: userData.email,
            phone: userData.phone,
            full_name: userData.full_name,
            username: userData.username,
          }))
        }
      } catch (error) {
        console.error("Error fetching user details: ",error)
      }
    }

    fetchUserData();
  },[user]);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log("Form Data before axios.post: ", formData);
      const response = await axios.post("/enquiry/create",formData);
      console.log("Enquiry submitted, ",response.data);
      alert("Enquiry submitted");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting enquiry: ",error)
      console.log("Error response: ", error.response.data);
    }
  };

  console.log("Form Data at end of component: ", formData);
  console.log(days);

  return (
    <div className="enquiryContainer">
      <FontAwesomeIcon icon={faCircleXmark} className="closeButton" onClick={handleClose} />
      <form className="enquiryForm">
        <h2>Enquiry Form</h2>
        {/* <div className="formGroup">
          <label htmlFor="userID">User ID: </label>
          <input type="text" id="userID" value={formData.userID} onChange={handleChange} readOnly/>
        </div> 
        */}
        <div className="formGroup">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="days">Days: </label>
          <input type="text" id="days" value={formData.days || "No days selected"} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="full_name">Full Name: </label>
          <input type="text" id="full_name" value={formData.full_name} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="formGroup">
          <label htmlFor="phone">Mobile Number: </label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} readOnly/>
        </div>
         {/* <div className="formGroup">
          <label htmlFor="dates">Dates: </label>
          <input type="text" id="dates" value={formData.dates} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="options">Options: </label>
          <input type="text" id="options" value={formData.options} onChange={handleChange} readOnly/>
        </div> */}
        {/*<div className="formGroup">
          <label htmlFor="packageID">Package ID: </label>
          <input type="text" id="userID" value={formData.packageID} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="duration">Duration: </label>
          <input type="text" id="duration" value={formData.duration} onChange={handleChange} readOnly/>
        </div>
        <div className="formGroup">
          <label htmlFor="price">Price: </label>
          <input type="text" id="price" value={formData.price} onChange={handleChange} readOnly/>
        </div> 
        <div className="formGroup">
          <label htmlFor="destinationName">Destination Name: </label>
          <input type="text" id="destinationName" value={formData.destinationName} onChange={handleChange} readOnly/>
        </div>
         <div className="formGroup">
          <label htmlFor="packageType">Package Type: </label>
          <input type="text" id="packageType" value={formData.packageType} onChange={handleChange} readOnly/>
        </div> */}
        <div className="formGroup">
          <label htmlFor="query">Query: </label>
          <textarea 
            id="query" 
            value={formData.query} 
            onChange={handleChange} required></textarea>
        </div>
        <button type="submit" onClick={handleSubmit} className="enquiryButton">Submit</button>
      </form>
    </div>
  )
}

export default Enquiry
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import "./packages.css"
import { faBed, faBus, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faHotel, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { faFacebookF, faGoogle, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import DayDetails from "../../components/dayDetails/DayDetails";
import useFetch from "../../hooks/useFetch.js";
import { useLocation, useNavigate } from "react-router-dom"
//import { SearchContext } from "../../context/SearchContext.js"
import { AuthContext } from "../../context/AuthContext.js"
import Enquiry from "../../components/enquiry/Enquiry.jsx"
//import Reserve from "../../components/reserve/Reserve.jsx"

const Packages = () => {
  const location = useLocation();
  const {dates = [] } = location.state || {};
  const id = location.pathname ? location.pathname.split('/')[2] : null;
  // const destination = location.state.destination;
  // const dates = location.state.dates || "No dates slected";
  // const options = location.state.options || "No options slected";
  

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  // const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const {data, loading, error} = useFetch(`/packages/find/${id}`);

  //const {destination, dates, options} = useContext(SearchContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate(); 
  
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    
    return diffDays;
  };

  const days = dates[0]?.endDate ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  // const photos =[
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKf2xeOUUAZu0ETSX-HfSi4XNi55J2D-BQOQ&usqp=CAU"},
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrY0mUC8GF7C7bQNAAS_DH5hyUmV9MnWWBw&usqp=CAU"},
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5R8TJpmkHdxYBSvrnKdZXPKqZjmp54di2A&usqp=CAU"},
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO36vYqfF-hw-kFSlslQ0q5b7mUVPSjgOIpQ&usqp=CAU"},
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNoB-a-oSdA4wjGOhzB1Q3rlRdaz2tLVEoWA&usqp=CAU"},
  //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5rDV2xzgec30dQOk0U0IuUeVhQhUi_EELm4nw5g0Cha3Y_LD68Sr3sb34Jq9SqT-Qfo&usqp=CAU"}
  // ]

  const handleOpen = (i)=> {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction)=> {
    let newSlideNumber;

    if(direction==="l"){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const toggleEnquiryForm = () =>{
    setShowEnquiryForm(!showEnquiryForm);
  };

  const handleClick = () =>{
    if(user){
      setOpenModal(true);
    }
    else{
      navigate("/login", {state: {redirectedFrom: location.pathname}});
    }
  }
  // const handleChange = (e) => {
  //   setFormData({...formData,[e.target.name]: e.target.value});
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData); //Handle form submisssion

  //   setFormData({name: '', phone: '', email: ''}); // Clear form fields
  // };

  console.log(location.state?.dates ?? "No dates selected");
  console.log(location.state?.options ?? "No options selected");
  console.log(user);
  console.log(data);
  console.log(days);
  

  return (
    <div>
      <Navbar />
      <Header type="list"/>
      {loading ? ("Loading... Please wait.") : (
        <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon= {faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon= {faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon= {faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
          </div>}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={() => {toggleEnquiryForm(); handleClick();}}>Send Enquiry!</button>
            {data && (
              <>
                <h1 className="hotelTitle">{data.title}</h1>
                <span className="hotelPriceHighlight">Price: INR {data.price}₹ Per Person</span>
                <span className="hotelDuration">Enjoy {data.duration} Tour!</span>
                <span className="facilities">
                  <FontAwesomeIcon icon={faBus} /> Transport | <FontAwesomeIcon icon={faBed} /> Accommodation | <FontAwesomeIcon icon={faHotel} /> Hotel | <FontAwesomeIcon icon={faUtensils} /> Meals
                </span>
                <div className="icon-bar">
                  <a href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL" className="facebook"><FontAwesomeIcon icon = {faFacebookF}/></a>
                  <a href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D" className="instagram"><FontAwesomeIcon icon = {faInstagram}/></a>
                  <a href="https://yatritourismpune.com/" className="google"><FontAwesomeIcon icon = {faGoogle}/></a>
                  <a href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..." className="whatsapp"><FontAwesomeIcon icon = {faWhatsapp}/></a>
                </div>
                <div className="hotelImages">
                  {data.photos?.map((photo, i)=>(
                    <div className="hotelImgWrapper" key={i}>
                      <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
                    </div>
                  ))}
                </div>
                <DayDetails dayData={data && data.daytitle && data.daydesc ? data.daytitle.map((title, i) =>({
                  title,
                  daydesc: data.daydesc[i]
                })) : []}/>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">Stay in the Heart of {data.destinationName}</h1>
                    <p className="hotelDesc">
                      {data.packagedesc}
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>{data.catchphrase}</h1>
                    <span>
                      Located in the real heart of {data.destinationName}, this package offers you a superb experience!
                    </span>
                    <p>
                      <b>{data.price}₹</b>
                      <p className="hotelDetailsDays">{days > 0 ? data.duration + " package currently available. Interested in a trip of " + days + " days? Click below to know more!(Customized trip days may affect package prices.)" : "Enjoy " + data.duration + " Tour!"} </p>
                    </p>
                    <button onClick={() => {toggleEnquiryForm(); handleClick();}}>Enquire Now!</button>
                  </div>
                </div>
              </>
            )}
          </div>
          {openModal && (
            <Enquiry setOpen={setOpenModal} packageID={id} dates={data?.dates} options={data?.options} days={days}/>
          )}
          <MailList />
          <Footer />
        </div>
      )}
      {/* {openModal && <Enquiry setOpen={setOpenModal} packageID={id} dates={data?.dates} options={data?.options} />} */}
    </div>
  )
}

export default Packages;  
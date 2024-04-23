import React from 'react'
import "./contact.css"
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { ContactUs } from '../../components/contactUs/ContactUs';


const Contact = () => {
  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className="contactContainer">
        <ContactUs />
        </div>
    </div>
  )
}

export default Contact
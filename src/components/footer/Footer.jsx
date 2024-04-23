import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer">
        <div className="review">
          <div className="reviewContent">
            <a href="https://www.google.com/search?q=YATRI%20TOURISM+reviews#ip=1&lrd=0x3bc2c11ffcc186df:0x308392223db0ed10,1,,,," target="_blank" rel="noopener noreferrer">
              Leave a Google Review.
            </a>
          </div>
          <div className="fText">Copyright © 2024 | All rights reserved | Yatri Tourism Pune</div>
        </div>
    </div> 
  )
}

export default Footer;

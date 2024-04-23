import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import "./featuredProperties.css"

const FeaturedProperties = () => {

    const {data, loading, error} = useFetch("/packages?mainPackage=true");
    console.log(data);

  return (
    <div className="fp">
        {loading ? "Loading... Please wait" : 
          <>{
          data.map(item=>(
            <Link 
              to={`/package/${item._id}`}
              key={item._id} 
              style={{color: "inherit", textDecoration: "none"}}
              >
            <div className="fpItem" key={item._id}>
              <div className="fpItem">
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.title}</span>
                <span className="fpDestination">{item.destinationName}</span>
                <span className="fpDuration">{item.duration}</span>
                <span className="fpPrice">Starting from Rs. {item.price}</span>
              </div>
            </div>
            </Link>
            ))}
        </>}
        {/* <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Golden Triangle Tour</span>
          <span className="fpDestination">Delhi, Agra, Jaipur</span>
          <span className="fpDuration">7 Days</span>
          <span className="fpPrice">Starting from Rs. 16000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Kerala Backwaters Adventure</span>
          <span className="fpDestination">Alleppey, Kumarakom</span>
          <span className="fpDuration">5 Days</span>
          <span className="fpPrice">Starting from Rs. 12000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Himalayan Trekking Expedition</span>
          <span className="fpDestination">Manali, Leh, Ladakh</span>
          <span className="fpDuration">10 Days</span>
          <span className="fpPrice">Starting from Rs. 24000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Goa Beach Retreat</span>
          <span className="fpDestination">Goa</span>
          <span className="fpDuration">4 Days</span>
          <span className="fpPrice">Starting from Rs. 10000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Rajasthan Cultural Tour</span>
          <span className="fpDestination">Jaipur, Jodhpur, Udaipur</span>
          <span className="fpDuration">8 Days</span>
          <span className="fpPrice">Starting from Rs. 18000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Taj Mahal Experience</span>
          <span className="fpDestination">Agra</span>
          <span className="fpDuration">2 Days</span>
          <span className="fpPrice">Starting from Rs. 6000</span>
        </div>
        <div className="fpItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1756QaBv-u1Xui5MCngxecVmK5RhN1iSI0w&usqp=CAU" alt="" className="fpImg" />
          <span className="fpName">Ganges River Cruise</span>
          <span className="fpDestination">Varanasi</span>
          <span className="fpDuration">3 Days</span>
          <span className="fpPrice">Starting from Rs. 8000</span>
        </div> */}
        {/* <div className="view">
          <button className="viewAll">View All Packages</button>
        </div> */}
    </div>
  )
}

export default FeaturedProperties

import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({item, destination, dates, options }) => {

  const navigate = useNavigate();

  const handleId = (itemID) =>{
    navigate(`/package/${itemID}`, {
      state: {
        destination: destination,
        dates: dates,
        options: options
      }
    });
  };

  return (
    <div className="searchItem">
      <div className="siDesc">
        <img src={item.photos[0]} alt="" className="siImg" />
        <h1 className="siTitle">{item.title}</h1>
        <span className="siSubtitle">{item.catchphrase}</span>
        <span className="siDuration">{item.duration} Tour</span>
        <span className="siPackageType">Package Type: {item.packageType}</span>
        <span className="siFree">Free Breakfast</span>
      </div>
      <div className="siDetails">
        <div className="siDetailsTexts">
          <span className="siPrice">
            Starting from Rs. {item.price}
            <small>Inclusive of all taxes and fees.</small>
          </span>
            <button className="siEnquireButton" onClick={() => handleId(item._id)}>
              Enquire Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

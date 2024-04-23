//import {faChildren, faPeopleGroup, faShuffle } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch.js"
import "./featured.css"
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Featured = () => {

  const {data, loading, error} = useFetch("/packages/countByType?packageType=Couple,Group,Ladies Special");
  
  
  return (
    <div className="featured-container">
      {loading ? ("Loading... Please wait.") :  
      (<>
      <div className="featuredItem">
      <div className="flip-card">
        <div className="flip-card-front">
          <div className="inner">
            
            <h3>Couple Packages</h3>
            <p>{data[0]} Types</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="inner">
            
            <h3>Couple Packages</h3>
            <p>
            We Have exclusive Couple Packages specially designed for groups!
            </p>
          </div>
        </div>
      </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-front">
          <div className="inner">
            
            <h3>Group Packages</h3>
            <p>{data [1]} Types</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="inner">
            
            <h3>Group Packages</h3>
            <p>
            We have amazing group packages for you to enjoy with family, friends, colleagues and more!...
            </p>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-front">
          <div className="inner">
            
            <h3>Ladies Special Packages</h3>
            <p>{data[2]} Types</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="inner">
            
            <h3>Ladies Special Packages</h3>
            <p>
            We Have 50 Plus amazing Trips specially organized only for Females.
            </p>
          </div>
        </div>
      </div>
      </>)}
    </div>
  );
}

export default Featured;

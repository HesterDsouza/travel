import "./package.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {format} from  'date-fns';
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch.js";
import { AuthContext } from "../../context/AuthContext.js";

const Package = () => {
  
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination || "")
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const {user, dispatch: authDispatch} = useContext(AuthContext)
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [load, setLoad] = useState(true)


  const {data, loading, error, reFetch} = useFetch(`/packages?destinationName=${destination}&min=${min || 0}&max=${max || 99999}`);

  const handleClick = () =>{
    reFetch()
  }

  const handleOptionChange = (name, operation) =>{
    setOptions((prev) => ({
      ...prev,
      [name] : operation === "i" ? options[name] + 1 : options[name] - 1
    }));
  };

  const fetchDestinations = async() => {
    try {
        const response = await fetch(`/packages/destinations`);
        const data = await response.json();
        //console.log("Fetched destinations: ", data);
        setAvailableDestinations(data);
        setLoad(false);
    } catch (error) {
        console.error("Error fetching data: ",error);
        setLoad(false);
    }
};
  
  useEffect(() => {
    //console.log("Fetching Destinations...");
    fetchDestinations();
}, []);

useEffect(() => {
    //console.log("Available Destinations: ",availableDestinations);        
}, [availableDestinations]);

useEffect(() => {
    //console.log("Destination State: ", destination);        
}, [destination]);

const handleDestinationChange = (e) => {
  setDestination(e.target.value);
}

  console.log(destination);
  console.log(dates);
  console.log(options);
  console.log(user);
  console.log(location.state);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="packageContainer">
        <div className="packageWrapper">
          <div className="packageSearch">
            <h1 className="psTitle">Search</h1>
            <div className="psItem">
              <label>Destination</label>
              {/* <input onChange={e=>setDestination(e.target.value)} placeholder={destination} type="text" /> */}
              <select value={destination} onChange={handleDestinationChange} className="packageMenu">
                <option value="" disabled>
                  Select Destination
                </option>
                {loading ? (
                  <option disabled>Loading Destinations...</option>
                ) : (
                  availableDestinations.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))
                )}
              </select>
            </div>
            <div className="psItem">
              <label>Check-In Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (<DateRange 
              onChange={item=>setDates([item.selection])} 
              minDate={new Date()} 
              ranges={dates} />
              )}
            </div>
            <div className="psItem">
              <label>Options</label>
              <div className="psOptions">
                <div className="psOptionItem">
                  <span className="psOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" min={0} onChange={e=>setMin(e.target.value)} className="psOptionInput" />
                </div>
                <div className="psOptionItem">
                  <span className="psOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" min={0} onChange={e=>setMax(e.target.value)} className="psOptionInput" />
                </div>
                <div className="psOptionItem">
                  <span className="psOptionText">
                  Adult
                  </span>
                  <div className="psOptionCount">
                    <button className="psOptionCountButton decrement" onClick={() => handleOptionChange("adult","d")}>
                        -
                    </button>                  
                  <input type="number" onChange={(e) => handleOptionChange("adult","i")} className="psOptionInputMenu" readOnly value={options.adult}/>
                  <button className="psOptionCountButton" onClick={() => handleOptionChange("adult","i")}>
                        +
                    </button>
                  </div>
                </div>
                <div className="psOptionItem">
                  <span className="psOptionText">
                    Children
                  </span>
                  <div className="psOptionCount">
                    <button className="psOptionCountButton decrement" onClick={() => handleOptionChange("children","d")}>
                        -
                    </button>
                  <input type="number" onChange={(e) => handleOptionChange("children","i")} className="psOptionInputMenu" readOnly value={options.children}/>
                  <button className="psOptionCountButton" onClick={() => handleOptionChange("children","i")}>
                        +
                    </button>
                  </div>
                </div>
                <div className="psOptionItem">
                  <span className="psOptionText">
                    Infant
                  </span>
                  <div className="psOptionCount">
                    <button className="psOptionCountButton decrement" onClick={() => handleOptionChange("infant","d")}>
                        -
                    </button>
                  <input type="number" onChange={(e) => handleOptionChange("infant","i")} className="psOptionInputMenu" readOnly value={options.infant}/>
                  <button className="psOptionCountButton" onClick={() => handleOptionChange("infant","i")}>
                        +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="packageResult">
            { loading ? "Loading... Please Wait" : 
              <>
              {data.map(item => (
                <SearchItem 
                  item={item} 
                  key={item._id}
                  destination={destination}
                  dates={dates}
                  options={options}
                  />
                ))}              
              </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Package;

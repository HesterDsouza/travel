import "./header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarDays, faHome, faMountainCity, faPersonWalkingLuggage, faUsers, faSearch, faInfo} from "@fortawesome/free-solid-svg-icons";
// import {faFacebookF, faGoogle, faInstagram, faWhatsapp} from  '@fortawesome/free-brands-svg-icons';
import { DateRange } from 'react-date-range';
import { useContext, useEffect, useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
//import useFetch from "../../hooks/useFetch";

const Header = ({type}) => {

    const [destination, setDestination] = useState("");

    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
    ]);
    
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState(
        {
            adult: 1,
            children: 0,
            infant: 0
      });

      const [availableDestinations, setAvailableDestinations] = useState([]);
      const [load, setLoad] = useState(true);

      const navigate = useNavigate()
      
      const {dispatch: searchDispatch} = useContext(SearchContext);
      const {user, dispatch: authDispatch} = useContext(AuthContext);
      
      
      const handleOption = (name, operation) =>{
          setOptions(prev=>{return{
              ...prev,
              [name]:operation === "i" ? options[name] +1 : options[name] -1,
            }})
        };

        const handleOpenDate = () => {
            setOpenDate(!openDate);
            setOpenOptions(false);
        };

        const handleOpenOptions = () => {
            setOpenOptions(!openOptions);
            setOpenDate(false);
        };

      const handleSearch = () =>{
        searchDispatch({type: "NEW_SEARCH", payload: {destination, dates, options}});
        navigate("/package", {state:{destination, dates, options}});
    }

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
    
    const handleHome = () =>{
        navigate('/');
    }
    
    const handleViewAllPackages = () =>{
        navigate('/viewAll');
    }
    
    const handleAboutUs = () =>{
        navigate('/aboutUs');
    }
    
    
    const handleLogout = async(e) =>{
        e.preventDefault()
        authDispatch( {type:"LOGOUT"} );
    };

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="headerTitle" onClick={handleHome}>Home</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faMountainCity} />
                        <span className="headerTitle" onClick={handleViewAllPackages}>Packages</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faInfo} />
                        <span className="headerTitle" onClick={handleAboutUs}>About Us</span>
                    </div>
                    {user ? (
                    <div className="navItems">
                        <span className="username">{user.username}</span>
                        <button onClick={handleLogout} className="navButton">
                        LogOut
                        </button>
                    </div>
                    ) : (
                    <div className="navItems">
                    <Link to="/login" >
                        <button className="navButton">
                        Sign In/ Register
                        </button>
                    </Link>
                    <span className="signUpPromo">(SignUp to ge latest updates and notifications. It's free!)</span>
                    </div>
                    )}
                </div>
                {type !=="list" &&
                    <div>
                    <h1 className="headerTitle">Yatri Tourism</h1>
                    <p className="headerDesc">Explore the best of India</p>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPersonWalkingLuggage} className="headerIcon"/>
                        {/* <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/> */}
                        <select id="destinationName" className="headerSearchMenu" value={destination} onChange={handleDestinationChange}>
                            <option value="" disabled>Select Destination: </option>
                            {load ? (
                                <option disabled>
                                    Loading destinations...
                                </option>
                            ) : (
                                availableDestinations.map((dest) => (
                                    <option key={dest} value={dest}>{dest}</option>
                                ))
                            )}
                        </select>
                        </div>
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span onClick= {handleOpenDate} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className= "date"
                            minDate={new Date()}
                            />}
                        </div>
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faUsers} className="headerIcon"/>
                        <span onClick={handleOpenOptions} className="headerSearchText">{`${options.adult} adult • ${options.children} children • ${options.infant} infant`}</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button disabled ={options.adult <=1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button disabled ={options.children <=0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Infant</span>
                                    <div className="optionCounter">
                                        <button disabled ={options.infant <=0} className="optionCounterButton" onClick={()=>handleOption("infant", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.infant}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("infant", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}><FontAwesomeIcon icon= {faSearch} /></button>                              
                        </div>
                    </div>
                    </div>}
            </div>
        </div>
    )
}

export default Header;

import "./navbar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const [pending, setPending] = useState(0);
  const [checked, setChecked] = useState(0);
  const {dispatch, darkMode} = useContext(DarkModeContext);
  const [modeIcon, setModeIcon] = useState(darkMode ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />);

  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const fetchCounts = async () => {
      try{
        const pendingResponse = await axios.get("/enquiry/countStatus?status=Pending");
        const checkedResponse = await axios.get("/enquiry/countStatus?status=Checked");
        setPending(pendingResponse.data);
        setChecked(checkedResponse.data);
      } catch(error) {
        console.error("Error fetching pending count: ", error);
      }
    };
    fetchCounts();
  },[]);

  const handleMode = () =>{
    setModeIcon(darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />)
    dispatch({type: "TOGGLE"});
  };

  const toggleFullscreen = () => {
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
        if(document.exitFullscreen){
          document.exitFullscreen();
          setIsFullScreen(false);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if(storedHistory){
      try {
        setSearchHistory(JSON.parse(storedHistory));        
      } catch (error) {
        console.error('Error parsing search history', error)
        localStorage.removeItem( 'searchHistory' );
      }
    }
  }, []);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLocaleLowerCase();

    const searchableRoutes = [
      {name: "home", path: "/"},
      {name: "packages", path: "/packages"},
      {name: "users", path: "/users"},
      {name: "profile", path: "/profile"},
      {name: "enquiry", path: "/enquiry"},
      {name: "notifications", path: "/notifications"},
      {name: "checked", path: "/checked"},
    ];

    const matchedRoute = searchableRoutes.find(route => route.name === trimmedQuery)

    if(matchedRoute){
      const updatedHistory = [trimmedQuery, ...searchHistory.filter(item => item !== trimmedQuery).slice(0, 4)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
      navigate(matchedRoute.path)
    } else {
      console.log(`Route '${searchQuery}' not found.`);
    }
  }

  return (
    <div className = "navbar">
        <div className="wrapper">
          {/* <div className="search">
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter") handleSearch();
              }}
              />
              <SearchOutlinedIcon className="searchIcon" onClick={() => handleSearch()}/>
            {searchQuery && searchHistory.length > 0 && (
              <div className="search-suggestions">
                <ul>
                  {searchHistory.map((query, index) => (
                    <li key={index} onClick={() => {setSearchQuery(query); handleSearch();}}>{query}</li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}
          <div className="items">
            <div className="item">
              <div className="icon" onClick={handleMode}>
                {modeIcon}
              </div>
            </div>
            <div className="item" onClick={toggleFullscreen}>
              {isFullScreen ? <FullscreenExitOutlinedIcon className="icon"/> : <FullscreenOutlinedIcon className="icon"/> }              
            </div>
            <div className="item">
              <NotificationsNoneOutlinedIcon className="icon" onClick={() => {navigate("/notifications")}}/>
              <div className="counter">{pending}</div>              
            </div>
            <div className="item">
              <PhoneOutlinedIcon className="icon" onClick={() => {navigate("/checked")}}/>
              <div className="counter">{checked}</div>              
            </div>
            <div className="item">
              <ListOutlinedIcon className="icon"/>              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar;
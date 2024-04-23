import './widget.scss'
//import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
//import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Widget = ({type}) => {

    const [userCount, setUserCount] = useState(0);
    const [packageCount, setPackageCount] = useState({});
    const [enquiryCount, setEnquiryCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounts = async () =>{
            try{
                if(type === "users"){
                    const userResponse = await axios.get("/users/countByType");
                    setUserCount(userResponse.data);
                }
                else if(type === "packages"){
                    const packageResponse = await axios.get("/packages/countByPackageType");
                    setPackageCount(packageResponse.data);
                }
                else if(type === "enquiries"){
                    const enquiryResponse = await axios.get("/enquiry/countByType");
                    setEnquiryCount(enquiryResponse.data);
                }
            }catch (err) {
                console.log("Error fetching counts: ", err);
            }
        };
        fetchCounts();
    }, [type]);

    let data;
    let count;

    switch(type){
        case "users":
            data={
                title: "USERS",
                link: "View all users",
                path: "/users",
                icon:(
                    <PersonOutlinedIcon 
                        className='icon' 
                        style={{color: 'crimson', 
                                backgroundColor: "rgba(255, 0, 0, 0.2)"
                            }}/>
                )
            };
            count = userCount;
            break;

        case "packages":
            data={
                title: "PACKAGES",
                link: "View all packages",
                path: "/packages",
                icon:(
                    <ViewListOutlinedIcon 
                        className='icon' 
                        style={{color: 'goldenrod', 
                                backgroundColor: "rgba(218, 165, 32, 0.2)"
                            }}/>
                )
            };
            
            count = packageCount;
            break;

        case "enquiries":
            data={
                title: "ENQUIRIES",
                link: "View all enquiries",
                path: "/enquiry",
                icon:(
                    <AnnouncementOutlinedIcon 
                        className='icon' 
                        style={{color: 'green', 
                                backgroundColor: "rgba(0, 128, 0, 0.2)"
                            }}/>
                )
            };
            count = enquiryCount;
            break;        

        default:
            break;
    }

    const handleNavigate = () =>{
        if(data.path){
            navigate(data.path);
        }
    }

  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter"> {typeof count === "object" ? JSON.stringify(count) : count} </span>
            <span className="link" onClick={handleNavigate}>{data.link}</span>
        </div>
        <div className="right">
            {data.icon}
        </div>
    </div>
  )
}

export default Widget;
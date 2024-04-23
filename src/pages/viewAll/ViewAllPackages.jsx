import { Link } from "react-router-dom";
import Attraction from "../../components/attraction/Attraction";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar"
import useFetch from "../../hooks/useFetch";
import "./viewAllPackages.css"

const ViewAllPackages = () => {
    const {data, loading, error} = useFetch("/packages");
  return (
    <div>
        <Navbar />
        <Header type="list"/>
        <div className="vAContainer">
            <h1>View All Packages</h1>
            <div className="vAPackages">
            {loading ? "Loading... Please wait" : 
            <>{
            data.map(item=>(
                <div className="vAItem" key={item._id}>
                    <Link to={`/package/${item._id}`} key={item._id} className="vAItemLink">
                    <img src={item.photos[0]} alt="" className="vAImg" />
                    <span className="vAName">{item.title}</span>
                    <span className="vADestination">{item.destinationName}</span>
                    <span className="vADuration">{item.duration}</span>
                    <span className="vAPrice">Starting from Rs. {item.price}</span>
                    </Link>
                </div>
                ))}
            </>}
            </div>
            <Attraction />
        </div>
        <MailList />
        <Footer />
    </div>
  )
}

export default ViewAllPackages
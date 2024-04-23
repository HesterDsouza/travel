import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.css"
import Featured from "../../components/featured/Featured";
//import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Attraction from "../../components/attraction/Attraction";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">Package Type</h1>
        <Featured />
        {/* <h1 className="homeTitle">Choose from the best to experience the best!</h1>
        <PropertyList /> */}
        <h1 className="homeTitle">Packages We Offer!</h1>
        <FeaturedProperties/>
        <h1 className="homeTitle">Why Choose Us?</h1>
        <Attraction/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;

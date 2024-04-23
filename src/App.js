import {BrowserRouter, Routes, Route,} from "react-router-dom";
import Home from "./pages/home/Home";
import Package from "./pages/packages/Package";
import Packages from "./pages/package/Packages";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ViewAllPackages from "./pages/viewAll/ViewAllPackages";
import Enquiry from "./components/enquiry/Enquiry";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import AboutUs from "./pages/aboutUs/AboutUs";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home />}/>
        <Route path = "/package" element={<Package />}/>
        <Route path = "/package/:id" element={<Packages/>} />
        {/* <Route path = "/contact" element={<Contact/>}/> */}
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/viewAll" element={<ViewAllPackages/>}/>
        <Route path = "/enquiry" element={<Enquiry/>}/>
        <Route path="/forgot_password" element={<ForgotPassword />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
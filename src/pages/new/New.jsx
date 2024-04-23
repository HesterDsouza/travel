import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
//import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import "./new.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
// import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const New = () => {

  //const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const {loading, error, dispatch} = useContext(AuthContext);

  const handleChange = (e) =>{
    const {id, value} = e.target;
    setInfo(prev => ({...prev, [id]: value}));
  };

  const handleAdmin = (e) => {
    setInfo((prev) => ({...prev, isAdmin: e.target.value === "true"}));
  }

  const handleClick = async(e) => {
    e.preventDefault();
    try {
      // let imgURL = "";
      
      // if(file){
      //   const data = new FormData()
      //   data.append("file",file)
      //   data.append("upload_preset","upload")
        
      //   const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/hesterdev/image/upload",data);
        
      //   imgURL = uploadResponse.data.url;
      //   console.log("Img url:",imgURL);
      // }

      const newUser = {
        ...info,
        //img: imgURL,
      };

      await axios.post("/auth/register", newUser);
      alert("User Added.")

      console.log(info);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Users</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img 
            src={file ? URL.createObjectURL(file) : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"} 
            alt="" />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file"> Image(optional):<DriveFolderUploadOutlinedIcon className="icon"/> </label>
                <input 
                  type="file" id="file" 
                  onChange={e=>setFile(e.target.files[0])} 
                  style={{"display": "none"}}/>
              </div> */}

              {userInputs.map((input) =>(
              <div className="formInput" key={input.id}>
                <label htmlFor={input.id}>{input.label}</label>
                <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder}/>
              </div>
              ))}

              <div className="formInput">
                <label>Is Admin?</label>
                <select name="" id="isAdmin" onChange={handleAdmin}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {error && <span className="error">{error.message}</span>}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New  
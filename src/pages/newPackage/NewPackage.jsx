import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import "./newPackage.scss";
import { useState } from "react";
import { packageInputs } from "../../formSource";
import axios from "axios";

const NewPackage = () => {

  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({
    socialshares: [],
    daytitle: [],
    daydesc: [],
    igpost: [],
  });

  const handleChange = (e) =>{
    const {id, value} = e.target;
    if (id === "file"){
      setFiles(Array.from(e.target.files));
    } else if (id === "mainPackage"){
      setInfo((prev) => ({...prev, [id]: value === 'true'}));
    }
    else if (info[id] && Array.isArray(info[id])){
      setInfo((prev) => ({ ...prev, [id]: [...prev[id], value] }));
    } else {
      setInfo((prev) => ({...prev, [id]: value}));
    }
  };

  const handleAddArrayItem = (field) => {
    setInfo((prev) => ({...prev, [field]: [...prev[field], ""]}));
  };

  const handleRemoveArrayItem = (field, index) => {
    setInfo((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    setInfo((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  //console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/hesterdev/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newPackage = {
        ...info,
        photos: list,
      };

      await axios.post("/packages", newPackage);
      alert("Your package has been added!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Packages</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
            src={
              files.length
                ? URL.createObjectURL(files[0])
                : "https://cabexindia.com/wp-content/uploads/2023/02/no-image.jpg"
            }
            alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file"> Image:<DriveFolderUploadOutlinedIcon className="icon"/> </label>
                <input 
                  type="file" id="file" multiple
                  onChange={(e) => handleChange(e)} 
                  style={{"display": "none"}}/>
              </div>

              {packageInputs.map((input) =>(
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                {["socialshares", "daytitle", "daydesc", "igpost"].includes(
                    input.id
                  ) ? (
                    info[input.id].map((value, index) => (
                      <div key={index}>
                        <input
                          id={input.id}
                          onChange={(e) =>
                            handleArrayChange(e, input.id, index)
                          }
                          type={input.type}
                          placeholder={`${input.placeholder} ${index + 1}`}
                          value={value}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveArrayItem(input.id, index)
                            }
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <input
                      id={input.id}
                      onChange={(e) => handleChange(e)}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  )}
                  {["socialshares", "daytitle", "daydesc", "igpost"].includes(
                    input.id
                  ) && (
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem(input.id)}
                    >
                      Add {input.label}
                    </button>
                  )}
              </div>
              ))}

              <div className="formInput">
                <label>Main Package</label>
                <select className="mainPackageSelect" id="mainPackage" onChange={handleChange}>
                  <option className="mainPackageOption" value={false}>No</option>
                  <option className="mainPackageOption" value={true}>Yes</option>
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPackage;
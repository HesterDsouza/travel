import "./package.scss";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Package = () => {
  // const { id } = useParams();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [editableRecord, setEditableRecord] = useState(null);
  const [editingEnabled, setEditingEnabled] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`/packages/find/${id}`);
      setEditableRecord(response.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleEdit = () => {
    setEditingEnabled(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/packages/${id}`, editableRecord);
      console.log("Package updated:", response.data);
      setEditingEnabled(false);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleAddField = (field) => {
    setEditableRecord((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveField = (index, field) => {
    setEditableRecord((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleRemovePhoto = (index) => {
    setEditableRecord((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setEditableRecord((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleAddImages = async () => {
    try {
      const list = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload"); // Change upload_preset if needed
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/hesterdev/image/upload", // Change URL if using a different service
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      setEditableRecord((prev) => ({
        ...prev,
        photos: [...prev.photos, ...list],
      }));

      setFiles([]); // Clear selected files after upload
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="package">
      <Sidebar />
      <div className="packageContainer">
        <Navbar />
        <div className="top">
          <div className="imageContainer">
          {editableRecord && (<div className="imagesContainer">
                <ul>
                  {editableRecord.photos.map((photoUrl, index) => (
                    <li key={index}>
                      <img className="itemImg" src={photoUrl} alt={`Photo ${index}`} />
                      {editingEnabled && (
                        <button onClick={() => handleRemovePhoto(index)}>-</button>
                      )}
                    </li>
                  ))}
                </ul>
                {editingEnabled && (
                  <div className="addImages">
                    <label className="imageInput" htmlFor="imageInput">Add Images:</label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className="imageInput"
                      multiple
                      onChange={handleFileChange}
                    />
                    <button onClick={handleAddImages}>Add</button>
                  </div>
                )}
              </div>)}
            </div>
          <div className="left">
          <div className="details">
            {editableRecord ? (
              <>
              <div className="detailItem">
                <label className="itemTitle" htmlFor="title">Title: </label>
                <input
                  id="title"
                  type="text"
                  value={editableRecord.title}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, title: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>

              <div className="detailItem">
                <label className="itemKey" htmlFor="packagedesc">Description: </label>
                <input
                  id="packagedesc"
                  type="text"
                  value={editableRecord.packagedesc}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, packagedesc: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>

              <div className="detailItem">
                <label className="itemKey" htmlFor="duration">Duration: </label>
                <input
                  id="duration"
                  type="text"
                  value={editableRecord.duration}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, duration: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey" htmlFor="catchphrase">Catch Phrase: </label>
                <input
                  id="catchphrase"
                  type="text"
                  value={editableRecord.catchphrase}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, catchphrase: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey" htmlFor="destinationName">Destination: </label>
                <input
                  id="destinationName"
                  type="text"
                  value={editableRecord.destinationName}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, destinationName: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey" htmlFor="packageType">Package Type: </label>
                <input
                  id="packageType"
                  type="text"
                  value={editableRecord.packageType}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, packageType: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey" htmlFor="price">Price: </label>
                <input
                  id="price"
                  type="text"
                  value={editableRecord.price}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, price: e.target.value})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey" htmlFor="mainPackage">Main Package: </label>
                <input
                  id="mainPackage"
                  type="checkbox"
                  checked={editableRecord.mainPackage}
                  className="itemValue"
                  onChange={(e) => setEditableRecord({...editableRecord, mainPackage: e.target.checked})}
                  disabled={!editingEnabled}
                />
              </div>
              <div className="detailItem">
                <h2 className="itemKey">Day Titles:</h2>
                {editingEnabled && (
                    <>
                      <button onClick={() => handleAddField("daytitle")}>Add Day Title</button>
                    </>
                  )}
                <ul>
                  {editableRecord.daytitle.map((title, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={title}
                        className="itemValue"
                        onChange={(e) => handleChange(e, index, "daytitle")}
                        disabled={!editingEnabled}
                      />
                      {editingEnabled && (
                        <button onClick={() => handleRemoveField(index, "daytitle")}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detailItem">
                <h2>Day Descriptions:</h2>
                {editingEnabled && (
                    <>
                    <button onClick={() => handleAddField("daydesc")}>Add Day Description</button>
                    </>
                  )}
                <ul>
                  {editableRecord.daydesc.map((desc, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => handleChange(e, index, "daydesc")}
                        disabled={!editingEnabled}
                      />
                      {editingEnabled && (
                        <button onClick={() => handleRemoveField(index, "daydesc")}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detailItem">  
                <h2>IG Posts:</h2>
                {editingEnabled && (
                    <>
                    <button onClick={() => handleAddField("igpost")}>Add IG Posts</button>
                    </>
                  )}
                  <ul>
                    {editableRecord.igpost.map((post, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={post}
                          onChange={(e) => handleChange(e, index, "igpost")}
                          disabled={!editingEnabled}
                        />
                        {editingEnabled && (
                          <button onClick={() => handleRemoveField(index, "igpost")}>
                            Remove
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="detailItem">
                  <h2>Social Shares:</h2>
                  {editingEnabled && (
                    <>
                    <button onClick={() => handleAddField("socialshares")}>Add Social Share links</button>
                    </>
                  )}
                    <ul>
                      {editableRecord.socialshares.map((share, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={share}
                            onChange={(e) => handleChange(e, index, "socialshares")}
                            disabled={!editingEnabled}
                          />
                          {editingEnabled && (
                            <button onClick={() => handleRemoveField(index, "socialshares")}>
                              Remove
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                {editingEnabled ? (
                  <button className="button" onClick={handleSaveChanges}>Save Changes</button>
                ) : (
                  <button className="button" onClick={handleEdit}>Edit Package</button>
                )}
              </>
            ) : (
        <div>Loading...</div>
      )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
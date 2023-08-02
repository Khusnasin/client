import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
//import mongoose from "mongoose";


//import { Types } from "mongoose";
import Loader from "./Loader";
import Error from "./Error";

//const mongoose = require('mongoose');

function Farmersprofile() {
  const farmer = JSON.parse(localStorage.getItem("currentUser"))
  const [farmerData, setFarmerData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownOptions = ['Sonapur', 'Khanapara', 'Byrnihut', 'Jorabaat'];
  const dropdownRef = useRef(null);

  //const { farmerid = farmer.data._id } = useParams();
  const farmerid = farmer.data._id;
  const fetchFarmerDetails = async () => {
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login';
    }
    //const farmer = JSON.parse(localStorage.getItem("currentUser"))
    try {
      setloading(true);
      //console.log("farmerid:", farmerid);
      //const objectIdFarmerId = Types.ObjectId(farmerid);
      const response = await axios.get(`/api/farmers/getfarmerbyid?farmerid=${farmerid}`);
      setFarmerData(response.data);
      setloading(false);
    } catch (error) {
      console.log("Error fetching farmer details:", error);
      seterror(true);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchFarmerDetails();
  }, [farmerid]);

  const handleEditButtonClick = async () => {
    if (editMode) {
      // If in edit mode, cancel and reset to server data
      try {
        setloading(true);
        const response = await axios.get(`/api/farmers/getfarmerbyid?farmerid=${farmerid}`);
        setFarmerData(response.data);
        setloading(false);
        setEditMode(false);
      } catch (error) {
        console.log("Error fetching farmer details:", error);
        seterror(true);
        setloading(false);
      }
    } else {
      setEditMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //console.log(farmer);

  const handleRadioChange = async (event) => {
    const value = event.target.value === 'yes';
    try {

      setFarmerData((prevData) => ({
        ...prevData,
        interestInTraining: value,
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleOptionSelect = (selectedOption) => {
    setFarmerData((prevData) => ({
      ...prevData,
      location: selectedOption,
      setIsDropdownOpen: true
      
    }));
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  //const [editedFarmer, setEditedFarmer] = useState();
  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/farmers/updatefarmer/${farmerid}`, farmerData);
      setEditMode(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.log("Error updating farmer details:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div >
      <h2>{farmer.data.Name}'s Profile</h2>
      {loading ? (<Loader />) : (farmerData ? (<div>
        <div className="row bs2">
          <div className="col-md-3">
          </div>
          <div className="col-md-5">
            <h1>My Details</h1>
            <hr className="line"></hr>
            <b>
              <h1>Personal Info</h1>
              <hr className="line"></hr>
              <p>Name : {" "}
              {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="Name"
                    value={farmerData.Name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span>{farmerData.Name}</span>
                )}</p>
              <p>Location :{" "}
               {editMode ?  (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="location"
                      name="location"
                      value={farmerData.location}
                      onChange={handleInputChange}
                      onClick={() => setIsDropdownOpen(true)}
                    />
                    {isDropdownOpen && (
                      <ul ref={dropdownRef}>
                        {dropdownOptions.map((option) => (
                          <li key={option} onClick={() => handleOptionSelect(option)}>
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <span>{farmerData.location}</span>
                )}
                 </p>
              <p>Phone-Number : {" "}
                {editMode ? (
                <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={farmerData.phoneNumber}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.phoneNumber}</span>
            )}</p>
              <p>Password :{" "} {editMode ? (
                 <input
                 type="password"
                 className="form-control"
                 placeholder="password"
                 name="password"
                 value={farmerData.password}
                 onChange={handleInputChange}
               />
             ) : (
               <span>{farmerData.password}</span>
              )}</p>
              <h1>Napier Info</h1>
              <hr className="line"></hr>
              <p>Area Of Napier : {" "}
                {editMode ? (
                <input
                type="number"
                className="form-control"
                placeholder="Total Area of Napier Grass Cultivation (in acres/hectares/bigha)"
                name="areaOfNapier"
                value={farmerData.areaOfNapier}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.areaOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <p>Use Of Napier : {" "}
                {editMode ? (
                <input
                type="text"
                className="form-control"
                placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
                name="useOfNapier"
                value={farmerData.useOfNapier}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.useOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <h1>Cows Info</h1>
              <hr className="line"></hr>
              <p>Number Of Cows : {" "}
                {editMode ? (
                <input
                type="number"
                className="form-control"
                placeholder="Number Of Cows"
                name="numberOfCows"
                value={farmerData.numberOfCows}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.numberOfCows}</span>
              )
              }</p>
              <p>Amount of Dung Produced :{" "} {editMode ? (
                <input
                type="number"
                className="form-control"
                placeholder="Dung Produced (in kg)"
                name="dungProduced_inKg"
                value={farmerData.dungProduced_inKg}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.dungProduced_inKg}</span>
              )
              } kg</p>
              <p>Amount Of Milk :{" "} {editMode ? (
                <input
                type="number"
                className="form-control"
                placeholder="Amount of Milk (in Litres)"
                name="amountOfMilk_inLitre"
                value={farmerData.amountOfMilk_inLitre}
                onChange={handleInputChange}
              />
            ) : (
              <span>{farmerData.amountOfMilk_inLitre} Litre</span>
              )
              } </p>
            </b>
            <div>
              <b>
                <h1>Others</h1>
                <hr className="line"></hr>
                <p>Description : {" "}{editMode ? (
                 <input
                 type='text'
                 className='form-control'
                 placeholder='description'
                 name="description"
                 value={farmerData.description}
                 onChange={handleInputChange}
               />
             ) : (
               <span>{farmerData.description}</span> 
                )
                }  </p>
                <p>Challenges :{" "} {editMode ? (
                  <input
                  type='text'
                  className='form-control'
                  placeholder='Any specific challenges you face in your farming practices:'
                  name="challenges"
                  value={farmerData.challenges}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{farmerData.challenges}</span>
                )
                }</p>
                <p>Interest In Training :{" "} {editMode ? (
                  <div className="radio-container">
                    <label style={{ marginTop: '15px', marginLeft: '-100px', fontSize: '18px' }}>Are you interested in any farm-related training or <br></br>assistance?</label>
                    <label>
                      <input
                        type="radio"
                        value="yes"
                        checked={farmerData.interestInTraining}
                        onChange={handleRadioChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        checked={!farmerData.interestInTraining}
                        onChange={handleRadioChange}
                      />
                      No
                    </label>
                  </div>) : (
                  <span>{farmerData.interestInTraining ? "Yes" : "No"}</span>
                )
                }</p>
              </b>
            </div>
            <div style={{ float: 'right' }}>
            </div>
          </div>
        </div>

      </div>) : (<Error />))}

      {editMode ? (
        <>
          <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={handleSaveChanges}>Save</button>
          <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={handleEditButtonClick}>Cancel</button>
        </>
      ) : (
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={handleEditButtonClick}>Edit</button>
      )}
    </div>
  );
}


export default Farmersprofile;

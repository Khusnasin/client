import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
//import mongoose from "mongoose";


import { Types } from "mongoose";
import Loader from "./Loader";
import Error from "./Error";

const mongoose = require('mongoose');

function Farmersprofile() {
  const farmer = JSON.parse(localStorage.getItem("currentUser"))
  const [farmer1, setFarmer] = useState(farmer.data);
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
    const farmer = JSON.parse(localStorage.getItem("currentUser"))
    try {
      setloading(true);
      console.log("farmerid:", farmerid);
      //const objectIdFarmerId = Types.ObjectId(farmerid);
      const response = await axios.get(`/api/farmers/getfarmerbyid?farmerid=${farmerid}`);
      setFarmer(response.data);
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

  useEffect(() => {
    console.log("farmer state:", farmer);
  }, [farmer]);

  const handleEditButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmer((prevFarmer) => ({
      ...prevFarmer,
      [name]: value,
    }));
  };

  console.log(farmer);

  const handleRadioChange = async (event) => {
    const value = event.target.value === 'yes'; 

    try {

      setFarmer((prevFarmer) => ({
        ...prevFarmer,
        interestInTraining: value, 
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleSaveChanges = async () => {
    try {
      const objectIdFarmerId = Types.ObjectId(farmerid);
      await axios.put(`/api/farmers/updatefarmer/${objectIdFarmerId}`, farmer);
      setEditMode(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.log("Error updating farmer details:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleInputChange2 = (e) => {
    const { location, value } = e.target
    setFarmer((prevFarmer) => ({
      ...prevFarmer,
      [location]: value,
      setIsDropdownOpen: true
    }));
  };
  
  const handleOptionSelect = (selectedOption) => {
    setFarmer((prevFarmer) => ({
      ...prevFarmer,
      location: selectedOption,
      setIsDropdownOpen: false
    }));
  };
  console.log(farmer)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div >
      <h2>{farmer.data.Name}'s Profile</h2>
      {loading ? (<Loader />) : (farmer ? (<div>
        <div className="row bs2">
          <div className="col-md-3">
            
            

          </div>
          <div className="col-md-5">
            <h1>My Details</h1>
            <hr className="line"></hr>
            <b>
              <h1>Personal Info</h1>
              <hr className="line"></hr>
              <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.Name} </p>
              <p>Location : {editMode ? (
                <div>
                  <input type="text" className="form-control" placeholder="location"
                    value={farmer.data.location} onChange={handleInputChange2} onClick={() => setIsDropdownOpen(true)} />
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
                <span>{farmer.data.location}</span>
              )} </p>
              <p>Phone-Number : {editMode ? (
                <input type="text" className="form-control" placeholder="Phone Number"
                  value={farmer.phoneNumber} onChange={handleInputChange} />) : (
                <span>{farmer.data.phoneNumber} </span>
              )}</p>
              <p>Password : {editMode ? (
                <input type="password" className="form-control" placeholder="password"
                value={farmer.password} onChange={handleInputChange} />) : (
                <span>{farmer1.password} </span>
              )}</p>
              <h1>Napier Info</h1>
              <hr className="line"></hr>
              <p>Area Of Napier : {editMode ? (
                <input type="number" className="form-control" placeholder="Total Area of Napier Grass Cultivation (in acres/hectares/bigha)"
                  value={farmer.areaOfNapier} onChange={handleInputChange} />) : (
                <span>{farmer1.areaOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <p>Use Of Napier : {editMode ? (
                <input type="text" className="form-control" placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
                  value={farmer.useOfNapier} onChange={handleInputChange} />) : (
                <span>{farmer1.useOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <h1>Cows Info</h1>
              <hr className="line"></hr>
              <p>Number Of Cows : {editMode ? (
                <input type="number" className="form-control" placeholder="Number Of Cows"
                  value={farmer.numberOfCows} onChange={handleInputChange} />) : (
                <span>{farmer1.numberOfCows}</span>
              )
              }</p>
              <p>Amount of Dung Produced : {editMode ? (
                <input type="number" className="form-control" placeholder="Dung Produced (in kg)"
                  value={farmer.dungProduced_inKg} onChange={handleInputChange} />) : (
                <span>{farmer1.dungProduced_inKg}</span>
              )
              } kg</p>
              <p>Amount Of Milk : {editMode ? (
                <input type="number" className="form-control" placeholder="Amount of Milk (in Litres)"
                  value={farmer.amountOfMilk_inLitre} onChange={handleInputChange} />) : (
                <span>{farmer1.amountOfMilk_inLitre} Litre</span>
              )
              } </p>
            </b>
            <div>
              <b>
                <h1>Others</h1>
                <hr className="line"></hr>
                <p>Description : {editMode ? (
                  <input type='text' className='form-control' placeholder='description'
                    value={farmer.description} onChange={handleInputChange}
                  />) : (
                  <span>{farmer1.description}</span>
                )
                }  </p>
                <p>Challenges : {editMode ? (
                  <input type='text' className='form-control' placeholder='Any specific challenges you face in your farming practices:'
                    value={farmer.challenges} onChange={handleInputChange}
                  />) : (
                  <span>{farmer1.challenges}</span>
                )
                }</p>
                <p>interest In Training : {editMode ? (
                  <div className="radio-container">
                    <label style={{ marginTop: '15px', marginLeft: '-100px', fontSize: '18px' }}>Are you interested in any farm-related training or <br></br>assistance?</label>
                    <label>
                      <input
                        type="radio"
                        value="yes"
                        checked={farmer.interestInTraining}
                        onChange={handleRadioChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        checked={!farmer.interestInTraining}
                        onChange={handleRadioChange}
                      />
                      No
                    </label>
                  </div>) : (
                  <span>{farmer1.interestInTraining ? "Yes" : "No"}</span>
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
          <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={handleSaveChanges}>Save</button>
          <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={handleEditButtonClick}>Cancel</button>
        </>
      ) : (
        <button className="btn btn-primary" style={{marginTop:'20px'}} onClick={handleEditButtonClick}>Edit</button>
      )}
    </div>
  );
}
/*function Farmersprofile() {

  const farmer = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {

      if (!farmer) {
          window.location.href = '/login'
      }
  }, [])

  return (
      <div className='ml-3 mt-3'>
          
              <div className='row'>
              <div className='col-md-6'>
                  <div className='bs'>
                      <h1>My Profile</h1>
                      <br />
                      <h1>Name: {farmer.data.Name} </h1>
                      <h1>Loacation: {farmer.data.location} </h1>
                      <h1>Area of Napier: {farmer.data.areaOfNapier} </h1>
                  </div>
              </div>
              </div>

              



      </div>
  );
}*/

export default Farmersprofile;

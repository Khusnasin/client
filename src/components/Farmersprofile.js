import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

function FarmerProfile() {
  const [farmer, setFarmer] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownOptions = ['Sonapur', 'Khanapara', 'Byrnihut', 'Jorabaat'];
  const dropdownRef = useRef(null);

  const { farmerid } = useParams();
 
  const fetchFarmerDetails = async () => {
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login';
    }
    try {
      setloading(true);
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
      await axios.put(`/api/farmers/updatefarmer/${farmerid}`, farmer);
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
    <div>
      <h2>Farmer Profile</h2>
      {loading ? (<Loader />) : (farmer ? (<div>
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{farmer.Name}</h1>
            {farmer.imageUrls?.[0] && <img src={farmer.imageUrls[0]} className="bigimg" />}

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
                    value={farmer.location} onChange={handleInputChange2} onClick={() => setIsDropdownOpen(true)} />
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
                <span>{farmer.location}</span>
              )} </p>
              <p>Phone-Number : {editMode ? (
                <input type="text" className="form-control" placeholder="Phone Number"
                  value={farmer.phoneNumber} onChange={handleInputChange} />) : (
                <span>{farmer.phoneNumber} </span>
              )}</p>
              <p>Password : {editMode ? (
                <input type="password" className="form-control" placeholder="password"
                value={farmer.password} onChange={handleInputChange} />) : (
                <span>{farmer.password} </span>
              )}</p>
              <h1>Napier Info</h1>
              <hr className="line"></hr>
              <p>Area Of Napier : {editMode ? (
                <input type="number" className="form-control" placeholder="Total Area of Napier Grass Cultivation (in acres/hectares/bigha)"
                  value={farmer.areaOfNapier} onChange={handleInputChange} />) : (
                <span>{farmer.areaOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <p>Use Of Napier : {editMode ? (
                <input type="text" className="form-control" placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
                  value={farmer.useOfNapier} onChange={handleInputChange} />) : (
                <span>{farmer.useOfNapier}</span>
              )
              }</p>
            </b>
            <b>
              <h1>Cows Info</h1>
              <hr className="line"></hr>
              <p>Number Of Cows : {editMode ? (
                <input type="number" className="form-control" placeholder="Number Of Cows"
                  value={farmer.numberOfCows} onChange={handleInputChange} />) : (
                <span>{farmer.numberOfCows}</span>
              )
              }</p>
              <p>Amount of Dung Produced : {editMode ? (
                <input type="number" className="form-control" placeholder="Dung Produced (in kg)"
                  value={farmer.dungProduced_inKg} onChange={handleInputChange} />) : (
                <span>{farmer.useOfNapier}</span>
              )
              } kg</p>
              <p>Amount Of Milk :{editMode ? (
                <input type="number" className="form-control" placeholder="Amount of Milk (in Litres)"
                  value={farmer.amountOfMilk_inLitre} onChange={handleInputChange} />) : (
                <span>{farmer.amountOfMilk_inLitre} Litre</span>
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
                  <span>{farmer.description}</span>
                )
                }  </p>
                <p>Challenges : {editMode ? (
                  <input type='text' className='form-control' placeholder='Any specific challenges you face in your farming practices:'
                    value={farmer.challenges} onChange={handleInputChange}
                  />) : (
                  <span>{farmer.challenges}</span>
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
                  <span>{farmer.interestInTraining}</span>
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
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={handleEditButtonClick}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditButtonClick}>Edit</button>
      )}
    </div>
  );
}

export default FarmerProfile;

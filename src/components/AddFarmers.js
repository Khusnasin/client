import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';

function AddFarmers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    location: '',
    phoneNumber: '',
    areaOfNapier: '',
    useOfNapier: '',
    numberOfCows: '',
    dungProduced_inKg: '',
    amountOfMilk_inLitre: '',
    imageurl1: '',
    imageurl2: '',
    imageurl3: '',
    description: '',
    challenges: '',
    interestInTraining: false,
    password: '',
    cpassword: '',
  });
  const [option, setOption] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);
const dropdownOptions = ['Sonapur', 'Khanapara', 'Byrnihut', 'Jorabaat'];

const handleInputChange = (e) => {
  setFormData({ ...formData, location: e.target.value });
  setIsDropdownOpen(true); // Open the dropdown when the user starts typing
};

const handleOptionSelect = (selectedOption) => {
  setFormData({ ...formData, location: selectedOption });
  setIsDropdownOpen(false); // Close the dropdown after selecting an option
};
useEffect(() => {
  function handleClickOutside(event){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
          setIsDropdownOpen(false);
      }
  };
  document.addEventListener('mousedown' , handleClickOutside);
    return() => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
},[]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (event) => {
    const value = event.target.value === 'yes'; // Convert to boolean
    setFormData({ ...formData, interestInTraining: value });
  };
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  
    // Enable/disable textboxes based on the selected option
    if (selectedOption === 'Napier Grass') {
      setFormData({
        ...formData,
        areaOfNapier: true,
        useOfNapier: '',
        numberOfCows: false,
        dungProduced_inKg: false,
        amountOfMilk_inLitre: false,
      });
    } else if (selectedOption === 'Cows') {
      setFormData({
        ...formData,
        areaOfNapier: false,
        useOfNapier: false,
        numberOfCows: true,
        dungProduced_inKg: true,
        amountOfMilk_inLitre: true,
      });
    } else if (selectedOption === 'both') {
      setFormData({
        ...formData,
        areaOfNapier: true,
        useOfNapier: '',
        numberOfCows: true,
        dungProduced_inKg: true,
        amountOfMilk_inLitre: true,
      });
    }
  };

  const addFarmers = async () => {
    try {
      setLoading(true);
      if (formData.password !== formData.cpassword) {
        Swal.fire('Password Error', 'Passwords do not match', 'error');
        setLoading(false);
        return;
      }
      const response = await axios.post('/api/farmers/addfarmers', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response.status === 200) {
      Swal.fire('Congrats', "Your new farmer is added successfully!", 'success').then(result => {
        window.location.href = '/admin-screen';
      })
    }
   } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire('Oops', "Something went wrong!", 'error');
    }
  };
  const handleReset = () => {
    setFormData({
      name: '',
      location: '',
      phoneNumber: '',
      areaOfNapier: '',
      useOfNapier: '',
      numberOfCows: '',
      dungProduced_inKg: '',
      amountOfMilk_inLitre: '',
      imageurl1: '',
      imageurl2: '',
      imageurl3: '',
      description: '',
      challenges: '',
      interestInTraining: false,
      password: '',
      cpassword: '',
    });
  };


  return (
    <div className='row justify-content-center mt-2'>
      <div className='col-md-10'>
        <h2>Add Farmers</h2>
        {loading && <Loader />}
        {error && (<Error />)}
        < div className="bs">
        <div className="col-md-12 justify-content-center" style={{ marginRight: '100px', marginTop: '10px' }}>
        <div>
        <label>Name:</label>
        <input type='text' className='form-control' placeholder='farmer name'
          name='Name' value={formData.Name} onChange={handleChange}
    required // Ensure the password field is required
    />
        </div>
        <div>
        <label>Location:</label>
        <input type='text' className='form-control' placeholder='location of farmer'
          name='location' value={formData.location} onChange={handleInputChange} required onClick={() => setIsDropdownOpen(true)}/>
          {isDropdownOpen && (
              <ul ref={dropdownRef}>
                {dropdownOptions.map((option) => (
                  <li key={option} onClick={() => handleOptionSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>)}
        </div>
        <div>
        <label>Phone Number:</label>
        <input type='text' className='form-control' placeholder='phone number'
          name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}
          required // Ensure the password field is required
          /> 
        </div>
        <div className="radio-container">
          <label style={{ marginTop: '10px', marginLeft: '-100px', fontSize: '18px' }}>
            Select your preference:
          </label>
          <label>
            <input
              type="radio"
              name="options"
              value="Napier Grass"
              checked={option === 'Napier Grass'}
              onChange={handleOptionChange}
            />
            Napier Grass
          </label>

          <label>
            <input
              type="radio"
              name="options"
              value="Cows"
              checked={option === 'Cows'}
              onChange={handleOptionChange}
            />
            Cows
          </label>

          <label>
            <input
              type="radio"
              name="options"
              value="both"
              checked={option === 'both'}
              onChange={handleOptionChange}
            />
            Both
          </label>
        </div>

        <br />
        <input
          type="number"
          disabled={!(formData.areaOfNapier || formData.option === 'both')}
          className="form-control"
          placeholder="Total Area of Napier Grass Cultivation (in acres/hectares)"
          value={formData.areaOfNapier}
          onChange={handleChange}
          name="areaOfNapier"
        />
        <input
          type="text"
          disabled={!(formData.areaOfNapier || formData.option === 'both')}
          className="form-control"
          placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
          value={formData.useOfNapier}
          onChange={handleChange}
          name="useOfNapier"
        />
        <input
          type="number"
          disabled={!(formData.numberOfCows || formData.option === 'both')}
          className="form-control"
          placeholder="Number Of Cows"
          value={formData.numberOfCows}
          onChange={handleChange}
          name="numberOfCows"
        />
        <input
          type="number"
          disabled={!(formData.dungProduced_inKg || formData.option === 'both')}
          className="form-control"
          placeholder="Dung Produced (in kg)"
          value={formData.dungProduced_inKg}
          onChange={handleChange}
          name="dungProduced_inKg"
        />
        <input
          type="number"
          disabled={!(formData.amountOfMilk_inLitre || formData.option === 'both')}
          className="form-control"
          placeholder="Amount of Milk (in Litres)"
          value={formData.amountOfMilk_inLitre}
          onChange={handleChange}
          name="amountOfMilk_inLitre"
        />
        </div>
        
        
        <div className="col-md-12 justify-content-center" style={{marginRight: '100px', marginTop: '10px' }}>
   
        <div>
        <label >Image Urls 1:</label>
        <input type='text' className='form-control' placeholder='image URL 1' 
            name='imageurl1'  value={formData.imageurl1} onChange={handleChange}
             />
        </div>
        <div>
        <label>Image Urls 2:</label>
        <input type='text' className='form-control' placeholder='image URL 2' 
            name='imageurl2' value={formData.imageurl2} onChange={handleChange}
            />
        </div>
        <div>
        <label>Image Urls3:</label>
        <input type='text' className='form-control' placeholder='image URL 3' 
           name='imageurl3' value={formData.imageurl3} onChange={handleChange}
             />
        </div>
        <div>
        <label>Description:</label>
        <input type='text' className='form-control' placeholder='description' 
            name='description'  value={formData.description} onChange={handleChange} required  />
        </div>
        <div>
        <label>Challenges:</label>
        <input type='text' className='form-control' placeholder='challenges' 
            name='challenges' value={formData.challenges} onChange={handleChange}
            required />
        </div>
        <div className="col-md-12">
          <div className="radio-container">
        
        <label style={{ marginTop: '10px', marginLeft: '10px', fontSize:'15px' }}>Are you interested in any farm-related training or assistance?</label>
        <div>
            <input
              type='radio'
              name='interestInTraining'
              value='Yes'
              checked={formData.interestInTraining === 'Yes'}
              onChange={handleRadioChange}
            />
            <label>Yes</label>
            <input
              type='radio'
              name='interestInTraining'
              value='No'
              checked={formData.interestInTraining === 'No'}
              onChange={handleRadioChange}
            />
            <label>No</label>
          </div>
          </div>
        <div>
        <label>Password:</label><input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required />
              </div>
              <div>
              <label> Confirm Password:</label><input
            type="cpassword"
            className="form-control"
            placeholder="confirm password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            required />
              </div>
              </div></div></div></div>
              <div className='text-center'>
          <button className="btn btn-primary mt-3" style={{ marginRight: '10px' }} onClick={addFarmers}>
            Add Farmer
          </button>
          <button className="btn btn-primary mt-3" type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
               

        
    </div>
    
  );

  }
export default AddFarmers;

import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
//import Swal from 'sweetalert2';

function AddFarmers(props) {
  const formRef = useRef(null);
  const [Name, setname] = useState('');
  //const[email, setemail] = useState('');
  const [location, setlocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [phoneNumber, setphoneNumber] = useState();
  const [option, setOption] = useState('');

  const [areaOfNapier, setareaOfNapier] = useState(false);
  const [useOfNapier, setuseOfNapier] = useState('');
  const [numberOfCows, setnumberOfCows] = useState(false);
  const [dungProduced_inKg, setdungProduced_inKg] = useState(false);
  const [amountOfMilk_inLitre, setamountOfMilk_inLitre] = useState(false);

  const [imageurl1, setimageurl1] = useState()
  const [imageurl2, setimageurl2] = useState()
  const [imageurl3, setimageurl3] = useState()
  const [description, setdescription] = useState()
  const [challenges, setchallenges] = useState()
  const [interestInTraining, setinterestInTraining] = useState()

  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const dropdownOptions = ['Sonapur', 'Khanapara', 'Byrnihut', 'Jorabaat'];

  useEffect(() => {
      console.log("Props.farmer data: ", props.farmer);
      if (props.farmer) {
          const {
              Name,
              location,
              latitude,
              longitude,
              phoneNumber,
              areaOfNapier,
              useOfNapier,
              numberOfCows,
              dungProduced_inKg,
              amountOfMilk_inLitre,
              imageUrls,
              description,
              challenges,
              interestInTraining,
          } = props.farmer;

          setname(props.farmer.Name);
          setlocation(props.farmer.location);
          setphoneNumber(phoneNumber);
          setareaOfNapier(areaOfNapier);
          setuseOfNapier(useOfNapier);
          setnumberOfCows(numberOfCows);
          setdungProduced_inKg(dungProduced_inKg);
          setamountOfMilk_inLitre(amountOfMilk_inLitre);
          setimageurl1(imageUrls[0]);
          setLatitude(latitude);
          setLongitude(longitude);
          setdescription(description);
          setchallenges(challenges);
          setinterestInTraining(interestInTraining);
      }
  }, [props.farmer]);

  useEffect(() => {
      if (success) {
          resetForm();
      }
  }, [success]);

  const resetForm = () => {
      setname('')
      setlocation('')
      setphoneNumber('')
      setareaOfNapier('')
      setuseOfNapier('')
      setnumberOfCows('')
      setdungProduced_inKg('')
      setamountOfMilk_inLitre('')
      setimageurl1('')
      setLatitude('')
      setLongitude('')
      setdescription('')
      setchallenges('')
      setinterestInTraining('')

      setpassword('')
      setcpassword('')

  };

  useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setLatitude(latitude);
                  setLongitude(longitude);
              },
              (error) => {
                  console.error('Error getting user location:', error.message);
              }
          );
      } else {
          console.error('Geolocation is not supported by this browser.');
      }
  }, []);

  async function register() {

      if (password === cpassword) {
          const farmer = {
              Name,
              location,
              latitude,
              longitude,
              phoneNumber,
              areaOfNapier,
              useOfNapier,
              numberOfCows,
              dungProduced_inKg,
              amountOfMilk_inLitre,
              imageUrls: [imageurl1, imageurl2, imageurl3],
              description,
              challenges,
              interestInTraining,
              password,
              cpassword
          }

          try {
              setloading(true);
              const response = await axios.post('/api/farmers/addfarmers', farmer, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              const result = response.data;
              setloading(false);
              setsuccess(true);

              setname('')
              setlocation('')
              setphoneNumber()
              setareaOfNapier()
              setuseOfNapier()
              setnumberOfCows()
              setdungProduced_inKg()
              setamountOfMilk_inLitre()
              setimageurl1()
              setLatitude()
              setLongitude()
              setdescription()
              setchallenges()
              setinterestInTraining()

              setpassword('')
              setcpassword('')

              resetForm();

          } catch (error) {
              console.log(error);
              setloading(false);
              seterror(true);
          }
      }
      else {
          alert('Please check the password again!')
      }
  }
  const handleReset = () => {
      resetForm();
  }
  const handleOptionChange = (event) => {
      const selectedOption = event.target.value;
      setOption(selectedOption);

      // Enable/disable textboxes based on the selected option
      if (selectedOption === 'Napier Grass') {
          setareaOfNapier(true);
          setuseOfNapier('');
          setnumberOfCows(false);
          setdungProduced_inKg(false);
          setamountOfMilk_inLitre(false);
      } else if (selectedOption === 'Cows') {
          setareaOfNapier(false);
          setuseOfNapier(false);
          setnumberOfCows(true);
          setdungProduced_inKg(true);
          setamountOfMilk_inLitre(true);
      } else if (selectedOption === 'both') {
          setareaOfNapier(true);
          setuseOfNapier('');
          setnumberOfCows(true);
          setdungProduced_inKg(true);
          setamountOfMilk_inLitre(true);
      }
  };
  const handleRadioChange = async (event) => {
      const value = event.target.value === 'yes'; // Convert to boolean

      try {

          setinterestInTraining(value);
      } catch (error) {
          console.error('Error updating user:', error);
      }
  };
  const handleInputChange = (e) => {
      setlocation(e.target.value);
      setIsDropdownOpen(true); // Open the dropdown when the user starts typing
  };
  const handleOptionSelect = (selectedOption) => {
      setlocation(selectedOption);
      setIsDropdownOpen(false); // Close the dropdown after selecting an option
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
      <div className='row justify-content-center mt-2'>
        <div className='col-md-10'>
        <h2>Add Farmers: </h2>
          {loading && (<Loader />)}
        {success && (<Success message='Registration Successful!' />)}              
          {error && (<Error />)}
              <div className="bs">
              <div className="col-md-12 justify-content-center" style={{ marginRight: '100px', marginTop: '10px' }}>
                  
                     <input type="text" className="form-control" placeholder="Name"
                          value={Name} onChange={(e) => { setname(e.target.value) }} />
                      <input type="text" className="form-control" placeholder="location"
                          value={location} onChange={handleInputChange} onClick={() => setIsDropdownOpen(true)} />
                      {isDropdownOpen && (
                          <ul ref={dropdownRef}>
                              {dropdownOptions.map((option) => (
                                  <li key={option} onClick={() => handleOptionSelect(option)}>
                                      {option}
                                  </li>
                              ))}
                          </ul>
                      )}
                      
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Latitude"
                          value={latitude || ''}
                          onChange={(e) => setLatitude(e.target.value)}
                      />
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Longitude"
                          value={longitude || ''}
                          onChange={(e) => setLongitude(e.target.value)}
                      />
                      <input type="text" className="form-control" placeholder="Phone Number"
                          value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />
                      <input type='text' className='form-control' placeholder='image URL 1'
                          value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                      />
                      <input type='text' className='form-control' placeholder='description'
                          value={description} onChange={(e) => { setdescription(e.target.value) }}
                      />
                      <input type='text' className='form-control' placeholder='Any specific challenges you face in your farming practices:'
                          value={challenges} onChange={(e) => { setchallenges(e.target.value) }}
                      />

                      <div className="radio-container">
                          <label style={{ marginTop: '15px', marginLeft: '-100px', fontSize: '18px' }}>Are you interested in any farm-related training or <br></br>assistance?</label>
                          <label>
                              <input
                                  type="radio"
                                  value="yes"
                                  checked={interestInTraining}
                                  onChange={handleRadioChange}
                              />
                              Yes
                          </label>
                          <label>
                              <input
                                  type="radio"
                                  value="no"
                                  checked={!interestInTraining}
                                  onChange={handleRadioChange}
                              />
                              No
                          </label>
                      </div>
                  </div>


                  <div className="col-md-12 justify-content-center" style={{marginRight: '100px', marginTop: '10px' }} >

                      <div className="radio-container">
                          <label style={{ marginTop: '15px', marginLeft: '-100px', fontSize: '18px' }}>Select your preference: </label>
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
                      <input type="number" disabled={option !== 'Napier Grass' && option !== 'both'} className="form-control" placeholder="Total Area of Napier Grass Cultivation (in acres/hectares)"
                          value={areaOfNapier} onChange={(e) => { setareaOfNapier(e.target.value) }} />
                      <input type="text" disabled={option !== 'Napier Grass' && option !== 'both'} className="form-control" placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
                          value={useOfNapier} onChange={(e) => { setuseOfNapier(e.target.value) }} />
                      <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Number Of Cows"
                          value={numberOfCows === true ? '' : numberOfCows} onChange={(e) => { setnumberOfCows(e.target.value) }} />
                      <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Dung Produced (in kg)"
                          value={dungProduced_inKg === true ? '' : dungProduced_inKg} onChange={(e) => { setdungProduced_inKg(e.target.value) }} />
                      <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Amount of Milk (in Litres)"
                          value={amountOfMilk_inLitre === true ? '' : amountOfMilk_inLitre} onChange={(e) => { setamountOfMilk_inLitre(e.target.value) }} />

                      <input type="password" className="form-control" placeholder="password"
                          value={password} onChange={(e) => { setpassword(e.target.value) }} />
                      <input type="password" className="form-control" placeholder="confirm password"
                          value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                  </div>
                  <div className='text-center'>


                      <button className="btn btn-primary mt-3" style={{ marginRight: '10px' }} onClick={register}>Add Farmer</button>
                      <button className="btn btn-primary mt-3" type="button" onClick={handleReset}>Reset</button>
                  </div>
              </div>


          </div>
      </div>
  )
}
/*const [loading, setLoading] = useState(false);
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
  const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      location: value,
      areaOfNapier: value === 'Napier Grass' ? '' : prevState.areaOfNapier,
      useOfNapier: value === 'Napier Grass' ? '' : prevState.useOfNapier,
      numberOfCows: value === 'Cows' ? '' : prevState.numberOfCows,
      dungProduced_inKg: value === 'Cows' ? '' : prevState.dungProduced_inKg,
      amountOfMilk_inLitre: value === 'Cows' ? '' : prevState.amountOfMilk_inLitre,
    }));
  setIsDropdownOpen(true); // Open the dropdown when the user starts typing
};

const handleOptionSelect = (selectedOption) => {
  setFormData({ ...formData, location: selectedOption });
  setIsDropdownOpen(false); // Close the dropdown after selecting an option
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (event) => {
    const value = event.target.value === 'Yes'; // Convert to boolean
    setFormData({ ...formData, interestInTraining: value });
  };
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  
    // Enable/disable textboxes based on the selected option
    if (selectedOption === 'Napier Grass') {
      setFormData((prevState) => ({
        ...prevState,
        areaOfNapier: '',
        useOfNapier: '',
        numberOfCows: '',
        dungProduced_inKg: '',
        amountOfMilk_inLitre: '',
      }));
    } else if (selectedOption === 'Cows') {
      setFormData((prevState) => ({
        ...prevState,
        areaOfNapier: '',
        useOfNapier: '',
        numberOfCows: '',
        dungProduced_inKg: '',
        amountOfMilk_inLitre: '',
      }));
    } else if (selectedOption === 'both') {
      setFormData((prevState) => ({
        ...prevState,
        areaOfNapier: '',
        useOfNapier: '',
        numberOfCows: '',
        dungProduced_inKg: '',
        amountOfMilk_inLitre: '',
      }));
    }
      
  };
// Controller function for adding farmer data
  const addFarmers = async (req, res) => {
    try {
      setLoading(true);
      if (formData.password !== formData.cpassword) {
        Swal.fire('Password Error', 'Passwords do not match', 'error');
        setLoading(false);
        return;
      }
      const formDataWithNull = { ...formData };
    for (const key in formDataWithNull) {
      if (formDataWithNull[key] === '') {
        formDataWithNull[key] = null;
      }
    }
      const response = await axios.post('/api/farmers/addfarmers', formDataWithNull, {
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
              name="preference"
              value="Napier Grass"
              checked={option === 'Napier Grass'}
              onChange={handleOptionChange}
            />
            Napier Grass
          </label>

          <label>
            <input
              type="radio"
              name="preference"
              value="Cows"
              checked={option === 'Cows'}
              onChange={handleOptionChange}
            />
            Cows
          </label>

          <label>
            <input
              type="radio"
              name="preference"
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
          disabled={option !== 'Napier Grass' && option !== 'both'}
          className="form-control"
          placeholder="Total Area of Napier Grass Cultivation (in acres/hectares)"
          value={formData.areaOfNapier}
          onChange={handleChange}
          name="areaOfNapier"
        />
        <input
          type="text"
          disabled={option !== 'Napier Grass' && option !== 'both'}
          className="form-control"
          placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
          value={formData.useOfNapier}
          onChange={handleChange}
          name="useOfNapier"
        />
        <input
          type="number"
          disabled={option !== 'Cows' && option !== 'both'}
          className="form-control"
          placeholder="Number Of Cows"
          value={formData.numberOfCows}
          onChange={handleChange}
          name="numberOfCows"
        />
        <input
          type="number"
          disabled={option !== 'Cows' && option !== 'both'}
          className="form-control"
          placeholder="Dung Produced (in kg)"
          value={formData.dungProduced_inKg}
          onChange={handleChange}
          name="dungProduced_inKg"
        />
        <input
          type="number"
          disabled={option !== 'Cows' && option !== 'both'}
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
        
          
          <div className="radio-container">
        
        <label style={{ marginTop: '10px', marginLeft: '-100px', fontSize:'15px' }}>Are you interested in any farm-related training or assistance?</label>
        
        <label>
            <input
              type='radio'
              name='interestInTraining'
              value='Yes'
              checked={formData.interestInTraining === true}
              onChange={handleRadioChange}
            />
            Yes</label>
            <label>
            <input
              type='radio'
              name='interestInTraining'
              value='No'
              checked={formData.interestInTraining === false}
              onChange={handleRadioChange}
            />
            No</label>
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
            type="password"
            className="form-control"
            placeholder="confirm password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            required />
              </div>
              </div></div></div>
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

  }*/
export default AddFarmers;

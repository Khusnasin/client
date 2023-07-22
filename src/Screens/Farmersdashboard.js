import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Farmerdashboard() {
    const [farmersDetails, setfarmerDetails] = useState({
        Name: '',
        location: '',
        phoneNumber: '',
        areaOfNapier: false,
        useOfNapier: '',
        numberOfCows: false,
        dungProduced_inKg: false,
        amountOfMilk_inLitre: false,
        imageurl1: '',
        imageurl2: '',
        imageurl3: '',
        description: '',
        challenges: '',
        interestInTraining: '',
        password: '',
        cpasword: ''

    });
    const formRef = useRef(null);
    const [Name, setname] = useState('');
    //const[email, setemail] = useState('');
    const [location, setlocation] = useState('');
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
    const navigate = useNavigate();

    const checkCurrentUser = () => {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    };
    useEffect(() => {
        const delay = 2000;
        fetchFarmerDetails();
        const currentUser = checkCurrentUser();
        if (currentUser) {
            const redirectTimer = setTimeout(() => {
                navigate('/update-farmer-details');
            }, delay);
            return () => clearTimeout(redirectTimer);
        } else {
            const redirectTimer = setTimeout(() => {
                navigate('/home');
            },delay);
            return() => clearTimeout(redirectTimer);    
        }
    }, [navigate]);
    const fetchFarmerDetails = async () => {
        try {
            setloading(true);
            const response = await axios.get('/api/farmers/getallfarmers');
            setfarmerDetails(response.data);
            setloading(false);
        } catch (error) {
            console.error('Error fetching registration details:', error);
            setloading(false);
            seterror('Failed to fetch registration details');
        }
    };

    useEffect(() => {
        fetchFarmerDetails();
    }, []);

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
        setimageurl2('')
        setimageurl3('')
        setdescription('')
        setchallenges('')
        setinterestInTraining('')

        setpassword('')
        setcpassword('')

    };


    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setfarmerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    const handleFormSubmit = async () => {
        try {
            setloading(true);
            await axios.put('/api/farmers/update-farmer-details', farmersDetails);
            setloading(false);
            setsuccess(true);
        } catch (error) {
            console.error('Error updating registration details:', error);
            setloading(false);
            seterror('Failed to update registration details');
        }
    };
    const handleReset = () => {
        resetForm();
    }
    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setOption(selectedOption);


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
    const handleInputChange2 = (e) => {
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
        <div>
            {loading && <Loader />}
            {error && <Error message={error} />}
            {success && <Success message="Registration details updated successfully!" />}

            <h2>Farmer Dashboard</h2>

            <form onSubmit={handleFormSubmit}>

                <input
                    type="text"
                    name="Name"
                    value={farmersDetails.Name}
                    onChange={handleInputChange}
                />



                <input type="text" className="form-control" placeholder="location"
                    value={location} onChange={handleInputChange2} onClick={() => setIsDropdownOpen(true)} />
                {isDropdownOpen && (
                    <ul ref={dropdownRef}>
                        {dropdownOptions.map((option) => (
                            <li key={option} onClick={() => handleOptionSelect(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
                <input type="text" className="form-control" placeholder="Phone Number"
                    value={phoneNumber} onChange={handleInputChange} />
                <input type='text' className='form-control' placeholder='image URL 1'
                    value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='image URL 2'
                    value={imageurl2} onChange={handleInputChange}
                />
                <input type='text' className='form-control' placeholder='image URL 3'
                    value={imageurl3} onChange={handleInputChange}
                />
                <input type='text' className='form-control' placeholder='description'
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Any specific challenges you face in your farming practices:'
                    value={challenges} onChange={handleInputChange}
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



                <div className="col-md-8" >

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
                        value={areaOfNapier} onChange={handleInputChange} />
                    <input type="text" disabled={option !== 'Napier Grass' && option !== 'both'} className="form-control" placeholder="How do you use Napier grass on your farm? (e.g., feed for cows, selling, other purposes)"
                        value={useOfNapier} onChange={handleInputChange} />
                    <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Number Of Cows"
                        value={numberOfCows === true ? '' : numberOfCows} onChange={handleInputChange} />
                    <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Dung Produced (in kg)"
                        value={dungProduced_inKg === true ? '' : dungProduced_inKg} onChange={handleInputChange} />
                    <input type="number" disabled={option !== 'Cows' && option !== 'both'} className="form-control" placeholder="Amount of Milk (in Litres)"
                        value={amountOfMilk_inLitre === true ? '' : amountOfMilk_inLitre} onChange={handleInputChange} />

                    <input type="password" className="form-control" placeholder="password"
                        value={password} onChange={handleInputChange} />
                    <input type="password" className="form-control" placeholder="confirm password"
                        value={cpassword} onChange={handleInputChange} />
                </div>
                <div className='text-center'>

                    <button className="btn btn-primary" type="submit">Update Registration</button>
                    <button className="btn btn-primary mt-3" type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default Farmerdashboard;

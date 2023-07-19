import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Farmersregistratration() {
    const formRef = useRef(null);
    const [Name, setname] = useState('');
    //const[email, setemail] = useState('');
    const [location, setlocation] = useState('');

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
    async function register() {

        if (password === cpassword) {
            const farmer = {
                Name,
                location,
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
                const response = await axios.post('/api/farmers/registerfarmer', farmer, {
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
                setimageurl2()
                setimageurl3()
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

    return (
        <div>
            {loading && (<Loader />)}

            <div className="row justify-content-center mt-5">

                {success && (<Success message='Registration Successful!' />)}
                <h2>Register</h2>
                {error && (<Error />)}
                <div className="bs">

                    <div className="col-md-8" style={{ marginRight: '20px', marginTop: '80px' }}>



                        <input type="text" className="form-control" placeholder="Name"
                            value={Name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="location"
                            value={location} onChange={(e) => { setlocation(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="Phone Number"
                            value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='image URL 1'
                            value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                        />
                        <input type='text' className='form-control' placeholder='image URL 2'
                            value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}
                        />
                        <input type='text' className='form-control' placeholder='image URL 3'
                            value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}
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


                        <button className="btn btn-primary mt-3" style={{ marginRight: '10px' }} onClick={register}>Register</button>
                        <button className="btn btn-primary mt-3" type="button" onClick={handleReset}>Reset</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Farmersregistratration;
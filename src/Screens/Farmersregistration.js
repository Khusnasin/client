import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Farmersregistratration() {
    const [Name, setname] = useState('');
    //const[email, setemail] = useState('');
    const [location, setlocation] = useState('');

    const [phoneNumber, setphoneNumber] = useState();
    const [option, setOption] = useState('');

    const [amountOfNapier, setamountOfNapier] = useState(false);
    const [numberOfCows, setnumberOfCows] = useState(false);
    const [dungProduced_inKg, setdungProduced_inKg] = useState(false);
    const [amountOfMilk_inLitre, setamountOfMilk_inLitre] = useState(false);

    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()
    const [imageurl3, setimageurl3] = useState()
    const [description, setdescription] = useState()

    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password === cpassword) {
            const farmer = {
                Name,
                location,
                phoneNumber,
                amountOfNapier,

                numberOfCows,
                dungProduced_inKg,
                amountOfMilk_inLitre,
                imageUrls: [imageurl1, imageurl2, imageurl3],
                description,

                password,
                cpassword
            }

            try {
                setloading(true);
                const response = await axios.post('/api/farmers/registerfarmer', farmer,{
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
                setamountOfNapier()
                setnumberOfCows()
                setdungProduced_inKg()
                setamountOfMilk_inLitre()
                setimageurl1()
                setimageurl2()
                setimageurl3()
                setdescription()

                setpassword('')
                setcpassword('')

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
    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setOption(selectedOption);

        // Enable/disable textboxes based on the selected option
        if (selectedOption === 'Napier Grass') {
            setamountOfNapier(true);
            setnumberOfCows(false);
            setdungProduced_inKg(false);
            setamountOfMilk_inLitre(false);
        } else if (selectedOption === 'Cows') {
            setamountOfNapier(false);
            setnumberOfCows(true);
            setdungProduced_inKg(true);
            setamountOfMilk_inLitre(true);
        } else if (selectedOption === 'both') {
            setamountOfNapier(true);
            setnumberOfCows(true);
            setdungProduced_inKg(true);
            setamountOfMilk_inLitre(true);
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

                    <div className="col-md-10" style={{ marginTop: '80px', marginLeft: '60px' }}>



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
                    </div>


                    <div className="col-md-10" >
                        <div className="radio-container">
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
                        <input type="number" disabled={option !== 'Napier Grass' && option !== 'both'} className="form-control" placeholder="Amount of Napier grass(in kg)"
                            value={amountOfNapier} onChange={(e) => { setamountOfNapier(e.target.value) }} />
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


                        <button className="btn btn-primary mt-3" style={{ marginLeft: '90%' }} onClick={register}>Register</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Farmersregistratration;
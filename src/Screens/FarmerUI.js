import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function FarmerUI() {
    const [name, setname] = useState('');
    //const[email, setemail] = useState('');
    const [location, setlocation] = useState('');
    const [age, setage] = useState();
    const [phoneNumber, setphoneNumber] = useState();
    const [numberOfCows, setnumberOfCows] = useState();
    const [dungProduced_inKg, setdungProduced_inKg] = useState();
    const [amountOfMilk_inLitre, setamountOfMilk_inLitre] = useState();
    const [imageurl1, setimageurl] = useState()
    const [imageurl2, setimageur2] = useState()
    const [imageurl3, setimageur3] = useState()
    const [description, setdescription] = useState()

    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password == cpassword) {
            const newfarmer = {
                name,
                location,
                age,
                phoneNumber,
                numberOfCows,
                dungProduced_inKg,
                amountOfMilk_inLitre,
                imageUrls: [imageurl1, imageurl2, imageurl3],
                description,
                //email,
                password,
                cpassword
            }

            try {
                setloading(true);
                const response = await axios.post('/api/farmers/registerfarmer', newfarmer)
                const result = response.data;
                setloading(false);
                setsuccess(true);

                setname('')
                //setemail('')

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
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='Registration Successful!' />)}
                    <div className="bs">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="name"
                            value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="location"
                            value={location} onChange={(e) => { setlocation(e.target.value) }} />
                        <input type="number" className="form-control" placeholder="age"
                            value={age} onChange={(e) => { setage(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="Phone Number"
                            value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />
                        <input type="number" className="form-control" placeholder="Number Of Cows"
                            value={numberOfCows} onChange={(e) => { setnumberOfCows(e.target.value) }} />
                        <input type="number" className="form-control" placeholder="Dung Produced (in kg)"
                            value={dungProduced_inKg} onChange={(e) => { setdungProduced_inKg(e.target.value) }} />
                        <input type="number" className="form-control" placeholder="Amount of Milk (in Litres)"
                            value={amountOfMilk_inLitre} onChange={(e) => { setamountOfMilk_inLitre(e.target.value) }} />
                        <input type='text' className='form-control' placeholder='image URL 1'
                            value={imageurl1} onChange={(e) => { setimageurl(e.target.value) }}
                        />
                        <input type='text' className='form-control' placeholder='image URL 2'
                            value={imageurl2} onChange={(e) => { setimageur2(e.target.value) }}
                        />
                        <input type='text' className='form-control' placeholder='image URL 3'
                            value={imageurl3} onChange={(e) => { setimageur3(e.target.value) }}
                        />
                        <input type='text' className='form-control' placeholder='description'
                            value={description} onChange={(e) => { setdescription(e.target.value) }}
                        />
                        <input type="password" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="confirm password"
                            value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FarmerUI;
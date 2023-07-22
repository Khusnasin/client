import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";


function Farmerlogin() {

    const [Name, setname] = useState('');
    const [password, setpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState();


    async function Login() {

        const user = {

            Name,
            password,

        }
        
        try {

            setloading(true);
            const result = await axios.post('/api/farmers/loginfarmer', user);
            setloading(false);

            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/update-farmer-details';
            console.log(result)

 
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true);
        }
        console.log(user)
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && (<Error message='Invalid Credentials!' />)}
                    {success && (<Success message='Login Successful!' />)}
                    <div className="bs">
                        <h2>Login</h2>

                        <input type="text" className="form-control" placeholder="Username"
                            value={Name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Farmerlogin;
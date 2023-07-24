import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";


function Adminlogin() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [adminCode, setadminCode] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState();


    async function Login() {

        const user = {

            email,
            password,
            adminCode

        }
        
        try {

            setloading(true);
            const result = await axios.post('/api/users/loginadmin', user);
            
            setloading(false);
            setsuccess(true);

            const delay = 2000;
            setTimeout(() => {
                localStorage.setItem('currentUser', JSON.stringify(result));
                window.location.href = '/loginadmin';
            },delay);
            
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
                    {success && (<Success message='Login Successful! .....redirecting' />)}
                    <div className="bs">
                        <h2>Login</h2>

                        <input type="text" className="form-control" placeholder="email"
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            <input type="password" className="form-control" placeholder="admin code"
                            value={adminCode} onChange={(e) => { setadminCode(e.target.value) }} />

                        <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Adminlogin;
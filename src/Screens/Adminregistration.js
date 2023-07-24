import React , {useState} from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Adminregistration(){
    const[name, setname] = useState('');
    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');
    const[cpassword, setcpassword] = useState('');
    const[adminCode, setadminCode] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success , setsuccess] = useState();

    async function register(){
        if(password === cpassword){
            const user = {
                name,
                email,
                password,
                cpassword,
                adminCode
            }
            
            try{
                setloading(true);
                const response = await axios.post('/api/users/registeruseradmin' , user).data;
                console.log(response.data);
                setloading(false);
                setsuccess(true);

                setname('')
                setemail('')
                setpassword('')
                setcpassword('')

            }catch(error){
                console.log(error);
                setloading(false);
                seterror(true);
            }
        }
        else{
            alert('Please check the password again!')
        }
    }
    return(
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                {success && (<Success message='Registration Successful!' />)}
                    <div className="bs">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="name" 
                            value={name} onChange={(e)=>{setname(e.target.value)}}/>
                        <input type="email" className="form-control" placeholder="email" 
                            value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        <input type="password" className="form-control" placeholder="password" 
                            value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                        <input type="password" className="form-control" placeholder="confirm password"
                            value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                        <input type="password" className="form-control" placeholder="admincode"
                            value={adminCode} onChange={(e)=>{setadminCode(e.target.value)}}/>

                        <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Adminregistration;
import React , {useState} from "react";
import axios from "axios";
import { useHistory } from 'react-router';
//import Loader from "../components/Loader";
//import Error from "../components/Error";
//import Success from "../components/Success";

function Adminregistration(){
    const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/registeruseradmin', formData);
      if (response.status === 201) {
        alert('Admin registered successfully!');
        history.push('/admin/loginadmin'); // Redirect to the login page after successful registration
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during admin registration. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Admin Code:</label>
          <input type="password" name="adminCode" value={formData.adminCode} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Adminregistration;
/*
    
    const[email, setemail] = useState('');
    const[name, setname] = useState('');
    const[password, setpassword] = useState('');
    const[cpassword, setcpassword] = useState('');
    const[adminCode, setadminCode] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success , setsuccess] = useState();

    async function register(){
        if(password === cpassword){
            const admin = {
                name,
                email,
                password,
                cpassword,
                adminCode
            }
            
            try{
                setloading(true);
                const response = await axios.post('/api/admin/registeruseradmin' , admin).data;
                if (response.status === 201) {
                    alert('Admin registered successfully!');
                    history.push('/admin/login');
                 }
                } // Redirect to the login page after successful registration
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

export default Adminregistration;*/
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import Loader from "../components/Loader";
//import Error from "../components/Error";
//import Swal from 'sweetalert2';
import { Tabs } from 'antd';
import FarmersData from '../components/FarmersData'; // Import FarmersData component
import AddFarmers from '../components/AddFarmers'; // Import AddFarmers component
import Users from '../components/Users'; // Import Users component

function AdminScreen() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));

    if (current_user && current_user.isAdmin) {
      setIsAdmin(true);
    } else {
      window.location.href = '/admin-screen';
    }
  }, []);

  return (
    <div className='mt-3 ml-3 mr-3 bs'>
      <h1 style={{ fontSize: '60px' }}><b>Admin Panel</b></h1>
      {isAdmin ? (
        <Tabs defaultActiveKeys='1'>
          <Tabs.TabPane tab='Farmers Data' key='1'>
            <FarmersData />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Add Farmers' key='2'>
            <AddFarmers />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Users' key='3'>
            <Users />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </div>
  );
}

export default AdminScreen;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';

function Adminscreen() {
  
  const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('currentUser'));

        if (current_user && current_user.isAdmin) {
            setIsAdmin(true);
          } else {
            window.location.href = '/admin';
          }
        }, []);

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 style={{ fontSize: '60px' }}><b>Admin Panel</b></h1>
            {isAdmin ? (
                <Tabs defaultActiveKeys='1'>
                    <TabPane tab='FarmersData' key='1'>
                        <FarmersData />
                    </TabPane>
                    <TabPane tab='AddFarmers' key='2'>
                        <Addfarmers />
                    </TabPane>
                    <TabPane tab='Users' key='3'>
                        <Users />
                    </TabPane>
                </Tabs>
            ) : (
                <p>You are not authorized to view this page.</p>
              )}
        </div>
    )
}



//farmer data components

export function FarmersData() {

    const [farmersData, setFarmers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        fetchFarmers();
      }, []);

    const fetchFarmers = async () => {
        try {
            const response = await axios.get('/api/farmers/getallfarmers');
            const data = response.data;
            setFarmers(data);
            setloading(false);
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error);
        }
    };
    

    return (
        <div className='row'>
            <div className='col-md-12'>

                <h1>Farmers Data</h1>
                {loading && <Loader />}
                {farmersData.length>0 && (
                <p style={{ fontSize: '20px' }}><b>Total: {farmersData.length} Farmer Data</b></p>
              )}
                <table className='table table-bordered table-dark'>
                {error && (<Error />)}
                    <thead className='bs'>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Phone Number</th>
                            <th>Area Of Napier</th>
                            <th>Use Of Napier</th>
                            <th>Number Of Cows</th>
                            <th>Dung Produced in Kg</th>
                            <th>Amount Of Milk in Litre</th>
                            <th>Image Urls</th> 
                            <th>Description</th>
                            <th>Challenges</th>
                            <th>Interest In Training</th>
                            
                        </tr>

                    </thead>

                    <tbody>
                      
                        {farmersData.length && (farmersData.map(farmer => {
                            <tr key={farmer._id}>
                                <td>{farmer.Name}</td>
                                <td>{farmer.location}</td>
                                <td>{farmer.phoneNumber}</td>
                                <td>{farmer.areaOfNapier}</td>
                                <td>{farmer.useOfNapier}</td>
                                <td>{farmer.numberOfCows}</td>
                                <td>{farmer.dungProduced_inKg}</td>
                                <td>{farmer.amountOfMilk_inLitre}</td>
                                <td>{farmer.imageUrls}</td>
                                <td>{farmer.description}</td>
                                <td>{farmer.challenges}</td>
                                <td>{farmer.interestInTraining}</td>
                                
                                
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

//add farmers components

export function Addfarmers() {

    
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const[Name, setname] = useState('')
    const[location, setlocation] = useState()
    const[phoneNumber, setphoneNumber] = useState()
    const[areaOfNapier, setareaOfNapier] = useState()
    const[useOfNapier, setuseOfNapier] = useState()
    const[numberOfCows, setnumberOfCows] = useState()
    const[dungProduced_inKg, setdungProduced_inKg] = useState()
    const[amountOfMilk_inLitre, setamountOfMilk_inLitre] = useState()
    const[imageurl1, setimageurl] = useState()
    const[imageurl2, setimageur2] = useState()
    const[imageurl3, setimageur3] = useState()
    const[description, setdescription] = useState()
    const[challenges, setchallenges] = useState()
    const[interestInTraining, setinterestInTraining] = useState()
    const[password, setpassword] = useState()
    

    async function addFarmers(){

        const newfarmers ={
            Name,
            location,
            phoneNumber,
            areaOfNapier,
            useOfNapier,
            numberOfCows,
            dungProduced_inKg,
            amountOfMilk_inLitre,
            imageUrls : [imageurl1 , imageurl2 , imageurl3],
            description,
            challenges,
            interestInTraining,
            password
        }

        try{
            setloading(true);
            const response = await axios.post('/api/farmers/getallfarmers' , newfarmers)
            const result = response.data;
            console.log(result);
            
            setloading(false);
            Swal.fire('Congrats' , "Your new farmer is added successfully!" , 'success').then(result => {
                window.location.href = '/admin';
            })
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error);
            Swal.fire('Oops' , "Something went wrong!" , 'error');
        }
    };
    

    return (
        <div className='row'>
            
            <div className='col-md-5'>
            <h1>Add Farmers</h1>
            {loading && <Loader />}
            {error && (<Error />)}
                <input type='text' classname='form-control' placeholder='farmer name' 
                value={Name} onChange={(e) => {setname(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='location of farmer' 
                value={location} onChange={(e) => {setlocation(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='phone number' 
                value={phoneNumber} onChange={(e) => {setphoneNumber(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='area Of Napier' 
                value={areaOfNapier} onChange={(e) => {setareaOfNapier(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='use Of Napier' 
                value={useOfNapier} onChange={(e) => {setuseOfNapier(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='number Of Cows' 
                value={numberOfCows} onChange={(e) => {setnumberOfCows(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='dung produced in Kg' 
                value={dungProduced_inKg} onChange={(e) => {setdungProduced_inKg(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='amount of Milk in Litre' 
                value={amountOfMilk_inLitre} onChange={(e) => {setamountOfMilk_inLitre(e.target.value)}}
                />
                

            </div>

            <div className='col-md-5'>
            <input type='text' className='form-control' placeholder='description' 
                value={description} onChange={(e) => {setdescription(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 1' 
                value={imageurl1} onChange={(e) => {setimageurl(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 2' 
                value={imageurl2} onChange={(e) => {setimageur2(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 3' 
                value={imageurl3} onChange={(e) => {setimageur3(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='challenges' 
                value={challenges} onChange={(e) => {setchallenges(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='interest in training' 
                value={interestInTraining} onChange={(e) => {setinterestInTraining(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='password' 
                value={password} onChange={(e) => {setpassword(e.target.value)}}
                />

            <div className='text-right'>

                <button className='btn btn-primary mt-2' onClick={addFarmers}>Add Farmers</button>

            </div>
            </div>

        </div>
    )
}
    
//users list components


export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/getallusers');
        const data = response.data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        setError(error);
      }
    };
    const isAdmin = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser && currentUser.isAdmin;
      };
  
    return (
      <div className='row'>
        <div className='col-md-12'>
          <h1>Users</h1>
          {loading && <Loader />}
          {users.length > 0 && (
            <p style={{ fontSize: '20px' }}>
              <b>Total: {users.length} Users</b>
            </p>
          )}
          {isAdmin() && (
          <table className='table table-bordered table-dark'>
            {error && <Error />}
            <thead className='bs'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          {!isAdmin() && <p>You are not authorized to view this page.</p>}
        </div>
      </div>
    );
  }
  
  export default Adminscreen;
*/

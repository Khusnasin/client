import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';

function Adminscreen() {

    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('currentUser'));

        console.log(current_user);
        if (current_user.isAdmin) {
            window.location.href = '/admin';
        }

    }, []);
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 style={{ fontSize: '30px' }}><b>Admin Panel</b></h1>
            <Tabs defaultActiveKeys='1'>
                <TabPane tab='FarmersData' key='1'>
                    <FarmersData />
                </TabPane>
                <TabPane tab='AddFarmers' key='2'>
                    <AddFarmers />
                </TabPane>
                <TabPane tab='Users' key='3'>
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

//farmer data components

export function FarmersData() {

    const [farmers, setFarmers] = useState([]);
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
                {farmers.length && <p style={{ fontSize: '20px' }}><b>Total: {farmers.length} Farmer Data</b></p>}
                <table className='table table-bordered table-dark'>
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
                            <th>Challenges</th>
                            <th>Interest In Training</th>
                            <th>Password</th>
                        </tr>

                    </thead>

                    <tbody>
                        {farmers.length && (farmers.map(farmer => {
                            return <tr>
                                <td>{farmer.Name}</td>
                                <td>{farmer.location}</td>
                                <td>{farmer.phoneNumber}</td>
                                <td>{farmer.areaOfNapier}</td>
                                <td>{farmer.useOfNapier}</td>
                                <td>{farmer.numberOfCows}</td>
                                <td>{farmer.dungProduced_inKg}</td>
                                <td>{farmer.amountOfMilk_inLitre}</td>
                                <td>{farmer.imageUrls}</td>
                                <td>{farmer.challenges}</td>
                                <td>{farmer.interestInTraining}</td>
                                <td>{farmer.password}</td>
                                
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

//add farmers components

export function AddFarmers() {

    const [farmers, setFarmers] = useState([]);
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
                {farmers.length && <p style={{ fontSize: '20px' }}><b>Total: {farmers.length} Farmer Data</b></p>}
                <table className='table table-bordered table-dark'>
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
                            <th>Challenges</th>
                            <th>Interest In Training</th>
                            <th>Password</th>
                        </tr>

                    </thead>

                    <tbody>
                        {farmers.length && (farmers.map(farmer => {
                            return <tr>
                                <td>{farmer.Name}</td>
                                <td>{farmer.location}</td>
                                <td>{farmer.phoneNumber}</td>
                                <td>{farmer.areaOfNapier}</td>
                                <td>{farmer.useOfNapier}</td>
                                <td>{farmer.numberOfCows}</td>
                                <td>{farmer.dungProduced_inKg}</td>
                                <td>{farmer.amountOfMilk_inLitre}</td>
                                <td>{farmer.imageUrls}</td>
                                <td>{farmer.challenges}</td>
                                <td>{farmer.interestInTraining}</td>
                                <td>{farmer.password}</td>
                                
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}


    
//users list components

export function Users() {

    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    
    useEffect(() => {
        fetchUsers();
      }, []);


    const fetchUsers = async () => {
        
        try {
            const response = await axios.get('/api/users/getallusers');
            const data = response.data;
            setusers(data);
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

                <h1>Users</h1>
                {loading && <Loader />}
                {users.length && <p style={{ fontSize: '20px' }}><b>Total: {users.length} Users</b></p>}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Is Admin</th>
                        </tr>

                    </thead>

                    <tbody>
                        {users.length && (users.map(user => {
                            return <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}


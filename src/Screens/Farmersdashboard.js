import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

//import Swal from 'sweetalert2';

function Farmersdashboard() {
    const [farmer, setfarmer] = useState({});
    const [token, setToken] = useState('');
    const [Name, setname] = useState('');
    //const[email, setemail] = useState('');
    const [location, setlocation] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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

    const { farmerid } = useParams();

    const dropdownOptions = ['Sonapur', 'Khanapara', 'Byrnihut', 'Jorabaat'];
    const getfarmer = async () => {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }
        try {
            setloading(true);
            const { data } = await axios.post('/api/farmers/getfarmerbyid', { farmerid: farmerid });
            setfarmer(data);
            setloading(false);

        } catch (error) {
            console.log(error);
            seterror(true);
            setloading(false);
        }
    };


    useEffect(() => {

        getfarmer();

    }, []);


    useEffect(() => {
        console.log("farmer state:", farmer);
    }, [farmer]);


    async function onToken(token) {
        console.log(token);
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        const { _id, Name,
            location,
            phoneNumber,
            areaOfNapier,
            useOfNapier,
            numberOfCows,
            dungProduced_inKg,
            amountOfMilk_inLitre,
            imageUrls,
            description,
            challenges,
            interestInTraining,
        } = farmer;
        const farmerDetails = {
            farmer: {
                _id,
                Name,
                location,
                phoneNumber,
                areaOfNapier,
                useOfNapier,
                numberOfCows,
                dungProduced_inKg,
                amountOfMilk_inLitre,
                imageUrls,
                description,
                challenges,
                interestInTraining
            },
            userid: userData.data._id,
            token,
        };

        try {
            setloading(true);
            const result = await axios.post('/api/farmers/farmer-details', farmerDetails)
            setloading(false);
        }
        catch (error) {
            console.log(error)
            setloading(false);
        }
    }



    return (
        <div className="m-5">
            {loading ? (<Loader />) : (farmer ? (<div>
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-5">
                        <h1>{farmer.Name}</h1>
                        {farmer.imageUrls?.[0] && <img src={farmer.imageUrls[0]} className="bigimg" />}

                    </div>
                    <div className="col-md-5">
                        <h1>My Details</h1>
                        <hr />
                        <b>
                            <h1>Personal Info</h1>
                            <hr />
                            <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.Name} </p>
                            <p>Location : {farmer.location} </p>
                            <p>Phone-Number : {farmer.phoneNumber} </p>
                            <p>Area Of Napier : {farmer.areaOfNapier}</p>
                        </b>
                        <b>
                            <h1>Napier Info</h1>
                            <hr />
                            <p>Area Of Napier : {farmer.areaOfNapier}</p>
                            <p>Use Of Napier : {farmer.useOfNapier}</p>
                        </b>
                        <b>
                            <h1>Cows Info</h1>
                            <hr />
                            <p>Number Of Cows : {farmer.numberOfCows}</p>
                            <p>Amount of Dung Produced : {farmer.useOfNapier} kg</p>
                            <p>Amount Of Milk : {farmer.amountOfMilk_inLitre} Litre</p>
                        </b>
                        <div>
                            <b>
                                <h1>Others</h1>
                                <hr />
                                <p>Description : {farmer.description} </p>
                                <p>Challenges : {farmer.challenges}</p>
                                <p>interest In Training : {farmer.interestInTraining}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>



                            <button className="btn btn-primary" onClick={() => onToken()}>Edit</button>

                        </div>
                    </div>
                </div>

            </div>) : (<Error />))}
        </div>
    );
}
export default Farmersdashboard;
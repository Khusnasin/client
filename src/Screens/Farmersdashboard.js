import React, { useState } from "react";
import { useParams } from 'react-router-dom';
//import axios from "axios";
//import { Link } from 'react-router-dom';
import FarmerProfile from "../components/Farmersprofile";
import Loader from "../components/Loader";
import Error from "../components/Error";
//import moment from "moment";

//import Swal from 'sweetalert2';

function Farmersdashboard() {
    //const [farmer, setfarmer] = useState({});
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
//    const [success, setsuccess] = useState();
    
    const { farmerid } = useParams(); 
    return (
        <div className="m-5">

            {loading ? <Loader /> : error ? <Error /> : <FarmerProfile farmerid={farmerid} />}

        </div>
    );
}
export default Farmersdashboard;
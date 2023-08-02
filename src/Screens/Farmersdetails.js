import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useLocation } from "react-router-dom";
//import mongoose from "mongoose";


import { Types } from "mongoose";
import Loader from "../components/Loader";
import Error from "../components/Loader";

const mongoose = require('mongoose');

function FarmerDetails() {
    const [loading, setloading] = useState(false);
    const { farmerId } = useParams();
    const [farmer, setFarmer] = useState({});

    useEffect(() => {
    fetch(`/api/farmers/getfarmerbyid?farmerid=${farmerId}`)
      .then((response) => response.json())
      .then((data) => setFarmer(data))
      .catch((error) => console.error("Error fetching farmer details:", error));
  }, [farmerId]);
    
if (!farmer) {
    
    return <div>No farmer data available.</div>;
}
    return (
        <div >
            
            {loading ? (<Loader />) : (farmer ? (<div>
                <div className="row bs2">
                    <div className="col-md-3">



                    </div>
                    
                    <div className="col-md-5">
                    <h1>{farmer.Name}'s Details</h1>
                        
                        <hr className="line"></hr>
                        <b>
                            <h2>Personal Info</h2>
                            <hr className="line"></hr>
                            <p>Name :
                                {farmer.Name}
                            </p>
                            <p>Location : 
                                <span>{farmer.location}</span>
                            </p>
                            <p>Phone-Number : 
                                <span>{farmer.phoneNumber} </span>
                            </p>
                            
                            <h2>Napier Info</h2>
                            <hr className="line"></hr>
                            <p>Area Of Napier : 
                                <span>{farmer.areaOfNapier}</span>
                            
                            </p>
                        </b>
                        <b>
                            <p>Use Of Napier : 
                                <span>{farmer.useOfNapier}</span>
                            
                            </p>
                        </b>
                        <b>
                            <h2>Cows Info</h2>
                            <hr className="line"></hr>
                            <p>Number Of Cows : 
                                <span>{farmer.numberOfCows}</span>
                            
                            </p>
                            <p>Amount of Dung Produced : 
                                <span>{farmer.dungProduced_inKg} kg</span>
                            
                             </p>
                            <p>Amount Of Milk : 
                                <span>{farmer.amountOfMilk_inLitre} Litre</span>
                            
                            </p>
                        </b>
                        <div>
                            <b>
                                <h2>Others</h2>
                                <hr className="line"></hr>
                                <p>Description :
                                    <span> {farmer.description}</span>
                                
                                 </p>
                                <p>Challenges : 
                                    <span>{farmer.challenges}</span>
                                
                                </p>
                                <p>interest In Training : 
                                    <span> {farmer.interestInTraining ? "Yes" : "No"}</span>
                                
                                </p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                        </div>
                    </div>
                </div>

            </div>) : (<Error />))}

            
        </div>
    );
}


export default FarmerDetails;

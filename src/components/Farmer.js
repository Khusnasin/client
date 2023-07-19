import React, { useState } from "react";
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";



function Farmer({ farmer}) {
    const [show, setShow] = useState(false);
    const { Name, location, phoneNumber, imageUrls } = farmer;
    //const handleShow = () => setShow(true);

    return (

       
            
            <div className="col-md-6">
                 <div className="row bs2">
                <img src={farmer.imageUrls[0]} className="smallimg" />
                <hr className="line" style={{marginTop:'10px'}}></hr>
                <h1>{farmer.Name}</h1>
                <b>
                    <p>Location  : {farmer.location}</p>
                    <p>Phone Number : {farmer.phoneNumber}</p>
                    
                </b>
                <div style={{ float: "right" }}>
                    
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>


        </div>
        
    )
}

export default Farmer

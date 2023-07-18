import React, { useState } from "react";
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";



function Farmer({ farmer}) {
    const [show, setShow] = useState(false);

    //const handleShow = () => setShow(true);

    return (

        <div className="row bs">
            <div className="col-md-4">
                <img src={farmer.imageUrls[0]} className="smallimg" />
                <hr className="line"></hr>
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

import React, { useState } from "react";
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";



function Farmer({ farmer}) {
    const [show, setShow] = useState(false);
    const { Name, location, phoneNumber, imageUrls } = farmer;
    //const handleShow = () => setShow(true);

    return (

       
            
            <div className="col-md-10">
                 
                
                
                <h3>{farmer.Name}</h3>
                <b>
                    <p>Location  : {farmer.location}</p>
                    <p>Phone Number : {farmer.phoneNumber}</p>
                    <button className="btn btn-primary" >View Details</button>
                    
                </b>
                
            


        </div>
        
    )
}

export default Farmer;

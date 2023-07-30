/*import React, { useState, useEffect } from "react";
import axios from "axios";
import Farmersregistratration from "../Screens/Farmersregistration";
//import { ObjectId } from "mongodb";

function Update() {
    const [farmerData, setFarmerData] = useState(null);
    const [loading, setLoading] = useState(true);

    //const objectIdFarmerId = ObjectId(farmerid);
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const farmerid = userData.data._id;
    const fetchFarmerData = async () => {
        try {
            const response = await axios.get("/api/farmers/getfarmerbyid?farmerid=${farmerid}");
            const fetchedData = response.data;
            setFarmerData(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFarmerData();
    }, []);

    const handleUpdate = async (updatedData) => {
        try {
            await axios.put(`/api/farmers/updatefarmer/${farmerData._id}`, updatedData);
            fetchFarmerData();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };


    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Farmersregistratration farmer={farmerData} />
                    <button onClick={() => handleUpdate({ Name: "Updated Name" })}>Update Data</button>
                </div>
            )}
        </div>
    );
}

export default Update;
*/
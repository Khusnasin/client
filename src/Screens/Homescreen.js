import React, { useState, useEffect } from 'react'
import axios from "axios";
import Room from "../components/Farmer";
import Loader from "../components/Loader";
import Error from '../components/Error';

import moment from 'moment';


function Homescreen() {
    const [farmers, setfarmers] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [duplicatefarmers, setduplicatefarmers] = useState([]);

    const [searchkey, setsearchkey] = useState('');
    const [location, setlocation] = useState('all');

    const getfarmers = async () => {
        setloading(true);
        const { data } = await axios.get('/api/farmers/getallfarmers');
        setfarmers(data);
        setduplicatefarmers(data);
        setloading(false);
    }
    useEffect(() => {
        try {

            getfarmers(farmers);

        } catch (error) {
            seterror(true);
            console.log(error);
            setloading(false);
        }


    }, []);

    function filterBySearch() {
        const tempfarmers = duplicatefarmers.filter(farmer => farmer.name.toLowerCase().includes(searchkey.toLowerCase()));
        setfarmers(tempfarmers);
    }

    function filterByLocation(e) {
        setlocation(e);
        if (e !== 'all') {
            const tempfarmers = duplicatefarmers.filter(farmer => farmer.location.toLowerCase() === e.toLowerCase());
            setfarmers(tempfarmers);
        }
        else {
            setfarmers(duplicatefarmers);
        }

    }

    return (

        <div className='container'>
            <div className='row mt-5 bs'>
                <div className='col-md-5'>
                    <input type="text" className='form-control' placeholder='search farmers'
                        value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
                    />
                </div>
                <div className='col-md-3'>
                    <select className='form-control' value={location} onChange={(e) => { filterByLocation(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Khanapara</option>
                        <option value="non-delux">Sonapur</option>
                        <option value="non-delux">byrnihut </option>
                        <option value="non-delux">jorabaat</option>
                    </select>
                </div>
            </div>

        </div>

    );
}

export default Homescreen;
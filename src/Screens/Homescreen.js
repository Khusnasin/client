import React, { useState, useEffect } from 'react'
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import Room from "../components/Mappopup";
import Loader from "../components/Loader";
import Error from '../components/Error';

import moment from 'moment';
import Farmer from '../components/Farmer';


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
        const tempfarmers = duplicatefarmers.filter(farmer =>  farmer.Name.toLowerCase().includes(searchkey.toLowerCase()));
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

    const calculateAverageLocation = () => {
        if (farmers.length === 0) {
          return [26.1158, 91.7086];
        }
    
        const sumLat = farmers.reduce((total, farmer) => total + farmer.latitude, 0);
        const sumLng = farmers.reduce((total, farmer) => total + farmer.longitude, 0);
        const avgLat = sumLat / farmers.length;
        const avgLng = sumLng / farmers.length;
    
        return [avgLat, avgLng];
      };

    return (

        <div className='container'>
            <div className='row mt-4 bs'>
                <div className='col-md-5'>
                    <input type="text" className='form-control' placeholder='search farmers'
                        value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
                    />
                </div>
                <div className='col-md-3'>
                    <select className='form-control' value={location} onChange={(e) => { filterByLocation(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="khanapara">Khanapara</option>
                        <option value="sonapur">Sonapur</option>
                        <option value="byrnihut">Byrnihut </option>
                        <option value="jorabaat">Jorabaat</option>
                    </select>
                </div>
            </div>
            <div className='row mt-10 bs'>
                {loading ? (<Loader />) :
                    <MapContainer
                    center={calculateAverageLocation()}
                    zoom={8}
                    style={{ height: '400px', width: '100%', marginTop: '25px' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution=""
                        />
                        {duplicatefarmers.map(farmer => (
                            <Marker key={farmer._id} 
                            position={[farmer.latitude, farmer.longitude]}
                            icon={new L.Icon({ 
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                              })}
                            >
                                <Popup>
                                    <Room farmer={farmer} />
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>}

            </div>
            <div className="row justify-content-center mt-10 bs3">
                {loading ? (<Loader />) : (farmers.map(farmer => {
                    return <div className="col-md-9 mt-2">
                        <Farmer farmer={farmer} />
                    </div>;
                }))}

            </div>

        </div>




    );
}

export default Homescreen;
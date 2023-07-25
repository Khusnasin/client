import React, { useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';

function AddFarmers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    location: '',
    phoneNumber: '',
    areaOfNapier: '',
    useOfNapier: '',
    numberOfCows: '',
    dungProduced_inKg: '',
    amountOfMilk_inLitre: '',
    imageurl1: '',
    imageurl2: '',
    imageurl3: '',
    description: '',
    challenges: '',
    interestInTraining: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addFarmers = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/farmers/getallfarmers', formData);
      const result = response.data;
      console.log(result);
      setLoading(false);
      Swal.fire('Congrats', "Your new farmer is added successfully!", 'success').then(result => {
        window.location.href = '/admin';
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire('Oops', "Something went wrong!", 'error');
    }
  };

  return (
    <div className='row'>
      <div className='col-md-5'>
        <h1>Add Farmers</h1>
        {loading && <Loader />}
        {error && (<Error />)}
        <div>
        <label>Name:</label>
        <input type='text' className='form-control' placeholder='farmer name'
          name='Name' value={formData.Name} onChange={handleChange}
        />
        </div>
        <div>
        <label>Location:</label>
        <input type='text' className='form-control' placeholder='location of farmer'
          name='location' value={formData.location} onChange={handleChange}
        />
        </div>
        <div>
        <label>Phone Number:</label>
        <input type='text' className='form-control' placeholder='phone number'
          name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}
        /> 
        </div>
        <div>
        <label>Area Of Napier:</label>
        <input type='text' className='form-control' placeholder='area Of Napier' 
         name='areaOfNapier' value={formData.areaOfNapier} onChange={handleChange}
        />
        </div>
        <div>
        <label>Use Of Napier:</label>
        <input type='text' className='form-control' placeholder='use Of Napier' 
        name='useOfNapier' value={formData.useOfNapier} onChange={handleChange}
        />
        </div>
        <div>
        <label>Number Of Cows:</label>
        <input type='text' className='form-control' placeholder='number Of Cows' 
        name='numberOfCows' value={formData.numberOfCows} onChange={handleChange}
        />

        </div>
        <div>
        <label>Dung Produced in Kg:</label>
        <input type='text' className='form-control' placeholder='dung produced in Kg' 
        name='dungProduced_inKg' value={formData.dungProduced_inKg} onChange={handleChange}
        />
        </div>
        <div>
        <label>Amount Of Milk in Litre:</label>
        <input type='text' className='form-control' placeholder='amount of Milk in Litre' 
        name='amountOfMilk_inLitre' value={formData.amountOfMilk_inLitre} onChange={handleChange}
        />
        </div>
        </div>
        <div className='col-md-5'>
        <div>
        <label>Image Urls 1:</label>
        <input type='text' className='form-control' placeholder='description' 
            name='imageurl1'  value={formData.imageurl1} onChange={handleChange}
             />
        </div>
        <div>
        <label>Image Urls 2:</label>
        <input type='text' className='form-control' placeholder='image URL 1' 
            name='imageurl2' value={formData.imageurl2} onChange={handleChange}
            />
        </div>
        <div>
        <label>Image Urls3:</label>
        <input type='text' className='form-control' placeholder='image URL 2' 
           name='imageurl2' value={formData.imageurl2} onChange={handleChange}
             />
        </div>
        <div>
        <label>Description:</label>
        <input type='text' className='form-control' placeholder='description' 
            name='description'  value={formData.description} onChange={handleChange}
             />
        </div>
        <div>
        <label>Challenges:</label>
        <input type='text' className='form-control' placeholder='challenges' 
            name='challenges' value={formData.challenges} onChange={handleChange}
            />
        </div>
        <div>
        <label>Interest In Training:</label>
        <input type='text' className='form-control' placeholder='interest in training' 
            name='interestInTraining' value={formData.interestInTraining} onChange={handleChange}
           />
        </div>
               
        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={addFarmers}>Add Farmers</button>
        </div>
      </div>
    </div>
  );
}

export default AddFarmers;

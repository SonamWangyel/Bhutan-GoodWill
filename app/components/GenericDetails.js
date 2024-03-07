import React, { useState } from 'react';

const GenericDetails = () => {
    const [GenericName, setGenersicName] = useState('');
    const [GenericDetails, setGenericDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchGenericDetails = async () => {
        try {
            const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${GenereicName}&limit=1`;
            const response = await fetch(url)
            const API_KEY=process.env.local
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data.results.length === 0) {
                throw new Error(`No medicine found with the name ${GenereicName}`);
            }
            setGenericDetails(data.results[0]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchGenericDetails();
    };

    return (
        <div className='px-3 '>
            <form onSubmit={handleSubmit}>
                <input className= ' bg-transparent px-4 text-white border-2 rounded-full mr-2 mt-3'
                    type="text"
                    placeholder="Enter medicine name..."
                    value={GenericName}
                    onChange={(e) => setGenersicName(e.target.value)}
                />
                <button className='px-4 border-solid rounded-full bg-emerald-300 mt-2' 
                type="submit">search</button>
            </form>
            {error && <p>Error: {error}</p>}
            {GenericDetails && (
                <div>
                    <h2 className=' px-3'>Medicine Details</h2>
                    <p className=' px-3'><span className='font-bold'>Brand Name:</span> {GenericDetails.openfda.brand_name}</p>
                    <p className=' px-3'><span className='font-bold'>Generic Name:</span> {GenericDetails.openfda.generic_name}</p>
                    <p className='px-3'><span className='font-bold'>Indications and Usage:</span> {GenericDetails.indications_and_usage}</p>
                    <p className='px-3'><span className='font-bold'>Active Ingredient:</span> {GenericDetails.active_ingredient}</p>
                    <p className=' px-3'><span className='font-bold'>Directions-1:</span> {GenericDetails.dosage_and_administration}</p>
                    <p className=' px-3'><span className='font-bold'>Directions-2:</span> {GenericDetails.do_not_use}</p>
                    <p className='px-3'><span className='font-bold'>Precaution:</span> {GenericDetails.keep_out_of_reach_of_children}</p>
                </div>
            )}
        </div>
    )
}

export default GenericDetails;

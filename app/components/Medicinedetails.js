import React, { useState } from 'react';

const MedicineDetails = () => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDetails, setMedicineDetails] = useState(null);
    const [error, setError] = useState('');

    const apiKey = process.env.API_KEY

    const fetchMedicineDetails = async () => {
        try {
            const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}&limit=1&api_key=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Medicine details:', data);
            if (data.results.length === 0) {
                throw new Error(`No medicine found with the name ${medicineName}`);
            }
            setMedicineDetails(data.results[0]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMedicineDetails();
    };

    return (
        <div className='px-3'>
        <form onSubmit={handleSubmit}>
            <input className=' px-4 text-black border-solid rounded-full mr-2'
                type="text"
                placeholder="Enter medicine name..."
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
            />
            <button className='px-4 border-solid rounded-full bg-emerald-300 mt-2' 
            type="submit">search</button>
        </form>
        {error && <p>Error: {error}</p>}
        {medicineDetails && (
            <div>
                <h2 className=' px-3'>Medicine Details</h2>
                <p className=' px-3'><span className='font-bold'>Brand Name:</span> {medicineDetails.openfda.brand_name}</p>
                <p className=' px-3'><span className='font-bold'>Generic Name:</span> {medicineDetails.openfda.generic_name}</p>
                <p className='px-3'><span className='font-bold'>Indications and Usage:</span> {medicineDetails.indications_and_usage}</p>
                <p className='px-3'><span className='font-bold'>Active Ingredient:</span> {medicineDetails.active_ingredient}</p>
                <p className=' px-3'><span className='font-bold'>Directions-1:</span> {medicineDetails.dosage_and_administration}</p>
                <p className=' px-3'><span className='font-bold'>Directions-2:</span> {medicineDetails.do_not_use}</p>
                <p className='px-3'><span className='font-bold'>Precaution:</span> {medicineDetails.keep_out_of_reach_of_children}</p>
            </div>
        )}
    </div>
    )
}

export default MedicineDetails;

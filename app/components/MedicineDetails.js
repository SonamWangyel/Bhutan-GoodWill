import React, { useState } from 'react';

const MedicineDetails = () => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDetails, setMedicineDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchMedicineDetails = async () => {
        try {
            const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}&limit=1`;
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
        <div>
            <form onSubmit={handleSubmit}>
                <input className='text-black px-8 border-solid rounded-full'
                    type="text"
                    placeholder="Enter medicine name..."
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                />
                <button className='px-4 border-solid rounded-full bg-emerald-300' 
                type="submit">Get Medicine Details</button>
            </form>
            {error && <p>Error: {error}</p>}
            {medicineDetails && (
                <div>
                    <h2>Medicine Details</h2>
                    <p>Brand Name: {medicineDetails.openfda.brand_name}</p>
                    <p>Generic Name: {medicineDetails.openfda.generic_name}</p>
                    <p>Manufacturer: {medicineDetails.openfda.manufacturer_name}</p>
                    <p>Indications and Usage: {medicineDetails.indications_and_usage}</p>
                    <p>Active Ingredient: {medicineDetails.active_ingredient}</p>
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;

import React, { useState } from 'react';

const GenericDetails = () => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDetails, setMedicineDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchMedicineDetails = async () => {
        try {
            const urlGeneric = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${medicineName}&limit=1`;

            const responseGeneric = await fetch(urlGeneric);

            const dataGeneric = await responseGeneric.json();

            console.log('Generic Medicine details:', dataGeneric);

            const genericDetails = dataGeneric.results.length > 0 ? dataGeneric.results[0] : null;

            if (!genericDetails) {
                throw new Error(`No medicine found with the generic name ${medicineName}`);
            }

            setMedicineDetails(genericDetails);
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
                <input
                    className='bg-transparent px-4 text-black border-2 rounded-full mr-2'
                    type="text"
                    placeholder="Enter medicine name..."
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                />
                <button
                    className='px-4 border-solid rounded-full bg-emerald-300 mt-2'
                    type="submit"
                >
                    Search
                </button>
            </form>
            {error && <p>Error: {error}</p>}
            {medicineDetails && (
                <div>
                    <h2 className='px-3'>Details</h2>
                    <p className='px-3'><span className='font-bold'>Brand Name:</span> {medicineDetails.openfda?.brand_name || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Indications and Usage:</span> {medicineDetails.indications_and_usage || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Active Ingredient:</span> {medicineDetails.active_ingredient || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Directions-1:</span> {medicineDetails.dosage_and_administration || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Directions-2:</span> {medicineDetails.do_not_use || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Precaution:</span> {medicineDetails.keep_out_of_reach_of_children || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default GenericDetails;
import React, { useState } from 'react';

const MedicineDetails = () => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDetails, setMedicineDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchMedicineDetails = async () => {
        try {
            const urlBrand = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}&limit=1`;
            const urlGeneric = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${medicineName}&limit=1`;

            const responseBrand = await fetch(urlBrand);
            const responseGeneric = await fetch(urlGeneric);

            const dataBrand = await responseBrand.json();
            const dataGeneric = await responseGeneric.json();

            console.log('Brand Medicine details:', dataBrand);
            console.log('Generic Medicine details:', dataGeneric);

            const brandDetails = dataBrand.results.length > 0 ? dataBrand.results[0] : null;
            const genericDetails = dataGeneric.results.length > 0 ? dataGeneric.results[0] : null;

            if (!brandDetails && !genericDetails) {
                throw new Error(`No medicine found with the name ${medicineName}`);
            }

            setMedicineDetails({ brandDetails, genericDetails });
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
                    <h2 className='px-3'>Medicine Details</h2>
                    {medicineDetails.brandDetails && (
                        <>
                            <p className='px-3'><span className='font-bold'>Brand Name:</span> {medicineDetails.brandDetails.openfda?.brand_name || 'N/A'}</p>                        </>
                    )}
                    <p className='px-3'><span className='font-bold'>Indications and Usage:</span> {medicineDetails.brandDetails?.indications_and_usage || medicineDetails.genericDetails?.indications_and_usage || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Active Ingredient:</span> {medicineDetails.brandDetails?.active_ingredient || medicineDetails.genericDetails?.active_ingredient || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Directions-1:</span> {medicineDetails.brandDetails?.dosage_and_administration || medicineDetails.genericDetails?.dosage_and_administration || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Directions-2:</span> {medicineDetails.brandDetails?.do_not_use || medicineDetails.genericDetails?.do_not_use || 'N/A'}</p>
                    <p className='px-3'><span className='font-bold'>Precaution:</span> {medicineDetails.brandDetails?.keep_out_of_reach_of_children || medicineDetails.genericDetails?.keep_out_of_reach_of_children || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;

import React, { useState } from 'react'

const TobaccoDetails = () => {
    const [productName, setProductName] = useState('')
    const [productDetails, setProductDetails] = useState(null)
    const [error, setError] = useState('')

    const fetchProductDetails = async () => {
        try {
            const url = `https://api.fda.gov/tobacco/problem.json?search=tobacco_products.exact:${productName}&limit=1`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            console.log('Tobacco product details:', data);
            if (data.results.length === 0) {
                throw new Error(`No tobacco product found with the name ${productName}`)
            }
            setProductDetails(data.results[0])
        } catch (error) {
            setError(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchProductDetails()
    }

    return (
        <div className='px-3'>
            <form onSubmit={handleSubmit}>
                <input
                    className='bg-transparent px-4 text-black border-2 rounded-full mr-2'
                    type="text"
                    placeholder="Enter tobacco product name..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <button className='px-4 border-solid rounded-full bg-emerald-300' 
                type="submit">Search</button>
            </form>
            {error && <p>Error: {error}</p>}
            {productDetails && (
                <div>
                    <h2 className='px-3'>Tobacco Product Details</h2>
                    <p className='px-3'>Non User Affected: {productDetails.nonuser_affected}</p>
                    <p className='px-3'>health problems:{productDetails.reported_health_problems}</p>
                </div>
            )}
        </div>
    )
}

export default TobaccoDetails;

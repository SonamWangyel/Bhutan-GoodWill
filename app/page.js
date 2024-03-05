"use client"
import React,{useState} from 'react';
import MedicineDetails from './components/MedicineDetails';

const Home = () => {
    return (
        <div>
            <h1 className='py-2 px-3'>Medicine Details </h1>
            <MedicineDetails />
        </div>
    );
};

export default Home;

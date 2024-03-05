"use client"
import React,{useState} from 'react';
import MedicineDetails from './components/MedicineDetails';

const Home = () => {
    return (
        <div>
            <h1 className='py-2'>Medicine Details App</h1>
            <MedicineDetails />
        </div>
    );
};

export default Home;
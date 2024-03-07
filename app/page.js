"use client"
import React,{useState} from 'react';
import MedicineDetails from './components/MedicineDetails';
import  Navbar  from './components/Navbar';

const Home = () => {
    return (
        <div className="bg-cyan-700 min-h-screen">
            <Navbar />
            <h1 className='py-2 px-3 border-b-2 border-gray-700 '>Medicine Details </h1>
            <MedicineDetails />
        </div>  
    );
};

export default Home;
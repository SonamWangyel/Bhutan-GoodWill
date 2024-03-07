"use client"
import React,{useState} from 'react';
import MedicineDetails from './components/MedicineDetails';
import Navbar from './components/Navbar';

const Home = () => {
    return (
        <div className='bg-gradient-conic mt-5 min-h-screen'>
        <div className='sticky top-0'>        
         <Navbar />
        </div>
             <h1 className='px-3 mt-3'>Medicine Details </h1>
            <MedicineDetails />
        </div>
    );
};

export default Home;

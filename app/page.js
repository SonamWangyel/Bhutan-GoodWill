"use client"
import React,{useState} from 'react';
import MedicineDetails from './components/GenereicName';
import Navbar from './components/Navbar';

const Home = () => {
    return (
        <div className='gradient-conic'>
         <Navbar/>
            <h1 className='py-2 px-3'>Medicine Details </h1>
            <MedicineDetails />
        </div>
    );
};

export default Home;
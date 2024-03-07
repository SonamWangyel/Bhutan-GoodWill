"use client"
import React,{useState} from 'react';
import TobaccoDetails from '../components/TobaccoDetails';
import Navbar from '../components/Navbar';
import 'flowbite'
const Home = () => {
    return (
        <div className='bg-gradient-conic mt-3 min-h-screen'>
        <Navbar/>
            <h1 className='py-2 px-3'>Tobacco Details</h1>
            <TobaccoDetails />
        </div>
    );
};

export default Home;

"use client"
import React,{useState} from 'react';
import GenericDetails from '../components/GenericName';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="bg-cyan-700 min-h-screen">
            <Navbar/>
            <h1 className='py-2 px-3'>Generic Name Details </h1>
            <GenericDetails />
        </div>
    );
};

export default Home;
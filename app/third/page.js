"use client"
import React,{useState} from 'react';
import GenericDetails from '../components/GenericDetails';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className='bg-gradient-conic mt-5 min-h-screen'>
        <div className='sticky top-0'>        
         <Navbar />
        </div>
             <h1 className='px-3 mt-3'>Generic Details </h1>
            <GenericDetails />
        </div>
    );
};

export default Home;

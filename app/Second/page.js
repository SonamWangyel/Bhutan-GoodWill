"use client"
import {useState} from 'react';
import TobaccoDetails from '../components/TobaccoDetails';
import 'flowbite'
import  Navbar  from '../components/Navbar';

const Home = () => {
    return (
        <div className="bg-cyan-700 min-h-screen">
              <Navbar />
              <h1 className='py-2 px-3 border-b-2 border-gray-700 '>Tobacco Details</h1>
            <TobaccoDetails />
        </div>
    );
};

export default Home;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import CinemaListings from './components/cinemalist';


const Cinemas = () => {
  return (

    <>
      <Navbar />
      <CinemaListings/>
      <Footer /> 
    </>
  );
};

export default Cinemas;
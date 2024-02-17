import React from 'react';
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ContactForm } from '../../components/contactForm/ContactForm';
import './Contact.css';

function Contact() {
  return (
    <div className='bg-[#ffffff]'>
      <Navbar />
      <ContactForm />
      <Footer />
      
    </div>
  );
}
export default Contact;
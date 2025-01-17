// ContactForm.jsx
import React from 'react';
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import emailjs from "emailjs-com";
import Img from './FormImg.png';
import './ContactForm.css';

export function SendEmail(e) {
  e.preventDefault();

  emailjs.sendForm('gmailService', 'template_vs69uga', e.target, 'A5EmjSGkV-RxUQVop')
    .then((result) => {
      console.log(result.text);
      window.alert("Your Message was successfully sent to CITY MOVIE Team!")
    }, (error) => {
      console.log(error.text);
    });
  e.target.reset()
}

export function ContactForm() {
  return (
    <div className="FormBody bg-[#ffffff] p-6 flex flex-col justify-center items-center">
      <div className="Content flex justify-center">
        <div className="ImageContainer">
          <img src={Img} alt="illustration mt-16" />
        </div>
        <div className="FormContainer">
          <h1>Get in Touch</h1>
          <h3>
            For further inquiries, contact CITY MOVIE team directly! We will reply to you as soon as possible.
          </h3>
          <br />
          <form id="form" onSubmit={SendEmail} className='grid gap-y-2'>
            <h3>Username</h3>
            <input required name="name" id="name" type="text" placeholder="Username" className='pl-3 pt-2 pb-2 rounded-xl' />
            <h3>Email</h3>
            <input required name="email" id="email" type="text" placeholder="Email" className='pl-3 pt-2 pb-2 rounded-xl' />
            <h3>Subject</h3>
            <input required name="subject" id='subject' type="text" placeholder='Subject' className='pl-3 pt-2 pb-2 rounded-xl' />
            <h3>Message</h3>
            <textarea required name="message" id="message" type="text" placeholder='Message' className='pl-3 pt-2 pb-2 rounded-xl' />
            <button id="submit" type="submit" value="Send message"
              className='btn'>Send</button >
          </form>
          <div className="IconsList">
            <BsTwitter className="Icon" />
            <BsInstagram className="Icon" />
            <FaFacebookF className="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

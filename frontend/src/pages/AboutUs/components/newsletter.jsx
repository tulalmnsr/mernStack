import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { Modal, Button } from 'react-bootstrap';

function NewsletterForm() {
  useEffect(() => {
    emailjs.init('3AD48qA0GRO7IYhFp');
  }, []);

  const [showModal, setShowModal] = useState(false);

  const SendEmail = (e) => {
    e.preventDefault();
    const recipientEmail = e.target.to_email.value;
    console.log("Recipient email:", recipientEmail);

    emailjs
      .sendForm('service_zuyor9p', 'template_81gbc95', e.target)
      .then(
        (result) => {
          console.log(result.text);
          setShowModal(true); 
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="bg-purple-300 h-full">
      <div className="flex justify-center items-center h-full">
        <div className="newsletter-form rounded-lg p-6 flex items-center ">
          <h2 className="text-lg font-semibold mr-6">Join Our Newsletter</h2>
          <form className="flex" onSubmit={SendEmail}>
            <input
              type="email"
              name="to_email" 
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-5 py-2.5 mr-2"
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for subscribing to our newsletter. You will receive the latest updates soon.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewsletterForm;

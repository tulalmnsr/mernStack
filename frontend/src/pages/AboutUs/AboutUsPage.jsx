import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import About from './components/about';
import History from './components/history';
import Partners from './components/partner';
import NewsletterForm from './components/newsletter'; 
import './App.css';

const AboutUsPage  = () => {
  return (
    <div>
<Navbar />
      <About />
      <History />
      <Partners />
      <NewsletterForm />
      <Footer />
    </div>
  );
};

export default AboutUsPage ;

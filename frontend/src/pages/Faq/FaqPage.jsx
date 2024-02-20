import Faqs from "./components/Faq";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { TopEdge } from "../../components/TopEdge";

import './FaqPage.css'

const faqsList = [
    {
      id: 0,
      questionText: 'Can I use my ATM debit card to purchase e-tickets?',
      answerText:
        ' It depends on the bank that you are banking with. Some do have the facility,  but most banks in Lebanon don t facilitate online purchases using debit cards.',
    },
    {
      id: 1,
      questionText: 'What movie rating system is in practice in Lebanon?',
      answerText:
        ' Films exhibited in Lebanon are rated by the Lebanese Censorship Board. The ratings categories are as follows: G Intended for General Audiences. All ages are admitted. PG Parental Guidance is suggested. PG13 Children under 13 years of age will not be admitted. PG16 Persons under 16 years of age will not be admitted. 18+ Persons under 18 years of age will not be admitted..',
    },
    {
      id: 2,
      questionText:
        'What is Digital Cinema?',
      answerText:
        'Digital Cinema is a technology which was introduced in recent years, whereby the traditional 35mm film is replaced by an electronic copy contained on a storage device. This technology has spread quickly throughout the cinema industry. The advantage of having a digital cinema is the pixel-perfect image and superior quality of sound. In addition, 3D images in digital format are better, faster, and more reliable to run. Grand Cinemas was the first cinema chain to introduce digital technology in the region and to digitise all its projectors.',
    },
    {
      id: 3,
      questionText: 'A When do you update the online movie schedule?',
      answerText:
        'All movie information, including new releases and schedules, are updated every Wednesday evening of each week. Theses schedules will reflect the show times from Thursday to the following Wednesday of the week.',
    },
];

const FaqPage = () => (
  <>
  <TopEdge />
    <Navbar />
    <Faqs faqsList={faqsList} />
    <Footer />
  </>
);

export default FaqPage;

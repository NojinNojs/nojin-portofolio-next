import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Certificates from '../components/Certificates';
import Projects from '../components/Projects';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
  <div className="min-h-screen">
    <Header />
    <main className="max-w-screen-xl mx-auto">
      <Hero />
      <About />
      <Certificates />
      <Projects />
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Contact />
      </GoogleReCaptchaProvider>
    </main>
    <Footer />
  </div>
);

export default Home;

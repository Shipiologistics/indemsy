import Hero from './components/Hero/Hero';
import TrustBadges from './components/TrustBadges/TrustBadges';
import CompensationSlider from './components/CompensationSlider/CompensationSlider';
import Disruptions from './components/Disruptions/Disruptions';
import HowItWorks from './components/HowItWorks/HowItWorks';
import FeeSection from './components/FeeSection/FeeSection';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';
import PreFooter from './components/PreFooter/PreFooter';
import StickyCTA from './components/StickyCTA/StickyCTA';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <Hero />
      <TrustBadges />
      <CompensationSlider />
      <Disruptions />
      <HowItWorks />
      <FeeSection />
      <Testimonials />
      <FAQ />
      <PreFooter />
      <StickyCTA />
    </div>
  );
}


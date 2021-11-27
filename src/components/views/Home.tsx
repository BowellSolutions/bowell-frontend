import {FC} from "react";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import HeaderSection from "./home/HeaderSection";
import WelcomeSection from "./home/WelcomeSection";
import DoctorSection from "./home/DoctorSection";
import PatientSection from "./home/PatientSection";
import MobileSection from "./home/MobileSection";
import FeaturesSection from "./home/FeaturesSection";
import MoreSection from "./home/MoreSection";
import CTA from "./home/CallToActionSection";

const Home: FC = () => {
  return (
    <>
      <ScrollToTopButton/>

      <HeaderSection/>

      <WelcomeSection/>

      <DoctorSection/>

      <PatientSection/>

      <MobileSection/>

      <FeaturesSection/>

      <MoreSection/>

      <CTA/>
    </>
  );
};

export default Home;

/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports Home component used in home route. Homepage consists of multiple sections:
 * - Header
 * - Welcome
 * - Doctor
 * - Patient
 * - Mobile
 * - Features
 * - More
 * - Call to action
 * and floating "Scroll to top button"
 **/
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

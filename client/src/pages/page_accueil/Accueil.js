import React, { useState } from 'react'
import Dropdown from '../../components/PageAccueil/Dropdown';
import Hero from '../../components/PageAccueil/Hero';
import InfoSection from '../../components/PageAccueil/InfoSection';
import NavBar from '../../components/PageAccueil/NavBar';
import { InfoData } from '../../data/InfoData';
import { SliderData } from '../../data/SliderData';
import GlobalStyle from './globalStyles';
import LeftNav from '../../components/LeftNav';
import Footer from '../../components/PageAccueil/Footer';

export const Accueil = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
        <GlobalStyle />
        <NavBar toggle={toggle}/>
        <Dropdown isOpen={isOpen} toggle={toggle}/>
        <Hero slides={SliderData}/>
        <LeftNav/>
        <InfoSection {...InfoData}/>
        <Footer />
      </>
    )
}

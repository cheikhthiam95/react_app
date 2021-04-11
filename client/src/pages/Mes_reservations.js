import React, { useState } from "react";
import ThreadClient from "../components/ThreadClient";
import Dropdown from '../components/PageAccueil/Dropdown';
import NavBar from '../components/PageAccueil/NavBar';


const Mes_reservations = () => {
  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

 
  return (
    <>
    <NavBar toggle={toggle}/>
    <Dropdown isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}}>
      <div className="row">
        <div className="col-12">
          <br/>
          <p>Liste de mes reservations</p>
          <ThreadClient />
        </div>
      </div>
    </div>
    </>
  );
};

export default Mes_reservations;

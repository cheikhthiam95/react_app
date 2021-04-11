import React, { useContext, useState } from "react";
import { UidContext } from "../components/UserIdConnect";
import ThreadsFavoris from "../components/ThreadsFavoris";
import Dropdown from '../components/PageAccueil/Dropdown';
import NavBar from '../components/PageAccueil/NavBar';

const Favoris = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    <NavBar toggle={toggle}/>
    <Dropdown isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}}>
      <div className="container">
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-11">
            
            <p>Liste de mes favoris</p>
            <div className="main">
              <div className="home-header">
              </div>
              {uid && <ThreadsFavoris />}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Favoris;

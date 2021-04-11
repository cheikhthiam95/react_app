import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utilitaires";
import Card from "../components/Post/Card";
import Dropdown from '../components/PageAccueil/Dropdown';
import NavBar from '../components/PageAccueil/NavBar';

const Bestof = () => {
  const trendList = useSelector((state) => state.bestofReducer);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
  <>
  <NavBar toggle={toggle}/>
  <Dropdown isOpen={isOpen} toggle={toggle}/>
  <div className="container"  style={{paddingTop: '60px'}}>
    <div className="row">
      <div className="col-1">
     
      </div>  
      <div className="col-11">
        <p>Nos Best of</p>
        <ul>
          {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      </div>
    
  </div>
  </>
  );
};

export default Bestof;

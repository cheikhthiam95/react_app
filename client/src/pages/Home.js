import React, { useState } from "react";
import Thread from "../components/Thread";
import Trends from "../components/Trends";
import LeftNav from "../components/LeftNav";
import SearchForm from "../components/Post/SearchForm";
import NavBar from '../components/PageAccueil/NavBar';
import Dropdown from '../components/PageAccueil/Dropdown';
import '../style/index.css';
import { MdViewList } from 'react-icons/md';
import { NavLink } from "react-router-dom";



const Home = () => {
 
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
        <div className="col-1" style={{ float: 'right'}}>
          <LeftNav />
        </div>
        <div className="col-8">
          
          <br/>
          <SearchForm/>
          <hr color="#f39200"/>
          <Thread />
        </div>
        <div className="col-3">
          <div className="hide-trends">
             <Trends />
          </div>
          <br/>
          <br/>
          
          <div className="show-link" style={{textAlign: 'center', fontWeight: 'bold', color:'#17233e'}}>
            Best of <br/>
            <NavLink to="bestof" style={{color:'#f39200'}}>
              <MdViewList />
            </NavLink></div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Home;

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LeftNavAdmin from "../../components/LeftNavAdmin";
import ThreadVal from "../../components/ThreadVal";

const Pub_attente = () => {
    const userData = useSelector((state) => state.userReducer);
    return (
        <div>
            <nav style={{ backgroundColor: 'green',  position: 'fixed', zIndex:'100' }}>
            <NavLink exact to="/gestion">
                <h3 style={{ color: 'white', fontFamily: 'fantasy', marginLeft: '20px', paddingTop: '20px' }}>AtypikHouse@Dashboard</h3>
            </NavLink>
            <h6 style={{textAlign:'right', fontWeight:'bolder', color:'black'}}>What's up, {userData.pseudo}!</h6>
            </nav>
            <div className="row">
                <div className="col-3">
                    <LeftNavAdmin />
                </div>
                <div className="col-9" style={{paddingTop: '100px'}}>
                    <br/>
                    <h1>En attente de validation</h1>
                    <div className="container">
                        <ThreadVal/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Pub_attente;
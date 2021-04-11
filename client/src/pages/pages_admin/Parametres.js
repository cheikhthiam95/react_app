import { MDBBtn } from "mdbreact";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LeftNavAdmin from "../../components/LeftNavAdmin";

const Parametres = () => {
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
                    <div className="container-fluid">
                        <div className="block-header">
                            <br/>
                            <h1>Paramètres</h1>
                            <small className="text-muted">Administrer les composants du fonctionnement de l'application</small>
                        </div>
                        <br/>
                        <div class="row clearfix">
                            <MDBBtn>
                                <NavLink exact to="/ajout_admin">
                                    Administrateur +
                                </NavLink>   
                            </MDBBtn>
                            <div className="col-1"></div>
                            <MDBBtn >
                                <NavLink exact to="/listadmin">
                                   Liste des Administrateurs
                                </NavLink>   
                            </MDBBtn>
                            <div className="col-1"></div>
                            <MDBBtn >
                                <NavLink exact to="/paramhabitat">
                                   parametres de l'habitat
                                </NavLink>   
                            </MDBBtn>
                        </div>
                        <div class="row clearfix">
                            <MDBBtn >
                                <NavLink exact to="/alerte">
                                   Gestion des alertes
                                </NavLink>   
                            </MDBBtn>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    );
}
export default Parametres;
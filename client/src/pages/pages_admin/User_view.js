import React from "react";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../../components/Utilitaires";



const User_view = (props) => {
    const usersData = useSelector((state) => state.usersReducer);
    return (
        <div >
            <nav style={{ backgroundColor: 'green',  position: 'fixed', zIndex:'100' }}>
                <h3 style={{ color: 'white', fontFamily: 'fantasy', marginLeft: '20px', paddingTop: '20px' }}>AtypikHouse@Dashboard</h3>
            </nav>
            <div className="container">
                <MDBContainer><bcomplexe r />
                    <MDBRow>

                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((users) => {
                                            if (`?id=${users._id}` === props.location.search) {
                                                return (
                                                    <>
                                                        <h1> Profil de {users.pseudo}</h1>
                                                        <h6>Compte crée le : {dateParser(users.createdAt)}</h6>
                                                        <div className="row">
                                                        <div className="col-6">
                                                        <ul>
                                                            <li>Pseudo: {users.pseudo}</li>
                                                            <li>Email: {users.email}</li>
                                                            <li>Tel: {users.tel}</li>
                                                        </ul>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="left-part">
                                                            <h3>Photo de profil</h3>
                                                            <img height="400" width="100%"
                                                                src={users.picture} alt="user-pic" />
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </>
                                                )
                                                
                                            }
                                        })}

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    )
}

export default User_view;
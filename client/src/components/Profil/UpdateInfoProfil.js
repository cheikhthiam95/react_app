import React from "react";
import { useSelector } from "react-redux";
import UpdatePicture from "./UpdatePicture";
import { dateParser } from "../Utilitaires";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';


const UpdateInfoProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  
    return (
      <div className="container">
        <div className="row">
          <div className="col-1">
            
          </div>
          <br/>
          <div className="col-11" style={{paddingTop:'10%'}}>
            <MDBContainer><bcomplexe r />
              <MDBRow>

                <MDBCol md="12">
                  <MDBCard>
                    <MDBCardBody>
                      <h1> Profil de {userData.pseudo}</h1>
                      <h3>({userData.role})</h3>
                      <h6>Compte créé le : {dateParser(userData.createdAt)}</h6>
                      <h6>Pseudo: {userData.pseudo}</h6>
                      <h6>Email: {userData.email}</h6>
                      <div className="row">
                        <div className="col-12">
                          <div className="left-part">
                            <img height="30%" width="100%"
                              style={{borderRadius:'30px', border: '2px solid #ff7979'}}
                              src={userData.picture} alt="user-pic" />
                            <UpdatePicture />
                            <p>{error.maxSize}</p>
                            <p>{error.format}</p>
                          </div>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>

          </div>
      </div>
    )
};

export default UpdateInfoProfil;

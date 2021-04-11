import React, { useEffect, useState } from "react";
import { isEmpty, shortDateParser } from "../../components/Utilitaires";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import ImageGallery from 'react-image-gallery';
import { MDBBtn, MDBInput } from 'mdbreact';
import { addReservation, deleteReserve, editReservation, getPosts, sendEmail, sendJustificatif, updateStatus } from "../../actions/postAction";
import Map from "../GoogleMap/Map";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MsgData from '../../data/MsgData';
import LeftNav from "../LeftNav";

 
const ReservationForm = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const status = "attente"
  const [date_open, setDate_open] = useState("");
  const [date_close, setDate_close] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [paiement, setPaiement] = useState("");


  const notifySuccess = () => {
    toast.success('Réservation réusiite!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const confirmReservation = () => {
    dispatch(updateStatus(post._id, post.message, status, userData._id));
    {!isEmpty(usersData[0]) &&
      usersData.map((user) => {
      if (post.posterId === user._id) {
        dispatch(sendEmail(user.email, user.pseudo, MsgData[1].subject, MsgData[1].text))
      }})
    }
    
  }

  const double = (e) => {
    e.preventDefault();
    notifySuccess();
    confirmReservation();
    window.location.reload(false);
    
  }

  
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const images = [
    {
      original: `${post.picture[0]}`,
      thumbnail: `${post.picture[0]}`,
    },
    {
      original: `${post.picture[1]}`,
      thumbnail: `${post.picture[1]}`,
    },
    {
      original: `${post.picture[2]}`,
      thumbnail: `${post.picture[2]}`,
    },
    {
      original: `${post.picture[3]}`,
      thumbnail: `${post.picture[3]}`,
    },
    {
      original: `${post.picture[4]}`,
      thumbnail: `${post.picture[4]}`,
    },
   
  ];

  const makePayment = token => {
    const body = {
      token,
      post
    }

    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`${process.env.REACT_APP_API_URL}api/user/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }
    ).then(response => {
      const { status } = response;
      post.reservations.map((reservation) => {
        if(reservation.reservationId === userData._id) {      
           dispatch(editReservation(post._id, reservation._id, post.prix));
           dispatch(sendJustificatif(userData.email, userData.pseudo, post.prix, post.titre))
        }
      })
      
    })
      .catch(error => console.log(error));
  }



  const notify = () => {
    toast.warn('Demande déjà été prise en compte, en attente de validation', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  
  const notifyNoDate = () => {
    toast.info('Veuillez saisir les dates de reservation', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const notifyReservation = () => {
    toast.success('Dates de reservation enregistré avec succès!', {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const notPaye = () => {
    toast.error('Veuillez confirmer la reservation avant d\'effectuer le paiement!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


  const handleDate = (e) => {
    e.preventDefault();
    if ((date_open !== "") && (date_close !== "")) {
      if ((date_open >= post.date_open) && (date_close <= post.date_close)) {
          if (date_open > date_close) {
          alert("Vos dates sont incorrectes ")
          } 
          else if ( date_open === date_close ) {
            alert("Vos dates sont incorrectes ") 
          }
          else {
            dispatch(addReservation(post._id, userData._id, userData.pseudo, paiement, date_open, date_close))
            .then(() => dispatch(getPosts()))
            .then(() => setDate_open(''))
            .then(() => setDate_close(''));
            setShowForm(true);
            notifyReservation();
          }
        
      } else {
          alert("Veuillez entrer des dates valides ")
      }
    } 
    else {
      alert("Veuillez entrer deux dates ")
    }
    
  }
 

  const deleteDate = (e) => {
    e.preventDefault();
    post.reservations.map((reservation) => {
      if(reservation.reservationId === userData._id) {
            dispatch(deleteReserve(post._id, reservation._id));
            setShowForm(false);
            dispatch(updateStatus(post._id, post.message, "non_reservé", userData._id));


      }
    })
    window.location.reload(false);
  }

  return (
    <>
    <div className="row">
        <div className="col-1" style={{ float: 'right'}}>
          <LeftNav />
        </div>
        <div className="col-11">

    <div style={{ textAlign:'left'}}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                      <h3>{post.titre}</h3>
                      <h4>{post.prix} € la nuité</h4>
                  <ul>
                      {post.video && (
                      <iframe
                          width="100%"
                          height="400"
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                      ></iframe>
                      )}
                      <br/>
                      <ImageGallery items={images} />
                      
                      <span>Type : {post.type} <br/> Département : {post.departement} <br/> Pour {post.nbr_personne} personne{post.nbr_personne > 1 ? "s" : ""}</span>
                      <h5>{post.price}</h5>
                      <span style={{fontSize:"12px"}}>Disponible du {shortDateParser(post.date_open)} au {shortDateParser(post.date_close)}</span>
                      
                      <hr/>
                      <h4 style={{fontWeight: 'bolder'}}>Dates de réservation</h4>
                        
                      {isEmpty(post.reservations[0]) &&  
                      <form action="" onSubmit={handleDate}>
                        <div className="row">
                          <div className="col-4">
                            <MDBInput
                              label="A partir"
                              type="date"
                              name="date_open"
                              id="date_open"
                              onChange={(e) => setDate_open(e.target.value)}
                              value={date_open}  
                            />
                          </div>
                          <div className="col-4">
                            <MDBInput
                              label="Jusqu'au"
                              type="date"
                              name="date_close"
                              id="date_close"
                              onChange={(e) => setDate_close(e.target.value)}
                              value={date_close}  
                            />
                          </div>
                          <div className="col-4">
                            <MDBBtn type="submit">
                              Valider
                            </MDBBtn>
                          </div> 
                        </div>
                      </form>
                      } 
                      
                      {post.reservations.map((reservation) => {
                            if(reservation.reservationId === userData._id) {
                            return ( 
                              <>
                                <p>Reservation du {shortDateParser(reservation.date_open)} au {shortDateParser(reservation.date_close)} <img src="./img/check.png" alt=""/></p>
                                <MDBBtn onClick={deleteDate}>
                                  Annuler
                                </MDBBtn>
                                <p style={{ color: '#cc3300', fontSize: '11px'}}>En cas d'annulation après paiement, la somme perçue vous sera remboursée dans un delais de 5 jours'</p>
                                </>
                              )}
                      })}
                  
                                  
                      
                      <hr />
                      <h5>Détails</h5>
                      <p>{post.message}</p>
                      <hr />
                      <Map post={post} key={post._id} />
                  </ul>
                  
                  <hr/>
                  <h5> Les informations du propriétaire</h5>
                  <div>
                      {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                          if (post.posterId === user._id) {
                              return <div>
                              <br />
                                      * Pseudo
                                      <h3> {user.pseudo}</h3>
                                      * Email
                                      <h5> {user.email}</h5>
                                      * Numéro de tel
                                      <h5> {user.tel}</h5>
                                  </div>
                          }
                      })} 
                      
                  </div>
                  <br/>
                  <br/>
                  {(post.status === "non_reservé") && showForm && (
                      <>
                        <MDBBtn type="button" onClick={double}>
                          Confirmer reservation
                        </MDBBtn>
                        <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
                      </>
                    ) }
                  
                  {((post.status === "non_reservé") || (post.status === "refusé")) && !showForm && (      
                      <>
                        <MDBBtn type="button" onClick={notifyNoDate}>
                          Confirmer reservation
                        </MDBBtn>
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                        <ToastContainer />
                      </>
                  )}
                  
                  {post.status === "attente"  && (
                    <>
                    <MDBBtn type="button" onClick={notify}>
                      Confirmer reservation
                    </MDBBtn>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                    <ToastContainer />
                    
                    <br/>
                    {post.reservations.map((reservation) => {
                            if (reservation.paiement === null) {
                              return (
                                <StripeCheckout
                                  stripeKey="pk_test_51IQafJDRHvU06AUoTyjd7f3g4TuEJI2wfvRwZxHKSuHQvfZE8J5Dy9GAgeNcH5oZoK6HDa1cYUFyaLKwis59tvRd00ZAf60pn1"
                                  token={makePayment}
                                  name="By Merith"
                                  amount={post.prix * 100}
                                >
                                  <button className="btn-large" style={{backgroundColor: '#17233e', borderRadius: '15px'}} >Payer {post.prix} €</button>
                                </StripeCheckout> 
                              )
                                
                            } else {
                              return <p style={{fontWeight:'bold', color:'green'}}>Paiement effectué, un justificatif vous a été envoyé dans votre boite mail <img src="./img/check.png" alt=""/></p>
                              
                            }
                        }
                    )} 
                    </>
                  )}

                  {post.status === "non_reservé" && 
                    <>
                      <br/>
                      <button className="btn-large" style={{backgroundColor: '#17233e', borderRadius: '15px'}} onClick={notPaye}>Payer {post.prix} €</button>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                      />
                    </>
                  }

                  
                  </div>
              </div>
            </div>
    </div>
    </div>
    </div>
  </>
  );
};

export default ReservationForm

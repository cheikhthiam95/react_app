import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utilitaires";
import { updatePost, updateStatus } from "../../actions/postAction";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard } from 'mdbreact';
import { useContext } from "react";
import { UidContext } from "../UserIdConnect";
import CardaddPic from "./CardaddPic";

const CardAdmin = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const [modalPic, setModalPic] =  useState(false);

    const validePublication = () => {
        dispatch(updateStatus(post._id, post.message, "non_reservé", post.clientId));
    }

    
  const ajoutImg = () => {
      return (
            <>
              <div onClick={() => setModalPic(true)} style={{cursor:'pointer'}} data-toggle="modal" data-target="#exampleModalPic" >
                <i className="fas fa-image"></i>
              </div>
              {modalPic && (
                <div class="modal fade" id="exampleModalPic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Images</h5>
                    </div>
                    <div class="modal-body">
                      <CardaddPic post={post} key={post._id} />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                  </div>
                </div>
              </div>
                )
              }
            </>
      ) 
    
  }


    const status = () => {
        if (post.status === 'réservé') {
          return (<span style={{fontSize:'12px', backgroundColor:'#ff9f1a', borderRadius:"4px 8px"}}>Réservé</span>)
        } else if (post.status === 'attente') {
          return (<span style={{fontSize:'12px', backgroundColor:'#25fde9', borderRadius:"4px 8px"}}>En attente</span>)
        } else if (post.status === 'annulé') {
          return (<span style={{fontSize:'12px', backgroundColor:'#ff9f1a', borderRadius:"4px 8px"}}>Annulé</span>)
        } else if (post.status === 'non_reservé') {
          return (<span style={{fontSize:'12px', backgroundColor:'#ff9f1a', borderRadius:"4px 8px"}}>Non reservé</span>)
        } else if (post.status === 'validation') {
            return (
              <div>
                <span style={{fontSize:'12px', backgroundColor:'#25fde9', borderRadius:"4px 8px"}}>En attente</span>
                
                <form action="" onClick={validePublication}>
                  <button type="submit" >Valider</button>
                </form>
              </div>
              )
          } 
    }

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <div>
            <br />
            <MDBCard >
                <li className="container" key={post._id}>
                    {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <>
                            <div className="round">
                  <h6 style={{paddingTop: '3px'}}>
                    <div className="row">
                      <div className="col-6">
                        <img height="40" width="40" style={{ borderRadius: "50%" }}
                          src={
                            !isEmpty(usersData[0]) &&
                            usersData
                              .map((user) => {
                                if (user._id === post.posterId) return user.picture;
                                else return null;
                              })
                              .join("")
                          }
                          alt="poster-pic"
                        />
                        {"  "}
                        {!isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId) return user.pseudo;
                              else return null;
                            })
                            .join("")}
                      </div>
                      <div className="col-6">
                        <div className="col-sm" style={{textAlign:'right'}}>
                          {ajoutImg()}
                          </div>
                      </div>
                    </div>
                  </h6>
                </div>
                            <div>
                                <div>
                                    <div>
                                        <h4>{post.titre}</h4>
                                        
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-sm">
                                        {uid ? (
                                            <div>
                                                {post.picture && (
                                                    <img height="200" width="100%" src={post.picture[0]} alt="card-pic" className="card-pic" />
                                                )}
                                                {post.video && (
                                                    <iframe
                                                        width="100%"
                                                        height="200"
                                                        src={post.video}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title={post._id}
                                                    ></iframe>
                                                )}
                                            </div>
                                        ) : (
                                            <>

                                                {post.picture && (
                                                    <img height="200" width="100%" src={post.picture} alt="card-pic" className="card-pic" />
                                                )}
                                                {post.video && (
                                                    <iframe
                                                        width="100%"
                                                        height="200"
                                                        src={post.video}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title={post._id}
                                                    ></iframe>
                                                )}
                                            </>
                                        )}





                                        {isUpdated && (
                                            <div className="update-post">
                                                <textarea
                                                    defaultValue={post.message}
                                                    onChange={(e) => setTextUpdate(e.target.value)}
                                                />
                                                <div className="button-container">
                                                    <button className="btn" onClick={updateItem}>
                                                        Valider modification
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-sm">
                                    <span style={{fontSize:"12px", fontWeight:"bold"}}>Publiée le {dateParser(post.createdAt)}</span>
                                        
                                        {isUpdated === false && <p>{post.message}</p>}
                                    </div>
                                    
                                </div>



                                <div className="row">
                                    <div className="col-sm">
                                        <span style={{fontSize:'12px'}}>commentaire </span>
                                            <i onClick={() => setShowComments(!showComments)} className="fas fa-comment"></i>  {post.comments.length}
                                        
                                    </div>
                                    <div className="col-sm">
                                    <span style={{fontSize:'12px'}}>j'aime </span>
                                        <i className="fas fa-star"></i>  {post.likers.length}
                                       
                                    </div>
                                    <div className="col-sm">
                                    <span style={{fontSize:'12px'}}>voir </span>
                                            <i className="fas fa-eye"></i>
                                       
                                    </div>
                                    <div className="col-sm">
                                        {(
                                            <div className="button-container">
                                                
                                                <DeleteCard id={post._id} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-sm">
                                    <span style={{fontSize:'12px'}}>status : {status()}</span>
                                    </div>
                                    
                                </div>
                                {showComments && <CardComments post={post} />}
                            </div>
                        </>
                    )}
                </li>
            </MDBCard>

        </div>
    );
};

export default CardAdmin;

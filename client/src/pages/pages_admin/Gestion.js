import { MDBBtn } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteParam } from "../../actions/paramAction";
import { deleteSection } from "../../actions/sectionAction";
import LeftNavAdmin from "../../components/LeftNavAdmin";
import Hero from "../../components/PageAccueil/Hero";
import InfoSection from "../../components/PageAccueil/InfoSection";
import ParamForm from "../../components/Parametre/ParamForm";
import SectionForm from "../../components/Parametre/SectionForm";
import UpdateParam from "../../components/Parametre/UpdateParam";
import UpdateSection from "../../components/Parametre/UpdateSection";
import { isEmpty } from "../../components/Utilitaires";
import { InfoData } from "../../data/InfoData";
import { SliderData } from "../../data/SliderData";
import GlobalStyle from "../page_accueil/globalStyles";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';


const Gestion = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const paramData = useSelector((state) => state.paramReducer);
    const sectionData = useSelector((state) => state.sectionReducer);
    const [open, setOpen] = useState(false);
    const [ slideToUpdate,setSlideToUpdate] =  useState("");

    const [openSection, setOpenSection] = useState(false);
    const [ sectionToUpdate,setSectionToUpdate] =  useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);
    const [isOpenC, setIsOpenC] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);
    const [isOpenE, setIsOpenE] = useState(false);
    const [isOpenF, setIsOpenF] = useState(false);


    const showModal = () => {
        setIsOpen(true);
    };
    const showModalB = () => {
        setIsOpenB(true);
    };
    const showModalC = () => {
        setIsOpenC(true);
    };
    const showModalD = () => {
        setIsOpenD(true);
    };
    const showModalE = () => {
        setIsOpenE(true);
    };
    const showModalF = () => {
        setIsOpenF(true);
    };



    const hideModal = () => {
        setIsOpen(false);
    };
    const hideModalB = () => {
        setIsOpenB(false);
    };
    const hideModalC = () => {
        setIsOpenC(false);
    };
    const hideModalD = () => {
        setIsOpenD(false);
    };
    const hideModalE = () => {
        setIsOpenE(false);
    };
    const hideModalF = () => {
        setIsOpenF(false);
    };


    const handleChange = (e) => {
        setSlideToUpdate(e);
        setOpen(true);
    }

    const handleChangeSection = (e) => {
        setSectionToUpdate(e);
        setOpenSection(true);
    }

    const deleteSlide =(id) => {
        dispatch(deleteParam(id));
        
    }

    const deleteQuote =(id) => {
        dispatch(deleteSection(id));
        
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);
    return (
        <div>
            <nav style={{ backgroundColor: 'green' , position: 'fixed', zIndex:'100'}}>
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
                <>
                    <br/>
                        <h1>Paramétrage de la page d'accueil</h1>
                        <GlobalStyle />
                         <div className="row">
                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Ajouter des slides </span>
                            <i onClick={showModal} className="fas fa-plus" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpen} onHide={hideModal}>
                                    <Modal.Header>
                                        <Modal.Title>Ajouter un slide</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ParamForm/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button onClick={hideModal}>Fermer</button>
                                    </Modal.Footer>
                            </Modal>
                            </div>

                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Modifier des slides </span>
                            <i onClick={showModalB} className="fas fa-edit" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpenB} onHide={hideModalB}>
                                <Modal.Header>
                                    <Modal.Title>Modifier un slide</Modal.Title>
                                        {open ? (
                                            <button type="button" class="close"  onClick={(e) => setOpen(false)} aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        ) : (
                                            null
                                        )}
                                </Modal.Header>
                                <Modal.Body>
                                    {(!open) &&
                                    <select  name="slideToUpdate" id="slideToUpdate" onChange={(e) => handleChange(e.target.value)} value={slideToUpdate} class="browser-default custom-select" >
                                        <option value="">----- Selectionner le Slide -----</option>
                                            {!isEmpty(paramData[0]) && 
                                            paramData.map((slide, key) => {
                                                return (
                                                    <option value={slide._id} key={key}>{slide.titre} </option>
                                                    ) 
                                                }
                                            )
                                        }
                                    </select>
                                    }
                                    {open && 
                                    !isEmpty(paramData[0]) && 
                                        paramData.map((slide, key) => {
                                            if( slide._id === slideToUpdate) {
                                                return <UpdateParam slid={slide}/>
                                            }
                                            
                                        })
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <button onClick={hideModalB}>Fermer</button>
                                </Modal.Footer>
                            </Modal>
                            </div>


                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Supprimer des slides </span>
                            <i onClick={showModalC} className="fas fa-trash" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpenC} onHide={hideModalC}>
                                <Modal.Header>
                                    <Modal.Title>Supprimer un slide <i className="fas fa-trash"></i></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {!isEmpty(paramData[0]) && 
                                    paramData.map((slide, key) => {
                                            return (
                                                    <ul>
                                                        <li>
                                                            <MDBBtn 
                                                            onClick={() => {
                                                                if (window.confirm("Voulez-vous supprimer ce slide ?")) {
                                                                deleteSlide(slide._id);
                                                                }
                                                            }}
                                                            key={key}
                                                            >{slide.titre}
                                                            </MDBBtn>
                                                        </li> 
                                                    </ul>
                                                )  
                                    })
                                }   
                                </Modal.Body> 
                                <Modal.Footer>
                                    <button onClick={hideModalC}>Fermer</button>
                                </Modal.Footer>
                            </Modal>
                            </div>
                        </div>
                        <Hero slides={SliderData}/>
                       <br/>
                        <div className="row">
                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Ajouter des sections </span>
                            <i onClick={showModalD} className="fas fa-plus" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpenD} onHide={hideModalD}>
                                    <Modal.Header>
                                        <Modal.Title>Ajouter une section</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <SectionForm/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button onClick={hideModalD}>Fermer</button>
                                    </Modal.Footer>
                            </Modal>
                            </div>

                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Modifier des sections </span>
                            <i onClick={showModalE} className="fas fa-edit" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpenE} onHide={hideModalE}>
                                <Modal.Header>
                                    <Modal.Title>Modifier une section</Modal.Title>
                                    {openSection ? (
                                        <button type="button" class="close"  onClick={(e) => setOpenSection(false)} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    ) : (
                                        null
                                    )}
                                </Modal.Header>
                                <Modal.Body>
                                {(!openSection) &&
                                <select  name="slideToUpdate" id="slideToUpdate" onChange={(e) => handleChangeSection(e.target.value)} value={sectionToUpdate} class="browser-default custom-select" >
                                    <option value="">----- Selectionner la section -----</option>
                                        {!isEmpty(sectionData[0]) && 
                                        sectionData.map((section, key) => {
                                            return (
                                                <option value={section._id} key={key}>{section.titre}</option>
                                                ) 
                                            }
                                        )
                                    }
                                </select>
                                }
                                {openSection && 
                                    !isEmpty(sectionData[0]) && 
                                        sectionData.map((section, key) => {
                                            if( section._id === sectionToUpdate) {
                                                return <UpdateSection sect={section}/>
                                            }
                                            
                                        })
                                    }      
                                </Modal.Body>
                                <Modal.Footer>
                                    <button onClick={hideModalE}>Fermer</button>
                                </Modal.Footer>
                            </Modal>
                            </div>


                            <div className="col-4">
                            <span style={{fontSize:'12px'}}>Supprimer des sections </span>
                            <i onClick={showModalF} className="fas fa-trash" style={{cursor: 'pointer'}}></i>
                            <Modal show={isOpenF} onHide={hideModalF}>
                                <Modal.Header>
                                    <Modal.Title>Supprimer une section <i className="fas fa-trash"></i></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {!isEmpty(sectionData[0]) && 
                                    sectionData.map((section, key) => {
                                        return (
                                                <ul>
                                                    <li>
                                                        <MDBBtn 
                                                        onClick={() => {
                                                            if (window.confirm("Voulez-vous supprimer cette section ?")) {
                                                                deleteQuote(section._id);
                                                            }
                                                        }}
                                                        key={key}
                                                        >{section.titre}
                                                        </MDBBtn>
                                                    </li> 
                                                </ul>
                                            )  
                                    })
                                }  
                                </Modal.Body> 
                                <Modal.Footer>
                                    <button onClick={hideModalF}>Fermer</button>
                                </Modal.Footer>
                            </Modal>
                            </div>
                        </div>
                        <InfoSection {...InfoData}/>
                       
                    </>
                </div>
            </div>
        </div>

    )
}

export default Gestion;
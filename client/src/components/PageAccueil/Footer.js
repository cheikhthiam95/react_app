import { MDBFooter } from 'mdbreact'
import React from 'react'

const Footer = () => {
    return (
        <MDBFooter style={{backgroundColor: '#f39200'}}>
            <div className="row">
            <div className="col-3" >
                <h4>A propos</h4>
                <hr/>
                <ul>
                <li>Qui sommes-nous?</li>
                <li>Devenez propiétaire</li>
                <li>Dévenez locataire</li>
                </ul>
                <h4>Nos applications</h4>
                <hr/>
                <img 
                width="100%"
                src="./img/pwa.png" 
                alt="appli"
                />
            </div>
            <div className="col-3">
                <h4>légalités</h4>
                <hr/>
                <ul>
                <li>Conditions générales d'utilisation</li>
                <li>Vie privée et cookies</li>
                <li>Vos droits et obligations</li>
                </ul>
            </div>
            <div className="col-3">
                <h4>Nos solutions</h4>
                <hr/>
                <ul>
                <li>Publicité</li>
                <li>Vos centres d'intérêt</li>
                <li>Tourisme et découverte</li>
                <li>Ecologie (les verts)</li>
                </ul>
            </div>
            <div className="col-3">
                <h4>Questions?</h4>
                <hr/>
                <ul>
                <li>Aide</li>
                <li>Sécurité de paiement</li>
                <li>Status de nos service</li>
                <li>Nos conseillé(e)s à votre écoute</li>
                </ul>
            </div>
            </div>
        </MDBFooter>
    )
}

export default Footer

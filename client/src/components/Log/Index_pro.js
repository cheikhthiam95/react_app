import React, { useState } from "react";
import SignInProForm from "./SignInProForm";
import SignUpProForm from "./SignUpProForm";


const Index_pro = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
      <div className="container" style={{paddingTop:'10px'}}>
        <br/>
        
        <div style={{ color:'#17233e', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
             <i class="fas fa-arrow-right" style={{color:'#f39200'}}></i>Nouveau propriétaire ?
          </div>
          <br/>
          <div style={{ color:'#17233e', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            <i class="fas fa-arrow-right" style={{color:'#f39200'}}></i>Déjà propriétaire ?
          </div>
        
        {signUpModal && <SignUpProForm />}
        {signInModal && <SignInProForm />}
      </div>
  );
};

export default Index_pro;

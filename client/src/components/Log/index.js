import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";


const Log = ( props ) => {
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
      <div className="container">
        <br/>
        <div style={{ color:'#17233e', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active" : null}
          >
           <i class="fas fa-arrow-right" style={{color:'#f39200'}}></i> Nouveau ? 
          </div>
          <br/>
          <div style={{ color:'#17233e', fontWeight: 'bold', cursor: 'pointer'}}
            onClick={handleModals}
            id="login"
            className={signInModal ? "active" : null}
          >
           <i class="fas fa-arrow-right" style={{color:'#f39200'}}></i> Déjà membre ?
          </div>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
  );
};

export default Log;

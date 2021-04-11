import React, { useContext, useState } from "react";
import Index_pro from "../components/Log/Index_pro";
import { UidContext } from "../components/UserIdConnect";
import UpdateInfoProfil from "../components/Profil/UpdateInfoProfil";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/index.css"
import NavBarPro from "../components/PageAccueil/NavBarPro";
import DropdownPro from "../components/PageAccueil/DropdownPro";
import LeftNav from "../components/LeftNav";

const Profil_pro = () => {
  const uid = useContext(UidContext);

  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    <NavBarPro toggle={toggle}/>
    <DropdownPro isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}} >
      <div className="row">
          <div className="col-2">
            <LeftNav />
          </div>
          <div className="col-10">
            <div>
              {uid ? (
                <UpdateInfoProfil />
              ) : (
                <>
                  <div className="row" >
                    <div className="col-sm">
                      <Index_pro signin={true} signup={false} />
                    </div>
                    <div className="col-sm">
                      <img width="100%" height="100%" src="./img/imag_2.svg" alt="imag_1"/>
                    </div>
                  </div>
                  
                </>
                )}
              </div>
            </div>
      </div>
      </div>
    </>
  );
};

export default Profil_pro;

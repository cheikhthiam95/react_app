import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Profil_pro from '../../pages/Profil_pro';
import Profil_admin from '../../pages/Profil_admin';
import Bestof from '../../pages/Bestof';
import Favoris from '../../pages/Favoris';
import Newpost from '../../pages/Newpost';
import Reservation from '../../pages/Reservation';
import Post_pro from '../../pages/Post_pro';
import Gestion from '../../pages/pages_admin/Gestion';
import Gestion_clients from '../../pages/pages_admin/Gestion_clients';
import Gestion_pro from '../../pages/pages_admin/Gestion_pro';
import Pub_attente from '../../pages/pages_admin/Pub_attente';
import Parametres from '../../pages/pages_admin/Parametres';
import User_view from '../../pages/pages_admin/User_view';
import Gestion_pubs from '../../pages/pages_admin/Gestion_pubs';
import Ajout_admin from '../../pages/pages_admin/Ajout_admin';
import ListAdmin from '../../pages/pages_admin/ListAdmin';
import Mes_reservations from '../../pages/Mes_reservations';
import { Accueil } from '../../pages/page_accueil/Accueil';
import HomePro from '../../pages/HomePro';
import Prisedevue from '../../pages/Prisedevue';


const index = () => {
        
  return (
    <div>

      <Router>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Homepro" exact component={HomePro} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/profil_pro" exact component={Profil_pro} />
        <Route path="/profil_admin" exact component={Profil_admin} />
  
        <Route path="/bestof" exact component={Bestof} />
        <Route path="/favoris" exact component={Favoris} />
        <Route path="/newpost" exact component={Newpost} />
        <Route path="/reservation" exact component={Reservation} />
        <Route path="/post_pro/" exact component={Post_pro} />
        <Route path="/mes_reservations" exact component={Mes_reservations} />
        <Route path="/prisedevue" exact component={Prisedevue} />
        
        <Route path="/gestion" exact component={Gestion} />
        <Route path="/gestion_clients" exact component={Gestion_clients} />
        <Route path="/gestion_pro" exact component={Gestion_pro} />
        <Route path="/gestion_pubs" exact component={Gestion_pubs} />
        <Route path="/pub_attente" exact component={Pub_attente} />
        <Route path="/parametres" exact component={Parametres} />
        <Route path="/ajout_admin" exact component={Ajout_admin} />
        <Route path="/listadmin" exact component={ListAdmin} />
        <Route path="/user_view" exact component={User_view} />
        <Redirect to="/" />
      </Switch>
    </Router>
    </div>
    
  );
};

export default index;
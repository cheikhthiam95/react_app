const UserModel = require('../models/user_model');
const { signUpErrors, signInErrors } = require('../utilitaires/errors_utils');
const jwt = require('jsonwebtoken');

//temps communiqué en milliseconde
const temps_de_token = 2 * 24 * 60 * 60 * 1000;

const creation_token = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: temps_de_token
  })
};

// Creation d'un utlisateur
module.exports.signUp = async (req, res) => {
  const {pseudo, email, tel, password, role} = req.body

  try {
    const user = await UserModel.create({pseudo, email, tel, password, role});
    res.status(201).json({ user: user._id});

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASS}`
      }
    });
  
    let mailOtptionns = {
      from: "atypikhouse.g4@gmail.com",
      to:`${email}`,
      subject: 'Mail de Bienvenu',
      html: `<div className="email">
              <p>Bonjour ${pseudo},</p>
              <p> Nous vous souhaitons la bienvenue!<p>
            </div>`
    }
  
    await transport.sendMail(mailOtptionns, function(err, data) {
      if (err) {
        console.log('Erreur :', err);
      } else {
        console.log('Email envoyé')
      }
    });

  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

// Connexion client(locaitaire)
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

    try {
      const user = await UserModel.login(email, password);
      if(user.role !== 'client') {

      } else {
        const token = creation_token(user._id);
        res.cookie('jwt', token, { httpOnly: true, temps_de_token});
        res.status(200).json({ user: user._id})
      } 
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
    }
}

//connexion propriétaire
module.exports.signInPro = async (req, res) => {
  const { email, password } = req.body

    try {
      const user = await UserModel.login(email, password);
      if(user.role !== 'propriétaire') {

      } else {
        const token = creation_token(user._id);
        res.cookie('jwt', token, { httpOnly: true, temps_de_token});
        res.status(200).json({ user: user._id})
      } 
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
    }
}

//connexion administrateur
module.exports.signInAdmin = async (req, res) => {
  const { email, password } = req.body

    try {
      const user = await UserModel.login(email, password);
      if(user.role !== 'administrateur') {

      } else {
        const token = creation_token(user._id);
        res.cookie('jwt', token, { httpOnly: true, temps_de_token});
        res.status(200).json({ user: user._id})
      } 
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
    }
}

//Déconnexion
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { temps_de_token: 1 });
  res.redirect('/');
}
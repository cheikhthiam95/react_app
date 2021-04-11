const PostModel = require("../models/post_model");
const postModel = require("../models/post_model");
const UserModel = require("../models/user_model");
const { uploadErrors } = require("../utilitaires/errors_utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const nodemailer = require("nodemailer");
require('dotenv').config({path: './config/.env'});

//mail
module.exports.sendMailTo = async (req, res) => {
  let { email, pseudoPro, subject, text } = req.body

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
    subject: `${subject}`,
    html: `<div className="email">
            <p>Bonjour ${pseudoPro}, <br/><br/>${text}</p>
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

//Justificatif
module.exports.sendJustificatif = async (req, res) => {
  let { email, pseudo, prix, titre } = req.body

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
    subject: 'Justificatif de votre paiement',
    html: `<div className="email">
            <p>Bonjour ${pseudo}, <br/><br/>suite à votre demande réservation pour le bien : ${titre}, nous vous envoyons le justificatif du versement de la somme de ${prix} €</p>
            <p>Pour des raison de sécurité, votre argent sera transféré au propréitaire si votre de demande est validé.</p>
            <p> En cas de réfus ou d'annulation, cette somme vous sera remboursée dans un delais de 5 jours<p>
            <p> Bien cordialement <p>
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

//Lecture des Posts (publications)
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

//Lecture d'une publication
module.exports.readOnePost = (req, res) => {

  let type = req.query.type
  let postIds = req.query.id

  if (type === "array ") {

  }

// Post correspondant à chaque un id (posterId)
PostModel.find({'_id' : { $in: postIds}})
  .populate('writer')
  .exex((err, post) => {
    if(err) return req.status(400).send(err)
    return res.status(200).send(post)
  })
};

//Nouveau POST
module.exports.createPost = async (req, res) => {
  let fileName;
 
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    titre: req.body.titre,
    prix: req.body.prix,
    superficie: req.body.superficie,
    departement: req.body.departement,
    lng: req.body.lng,
    lat: req.body.lat,
    type: req.body.type,
    status: req.body.status,
    clientId : req.body.clientId,
    nbr_personne: req.body.nbr_personne,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    date_open: req.body.date_open,
    date_close: req.body.date_close,
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};




//Mise à Jour Message post
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    status: req.body.status,
    clientId : req.body.clientId,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};



// Suppression du Post
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};


//LAISSER UN COMMENTAIRE
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//LAISSER UN COMMENTAIRE
module.exports.makeReservation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reservations: {
            reservationId: req.body.reservationId,
            personPseudo: req.body.personPseudo,
            paiement:req.body.paiement,
            date_open: req.body.date_open,
            date_close: req.body.date_close, 
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//PAIEMENT
module.exports.editReservation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theReservation = docs.reservations.find((reservation) =>
      reservation._id.equals(req.body.reservationId)
      );

      if (!theReservation) return res.status(404).send("Reservation not found");
      theReservation.paiement = req.body.paiement;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });

    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//SUPPRIMER UN RSERVATION
module.exports.deleteReservation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reservations: {
            _id: req.body.reservationId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Ajouter des images
module.exports.addPicture = (req, res) => {

  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }
    fileName = req.body.picId + Date.now() + ".jpg";

    pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/autres/${fileName}`
      )
    );
  }

  
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
            picture : req.file !== null ? "./uploads/autres/" + fileName : "",  
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//LAISSER UNE PRISE DE VUE
module.exports.prisePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(400).json({ errors });
    }
    fileName = req.body.priseId + Date.now() + ".jpg";

    pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/prise/${fileName}`
      )
    );
  }

  
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          prises: {
            priseId: req.body.priseId,
            prisePseudo: req.body.prisePseudo,
            prisePicture : req.file !== null ? "./uploads/prise/" + fileName : "",
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//MODIFIER UN COMMENTAIRE
module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//SUPPRIMER UN COMMENTAIRE
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Aimer et Ajouter un Post à ses Favoris
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Ne plus aimer un post ou supprimer un post de ses favoris
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};




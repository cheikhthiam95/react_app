const ParamModel = require("../models/param_model");
const ObjectID =  require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utilitaires/errors_utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


module.exports.createSlide = async (req, res) => {
    let fileName;
    
    if (req.file !== null) {
        try{
            if(
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
            throw Error("invalid file");

            if (req.file.size > 1000000) throw Error("max size");
        } catch (err){
            const errors = uploadErrors(err);
            return res.status(400).json({ errors });
        }
        fileName = req.body.paramId + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
              `${__dirname}/../client/public/uploads/params/${fileName}`
            )
        );
    }

    const newParam = ParamModel({
        paramId: req.body.paramId,
        titre: req.body.titre,
        prix: req.body.prix,
        temps: req.body.temps,
        picture : req.file !== null ? "./uploads/params/" + fileName : "",
    });
    try {
        const param = await newParam.save();
        return res.status(201).json(param);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.readParam = (req, res) => {
    ParamModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("error to get data : " + err);
    }).sort({ createdAt: -1})
};

module.exports.updateParam = (req, res) => {

    const updateRecord = {
        titre: req.body.titre,
        prix: req.body.prix,
        temps: req.body.temps,
        

    };

    ParamModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.deleteParam = (req, res) => {

    ParamModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
}
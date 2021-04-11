const SectionModel = require("../models/section_model");
const { uploadErrors } = require("../utilitaires/errors_utils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


module.exports.createSection = async (req, res) => {
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
        fileName = req.body.sectionId + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
              `${__dirname}/../client/public/uploads/sections/${fileName}`
            )
        );
    }

    const newSection = SectionModel({
        sectionId: req.body.sectionId,
        titre: req.body.titre,
        paragraph: req.body.paragraph,
        reverse: req.body.reverse,
        picture : req.file !== null ? "./uploads/sections/" + fileName : "",

    });
    try {
        const section = await newSection.save();
        return res.status(201).json(param);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.readSection = (req, res) => {
    SectionModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("error to get data : " + err);
    }).sort({ createdAt: -1})
};

module.exports.updateSection = (req, res) => {

    const updateRecord = {
        titre: req.body.titre,
        paragraph: req.body.paragraph
    };

    SectionModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.deleteSection = (req, res) => {

    SectionModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
}
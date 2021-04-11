import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrise, getPosts } from "../../actions/postAction";
import { isEmpty, timestampParser } from "../Utilitaires";

const CardPrises = ({ post }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector(state => state.usersReducer)
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();

  const handlePrise = (e) => {
    e.preventDefault();
    if (text || file) {
      const data = new FormData();
      data.append("priseId", userData._id);
      data.append("prisePseudo", userData.pseudo);
      data.append("file", file);
      data.append("text", text);

      dispatch(addPrise(data, post._id))
        .then(() => dispatch(getPosts()))
        .then(() => setText(''))
        .then(() => setSelectedImages(''));
    }
  };

  const imageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      setFile(e.target.files[0]);
    }
  };
  
  const renderPhotos = (source) => {
    if(source) {
       return source.map((photo) => {
      return <img height="200px" width="50%" src={photo} alt="" key={photo} />;
    });
    }
  };

  const cancelPrise = () => {
    setFile('');
    setText('');
    setSelectedImages('');
  }

  return (
    <div>
      {post.titre}
      <br />
      {post.prises.map((prise) => {
        return (
          <div className="container">
            <h6>
              <img height="30" width="30" style={{ borderRadius: "50%" }}
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === prise.priseId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="prise-pic"
              />
              {prise.prisePseudo}{" "} <span style={{ fontSize: "10px" }}>{timestampParser(prise.timestamp)}</span>
            </h6>
            <p>{prise.text}</p>
            {prise.prisePicture && (
              <img height="200" width="100%" src={prise.prisePicture} alt="card-pic" className="card-pic" />
            )}

          </div>)
      })
      }

      <br />
      {text || selectedImages ? (
        <div className="container">
          {renderPhotos(selectedImages)}
        </div>
      ) : null}
      <br />
      {userData._id && (
        <form action="" onSubmit={handlePrise} className="prise-form"  enctype="multipart/form-data">
          <textarea
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="3"
            name="text"
            placeholder="Racontez-nous..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <br />
          
          <input
            multiple
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={imageHandleChange}
          />
          <input type="button" value="Annuler" onClick={cancelPrise} />
          {" "}
          <button className="fas fa-paper-plane" aria-hidden="true" type="submit" ></button>

          <br />
        </form>
      )}
    </div>
  );
};

export default CardPrises;

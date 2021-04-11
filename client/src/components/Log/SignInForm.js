import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");



  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const roleError = document.querySelector(".role.error")

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
        role,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
          roleError.innerHTML = res.data.errors.role;
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MDBContainer>
    <MDBRow>
      <MDBCol md="12">
        <MDBCard >
          <MDBCardBody>
            <form action="" onSubmit={handleLogin} id="sign-up-form">
              <p className="h4 text-center py-4">Connexion locataire</p>
              <div className="role error"></div>
              <div className="grey-text">
                <MDBInput
                  label="email"
                  icon="envelope"
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div className="email error"></div>
                <MDBInput
                  label="password"
                  icon="lock"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className="password error"></div>
              </div>
              <div className="text-center py-4 mt-3">
                <MDBBtn type="submit">
                  Se connecter
                </MDBBtn>
              </div>
            </form>
           
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
};

export default SignInForm;

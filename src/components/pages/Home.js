import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
import "./Home.css";
// import { sepoliaId, contractAddress } from "../constants";
// import contractABI from "../abi.json";


import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn
    // MDBIcon,
    // MDBInput,
    // MDBCheckbox
  }
  from 'mdb-react-ui-kit';


const Home = () => {
    
    
    return(
      
      <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        

        <MDBCol col='4' md='6'>
          <div className="text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            style={{width: '185px'}} alt="logo" />
            <h4 className="mt-1 mb-5 pb-1">A new kind of company for a new kind of world</h4>
            <h4 className="mt-1 mb-5 pb-1">ASCENDION</h4>
          </div>
          <div className="text-BLACK">
              <h4 className="mb-4">Welcome to the code economy</h4>
              <p className="small mb-0">Our lives – and work – are getting a software upgrade. 
              Supply chain predictability. Virtual healthcare. 
              Just-in-time retail. Trusted financial services. 
              Seamless extended reality experiences. Work from, well, anywhere. 
              Our new expectations of technology are creating new market truths. 
              The unknowns outweigh the knowns. But what we do know is: we will not revert to the old normal.
              </p>
            </div>
           




          <MDBBtn className="mb-4 w-100" size="lg" href='/admin'
            >ADMIN</MDBBtn>
          <MDBBtn className="mb-4 w-100" size="lg" href="/user">USER</MDBBtn>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
    }

export default Home;
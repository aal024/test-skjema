import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../helper/Context";

function Header() {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  return (
    <header className="App-header" style={header}>
      {/** Her kommer headeren:  background: "#6464ff"
       * "Finansoppslag" -- eller bare oppslag hvis repoet vårt er public.
       *  Logo -> Politiets? Eller den gule som er i dagens oppslag
       *  Skal den logget inn ligge i header? Eller under, sjekk dagens løsning
       *  Styling --> Egen blåfarge som indikerer header
       *   */}
      <p style={header_title}> Finansoppslag </p>
      {globalState.glb_user === undefined ? <p style={header_p}> Ikke innlogget </p> : <p style={header_p}> Bruker: {globalState.glb_user}</p> } 
    </header>
  );
}

export default Header;

//STYLING

const header = {
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  height: "10%",
  width: "100%",
  top: "0",
  margin: "0",
  background: "#415890",
  color: "#fff",
  fontSize: "2rem",
};

const header_title = {
  marginTop: "1rem",
  marginLeft: "auto",
  marginRight: "auto",
};

const header_p = {
  float: "right",
  marginRight: "4%",
  marginTop: "2rem",
  color: "#fff",
  fontSize: "12px",
};

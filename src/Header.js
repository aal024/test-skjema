import React from "react";

function Header() {
  return (
    <header className="App-header" style={header}>
      {/** Her kommer headeren:  background: "#6464ff"
       * "Finansoppslag" -- eller bare oppslag hvis repoet vårt er public.
       *  Logo -> Politiets? Eller den gule som er i dagens oppslag
       *  Skal den logget inn ligge i header? Eller under, sjekk dagens løsning
       *  Styling --> Egen blåfarge som indikerer header
       *   */}
      <p> Finansoppslag </p>
    </header>
  );
}

export default Header;

//STYLING

const header = {
  display: "flex",
  padding: "20px 10px",
};

const header_a = {
  float: "left",
  color: "#fff",
  textAlign: "center",
  fontSize: "12px",
  textDecoration: "none",
};
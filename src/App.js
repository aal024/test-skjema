import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Header from "./Header";

const myCSS = {
  background: "#c1e1ec",
  width: "60%",
  height: "80%",
  borderRadius: "1rem",
};

function App() {
  return (
    <div className="App">

      <main>

        <Header />
        <div style={myCSS}></div>
        {/** Her kommer hovedinnholdet:
         * Navn på deg selv osv hvis dette ikke er i headeren
         * Liste over personer man skal gi tilgang til --> med checkbox.
         * En knapp for godkjenn --> som evnt trigger en popup?
         * En knapp for last opp vedlegg - med en infoknapp om at dette kun er nødvendig hvis det er noe som kun finnes i papir-arkiv?
         * Skal vi ha en seksjon når alt er sendt inn sånn "Du har nå godkjent info av xxxxxx. Du kan nå logge ut, også med en utloggings-knapp?
         * Bør det være en timer aktivert - automatisk utlogging om du ikke har gjort noe på x antall minutter? Kobles opp mot backend? */}
      </main>
    </div>
  );
}

export default App;

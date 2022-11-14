import React from "react";
import { GlobalContext } from "../helper/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {UpdateState2} from "./MainP";

function Edit() {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(GlobalContext);
  
  const godkjenn = () => {
    navigate("/main");
    UpdateState2(globalState.glb_saksnummer);
    //<MainP function={this.updateState(globalState.glb_saksnummer)} />
    //{ console.log(globalState.glb_saksnummer) }; //SE HER FUNGERER IKKE...
  };
  
  return (
    <div style={{ marginTop: "9rem" }}>
      <p> Velkommen bruker: {globalState.glb_user}</p>

      <div>
        <p>Du jobber nå med: </p>
        <ul>
          <li>Saksnummer: {globalState.glb_saksnummer}</li>
          <li>Navn: {globalState.glb_name}</li>
        </ul>
      </div>
      <button onClick={godkjenn}>
        {" "}
        Godkjenn overføring{" "}
      </button>
    </div>
  );
}

export default Edit;

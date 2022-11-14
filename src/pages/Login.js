import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../helper/Context";

function Login() {
  let navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const inputRef = useRef();
  const [user, setUser] = useState("");

  return (
    <div style={center}>
      <h1> Login </h1>
      <div className="txt_field">
        <input
          ref={inputRef}
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label> Username</label>
      </div>
      <div className="txt_field">
        <input type="text" />
        <label> Password</label>
      </div>
      <button
        onClick={() => {
          navigate("/main");
          setGlobalState({
            glb_user: user,
          });
          console.log(user);
          console.log(globalState._currentValue.glb_user);
          console.log(globalState.glb_user);
        }}
      >
      
        Login
      </button>
    </div>
  );
}

export default Login;

const center = {
  marginTop: "9rem",
  marginLeft: "10%",
};

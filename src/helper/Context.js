import { createContext } from "react";

export const LoginContext = createContext();

export const GlobalContext = createContext(
  {
    glb_name: "",
    glb_saksnummer: "",
    glb_user: "testertester",
  },
);

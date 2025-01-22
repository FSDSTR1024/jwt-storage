import { createContext, useReducer } from "react";

export const GlobalContext = createContext({
  user: {
    name: "La estas liando",
    email: "La estas liando",
    rol: "La estas liando",
  },
  dispatch: () => {
    return "La estas liando";
  },
});

export const GlobalProvider = ({ children }) => {
  //action = {type:string, payload:object}
  const reducer = (oldState, action) => {
    switch (action.type) {
      case "SET_USER":
        return action.payload;
      case "RESET_USER":
        return null;
      case "CHANGE_NAME":
        return { ...oldState, name: action.payload };
      default:
        return oldState;
    }
  };

  const [user, dispatch] = useReducer(reducer, null);

  return (
    <GlobalContext.Provider value={{ user, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

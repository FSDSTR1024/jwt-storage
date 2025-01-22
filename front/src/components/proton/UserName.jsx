import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const UserName = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  return <h2>{user.name}</h2>;
};

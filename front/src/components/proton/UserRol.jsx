import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export const UserRol = () => {
  const { user, dispatch } = useContext(GlobalContext);
  return (
    <p
      onClick={() => dispatch({ type: "CHANGE_NAME", payload: "Nuevo nombre" })}
    >
      {user.rol}
    </p>
  );
};

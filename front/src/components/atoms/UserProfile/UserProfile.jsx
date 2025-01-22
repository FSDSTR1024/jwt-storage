import { UserName } from "../../proton/UserName";
import { UserRol } from "../../proton/UserRol";
import "./UserProfile.css";

export const UserProfile = ({ logout }) => {
  return (
    <>
      <UserName />
      <UserRol />
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

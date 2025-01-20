import { useEffect, useState } from "react";
import { UserAPI } from "../api/user";

const Page2 = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await UserAPI.getAllUsers();
    setUsers(response);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.rol}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Page2;

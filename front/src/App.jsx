import { useContext, useEffect, useState } from "react";
import { UserAPI } from "../api/user";
import "./App.css";
import Card from "./components/atoms/Card";
import UserProfile from "./components/atoms/UserProfile";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  //return <Page2 />;
  const { user, dispatch } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UserAPI.login(email, password);
    fetchUser();
  };

  const logout = async () => {
    await UserAPI.logout();
    fetchUser();
  };

  const fetchUser = () => {
    UserAPI.getUser()
      .then((user) => dispatch({ type: "SET_USER", payload: user }))
      .catch(() => dispatch({ type: "RESET_USER" }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1>App</h1>
      {!user && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" onBlur={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onBlur={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {user && (
        <Card>
          <UserProfile logout={logout} />
        </Card>
      )}
    </>
  );
}

export default App;

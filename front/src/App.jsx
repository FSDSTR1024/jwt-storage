import { useEffect, useState } from "react";
import { UserAPI } from "../api/user";
import "./App.css";

function App() {
  //return <Page2 />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      .then(setUser)
      .catch(() => setUser(null));
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
        <>
          <h2>{user.name}</h2>
          <p>{user.rol}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      )}
    </>
  );
}

export default App;

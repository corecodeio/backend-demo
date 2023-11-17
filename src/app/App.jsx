import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const tokenStored = window.localStorage.getItem("TKN");
  const [state, setState] = useState("loading");
  const [token, setToken] = useState(tokenStored);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const verifyToken = () => {
    if (token) {
      setState("loggedIn");
    } else {
      setState("loggedOut-login");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await fetch("http://localhost:3000/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resposeJson = await response.json();
    if (resposeJson.ok) {
      alert("usuario logueado");
      console.log(resposeJson.token);
      setToken(resposeJson.token);
      window.localStorage.setItem("TKN", resposeJson.token);
      setError(null);
      setState("loggedIn");
      return;
    }
    setError(resposeJson.message);
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    //setState("loggedIn");
    console.log(data);
    const response = await fetch("http://localhost:3000/register", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("usuario creado");
      setError(null);
      return;
    }
    const resposeJson = await response.json();
    setError(resposeJson.message);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const getUser = async () => {
    if (token && state === "loggedIn") {
      console.log("traer usuario");
      const response = await fetch("http://localhost:3000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJson = await response.json();
      setUser(responseJson);
    }
  };
  useEffect(() => {
    getUser();
  }, [token, state]);

  if (state === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {state !== "loggedIn" && (
        <>
          {state === "loggedOut-login" && (
            <form onSubmit={handleSubmit}>
              <h1>login</h1>
              <label htmlFor="email">email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <br />
              <p>{error}</p>
              <br />
              <button type="submit">login</button>
              <button onClick={() => setState("loggedOut-register")}>
                ir a register
              </button>
            </form>
          )}
          {state === "loggedOut-register" && (
            <form onSubmit={handleSubmitRegister}>
              <h1>register</h1>
              <label htmlFor="email">email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <br />
              <p>{error}</p>
              <br />
              <button type="submit">register</button>
              <button onClick={() => setState("loggedOut-login")}>
                ir a login
              </button>
            </form>
          )}
        </>
      )}
      {state === "loggedIn" && (
        <>
          <h1>logged in</h1>
          {user?.email && <p>email: {user.email}</p>}
          {user?.id && <p>id: {user.id}</p>}
          <button
            onClick={() => {
              setState("loggedOut-login");
              setToken(null);
              window.localStorage.removeItem("TKN");
            }}
          >
            logout
          </button>
        </>
      )}
    </>
  );
}

export default App;

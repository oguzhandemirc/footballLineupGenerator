import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import TeamGenerator from "./components/TeamGenerator";
import FootballField from "./components/FootballField";
const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <>
          <Navbar onLogout={handleLogout} />
          <div className="pt-20"> {/* Navbar'ın sayfanın üstünü kaplamaması için padding ekledik */}
            <TeamGenerator token={token} />
            <FootballField token={token} />
          </div>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

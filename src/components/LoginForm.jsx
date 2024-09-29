// src/components/LoginForm.js
import React, { useState } from "react";
import AuthService from "../services/authService";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // Kullanıcı adı
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [switchLogin, setSwitchLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(username, password);
      if (response.token) {
        onLogin(response.token); // Token'ı üst bileşene ilet
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Giriş yapılırken hata oluştu"
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(username, password);
      setSwitchLogin(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Kayıt yapılırken hata oluştu"
      );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            {switchLogin === false ? "Giriş Yap" : "Kaydol"}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  switchLogin ? "" : "hidden"
                }`}
                onClick={handleSubmit}
              >
                Giriş Yap
              </button>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  switchLogin ? "hidden" : ""
                }`}
                onClick={handleRegister}
              >
                Kaydol
              </button>
            </div>
            <div>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setSwitchLogin(!switchLogin)}
              >
                {switchLogin === false ? "Kaydol" : "Giriş Yap"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

// src/components/LoginForm.js
import React, { useState } from "react";
import AuthService from "../services/authService";
import { toast } from "react-toastify";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // Kullanıcı adı
  const [password, setPassword] = useState("");
  
  // Durum değişkeni: Giriş ve kayıt arasında geçiş yapmak için
  const [switchLogin, setSwitchLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(username, password);
      if (response.token) {
        onLogin(response.token); // Token'ı üst bileşene ilet
        toast.success("Başarıyla giriş yapıldı!", { position: "bottom-right", autoClose: 6000 });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Giriş yapılırken hata oluştu",
        { position: "bottom-right", autoClose: 6000 }
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(username, password);
      setSwitchLogin(true);
      toast.success("Başarıyla kayıt oldunuz! Şimdi giriş yapabilirsiniz.", {
        position: "bottom-right",
        autoClose: 6000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Kayıt yapılırken hata oluştu",
        { position: "bottom-right", autoClose: 6000 }
      );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-login-bg bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-md bg-white bg-opacity-90 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form>
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

          <div className="flex items-center justify-between">
            <div>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  switchLogin ? "hidden" : ""
                }`}
                onClick={handleSubmit}
              >
                Giriş Yap
              </button>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  switchLogin ? "" : "hidden"
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

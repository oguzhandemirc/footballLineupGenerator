// src/components/AuthForm.js
import React, { useState } from "react";
import AuthService from "../services/authService";
import { toast } from "react-toastify";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Form türünü yönetir
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Giriş Yapma İşlemi
      try {
        const response = await AuthService.login(username, password);
        if (response.token) {
          AuthService.setToken(response.token); // Token'ı kaydet
          window.location.reload(); // Sayfayı yenileyerek giriş durumunu güncelle
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Giriş yapılırken hata oluştu",{position: "right-bottom",autoClose: 600});
      }
    } else {
      // Kayıt Olma İşlemi
      try {
        const response = await AuthService.register(username, password);
        toast.success("Kayıt başarılı! Giriş yapabilirsiniz.",{position: "right-bottom",autoClose: 600});
        setIsLogin(true); // Kayıttan sonra giriş formuna geçiş yap
      } catch (error) {
        toast.error(error.response?.data?.message || "Kayıt yapılırken hata oluştu",{position: "right-bottom",autoClose: 600});
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
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

          {successMessage && (
            <p className="text-green-500 text-sm text-center mb-4">
              {successMessage}
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </button>
          </div>

          <div className="mt-4 text-center">
            {isLogin ? (
              <p className="text-sm">
                Hesabınız yok mu?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  Kayıt Ol
                </button>
              </p>
            ) : (
              <p className="text-sm">
                Zaten hesabınız var mı?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  Giriş Yap
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

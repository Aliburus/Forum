import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/userServices";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Servisi kullanarak backend'den çıkış işlemi
    logoutUser()
      .then(() => {
        // Cookie temizlendikten sonra login sayfasına yönlendir
        navigate("/login");
      })
      .catch((err) => {
        console.error("Çıkış hatası:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Çıkış yapılıyor...</div>;
};

export default Logout;

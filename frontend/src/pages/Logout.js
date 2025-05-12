import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Token ve refresh token'ı temizle
    localStorage.removeItem("token");

    // Backend'den logout işlemi yap
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
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

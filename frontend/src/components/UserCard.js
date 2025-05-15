import React, { useEffect, useState } from "react";
import { getProfile } from "../services/userServices";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then(({ data }) => {
        console.log("UserCard API data:", data);
        // Eğer data.user var ise
        setUser(data.user ?? data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("UserCard API error:", err);
        setError("Profil bilgileri alınamadı.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  // data yoksa da kontrol et
  if (!user) {
    return <div>Profil verisi yok</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-2xl">
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-semibold text-lg text-gray-900">
            {user.name || "Kullanıcı"} {user.surname || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

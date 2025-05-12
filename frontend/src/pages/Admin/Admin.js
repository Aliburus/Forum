import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, Loader, LayoutGrid } from "lucide-react";
import Header from "../../components/Admin/Header";
import UsersList from "../../components/Admin/UsersList";
import EmptyState from "../../components/Admin/EmptyState";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("Admin verisi alınamadı:", error);
        setError("Kullanıcı verisi yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Kullanıcı Yönetimi
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                Toplam:{" "}
                <span className="font-semibold text-gray-700">
                  {users.length} kullanıcı
                </span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <LayoutGrid className="h-4 w-4" />
                <span>Görünüm</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12 bg-white rounded-xl shadow-md">
            <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600 font-medium">
              Yükleniyor...
            </span>
          </div>
        ) : error ? (
          <EmptyState />
        ) : (
          <UsersList users={users} />
        )}
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Admin Dashboard. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;

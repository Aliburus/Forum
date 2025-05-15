import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, usersRes, postsRes] = await Promise.all([
          axios.get("/api/admin/dashboard"),
          axios.get("/api/admin/users"),
          axios.get("/api/admin/posts"),
        ]);

        setStats(statsRes.data.stats);
        setUsers(statsRes.data.recentUsers);
        setPosts(statsRes.data.recentPosts);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 403) {
          navigate("/");
        }
        console.error("Dashboard verisi alınamadı:", error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Kullanıcı silinemedi:", error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Bu gönderiyi silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`/api/admin/posts/${postId}`);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error("Gönderi silinemedi:", error);
      }
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      await axios.patch(`/api/admin/users/${userId}/role`, {
        userType: newRole,
      });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, userType: newRole } : user
        )
      );
    } catch (error) {
      console.error("Kullanıcı rolü güncellenemedi:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Toplam Kullanıcı</h2>
          <p className="text-3xl font-bold">{stats?.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Toplam Gönderi</h2>
          <p className="text-3xl font-bold">{stats?.totalPosts}</p>
        </div>
      </div>

      {/* Son Kullanıcılar */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Son Kullanıcılar</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Kullanıcı Adı</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          handleToggleRole(user._id, user.userType)
                        }
                        className={`px-3 py-1 rounded ${
                          user.userType === "admin"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        } text-white`}
                      >
                        {user.userType === "admin" ? "Admin" : "Kullanıcı"}
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Son Gönderiler */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Son Gönderiler</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Başlık</th>
                  <th className="px-4 py-2">Yazar</th>
                  <th className="px-4 py-2">Tarih</th>
                  <th className="px-4 py-2">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">{post.author?.username}</td>
                    <td className="px-4 py-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

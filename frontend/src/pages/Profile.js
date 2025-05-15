import React, { useEffect, useState } from "react";
import {
  getProfile,
  changePassword,
  logoutUser,
} from "../services/userServices";
import {
  getPostsForUser,
  updatePost,
  deletePost,
} from "../services/postServices"; // updatePost ve deletePost'u ekledik
import { useNavigate } from "react-router-dom";
import { Calendar, ShieldClose, Lock, Send } from "lucide-react";
import Post from "../components/Post"; // Post bileşenini kullanalım
import Modal from "../components/Modal"; // Modal bileşenini ekliyoruz

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]); // Kullanıcının paylaşımlarını saklayacağız
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açık mı kontrolü
  const [selectedPostId, setSelectedPostId] = useState(null); // Seçilen postun ID'si
  const [newContent, setNewContent] = useState(""); // Yeni içerik
  const navigate = useNavigate();

  useEffect(() => {
    // Profil bilgilerini ve paylaşımları aynı anda alıyoruz
    const fetchProfile = async () => {
      try {
        const profileResponse = await getProfile();
        setProfile(profileResponse.data);
        const postsResponse = await getPostsForUser();
        setPosts(postsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Profil bilgileri veya paylaşımlar alınamadı.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Şifre değiştirme fonksiyonu
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifreler eşleşmiyor");
      return;
    }
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess("Şifre başarıyla değiştirildi");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (err) {
      setPasswordError("Şifre değiştirme işlemi başarısız");
    }
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = async () => {
    try {
      await logoutUser(); // Çıkış işlemi
      navigate("/login"); // Çıkış yaptıktan sonra login sayfasına yönlendir
    } catch (err) {
      console.error("Çıkış hatası:", err);
      setError("Çıkış işlemi sırasında bir hata oluştu.");
    }
  };

  const handleUpdatePost = async (id, updatedContent) => {
    try {
      const updatedPost = await updatePost(id, updatedContent); // content yerine sadece content gönderiyoruz
      setPosts(
        posts.map((post) => (post._id === id ? updatedPost.data : post))
      );
      setIsModalOpen(false); // Modalı kapat
      setNewContent(""); // İçeriği temizle
    } catch (err) {
      setError("Post güncellenirken bir hata oluştu.");
    }
  };

  // Post silme fonksiyonu
  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      setError("Post silinirken bir hata oluştu.");
    }
  };

  // Modalı açma fonksiyonu
  const openModal = (postId, content) => {
    setSelectedPostId(postId);
    setNewContent(content);
    setIsModalOpen(true); // Modalı aç
  };

  // Modalı kapama fonksiyonu
  const closeModal = () => {
    setIsModalOpen(false); // Modalı kapat
    setNewContent(""); // İçeriği temizle
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profil Bilgileri */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-medium">
                {profile?.name?.[0] || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile?.name || "Kullanıcı"}
                </h2>
                <p className="text-gray-500">{profile?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ShieldClose className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kullanıcı Tipi</p>
                  <p className="font-medium text-gray-900">
                    {profile?.userType}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Calendar className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Üyelik Tarihi</p>
                  <p className="font-medium text-gray-900">
                    {new Date(profile?.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Şifre Değiştirme */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Lock className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Şifre Değiştir
              </h3>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre Tekrar
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {passwordError && (
                <div className="text-red-500 text-sm">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="text-green-500 text-sm">{passwordSuccess}</div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-xl py-3 flex items-center justify-center space-x-2 hover:shadow-md transition-all duration-200"
              >
                <span>Şifreyi Değiştir</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Kullanıcı Paylaşımları */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Paylaşımlarım</h3>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="flex justify-between">
                <Post post={post} />
                <div>
                  <button
                    onClick={() => openModal(post._id, post.content)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Henüz bir paylaşım yapmadınız</p>
            </div>
          )}
        </div>

        {/* Çıkış Yap */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white rounded-xl py-3 flex items-center justify-center space-x-2 hover:shadow-md transition-all duration-200"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Modal Güncelleme */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleUpdatePost}
        content={newContent}
        setContent={setNewContent}
      />
    </div>
  );
}

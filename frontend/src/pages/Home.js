import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Home as HomeIcon, Settings, Search } from "lucide-react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getPosts } from "../services/postServices";
import { logoutUser } from "../services/userServices";
import UserCard from "../components/UserCard";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getPosts();
        setPosts(res.data);
      } catch (err) {
        console.error("Post fetch error:", err);
        setError("Gönderiler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    logoutUser().finally(() => navigate("/login"));
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 fixed h-screen bg-white border-r border-gray-200 shadow-sm">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Forum App
              </h1>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-xl font-medium transition-all duration-200 group"
            >
              <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors duration-200">
                <HomeIcon className="h-5 w-5" />
              </div>
              <span>Ana Sayfa</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </div>
              <span>Profil</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <UserCard />

            <button
              onClick={handleLogout}
              className="w-full bg-white border border-red-500 text-red-500 rounded-xl py-3 flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-72 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Ana Sayfa</h2>

            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Gönderilerde ara..."
              />
            </div>
          </div>
          <div className="mb-4">
            <CreatePost onAddPost={handleAddPost} />
          </div>
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {posts.map((post) => (
                <Post key={post._id} post={post} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

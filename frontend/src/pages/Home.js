import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      setPosts(response.data);
      setError("");
    } catch (err) {
      setError("Gönderiler yüklenirken bir hata oluştu");
      console.error("Gönderi yükleme hatası:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddPost = useCallback((newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  const handlePostUpdate = useCallback((updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  }, []);

  const handlePostDelete = useCallback((deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [posts]);

  const handleLogout = () => {
    logoutUser().finally(() => navigate("/login"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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
          </div>
          <div className="mb-4">
            <CreatePost onAddPost={handleAddPost} />
          </div>
          {!loading && !error && (
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  onUpdate={handlePostUpdate}
                  onDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default React.memo(Home);

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Home as HomeIcon,
  Bell,
  User as UserIcon,
  Search,
  MessageSquare,
  Bookmark,
  Settings,
  Hash,
  Users,
  TrendingUp,
} from "lucide-react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getPosts } from "../services/postServices";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        const normalized = response.data.map((p) => ({
          ...p,
          id: p._id || p.id,
        }));
        setPosts(normalized);
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
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddPost = (createdPost) => {
    const normalized = {
      ...createdPost,
      id: createdPost._id,
    };
    setPosts([normalized, ...posts]);
  };

  const handleLike = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };
  const handleUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 fixed h-screen bg-white border-r">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">Forum App</h1>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-primary-500 bg-primary-50 rounded-xl"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="font-medium">Ana Sayfa</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Hash className="h-6 w-6" />
              <span className="font-medium">Keşfet</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Bell className="h-6 w-6" />
              <span className="font-medium">Bildirimler</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="font-medium">Mesajlar</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Bookmark className="h-6 w-6" />
              <span className="font-medium">Kaydedilenler</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <UserIcon className="h-6 w-6" />
              <span className="font-medium">Profil</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Settings className="h-6 w-6" />
              <span className="font-medium">Ayarlar</span>
            </a>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 mr-80">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="px-4 py-3 flex justify-between items-center max-w-3xl mx-auto">
            <h1 className="text-xl font-bold">Ana Sayfa</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Ara..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-6">
          <CreatePost onAddPost={handleAddPost} />
          {loading ? (
            <p>Yükleniyor...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Post
                  key={post._id || post.id} // her ihtimale karşılık _id varsa onu kullan
                  post={post}
                  onLike={() => handleLike(post._id || post.id)}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 fixed right-0 h-screen bg-white border-l overflow-y-auto">
        <div className="p-4">
          {/* Trending Topics */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Gündemdekiler
            </h2>
            <div className="space-y-4">{/* Trending Topics List */}</div>
          </div>

          {/* Suggested Users */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Önerilen Kullanıcılar
            </h2>
            <div className="space-y-4">{/* Suggested Users List */}</div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;

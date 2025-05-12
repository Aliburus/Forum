import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Home as HomeIcon,
  Bell,
  User,
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

const Home = () => {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Ahmet Yılmaz",
      username: "@ahmet",
      content: "React ile geliştirme yapmak çok keyifli!",
      likes: 15,
      comments: 3,
      reposts: 2,
      time: "2s",
    },
    {
      id: 2,
      user: "Mehmet Demir",
      username: "@mehmet",
      content: "Yeni projeme başladım. Heyecanlıyım!",
      likes: 24,
      comments: 5,
      reposts: 7,
      time: "15d",
    },
    {
      id: 3,
      user: "Ayşe Kaya",
      username: "@ayse",
      content: "En sevdiğiniz programlama dili hangisi?",
      likes: 42,
      comments: 8,
      reposts: 12,
      time: "3h",
      poll: {
        options: [
          { text: "JavaScript", votes: 150 },
          { text: "Python", votes: 120 },
          { text: "Java", votes: 80 },
          { text: "C++", votes: 50 },
        ],
        totalVotes: 400,
        timeLeft: "2 gün",
      },
    },
    {
      id: 4,
      user: "Zeynep Yıldız",
      username: "@zeynep",
      content:
        "Bu hafta sonu kodlama maratonu düzenliyoruz. Katılmak isteyenler bana mesaj atabilir!",
      likes: 18,
      comments: 7,
      reposts: 5,
      time: "1d",
    },
  ]);

  const [trendingTopics] = useState([
    { id: 1, name: "#React", posts: "12.5K" },
    { id: 2, name: "#JavaScript", posts: "8.2K" },
    { id: 3, name: "#WebDev", posts: "5.7K" },
    { id: 4, name: "#CodingLife", posts: "3.9K" },
  ]);

  const [suggestedUsers] = useState([
    { id: 1, name: "Can Yılmaz", username: "@canyilmaz", followers: "12.5K" },
    { id: 2, name: "Elif Demir", username: "@elifdemir", followers: "8.2K" },
    { id: 3, name: "Mert Kaya", username: "@mertkaya", followers: "5.7K" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddPost = (postData) => {
    const post = {
      id: posts.length + 1,
      user: "Mevcut Kullanıcı",
      username: "@user",
      content: postData.content,
      likes: 0,
      comments: 0,
      reposts: 0,
      time: "şimdi",
      poll: postData.poll
        ? {
            options: postData.poll.options.map((opt) => ({
              text: opt,
              votes: 0,
            })),
            totalVotes: 0,
            timeLeft: `${postData.poll.duration} gün`,
          }
        : null,
    };

    setPosts([post, ...posts]);
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
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
              <User className="h-6 w-6" />
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
          <div className="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
              />
            ))}
          </div>
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
            <div className="space-y-4">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <div className="font-medium text-primary-500">
                    {topic.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {topic.posts} gönderi
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Önerilen Kullanıcılar
            </h2>
            <div className="space-y-4">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                  </div>
                  <button className="text-sm bg-primary-500 text-white px-4 py-1 rounded-full hover:bg-primary-600 transition-colors">
                    Takip Et
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;

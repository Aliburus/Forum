import { useState } from "react";
import { User, Send, Image } from "lucide-react";
import { createPost } from "../services/postServices";

const CreatePost = ({ onAddPost }) => {
  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1) Post'u oluştur
      const { data: post } = await createPost({ content: newPost }, token);

      // 2) Üst bileşene ilet
      onAddPost(post);

      // formu sıfırla
      setNewPost("");
    } catch (err) {
      console.error("API Hata Yanıtı:", err.response?.data);
      alert("Gönderi oluşturulurken bir hata oluştu, konsolu kontrol et.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 hover:shadow-md transition">
      <form onSubmit={handlePostSubmit}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-6 w-6 text-primary-500" />
            </div>
          </div>

          <div className="flex-grow">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Neler oluyor?"
              rows="2"
              className="w-full border-0 focus:ring-0 text-lg placeholder-gray-400 resize-none focus:outline-none"
            />

            <div className="flex items-center justify-between pt-3 border-t mt-3">
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-primary-50 text-primary-500 transition"
                >
                  <Image className="h-5 w-5" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!newPost.trim() || isSubmitting}
                className={`px-4 py-2 bg-primary-500 text-white rounded-full flex items-center space-x-2 hover:bg-primary-600 transition ${
                  !newPost.trim() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Gönderiliyor..." : "Gönder"}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

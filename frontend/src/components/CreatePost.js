import { useState } from "react";
import { Send, Image } from "lucide-react";
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
      const { data: post } = await createPost({ content: newPost }, token);
      onAddPost(post);
      setNewPost("");
    } catch (err) {
      console.error("API Hata Yanıtı:", err.response?.data);
      alert("Gönderi oluşturulurken bir hata oluştu, konsolu kontrol et.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <form onSubmit={handlePostSubmit} className="p-4">
        <div className="flex items-start space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white font-medium">
            U
          </div>

          <div className="flex-1">
            <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-200">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Neler oluyor?"
                className="w-full px-4 pt-3 pb-2 resize-none border-none focus:outline-none focus:ring-0 text-black dark:text-white bg-white dark:bg-gray-800"
                rows={3}
              />
              <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary-500 transition-colors duration-200"
                >
                  <Image className="h-5 w-5" />
                </button>

                <button
                  type="submit"
                  disabled={!newPost.trim() || isSubmitting}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 ${
                    newPost.trim() && !isSubmitting
                      ? "bg-gradient-to-r from-primary-500 to-indigo-600 text-white hover:shadow-md"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span className="font-medium">
                    {isSubmitting ? "Gönderiliyor..." : "Paylaş"}
                  </span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

import React, { useState, useCallback } from "react";
import { createPost } from "../services/postServices";

const CreatePost = React.memo(({ onAddPost }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!content.trim()) {
        setError("İçerik boş olamaz");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const response = await createPost({ content });
        onAddPost(response.data);
        setContent("");
      } catch (err) {
        setError("Post oluşturulurken bir hata oluştu");
      } finally {
        setIsSubmitting(false);
      }
    },
    [content, onAddPost]
  );

  const handleContentChange = useCallback(
    (e) => {
      setContent(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows="4"
            placeholder="Ne düşünüyorsun?"
            disabled={isSubmitting}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              isSubmitting || !content.trim()
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary-500 text-white hover:bg-primary-600"
            }`}
          >
            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
});

CreatePost.displayName = "CreatePost";

export default CreatePost;

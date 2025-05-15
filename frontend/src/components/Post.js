import React, { useState, useEffect, useMemo } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { likePost, dislikePost } from "../services/postServices";

const Post = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const userId = useMemo(() => localStorage.getItem("userId"), []);

  useEffect(() => {
    setLiked(post.likedBy?.includes(userId));
    setDisliked(post.dislikedBy?.includes(userId));
  }, [post.likedBy, post.dislikedBy, userId]);

  const handleLike = async () => {
    try {
      const { data } = await likePost(post._id);
      setLiked(data.likedBy.includes(userId));
      setDisliked(data.dislikedBy.includes(userId));
      onUpdate(data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const { data } = await dislikePost(post._id);
      setDisliked(data.dislikedBy.includes(userId));
      setLiked(data.likedBy.includes(userId));
      onUpdate(data);
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white font-medium">
          {post.user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {post.user?.name || "Kullanıcı Adı"}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString("tr-TR")}
          </p>
        </div>
      </div>

      <p className="text-gray-800 text-base mb-4 whitespace-pre-line">
        {post.content}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors duration-200 ${
            liked
              ? "text-red-500 bg-red-50 px-3 py-1 rounded-full"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          <span className="text-sm font-medium">{post.like || 0}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center space-x-2 transition-colors duration-200 ${
            disliked
              ? "text-blue-500 bg-blue-50 px-3 py-1 rounded-full"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          <ThumbsDown className={`h-5 w-5 ${disliked ? "fill-current" : ""}`} />
          <span className="text-sm font-medium">{post.dislike || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;

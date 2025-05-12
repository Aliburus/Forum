import { useState, useEffect } from "react";
import {
  User,
  MessageCircle,
  Repeat,
  Heart,
  ThumbsDown,
  Share2,
} from "lucide-react";
import { likePost, dislikePost } from "../services/postServices";

const Post = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Set like and dislike states based on the post data
    const userId = localStorage.getItem("userId");
    setLiked(post.likedBy?.includes(userId));
    setDisliked(post.dislikedBy?.includes(userId));
  }, [post]);

  const handleLike = async () => {
    if (!liked && !disliked) {
      try {
        const { data } = await likePost(post._id, token);
        setLiked(true);
        onUpdate({
          ...data,
          likes: data.likes,
        });
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleDislike = async () => {
    if (!disliked && !liked) {
      try {
        const { data } = await dislikePost(post._id, token);
        setDisliked(true);
        onUpdate({
          ...data,
          dislikes: data.dislikes,
        });
      } catch (error) {
        console.error("Error disliking post:", error);
      }
    }
  };

  const handleRepost = async () => {
    try {
      setReposted(!reposted);
      onUpdate({
        ...post,
        reposts: reposted ? post.reposts - 1 : post.reposts + 1,
      });
    } catch (error) {
      console.error("Error reposting:", error);
    }
  };

  const name = post.user?.name || post.user?.username || "Unknown";
  const username = post.user?.username || "";

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-6 w-6 text-primary-500" />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{name}</span>
            {username && <span className="text-gray-500">@{username}</span>}
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="mt-2 text-gray-900">{post.content}</p>

          <div className="mt-3 flex items-center space-x-8 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-primary-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments || 0}</span>
            </button>

            <button
              onClick={handleRepost}
              className={`flex items-center space-x-2 transition-colors ${
                reposted ? "text-green-500" : "hover:text-green-500"
              }`}
            >
              <Repeat className="h-5 w-5" />
              <span>{post.reposts || 0}</span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
              disabled={liked}
            >
              <Heart className="h-5 w-5" />
              <span>{post.like || 0}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center space-x-2 transition-colors ${
                disliked ? "text-blue-500" : "hover:text-blue-500"
              }`}
              disabled={disliked}
            >
              <ThumbsDown className="h-5 w-5" />
              <span>{post.dislike || 0}</span>
            </button>

            <button className="flex items-center space-x-2 hover:text-primary-500 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

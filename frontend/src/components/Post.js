import React, { useState, useCallback, useMemo, useRef } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  likePost,
  dislikePost,
  deletePost,
  updatePost,
} from "../services/postServices";
import Modal from "./Modal";

const Post = React.memo(({ post, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like || 0);
  const [dislikeCount, setDislikeCount] = useState(post.dislike || 0);
  const [isActionPending, setIsActionPending] = useState(false);
  const actionTimeoutRef = useRef(null);

  const userId = useMemo(() => localStorage.getItem("userId"), []);

  React.useEffect(() => {
    setLiked(post.likedBy?.includes(userId));
    setDisliked(post.dislikedBy?.includes(userId));
    setLikeCount(post.like || 0);
    setDislikeCount(post.dislike || 0);
  }, [post.likedBy, post.dislikedBy, post.like, post.dislike, userId]);

  const formattedDate = useMemo(() => {
    return format(new Date(post.createdAt), "d MMMM yyyy HH:mm", {
      locale: tr,
    });
  }, [post.createdAt]);

  const debouncedAction = useCallback(
    (action) => {
      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }

      if (isActionPending) return;

      setIsActionPending(true);
      actionTimeoutRef.current = setTimeout(() => {
        action();
        setIsActionPending(false);
      }, 300);
    },
    [isActionPending]
  );

  const handleLike = useCallback(async () => {
    if (isActionPending) return;

    debouncedAction(async () => {
      try {
        if (liked) {
          setLiked(false);
          setLikeCount((prev) => prev - 1);
        } else {
          setLiked(true);
          setDisliked(false);
          setLikeCount((prev) => prev + 1);
          setDislikeCount((prev) => (disliked ? prev - 1 : prev));
        }

        const { data } = await likePost(post._id);
        onUpdate(data);
      } catch (error) {
        setLiked(post.likedBy?.includes(userId));
        setDisliked(post.dislikedBy?.includes(userId));
        setLikeCount(post.like || 0);
        setDislikeCount(post.dislike || 0);
        console.error("Beğeni hatası:", error);
      }
    });
  }, [
    post._id,
    liked,
    disliked,
    onUpdate,
    userId,
    post.likedBy,
    post.dislikedBy,
    post.like,
    post.dislike,
    debouncedAction,
    isActionPending,
  ]);

  const handleDislike = useCallback(async () => {
    if (isActionPending) return;

    debouncedAction(async () => {
      try {
        if (disliked) {
          setDisliked(false);
          setDislikeCount((prev) => prev - 1);
        } else {
          setDisliked(true);
          setLiked(false);
          setDislikeCount((prev) => prev + 1);
          setLikeCount((prev) => (liked ? prev - 1 : prev));
        }

        const { data } = await dislikePost(post._id);
        onUpdate(data);
      } catch (error) {
        setLiked(post.likedBy?.includes(userId));
        setDisliked(post.dislikedBy?.includes(userId));
        setLikeCount(post.like || 0);
        setDislikeCount(post.dislike || 0);
        console.error("Beğenmeme hatası:", error);
      }
    });
  }, [
    post._id,
    liked,
    disliked,
    onUpdate,
    userId,
    post.likedBy,
    post.dislikedBy,
    post.like,
    post.dislike,
    debouncedAction,
    isActionPending,
  ]);

  const handleDelete = useCallback(async () => {
    if (window.confirm("Bu gönderiyi silmek istediğinizden emin misiniz?")) {
      try {
        await deletePost(post._id);
        onDelete(post._id);
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  }, [post._id, onDelete]);

  const handleEdit = useCallback(() => {
    setEditContent(post.content);
    setIsModalOpen(true);
  }, [post.content]);

  const handleSave = useCallback(
    async (postId, content) => {
      try {
        setIsSubmitting(true);
        const response = await updatePost(postId, { content });
        onUpdate(response.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Güncelleme hatası:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onUpdate]
  );

  const isOwner = useMemo(() => {
    return post.user?._id === userId;
  }, [post.user?._id, userId]);

  const username = useMemo(() => {
    if (!post.user) return "Kullanıcı";
    return post.user.name || post.user.username || "Kullanıcı";
  }, [post.user]);

  const userInitial = useMemo(() => {
    if (!post.user) return "U";
    const name = post.user.name || post.user.username;
    return name ? name[0].toUpperCase() : "U";
  }, [post.user]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white font-medium">
            {userInitial}
          </div>
          <div>
            <div className="font-medium text-gray-900">{username}</div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
        </div>
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-primary-500 transition-colors duration-200"
            >
              Düzenle
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              Sil
            </button>
          </div>
        )}
      </div>

      <div className="text-gray-800 mb-4">{post.content}</div>

      <div className="flex items-center space-x-4 text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
            liked
              ? "bg-primary-50 text-primary-500 hover:bg-primary-100"
              : "hover:bg-gray-100 hover:text-primary-500"
          }`}
        >
          <ThumbsUp className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          <span className="font-medium">{likeCount}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
            disliked
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "hover:bg-gray-100 hover:text-red-500"
          }`}
        >
          <ThumbsDown className={`h-5 w-5 ${disliked ? "fill-current" : ""}`} />
          <span className="font-medium">{dislikeCount}</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        content={editContent}
        setContent={setEditContent}
        postId={post._id}
      />
    </div>
  );
});

Post.displayName = "Post";

export default Post;

import { useState } from "react";
import { User, MessageCircle, Repeat, Heart, Share2 } from "lucide-react";

const Post = ({ post, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState(null);

  const handleLike = () => {
    if (!liked) {
      onLike();
      setLiked(true);
    }
  };

  const handleRepost = () => {
    setReposted(!reposted);
  };

  const handlePollVote = (optionIndex) => {
    if (!selectedPollOption) {
      setSelectedPollOption(optionIndex);
      // Here you would typically make an API call to record the vote
    }
  };

  const calculatePollPercentage = (votes, totalVotes) => {
    return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
  };

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
            <span className="font-bold">{post.user}</span>
            <span className="text-gray-500">{post.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{post.time}</span>
          </div>
          <p className="mt-2 text-gray-900">{post.content}</p>

          {post.poll && (
            <div className="mt-4 space-y-2">
              {post.poll.options.map((option, index) => {
                const percentage = calculatePollPercentage(
                  option.votes,
                  post.poll.totalVotes
                );
                return (
                  <button
                    key={index}
                    onClick={() => handlePollVote(index)}
                    disabled={selectedPollOption !== null}
                    className={`w-full p-2 rounded-lg border transition-all ${
                      selectedPollOption === index
                        ? "bg-primary-50 border-primary-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="relative">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary-100 rounded-lg transition-all"
                        style={{
                          width: `${percentage}%`,
                          opacity: selectedPollOption !== null ? 1 : 0,
                        }}
                      />
                      <div className="relative flex justify-between z-10">
                        <span>{option.text}</span>
                        {selectedPollOption !== null && (
                          <span className="font-medium">{percentage}%</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              {selectedPollOption !== null && (
                <p className="text-sm text-gray-500 mt-2">
                  {post.poll.totalVotes} oy · {post.poll.timeLeft} kaldı
                </p>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center space-x-8 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-primary-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments}</span>
            </button>
            <button
              className={`flex items-center space-x-2 ${
                reposted ? "text-green-500" : "hover:text-green-500"
              } transition-colors`}
              onClick={handleRepost}
            >
              <Repeat className="h-5 w-5" />
              <span>{reposted ? post.reposts + 1 : post.reposts}</span>
            </button>
            <button
              className={`flex items-center space-x-2 ${
                liked ? "text-red-500" : "hover:text-red-500"
              } transition-colors`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span>{liked ? post.likes + 1 : post.likes}</span>
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

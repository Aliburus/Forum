import { useState } from "react";
import { User, Send, Image, BarChart2, X } from "lucide-react";

const CreatePost = ({ onAddPost }) => {
  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1");

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim() && !showPollCreator) return;

    setIsSubmitting(true);

    const postData = {
      content: newPost,
      poll: showPollCreator
        ? {
            options: pollOptions.filter((opt) => opt.trim()),
            duration: parseInt(pollDuration),
          }
        : null,
    };

    // Simulate network request
    setTimeout(() => {
      onAddPost(postData);
      setNewPost("");
      setShowPollCreator(false);
      setPollOptions(["", ""]);
      setPollDuration("1");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 transform transition-all duration-300 hover:shadow-md">
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
              className="w-full border-0 focus:ring-0 text-lg placeholder-gray-400 resize-none focus:outline-none"
              rows="2"
            ></textarea>

            {showPollCreator && (
              <div className="mt-4 border rounded-lg p-4">
                <div className="space-y-3">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handlePollOptionChange(index, e.target.value)
                        }
                        placeholder={`Seçenek ${index + 1}`}
                        className="flex-grow p-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                      {index > 1 && (
                        <button
                          type="button"
                          onClick={() => removePollOption(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={addPollOption}
                    className="mt-3 text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    + Seçenek ekle
                  </button>
                )}

                <div className="mt-4">
                  <select
                    value={pollDuration}
                    onChange={(e) => setPollDuration(e.target.value)}
                    className="block w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="1">1 Gün</option>
                    <option value="3">3 Gün</option>
                    <option value="7">1 Hafta</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t mt-3">
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 hover:bg-primary-50 rounded-full text-primary-500 transition-colors"
                >
                  <Image className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPollCreator(!showPollCreator)}
                  className={`p-2 rounded-full transition-colors ${
                    showPollCreator
                      ? "bg-primary-100 text-primary-600"
                      : "hover:bg-primary-50 text-primary-500"
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={(!newPost.trim() && !showPollCreator) || isSubmitting}
                className={`px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors flex items-center space-x-2 ${
                  (!newPost.trim() && !showPollCreator) || isSubmitting
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

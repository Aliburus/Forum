// Modal.js
import React, { useCallback } from "react";

const Modal = React.memo(
  ({ isOpen, onClose, onSave, content, setContent, postId }) => {
    const handleSave = useCallback(() => {
      if (!postId) {
        console.error("Post ID is missing");
        return;
      }
      onSave(postId, content);
    }, [postId, content, onSave]);

    const handleContentChange = useCallback(
      (e) => {
        setContent(e.target.value);
      },
      [setContent]
    );

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Post Güncelle
            </h3>
          </div>
          <div className="mb-4">
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Yeni içeriği buraya girin"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Kapat
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;

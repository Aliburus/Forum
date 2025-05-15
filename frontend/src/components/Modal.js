// Modal.js
import React from "react";

export default function Modal({
  isOpen,
  onClose,
  onSave,
  content,
  setContent,
}) {
  if (!isOpen) return null; // Eğer modal açık değilse, hiçbir şey render edilmesin.

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Post Güncelle</h3>
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onClick={() => onSave(content)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

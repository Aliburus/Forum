import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg mt-6">
      <div className="bg-yellow-50 p-4 rounded-full mb-4">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Veri Bulunamadı
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Kullanıcı verisi yüklenirken bir sorun oluştu veya henüz kullanıcı
        bulunmuyor.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Yeniden Dene</span>
      </button>
    </div>
  );
};

export default EmptyState;

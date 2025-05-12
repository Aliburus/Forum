import React from "react";
import { LogOut, Shield, Bell } from "lucide-react";

const Header = ({ onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <LogOut className="h-4 w-4" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

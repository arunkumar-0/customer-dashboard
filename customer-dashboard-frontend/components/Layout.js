import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
 
      <aside className={`bg-blue-900 text-white p-6 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} hidden md:block`}>
        <h2 className="text-2xl font-bold mb-6">{isSidebarOpen ? "Dashboard" : "DB"}</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">📊 {isSidebarOpen && "Overview"}</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">👥 {isSidebarOpen && "Users"}</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">📈 {isSidebarOpen && "Engagement"}</li>
          </ul>
        </nav>
      </aside>

  
      <div className="flex-1 flex flex-col">
       
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 text-xl">
            <FiMenu />
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 pl-10 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
            <FiUser className="text-gray-600 text-xl cursor-pointer" />
          </div>
        </header>

      
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

import React from 'react';
import { Search, Home, Settings, Menu, PlusCircle, User } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="bg-black text-white h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-16 bg-black flex flex-col items-center py-4 border-r border-gray-800">
        <button aria-label="Menu" className="mb-8">
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="w-10 h-10 bg-gray-800 rounded-sm mb-2"></div>
        <div className="flex-grow"></div> {/* This pushes the following items to the bottom */}
        <button aria-label="Add" className="mb-4">
          <PlusCircle className="w-6 h-6 text-gray-400" />
        </button>
        <button aria-label="User Profile" className="mb-4">
          <User className="w-6 h-6 text-green-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200"
              />
            </div>
          </div>
          <button aria-label="Home" className="mr-4">
            <Home className="w-6 h-6 text-gray-400" />
          </button>
          <button aria-label="Settings">
            <Settings className="w-6 h-6 text-gray-400" />
          </button>
        </header>

        {/* Main Content */}
        <main>
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#FAF5CE]">Explore New Artists</h2>
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <button 
                  key={i} 
                  aria-label={`Explore Artist ${i}`}
                  className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center"
                >
                  <User className="w-10 h-10 text-gray-700" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-[#FAF5CE]">Explore New Albums</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  aria-label={`Explore Album ${i}`}
                  className="aspect-square bg-gray-800 rounded-lg"
                >
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Homepage;
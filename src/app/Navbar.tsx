import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ollamaUrl, setOllamaUrl] = useState("");
  const [modelName, setModelName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [top_k, setTopK] = useState(0);
  const [top_p, setTopP] = useState(0);
  const [limit, setLimit] = useState(0);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex rounded-lg items-center justify-center flex-wrap bg-slate-800 p-4 text-white text-lg">
      <div className="flex-grow">
        <button
          onClick={togglePopup}
          className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      Ollama Playground
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-slate-700 rounded shadow-lg w-[80%] min-h-[60%]">
            <div className="px-4 py-2 flex justify-between items-center">
              <h2 className="text-xl font-bold">Ollama settings</h2>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row p-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="ollamaUrl">Ollama URL</label>
                <input
                  id="ollamaUrl"
                  type="text"
                  value={ollamaUrl}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  placeholder="Ollama URL"
                />
                <label htmlFor="modelName">Model Name</label>
                <input
                  id="modelName"
                  type="text"
                  value={modelName}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="Model Name"
                />
                <label htmlFor="temperature">Temperature</label>
                <input
                  id="temperature"
                  type="number"
                  value={temperature}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="Temperature"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="top_k">Top K</label>
                <input
                  id="top_k"
                  type="number"
                  value={top_k}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setTopK(e.target.value)}
                  placeholder="Top K"
                />
                <label htmlFor="top_p">Top P</label>
                <input
                  id="top_p"
                  type="number"
                  value={top_p}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setTopP(e.target.value)}
                  placeholder="Top P"
                />
                <label htmlFor="limit">Limit</label>
                <input
                  id="limit"
                  type="number"
                  value={limit}
                  className="bg-slate-700 border-b-2 border-gray-600"
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="Limit"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

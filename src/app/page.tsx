"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect, use } from "react";
import ollama, { ChatRequest, Ollama } from "ollama/browser";

interface IMessage {
  sender: string;
  text: string;
}

const Home: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    { sender: "ai", text: "Hello, how can I assist you today?" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434");
  const [modelName, setModelName] = useState("llama2");
  const initll = { model: modelName, stream: false, messages: [] };
  const [temperature, setTemperature] = useState(0.0);
  const [top_k, setTopK] = useState(0.0);
  const [top_p, setTopP] = useState(0.0);
  const [limit, setLimit] = useState(0);
  const [history, setHistory] = useState<ChatRequest>(initll);
  const [olclient, setOlclient] = useState(new Ollama({ host: ollamaUrl }));
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setOlclient(new Ollama({ host: ollamaUrl }));
  }, [ollamaUrl]);

  useEffect(() => {
    history.model = modelName;
  }, [modelName]);

  const handleUserSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMessage = { sender: "user", text: input };
    setInput("");
    setMessages([...messages, userMessage]);
    history.messages?.push({ role: "user", content: input });
    const aiResponse = await olclient.chat({options: history.options, messages: history.messages, model: history.model, stream: false});
    history.messages?.push(aiResponse.message);
    const aiMessage = { sender: "ai", text: aiResponse.message.content };

    setMessages([...messages, userMessage, aiMessage]);
  };

  useEffect(() => {
    const update_options = history.options || {};
    if (temperature !== 0) update_options.temperature = temperature;
    if (top_k !== 0) update_options.top_k = top_k;
    if (top_p !== 0) update_options.top_p = top_p;
    if (limit !== 0) update_options.num_predict = limit;

    history.options = update_options
  }, [top_k, top_p, limit, temperature]);
  const handleClearChat = (): void => {
    setMessages([]);
    setHistory(initll);
  };
  const addAIMessage = (text: string): void => {
    setMessages([...messages, { sender: "ai", text }]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <main className="flex flex-col h-screen p-4">
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
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}                    placeholder="Temperature"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="top_k">Top K</label>
                  <input
                    id="top_k"
                    type="number"
                    value={top_k}
                    className="bg-slate-700 border-b-2 border-gray-600"
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    placeholder="Top K"
                  />
                  <label htmlFor="top_p">Top P</label>
                  <input
                    id="top_p"
                    type="number"
                    value={top_p}
                    className="bg-slate-700 border-b-2 border-gray-600"
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    placeholder="Top P"
                  />
                  <label htmlFor="limit">Limit</label>
                  <input
                    id="limit"
                    type="number"
                    value={limit}
                    className="bg-slate-700 border-b-2 border-gray-600"
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    placeholder="Limit"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="overflow-auto h-full mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg ${
              message.sender === "ai"
                ? "bg-blue-800 ml-auto"
                : "bg-green-800 mr-auto"
            } max-w-xs break-words`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleUserSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-grow p-2 rounded-l-lg border-t mr-0 border-b border-l border-gray-600 bg-slate-700"
        />
        <button
          type="submit"
          className="px-4 rounded-r-lg bg-blue-500 text-white"
        >
          Send
        </button>
        <button
          type="button"
          onClick={handleClearChat}
          className="px-4 rounded-lg bg-red-500 text-white ml-2"
        >
          Clear
        </button>
      </form>
    </main>
  );
};

export default Home;

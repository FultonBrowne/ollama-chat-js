"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import ollama, { ChatRequest } from 'ollama/browser'
import Navbar from '@/app/Navbar';


interface IMessage {
  sender: 'user' | 'ai';
  text: string;
}

const Home: React.FC = () => {
  const initll = {model: 'llama2', stream: false, messages: []}
  const [messages, setMessages] = useState<IMessage[]>([{ sender: 'ai', text: 'Hello, how can I assist you today?' }]);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<ChatRequest>(initll);
  const handleUserSubmit = async (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const userMessage = { sender: 'user', text: input };
    setInput('');
    setMessages([...messages, userMessage]);
    history.messages?.push({role: 'user', content: input});
    const aiResponse = await ollama.chat(history);
    history.messages?.push(aiResponse.message);
    const aiMessage = { sender: 'ai', text: aiResponse.message.content };

    setMessages([...messages, userMessage, aiMessage]);
  };

  const handleClearChat = (): void => {
    setMessages([]);
    setHistory(initll);
  };
  const addAIMessage = (text: string): void => {
    setMessages([...messages, { sender: 'ai', text }]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  return (
    <main className="flex flex-col h-screen p-4 bg-gray-100">
      <Navbar />
      <div className="overflow-auto h-full mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`my-2 p-3 rounded-lg ${message.sender === 'ai' ? 'bg-blue-200 ml-auto' : 'bg-green-200 mr-auto'} max-w-xs break-words`}>
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
          className="flex-grow p-2 rounded-l-lg border-t mr-0 border-b border-l border-gray-200"
        />
        <button type="submit" className="px-4 rounded-r-lg bg-blue-500 text-white">Send</button>
        <button type="button" onClick={handleClearChat} className="px-4 rounded-lg bg-red-500 text-white ml-2">Clear</button>
      </form>
    </main>
  );
}

export default Home;
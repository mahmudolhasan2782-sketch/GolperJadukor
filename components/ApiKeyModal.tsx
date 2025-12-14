import React, { useState } from 'react';
import { FeatherIcon } from './Icons';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSave(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#fffef0] max-w-md w-full rounded-lg shadow-2xl border-2 border-[#8b7355] p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#8b7355]"></div>
        
        <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full bg-[#fdf6e3] border border-[#e3d5b8] mb-4">
            <FeatherIcon className="w-8 h-8 text-[#8b7355]" />
          </div>
          <h2 className="text-2xl font-bold text-[#5c4b37]">স্বাগতম HemoWriter-এ</h2>
          <p className="text-[#8b7355] mt-2 text-sm">গল্প লেখা শুরু করতে অনুগ্রহ করে আপনার Gemini API Key প্রদান করুন।</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700 mb-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-3 border border-[#d4c4a8] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
              required
            />
          </div>

          <div className="text-xs text-gray-500 bg-[#f9f5eb] p-3 rounded border border-[#e3d5b8]">
            <p className="mb-1"><strong>কেন এটি প্রয়োজন?</strong></p>
            <p>এই অ্যাপটি Google Gemini এর মাধ্যমে গল্প লেখে। আপনার কি (Key) শুধুমাত্র আপনার ব্রাউজারে সেভ থাকবে, আমাদের সার্ভারে নয়।</p>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#8b7355] font-bold underline mt-2 inline-block hover:text-[#5c4b37]"
            >
              বিনামূল্যে Key সংগ্রহ করুন এখানে →
            </a>
          </div>

          <button
            type="submit"
            disabled={!inputKey}
            className="w-full py-3 bg-[#8b7355] text-white font-bold rounded hover:bg-[#6d5a41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            শুরু করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
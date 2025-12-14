import React, { useState } from 'react';
import { StoryParams } from '../types';
import { FeatherIcon, SparklesIcon } from './Icons';

interface StoryInputProps {
  onSubmit: (params: StoryParams) => void;
  isLoading: boolean;
}

const StoryInput: React.FC<StoryInputProps> = ({ onSubmit, isLoading }) => {
  const [characters, setCharacters] = useState('');
  const [theme, setTheme] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characters.trim() && keywords.trim()) {
      onSubmit({ characters, theme, keywords });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl border border-[#e3d5b8] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b7355] to-transparent opacity-50"></div>

      <div className="flex items-center gap-2 mb-6 text-[#8b7355]">
        <FeatherIcon className="w-6 h-6" />
        <h2 className="text-2xl font-bold">গল্পের শুরু এখান থেকেই</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="characters">
            প্রধান চরিত্রসমূহ (নাম ও সম্পর্ক)
          </label>
          <input
            id="characters"
            type="text"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            placeholder="যেমন: অনিক, তার বন্ধু রাশেদ এবং একটি বিড়াল..."
            className="w-full p-3 border border-[#d4c4a8] rounded bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="theme">
            গল্পের পরিবেশ বা পটভূমি (ঐচ্ছিক)
          </label>
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="যেমন: বর্ষার বিকেল, পুরানো লাইব্রেরি, গ্রাম বাংলা..."
            className="w-full p-3 border border-[#d4c4a8] rounded bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="keywords">
            কিছু মূল শব্দ বা ঘটনা
          </label>
          <textarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="যেমন: একটি হারানো চিঠি, হঠাৎ লোডশেডিং, রহস্যময় শব্দ..."
            rows={3}
            className="w-full p-3 border border-[#d4c4a8] rounded bg-[#fdfbf7] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all placeholder-gray-400 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !characters || !keywords}
          className={`w-full py-4 mt-4 rounded-md font-bold text-lg text-white flex items-center justify-center gap-2 transition-all shadow-md
            ${isLoading 
              ? 'bg-[#8b7355] opacity-75 cursor-wait' 
              : 'bg-gradient-to-r from-[#8b7355] to-[#6d5a41] hover:shadow-lg hover:-translate-y-0.5'
            }`}
        >
          {isLoading ? (
            <>
              <SparklesIcon className="animate-spin w-5 h-5" />
              গল্প লেখা হচ্ছে...
            </>
          ) : (
            <>
              <FeatherIcon className="w-5 h-5" />
              গল্প তৈরি করুন
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StoryInput;

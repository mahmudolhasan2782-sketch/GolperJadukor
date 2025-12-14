import React, { useState, useCallback, useEffect } from 'react';
import StoryInput from './components/StoryInput';
import StoryReader from './components/StoryReader';
import ApiKeyModal from './components/ApiKeyModal';
import { generateBengaliStoryStream } from './services/geminiService';
import { StoryParams, StoryState } from './types';
import { BookOpenIcon } from './components/Icons';
import { GenerateContentResponse } from '@google/genai';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [storyState, setStoryState] = useState<StoryState>({
    content: '',
    isLoading: false,
    isComplete: false,
    error: null,
  });

  // Check for saved key on load
  useEffect(() => {
    const savedKey = localStorage.getItem('hemowriter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowKeyModal(true);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    localStorage.setItem('hemowriter_api_key', key);
    setApiKey(key);
    setShowKeyModal(false);
  };

  const handleGenerateStory = useCallback(async (params: StoryParams) => {
    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }

    setStoryState({
      content: '',
      isLoading: true,
      isComplete: false,
      error: null,
    });

    try {
      const stream = await generateBengaliStoryStream(params, apiKey);

      for await (const chunk of stream) {
        const chunkResponse = chunk as GenerateContentResponse;
        const text = chunkResponse.text;
        
        if (text) {
            setStoryState((prev) => ({
                ...prev,
                content: prev.content + text,
            }));
        }
      }

      setStoryState((prev) => ({
        ...prev,
        isLoading: false,
        isComplete: true,
      }));

    } catch (error) {
      console.error(error);
      let errorMessage = 'দুঃখিত, গল্পটি তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
      
      // Basic check for API key errors
      const errString = String(error);
      if (errString.includes('401') || errString.includes('INVALID_ARGUMENT') || errString.includes('API key')) {
        errorMessage = 'আপনার API Key টি সঠিক নয় বা মেয়াদোত্তীর্ণ। দয়া করে পেজটি রিফ্রেশ করে নতুন Key দিন।';
        localStorage.removeItem('hemowriter_api_key');
        setApiKey(null);
        setTimeout(() => setShowKeyModal(true), 2000);
      }

      setStoryState((prev) => ({
        ...prev,
        isLoading: false,
        isComplete: false,
        error: errorMessage,
      }));
    }
  }, [apiKey]);

  const handleReset = () => {
    setStoryState({
        content: '',
        isLoading: false,
        isComplete: false,
        error: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-12">
      {/* API Key Modal */}
      {showKeyModal && <ApiKeyModal onSave={handleSaveKey} />}

      {/* Header / Nav */}
      <header className="bg-[#8b7355] text-[#fdf6e3] shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#fdf6e3] p-2 rounded-full">
                <BookOpenIcon className="w-6 h-6 text-[#8b7355]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">HemoWriter</h1>
              <p className="text-xs opacity-90 font-light">আপনার কল্পনায়, কৃত্রিম বুদ্ধিমত্তার ছোঁয়া</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro Text */}
        {!storyState.content && !storyState.isLoading && (
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5c4b37] mb-4">
                    আপনার ভাবনা, আমাদের গল্প
                </h2>
                <p className="text-lg text-[#8b7355] max-w-xl mx-auto leading-relaxed">
                    মাত্র কয়েকটি শব্দ আর চরিত্রের নাম দিন, আমরা আপনাকে উপহার দেব একটি সম্পূর্ণ, বাস্তবসম্মত এবং চমৎকার বাংলা গল্প।
                </p>
            </div>
        )}

        {/* Input Form */}
        {(!storyState.isComplete || !storyState.content) && (
            <div className={`transition-all duration-500 ${storyState.content ? 'opacity-50 pointer-events-none filter blur-[1px]' : 'opacity-100'}`}>
                <StoryInput onSubmit={handleGenerateStory} isLoading={storyState.isLoading} />
            </div>
        )}

        {/* Error Message */}
        {storyState.error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-center">
                {storyState.error}
            </div>
        )}

        {/* Story Display */}
        <StoryReader 
            content={storyState.content} 
            isComplete={storyState.isComplete}
            onReset={handleReset}
        />

      </main>

      {/* Simple Footer */}
      <footer className="text-center text-[#8b7355] text-sm py-6 opacity-60">
        &copy; {new Date().getFullYear()} HemoWriter | @Hemontu Incorporation এর একটি ডিজিটাল সার্ভিস
      </footer>
    </div>
  );
};

export default App;
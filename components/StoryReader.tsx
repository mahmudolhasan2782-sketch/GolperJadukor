import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpenIcon, RotateCwIcon } from './Icons';

interface StoryReaderProps {
  content: string;
  isComplete: boolean;
  onReset: () => void;
}

const StoryReader: React.FC<StoryReaderProps> = ({ content, isComplete, onReset }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic as content streams in, but only if user is near bottom
  useEffect(() => {
    if (bottomRef.current && !isComplete) {
       bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [content, isComplete]);

  if (!content) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in-up">
      <div className="bg-[#fffef0] shadow-2xl rounded-sm border-l-4 border-[#8b7355] overflow-hidden relative min-h-[60vh]">
        {/* Paper Texture Effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
        
        {/* Header inside the book page */}
        <div className="p-8 pb-4 border-b border-gray-200 border-dashed flex justify-between items-center opacity-60">
            <span className="text-xs tracking-widest uppercase font-serif text-[#8b7355]">নতুন ছোটগল্প</span>
            <BookOpenIcon className="w-4 h-4 text-[#8b7355]" />
        </div>

        {/* Story Content */}
        <div className="p-8 md:p-12 text-gray-800 leading-relaxed text-lg md:text-xl text-justify font-serif selection:bg-[#e3d5b8] selection:text-[#5c4b37]">
          <div className="prose prose-lg prose-p:my-4 prose-headings:font-bold prose-headings:text-[#5c4b37] max-w-none">
             <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div ref={bottomRef} />
          
          {/* Loading Indicator at bottom if still streaming */}
          {!isComplete && (
            <div className="mt-4 flex justify-center">
              <span className="inline-block w-2 h-2 bg-[#8b7355] rounded-full animate-bounce mx-1"></span>
              <span className="inline-block w-2 h-2 bg-[#8b7355] rounded-full animate-bounce mx-1 delay-100"></span>
              <span className="inline-block w-2 h-2 bg-[#8b7355] rounded-full animate-bounce mx-1 delay-200"></span>
            </div>
          )}
        </div>

        {/* Footer / Reset Action */}
        {isComplete && (
          <div className="p-8 pt-4 border-t border-gray-200 border-dashed flex justify-center bg-[#fcf9f2]">
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-6 py-2 text-[#8b7355] border border-[#8b7355] rounded hover:bg-[#8b7355] hover:text-white transition-colors"
            >
              <RotateCwIcon className="w-4 h-4" />
              নতুন গল্প লিখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReader;

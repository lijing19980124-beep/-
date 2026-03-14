import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../types';

interface RevealProps {
  character: Character;
  onReset: () => void;
}

const Reveal: React.FC<RevealProps> = ({ character, onReset }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl bg-[#fdfbf7] rounded-sm shadow-2xl relative overflow-hidden"
        style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
          border: '1px solid #dcd3c6'
        }}
      >
        {/* Scroll top/bottom decorative bars */}
        <div className="h-4 w-full bg-[#8b7355] absolute top-0 left-0"></div>
        <div className="h-4 w-full bg-[#8b7355] absolute bottom-0 left-0"></div>

        <div className="p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          {/* Left: Character Name & Poem */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h4 className="text-[#1661ab] text-lg tracking-[0.3em] mb-2 font-semibold">金陵十二钗正册</h4>
              <h1 className="text-6xl md:text-8xl font-black text-[#9d2933] mb-8 tracking-widest" style={{ textShadow: '2px 2px 0px rgba(243, 229, 216, 0.8)' }}>
                {character.name}
              </h1>
              
              <div className="mb-8 border-l-4 border-[#c03f3c] pl-6 py-2">
                <p className="text-xl md:text-2xl text-[#333333] leading-loose font-medium whitespace-pre-line">
                  {character.poem}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                {character.tags.map((tag, idx) => (
                  <span key={idx} className="px-4 py-1.5 border border-[#1661ab]/40 text-[#1661ab] rounded-full text-sm tracking-widest bg-[#1661ab]/5">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[#555555] text-lg leading-relaxed text-justify">
                {character.description}
              </p>
            </motion.div>
          </div>

          {/* Right: Ink wash poster */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1, duration: 1.5 }}
            className="w-full md:w-1/2 aspect-[3/4] rounded-sm relative overflow-hidden border border-[#dcd3c6] shadow-inner flex items-center justify-center bg-[#f3e5d8]/50"
            style={{ backgroundColor: character.color || '#f3e5d8' }}
          >
            {character.imageUrl ? (
              <img 
                src={character.imageUrl} 
                alt={character.name} 
                className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            ) : (
              <>
                {/* Placeholder for AI generated image */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at center, #333 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}></div>
                
                <div className="text-center z-10 p-6">
                   <div className="w-16 h-16 mx-auto border border-[#9d2933] rounded-full flex items-center justify-center mb-4">
                     <span className="text-[#9d2933] font-bold text-xl">印</span>
                   </div>
                   <p className="text-[#555555] tracking-widest text-sm" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', height: '120px' }}>
                     水墨氤氲 绛珠仙草之灵
                   </p>
                </div>
              </>
            )}
          </motion.div>

        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onReset}
        className="mt-12 px-8 py-3 bg-transparent border border-[#555555] text-[#555555] rounded-full tracking-widest hover:bg-[#555555] hover:text-[#f3e5d8] transition-colors"
      >
        重返太虚幻境
      </motion.button>
    </div>
  );
};

export default Reveal;

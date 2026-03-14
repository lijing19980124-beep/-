import React from 'react';
import { motion } from 'framer-motion';

interface GateProps {
  onEnter: () => void;
}

const Gate: React.FC<GateProps> = ({ onEnter }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto z-10"
      >
        <h2 className="text-[#9d2933] text-xl md:text-2xl tracking-[0.3em] mb-4 font-semibold">
          神游太虚幻境，寻访金陵前缘
        </h2>
        <h1 className="text-5xl md:text-7xl font-black text-[#333333] mb-8 leading-tight tracking-widest" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          测测你是大观园中的<br/>哪位女儿？
        </h1>
        
        <p className="text-[#555555] text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto">
          假作真时真亦假，无为有处有还无。<br/>
          一炷香的时间，几道问心之题，<br/>
          照见你灵魂深处的红楼本命。
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-12 py-4 bg-[#c03f3c] text-[#f3e5d8] rounded-full text-xl font-bold tracking-widest shadow-lg shadow-[#c03f3c]/30 border border-[#9d2933] hover:bg-[#9d2933] transition-colors"
        >
          步入园中
        </motion.button>
      </motion.div>

      {/* Decorative vertical text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute right-8 top-1/4 hidden lg:block"
        style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
      >
        <span className="text-2xl tracking-[0.5em] text-[#9d2933] opacity-60 font-semibold">
          满纸荒唐言一把辛酸泪
        </span>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute left-8 bottom-1/4 hidden lg:block"
        style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
      >
        <span className="text-2xl tracking-[0.5em] text-[#9d2933] opacity-60 font-semibold">
          都云作者痴谁解其中味
        </span>
      </motion.div>
    </div>
  );
};

export default Gate;

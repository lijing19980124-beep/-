import React from 'react';
import { motion } from 'framer-motion';

const DestinyWheel: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-dashed border-[#c03f3c]/40 flex items-center justify-center mb-12 relative"
      >
        {/* Inner decorative circle */}
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#1661ab]/30 absolute"></div>
        
        {/* Center text */}
        <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="text-[#9d2933] font-bold text-2xl tracking-widest"
        >
          太虚幻境
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4 tracking-widest">
          正在翻阅金陵十二钗正册
        </h2>
        <p className="text-[#555555] text-lg tracking-widest">
          寻访卿之宿命...
        </p>
      </motion.div>
    </div>
  );
};

export default DestinyWheel;

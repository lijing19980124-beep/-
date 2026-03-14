import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "若你在园中见落花满地，你会……",
    options: [
      { text: "叹落红无情，收拢花瓣葬于净土。", trait: "daiyu" },
      { text: "觉落花亦是景，不如收集起来做香囊。", trait: "baochai" },
      { text: "命丫鬟们速速打扫干净，免得误了贵客赏玩。", trait: "xifeng" },
      { text: "趁着花瓣未败，卧于花丛中酣睡一场。", trait: "xiangyun" }
    ]
  },
  {
    id: 2,
    text: "海棠诗社初结，众人推举你作诗，你偏爱哪种意境？",
    options: [
      { text: "半卷湘帘半掩门，孤标傲世偕谁隐。", trait: "daiyu" },
      { text: "珍重芳姿昼掩门，淡极始知花更艳。", trait: "baochai" },
      { text: "作诗太费神，不如我来出资做东道主。", trait: "xifeng" },
      { text: "萧疏篱畔科头坐，清冷香中抱膝吟。", trait: "xiangyun" }
    ]
  },
  {
    id: 3,
    text: "得了一件稀罕的西洋进贡之物，你作何打算？",
    options: [
      { text: "随手搁置，若有知己来访，便赠与他把玩。", trait: "daiyu" },
      { text: "妥善收好，待长辈生辰时作为贺礼献上。", trait: "baochai" },
      { text: "仔细端详其价值，盘算着如何用它打点关系。", trait: "xifeng" },
      { text: "立刻拆开研究，拉着姐妹们一起看个新鲜。", trait: "xiangyun" }
    ]
  }
];

interface PoetryClubProps {
  onComplete: (answers: Record<number, string>) => void;
}

const PoetryClub: React.FC<PoetryClubProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleOptionSelect = (trait: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentIndex].id]: trait };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 400);
    } else {
      setTimeout(() => onComplete(newAnswers), 400);
    }
  };

  const question = QUESTIONS[currentIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        {/* Progress indicator */}
        <div className="flex justify-center gap-3 mb-12">
          {QUESTIONS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 transition-all duration-500 rounded-full ${idx <= currentIndex ? 'w-12 bg-[#c03f3c]' : 'w-4 bg-[#d6ecf0]'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[#c03f3c]/20 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-8 leading-relaxed text-center">
              {question.text}
            </h3>

            <div className="flex flex-col gap-4">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(192, 63, 60, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option.trait)}
                  className="p-4 md:p-6 text-left rounded-xl border border-[#c03f3c]/30 text-[#555555] hover:text-[#9d2933] hover:border-[#9d2933] transition-all text-lg"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PoetryClub;

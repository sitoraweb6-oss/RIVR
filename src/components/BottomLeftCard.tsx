import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function BottomLeftCard() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bottom-24 left-10 p-5 rounded-[2.2rem] bg-white/30 backdrop-blur-xl border border-white/40 flex flex-col gap-3 min-w-[180px] w-fit shadow-xl"
    >
      {/* Top text block */}
      <div className="flex flex-col">
        <span className="text-3xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight">
          5.2K
        </span>
        <span className="text-[10px] font-medium text-[rgba(30,50,90,0.6)] uppercase tracking-wider">
          Active Yielders
        </span>
      </div>

      {/* Join Discord button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.open('https://discord.gg', '_blank', 'noopener,noreferrer')}
        className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start shadow-sm cursor-pointer group"
      >
        <div className="bg-[rgba(30,50,90,0.1)] p-1 rounded-full text-[rgba(30,50,90,0.9)] flex items-center justify-center transition-colors group-hover:bg-[rgba(30,50,90,0.15)]">
          <ArrowUpRight className="w-3 h-3" />
        </div>
        <span className="text-[13px] font-medium text-[rgba(30,50,90,0.9)]">
          Join Discord
        </span>
      </motion.button>
    </motion.div>
  );
}

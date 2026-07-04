import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/20 mx-auto mb-4 w-fit"
    >
      <Sparkles className="w-4 h-4 text-[rgba(30,50,90,0.8)]" />
      <span className="text-[13px] font-medium text-[rgba(30,50,90,0.9)] uppercase tracking-wide">Fluid Staking</span>
    </motion.div>
  );
}

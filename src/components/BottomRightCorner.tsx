import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function BottomRightCorner() {
  const handleDocClick = () => {
    // Scroll down to Ecosystem or trigger docs view
    const el = document.getElementById('ecosystem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onClick={handleDocClick}
      className="absolute bottom-0 right-0 p-6 pt-8 pl-14 bg-[#f0f0f0] rounded-tl-[3.5rem] flex items-center gap-6 cursor-pointer group"
    >
      {/* CRITICAL Corner Mask: Top intersection mask */}
      <div className="absolute -top-[3.5rem] right-0 w-[3.5rem] h-[3.5rem] pointer-events-none">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/>
        </svg>
      </div>

      {/* CRITICAL Corner Mask: Left intersection mask */}
      <div className="absolute bottom-0 -left-[3.5rem] w-[3.5rem] h-[3.5rem] pointer-events-none">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/>
        </svg>
      </div>

      {/* Content: Circle Icon */}
      <div className="bg-[rgba(30,50,90,0.05)] w-14 h-14 rounded-full flex items-center justify-center border border-[rgba(30,50,90,0.1)] shadow-inner transition-transform group-hover:scale-110 group-hover:bg-[rgba(30,50,90,0.1)]">
        <ArrowUpRight className="w-6 h-6 text-[rgba(30,50,90,0.8)]" />
      </div>

      {/* Content: Info column */}
      <div className="flex flex-col">
        <span className="text-[18px] font-medium text-[rgba(30,50,90,0.95)]">
          Documentation
        </span>
        <div className="flex items-center gap-1 text-[rgba(30,50,90,0.6)] cursor-pointer hover:text-[rgba(30,50,90,0.8)] transition-colors">
          <span className="text-[14px] font-normal">Library</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

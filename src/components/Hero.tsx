import { motion } from 'motion/react';
import Navbar from './Navbar';
import HeroBadge from './HeroBadge';
import BottomLeftCard from './BottomLeftCard';
import BottomRightCorner from './BottomRightCorner';

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[2.5rem] bg-white/10 shadow-2xl overflow-hidden flex flex-col items-center group">
        {/* The Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0 opacity-90"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
            type="video/mp4"
          />
        </video>

        {/* The Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-28 md:pb-0">
          <Navbar />

          {/* Text Container */}
          <div className="w-full flex flex-col items-center pt-2 px-6 text-center max-w-4xl z-10 my-auto">
            <HeroBadge />
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-[rgba(30,50,90,0.85)] mb-2 tracking-tight leading-[1.05]"
            >
              Fluid Asset Streams
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-[rgba(30,50,90,0.7)] leading-relaxed max-w-xl font-normal"
            >
              Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.
            </motion.p>
          </div>

          {/* Decorative subtle indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 z-10 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-[rgba(30,50,90,0.8)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(30,50,90,0.3)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(30,50,90,0.3)]" />
          </div>

          {/* Bottom Left Card */}
          <BottomLeftCard />

          {/* Bottom Right Corner */}
          <BottomRightCorner />
        </div>
      </section>
    </div>
  );
}

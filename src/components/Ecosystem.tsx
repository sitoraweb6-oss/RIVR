import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export default function Ecosystem() {
  const integrationPoints = [
    'Unified cross-chain liquidity pool routing across 6 EVM and non-EVM chains.',
    'Multi-chain yield auto-compounding without manual gas replenishment.',
    'Instant gasless deposits via scheduled batching execution blocks.'
  ];

  return (
    <section id="ecosystem" className="w-full max-w-[1536px] mx-auto px-4 md:px-8 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-6"
        >
          {/* Glass Pill Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[rgba(30,50,90,0.8)]" />
            <span className="text-[12px] font-medium text-[rgba(30,50,90,0.9)]">Seamless Integration</span>
          </div>

          <h2 className="text-4xl md:text-6xl text-[rgba(30,50,90,0.9)] leading-[1.1] mb-2 font-normal tracking-tight">
            Liquidity without borders.
          </h2>

          <p className="text-base md:text-lg text-[rgba(30,50,90,0.7)] leading-relaxed max-w-xl">
            Connect your wallet and instantly tap into cross-chain liquidity. RIVR abstracts the complexity of bridging and staking, giving you a unified, fluid experience.
          </p>

          {/* List items with check icons */}
          <div className="flex flex-col gap-4 mt-4 w-full">
            {integrationPoints.map((text, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-white/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-[rgba(30,50,90,0.8)] shadow-sm shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm md:text-base text-[rgba(30,50,90,0.75)] leading-normal">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Visual: Elegant floating elements inside card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="h-[400px] md:h-[500px] w-full rounded-[2.5rem] bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-3xl border border-white/50 relative p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between"
        >
          {/* Decorative background visual elements */}
          <div className="absolute inset-0 bg-radial-gradient from-[rgba(30,50,90,0.04)] to-transparent opacity-60 pointer-events-none" />

          {/* Core Hub Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-[rgba(30,50,90,0.15)] flex items-center justify-center animate-[spin_40s_linear_infinite]">
            <div className="w-36 h-36 rounded-full border border-dashed border-[rgba(30,50,90,0.1)] flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
              <div className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
                <span className="font-bold tracking-tighter text-3xl text-[rgba(30,50,90,0.95)]">RIVR</span>
              </div>
            </div>
          </div>

          {/* Floating Asset Card 1: ETH Streaming */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              x: [0, 8, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-10 left-10 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg flex items-center gap-3 w-fit"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[rgba(30,50,90,0.9)]">ETH Stream Active</p>
              <p className="text-[10px] text-green-600 font-semibold mt-0.5">Streaming 0.41 ETH/day</p>
            </div>
          </motion.div>

          {/* Floating Asset Card 2: Safe Auto-compound */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className="absolute bottom-12 left-12 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg flex items-center gap-3 w-fit"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[rgba(30,50,90,0.9)]">Auto-Compounding</p>
              <p className="text-[10px] text-[rgba(30,50,90,0.5)] mt-0.5">Every block (~12s)</p>
            </div>
          </motion.div>

          {/* Floating Asset Card 3: Arbitrum Vault */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, -6, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
            className="absolute top-20 right-8 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg flex items-center gap-3 w-fit"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[rgba(30,50,90,0.9)]">Cross-Chain Router</p>
              <p className="text-[10px] text-[rgba(30,50,90,0.5)] mt-0.5">Arbitrum Nitro Gasless</p>
            </div>
          </motion.div>

          {/* Interactive Stat badge on the card itself */}
          <div className="mt-auto ml-auto z-10 p-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/30 text-[10px] text-[rgba(30,50,90,0.6)] font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            Network Safe Protocols Verified
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VaultConfig } from '../types';
import { ArrowUpRight, TrendingUp, ShieldCheck, HelpCircle, X, ChevronRight, Check, Award, Flame, Info } from 'lucide-react';

export default function Vaults() {
  const [selectedVault, setSelectedVault] = useState<VaultConfig | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [filterRisk, setFilterRisk] = useState<string>('All');
  const [isAutoCompoundingOnly, setIsAutoCompoundingOnly] = useState(false);

  const vaultsData: VaultConfig[] = [
    {
      pair: 'RIVR-ETH',
      tvl: '$34.8M',
      apy: '24.5%',
      capacity: 82,
      risk: 'Low',
      isAutoCompounding: true,
      baseToken: 'RIVR',
      quoteToken: 'ETH',
      network: 'Ethereum'
    },
    {
      pair: 'USDC-USDT',
      tvl: '$112.3M',
      apy: '8.5%',
      capacity: 95,
      risk: 'Low',
      isAutoCompounding: true,
      baseToken: 'USDC',
      quoteToken: 'USDT',
      network: 'Ethereum'
    },
    {
      pair: 'RIVR-SOL',
      tvl: '$12.4M',
      apy: '28.4%',
      capacity: 61,
      risk: 'Medium',
      isAutoCompounding: false,
      baseToken: 'RIVR',
      quoteToken: 'SOL',
      network: 'Solana'
    },
    {
      pair: 'WBTC-RIVR',
      tvl: '$45.1M',
      apy: '18.2%',
      capacity: 74,
      risk: 'Low',
      isAutoCompounding: true,
      baseToken: 'WBTC',
      quoteToken: 'RIVR',
      network: 'Arbitrum'
    },
    {
      pair: 'RIVR-ARB',
      tvl: '$9.2M',
      apy: '32.1%',
      capacity: 48,
      risk: 'Medium',
      isAutoCompounding: false,
      baseToken: 'RIVR',
      quoteToken: 'ARB',
      network: 'Arbitrum'
    },
    {
      pair: 'RIVR-OP Leverage',
      tvl: '$5.6M',
      apy: '48.6%',
      capacity: 35,
      risk: 'High',
      isAutoCompounding: true,
      baseToken: 'RIVR',
      quoteToken: 'OP',
      network: 'Optimism'
    }
  ];

  // Filters logic
  const filteredVaults = vaultsData.filter((v) => {
    if (filterRisk !== 'All' && v.risk !== filterRisk) return false;
    if (isAutoCompoundingOnly && !v.isAutoCompounding) return false;
    return true;
  });

  const calculateDailyYield = (amount: number, apyStr: string) => {
    const apy = parseFloat(apyStr.replace('%', '')) / 100;
    const dailyRate = Math.pow(1 + apy, 1 / 365) - 1;
    return (amount * dailyRate).toFixed(3);
  };

  const calculateYearlyYield = (amount: number, apyStr: string) => {
    const apy = parseFloat(apyStr.replace('%', '')) / 100;
    return (amount * apy).toFixed(2);
  };

  const handleDepositSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!depositAmount || isNaN(Number(depositAmount))) return;
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setSelectedVault(null);
      setDepositAmount('1000');
    }, 3000);
  };

  return (
    <section id="vaults" className="w-full max-w-[1536px] mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col gap-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[rgba(30,50,90,0.6)] font-semibold text-xs uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-[rgba(30,50,90,0.8)]" />
            Maximizing Capital Efficiency
          </div>
          <h2 className="text-3xl md:text-5xl text-[rgba(30,50,90,0.9)] tracking-tight font-normal">
            Trending Vaults
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Risk Filters */}
          <div className="flex rounded-xl bg-white/40 p-1 border border-white/50 backdrop-blur-md">
            {['All', 'Low', 'Medium', 'High'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  filterRisk === risk
                    ? 'bg-[rgba(30,50,90,0.85)] text-white shadow-sm'
                    : 'text-[rgba(30,50,90,0.6)] hover:text-[rgba(30,50,90,0.9)]'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          {/* Auto Compounding Toggle */}
          <button
            onClick={() => setIsAutoCompoundingOnly(!isAutoCompoundingOnly)}
            className={`px-4 py-2 text-xs rounded-full font-medium border transition-all cursor-pointer ${
              isAutoCompoundingOnly
                ? 'bg-white border-[rgba(30,50,90,0.3)] text-[rgba(30,50,90,0.9)]'
                : 'bg-white/40 border-white/20 text-[rgba(30,50,90,0.6)] hover:text-[rgba(30,50,90,0.9)]'
            }`}
          >
            Auto-Compound Only
          </button>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredVaults.map((vault) => (
            <motion.div
              layout
              key={vault.pair}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white/40 backdrop-blur-2xl rounded-[2rem] p-6 border border-white/40 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.02)] relative overflow-hidden group"
            >
              {/* Radial gradient blob inside top-right for glass effect */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[rgba(30,50,90,0.15)] to-transparent blur-xl group-hover:from-[rgba(30,50,90,0.25)] transition-all duration-500 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Overlapping token circles */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-[#f0f0f0] shadow-sm z-10 text-[10px] font-bold text-[rgba(30,50,90,0.8)]">
                      {vault.baseToken}
                    </div>
                    <div className="w-10 h-10 bg-[rgba(30,50,90,0.15)] rounded-full flex items-center justify-center border border-white shadow-sm -ml-4 z-0 text-[10px] font-bold text-[rgba(30,50,90,0.6)]">
                      {vault.quoteToken}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-[rgba(30,50,90,0.9)] flex items-center gap-1.5">
                      {vault.pair}
                    </h3>
                    <span className="text-[10px] bg-[rgba(30,50,90,0.06)] border border-[rgba(30,50,90,0.08)] px-2 py-0.5 rounded text-[rgba(30,50,90,0.6)] font-semibold uppercase tracking-wider">
                      {vault.network}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    vault.risk === 'Low'
                      ? 'bg-green-500/10 text-green-700'
                      : vault.risk === 'Medium'
                      ? 'bg-amber-500/10 text-amber-700'
                      : 'bg-rose-500/10 text-rose-700'
                  }`}>
                    {vault.risk} Risk
                  </span>
                  {vault.isAutoCompounding && (
                    <span className="text-[9px] text-[rgba(30,50,90,0.5)] flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-green-500" /> Auto-Compound
                    </span>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-end justify-between py-2 border-y border-[rgba(30,50,90,0.05)]">
                <div>
                  <span className="text-[10px] text-[rgba(30,50,90,0.5)] uppercase tracking-wider block mb-1">
                    ESTIMATED APY
                  </span>
                  <span className="text-2xl md:text-3xl font-semibold text-[rgba(30,50,90,0.9)] flex items-center gap-1">
                    {vault.apy}
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[rgba(30,50,90,0.5)] uppercase tracking-wider block mb-1">
                    TOTAL VALUE LOCKED
                  </span>
                  <span className="text-sm font-medium text-[rgba(30,50,90,0.8)]">
                    {vault.tvl}
                  </span>
                </div>
              </div>

              {/* Capacity indicator */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-[rgba(30,50,90,0.6)]">
                  <span>Vault Capacity Fill</span>
                  <span className="font-semibold">{vault.capacity}%</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(30,50,90,0.06)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${vault.capacity}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[rgba(30,50,90,0.4)] to-[rgba(30,50,90,0.85)] rounded-full"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedVault(vault)}
                className="w-full bg-[rgba(30,50,90,0.8)] text-white rounded-full py-3 mt-2 hover:bg-[rgba(30,50,90,1)] transition-colors text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow"
              >
                Deposit Now
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Simulated Interactive Deposit Modal via AnimatePresence */}
      <AnimatePresence>
        {selectedVault && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVault(null)}
              className="fixed inset-0 bg-black/25 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-[2.5rem] bg-white/80 backdrop-blur-3xl border border-white/50 p-6 md:p-8 shadow-2xl z-10 flex flex-col gap-6"
            >
              <button
                onClick={() => setSelectedVault(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-[rgba(30,50,90,0.05)] text-[rgba(30,50,90,0.8)] hover:bg-[rgba(30,50,90,0.1)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(30,50,90,0.05)] flex items-center justify-center text-[rgba(30,50,90,0.8)]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-normal text-[rgba(30,50,90,0.9)]">
                    Deposit to {selectedVault.pair}
                  </h3>
                  <p className="text-xs text-[rgba(30,50,90,0.5)] mt-0.5">
                    {selectedVault.network} Network • {selectedVault.risk} Risk Vault
                  </p>
                </div>
              </div>

              {depositSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center gap-4 bg-white/40 rounded-3xl p-6 border border-white/50"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/20">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-[rgba(30,50,90,0.9)]">
                      Deposit Successful!
                    </h4>
                    <p className="text-xs text-[rgba(30,50,90,0.6)] mt-1.5 max-w-xs leading-relaxed">
                      Your liquidity has been added. You are now streaming yield at{' '}
                      <span className="font-bold text-green-600">{selectedVault.apy} APY</span>.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleDepositSubmit} className="flex flex-col gap-4">
                  {/* Amount inputs */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-[rgba(30,50,90,0.5)] uppercase tracking-wider font-semibold">
                      DEPOSIT AMOUNT (USD)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="1,000"
                        className="w-full px-5 py-4 bg-white/40 rounded-2xl border border-white/60 focus:outline-none focus:border-[rgba(30,50,90,0.4)] text-[rgba(30,50,90,0.9)] text-lg font-medium tracking-tight"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[rgba(30,50,90,0.5)] font-semibold">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Calculator Simulation Info */}
                  <div className="bg-[rgba(30,50,90,0.03)] border border-[rgba(30,50,90,0.05)] rounded-2xl p-4 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[rgba(30,50,90,0.6)] flex items-center gap-1">
                        Est. Daily Yield <Info className="w-3.5 h-3.5 text-[rgba(30,50,90,0.4)]" />
                      </span>
                      <span className="text-[rgba(30,50,90,0.9)] font-semibold">
                        +${calculateDailyYield(Number(depositAmount) || 0, selectedVault.apy)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[rgba(30,50,90,0.6)]">Est. Yearly Yield</span>
                      <span className="text-[rgba(30,50,90,0.9)] font-semibold">
                        +${calculateYearlyYield(Number(depositAmount) || 0, selectedVault.apy)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-[rgba(30,50,90,0.06)] pt-2.5">
                      <span className="text-[rgba(30,50,90,0.6)]">Gas Fee Estimate</span>
                      <span className="text-green-600 font-medium">$0.00 (Gasless)</span>
                    </div>
                  </div>

                  {/* Gasless execution notice */}
                  <div className="flex items-start gap-2.5 px-1">
                    <div className="p-1 rounded-md bg-green-500/10 text-green-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[11px] text-[rgba(30,50,90,0.5)] leading-snug">
                      Gasless deposits enabled. RIVR automatically schedules batch transactions to minimize fees.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[rgba(30,50,90,0.85)] hover:bg-[rgba(30,50,90,1)] text-white font-medium py-3.5 rounded-full transition-colors cursor-pointer text-sm shadow mt-2"
                  >
                    Confirm Gasless Deposit
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

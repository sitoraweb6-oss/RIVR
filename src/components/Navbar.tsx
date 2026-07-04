import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowUpRight, Menu, X, ChevronRight, BarChart3, ShieldAlert, Award, FileText, Zap } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    { name: 'Ecosystem', href: '#ecosystem', hasDropdown: false },
    { 
      name: 'Economics', 
      href: '#stats', 
      hasDropdown: true,
      subItems: [
        { name: 'Tokenomics', desc: 'RIVR distribution & utility', icon: Zap },
        { name: 'Staking Yields', desc: 'Earn up to 24% APY', icon: Award }
      ]
    },
    { name: 'Developers', href: '#vaults', hasDropdown: false },
    { 
      name: 'Governance', 
      href: '#governance', 
      hasDropdown: true,
      subItems: [
        { name: 'Active Proposals', desc: 'Vote on protocol parameters', icon: FileText },
        { name: 'Security Audits', desc: 'Verified smart contract safety', icon: ShieldAlert }
      ]
    },
  ];

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-50">
      {/* Left Side: Desktop Logo (flex-1 to center the menu) */}
      <div className="flex-1 hidden md:block">
        <a href="#" className="font-bold tracking-tighter text-2xl text-[rgba(30,50,90,0.9)] hover:opacity-80 transition-opacity">
          RIVR
        </a>
      </div>

      {/* Center Menu */}
      <ul className="hidden md:flex items-center gap-8 text-[rgb(45,45,45)] font-medium text-sm relative">
        {menuItems.map((item) => (
          <li 
            key={item.name}
            className="relative group cursor-pointer"
            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
            onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
          >
            <a 
              href={item.href}
              className="hover:opacity-70 transition-opacity flex items-center gap-1"
            >
              {item.name}
              {item.hasDropdown && (
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </a>

            {/* Premium Glassmorphism Dropdown */}
            {item.hasDropdown && item.subItems && (
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 p-3 shadow-lg z-50 flex flex-col gap-1"
                  >
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.name}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/40 transition-all group/sub"
                      >
                        <div className="p-1.5 rounded-lg bg-[rgba(30,50,90,0.05)] text-[rgba(30,50,90,0.8)] group-hover/sub:bg-[rgba(30,50,90,0.15)] transition-colors">
                          <sub.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[rgba(30,50,90,0.95)] flex items-center gap-1">
                            {sub.name}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/sub:opacity-100 transition-all transform translate-y-0.5 -translate-x-0.5 group-hover/sub:translate-y-0 group-hover/sub:translate-x-0" />
                          </p>
                          <p className="text-[10px] text-[rgba(30,50,90,0.5)] mt-0.5 leading-tight">{sub.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Logo */}
      <div className="md:hidden flex items-center gap-2">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-1.5 rounded-lg bg-white/40 backdrop-blur-md border border-white/20 text-[rgba(30,50,90,0.9)]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold tracking-tighter text-xl text-[rgba(30,50,90,0.9)]">
          RIVR
        </span>
      </div>

      {/* Right Button */}
      <div className="flex-1 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const el = document.getElementById('vaults');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-6 py-2 gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group cursor-pointer"
        >
          <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium">Book Demo</span>
        </motion.button>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-md z-50 md:hidden"
            />
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-white/95 backdrop-blur-2xl border-r border-white/40 p-6 z-50 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold tracking-tighter text-2xl text-[rgba(30,50,90,0.9)]">
                    RIVR
                  </span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-[rgba(30,50,90,0.05)] text-[rgba(30,50,90,0.9)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ul className="flex flex-col gap-5 text-lg font-normal text-[rgba(30,50,90,0.9)]">
                  {menuItems.map((item, idx) => (
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.name}
                    >
                      <a 
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 border-b border-black/[0.05] hover:opacity-70 transition-opacity"
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-55" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-2xl bg-[rgba(30,50,90,0.04)] border border-[rgba(30,50,90,0.05)]">
                  <p className="text-xs text-[rgba(30,50,90,0.6)] uppercase tracking-wider font-semibold">Active TVL</p>
                  <p className="text-2xl font-normal text-[rgba(30,50,90,0.9)] mt-1">$420.5M</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('vaults');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-[rgba(30,50,90,0.85)] text-white text-sm rounded-xl font-medium hover:bg-[rgba(30,50,90,1)] transition-colors flex items-center justify-center gap-2"
                >
                  Connect Wallet
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

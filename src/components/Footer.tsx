import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Proposal } from '../types';
import { Twitter, Github, MessageSquare, ArrowUpRight, Check, Info, Vote, Lock, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function Footer() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 'RGP-12',
      title: 'Authorize RIVR integration with Solana Liquid Staking (JitoSOL) vaults',
      status: 'Active',
      votesFor: 1450000,
      votesAgainst: 120000,
      endsIn: '3 days left',
      category: 'Ecosystem'
    },
    {
      id: 'RGP-11',
      title: 'Decrease Smart Vault auto-compounding service fee from 0.5% to 0.3%',
      status: 'Active',
      votesFor: 890000,
      votesAgainst: 420000,
      endsIn: '5 days left',
      category: 'Protocol Fees'
    },
    {
      id: 'RGP-10',
      title: 'Enable native leveraged staking on Arbitrum gasless pools',
      status: 'Passed',
      votesFor: 2300000,
      votesAgainst: 50000,
      endsIn: 'Ended',
      category: 'Vault Expansion'
    }
  ]);

  const [hasVoted, setHasVoted] = useState<Record<string, 'for' | 'against'>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleVote = (proposalId: string, type: 'for' | 'against') => {
    if (hasVoted[proposalId]) return; // can only vote once

    setProposals(prev =>
      prev.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            votesFor: type === 'for' ? p.votesFor + 50000 : p.votesFor,
            votesAgainst: type === 'against' ? p.votesAgainst + 50000 : p.votesAgainst
          };
        }
        return p;
      })
    );

    setHasVoted(prev => ({
      ...prev,
      [proposalId]: type
    }));
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="w-full max-w-[1536px] mx-auto px-4 md:px-8 pb-4">
      <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 p-10 md:p-16 flex flex-col gap-16">
        
        {/* Governance Proposals Section (Integrated elegantly as specified in types) */}
        <motion.div
          id="governance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-[rgba(30,50,90,0.1)]"
        >
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[rgba(30,50,90,0.6)] font-semibold text-xs uppercase tracking-widest">
              <Vote className="w-4 h-4 text-[rgba(30,50,90,0.8)]" />
              Community Driven Protocol
            </div>
            <h3 className="text-3xl text-[rgba(30,50,90,0.95)] font-normal tracking-tight">
              Protocol Governance
            </h3>
            <p className="text-sm text-[rgba(30,50,90,0.65)] leading-relaxed max-w-sm">
              Participate directly in decision-making. RIVR holders vote to authorize vault integrations, configure fee schedules, and direct Treasury reserves.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-[rgba(30,50,90,0.05)] border border-[rgba(30,50,90,0.05)] text-xs text-[rgba(30,50,90,0.7)] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 1 RIVR = 1 Vote Weight
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-[11px] text-[rgba(30,50,90,0.5)] font-bold uppercase tracking-wider block">
              Active Voting Proposals
            </span>
            <div className="flex flex-col gap-4">
              {proposals.map((proposal) => {
                const totalVotes = proposal.votesFor + proposal.votesAgainst;
                const pctFor = ((proposal.votesFor / totalVotes) * 100).toFixed(1);
                const pctAgainst = ((proposal.votesAgainst / totalVotes) * 100).toFixed(1);
                const voted = hasVoted[proposal.id];

                return (
                  <div
                    key={proposal.id}
                    className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white/70 transition-colors flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-semibold text-[rgba(30,50,90,0.5)] bg-[rgba(30,50,90,0.05)] px-2.5 py-1 rounded-md">
                          {proposal.id}
                        </span>
                        <span className="text-[11px] font-bold text-[rgba(30,50,90,0.4)] uppercase tracking-wider">
                          {proposal.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          proposal.status === 'Active'
                            ? 'bg-green-500/10 text-green-700'
                            : 'bg-indigo-500/10 text-indigo-700'
                        }`}>
                          {proposal.status}
                        </span>
                        <span className="text-xs text-[rgba(30,50,90,0.5)]">
                          {proposal.endsIn}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm md:text-base font-normal text-[rgba(30,50,90,0.9)] tracking-tight">
                      {proposal.title}
                    </h4>

                    {/* Progress vote bars */}
                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="w-full h-2 bg-[rgba(30,50,90,0.06)] rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${pctFor}%` }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-l-full"
                        />
                        <div
                          style={{ width: `${pctAgainst}%` }}
                          className="h-full bg-rose-400"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[rgba(30,50,90,0.6)] font-medium">
                        <span>For: {pctFor}% ({proposal.votesFor.toLocaleString()} votes)</span>
                        <span>Against: {pctAgainst}% ({proposal.votesAgainst.toLocaleString()} votes)</span>
                      </div>
                    </div>

                    {/* Voting Actions */}
                    {proposal.status === 'Active' && (
                      <div className="flex items-center justify-end gap-2.5 mt-2">
                        {voted ? (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1 bg-green-500/5 px-3 py-1.5 rounded-xl border border-green-500/10 animate-fade-in">
                            <Check className="w-3.5 h-3.5" /> Successfully Voted {voted === 'for' ? 'FOR' : 'AGAINST'}!
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleVote(proposal.id, 'for')}
                              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 text-xs rounded-xl font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" /> Vote For
                            </button>
                            <button
                              onClick={() => handleVote(proposal.id, 'against')}
                              className="px-4 py-2 bg-rose-50 hover:bg-rose-100/80 text-rose-700 text-xs rounded-xl font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" /> Vote Against
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top Row: Info and Quick Links */}
        <div className="flex justify-between flex-wrap gap-10">
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="font-bold tracking-tighter text-4xl text-[rgba(30,50,90,0.9)]">
              RIVR
            </span>
            <p className="text-sm text-[rgba(30,50,90,0.6)] leading-relaxed">
              Fluid Asset Streams. Build the future of DeFi. Gain frictionless access to top-tier yield optimization strategies instantly.
            </p>

            {/* Newsletter input inside footer for a polished professional feel */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] text-[rgba(30,50,90,0.5)] font-bold uppercase tracking-wider">
                Subscribe to Yield Updates
              </span>
              {newsletterSubscribed ? (
                <div className="py-2.5 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Subscribed successfully!
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 focus:outline-none focus:border-[rgba(30,50,90,0.3)] text-xs text-[rgba(30,50,90,0.8)] w-full max-w-xs"
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[rgba(30,50,90,0.85)] hover:bg-[rgba(30,50,90,1)] text-white transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Links */}
          <div className="grid grid-cols-3 gap-8 md:gap-14">
            {/* Column 1: Protocol */}
            <div className="flex flex-col gap-4">
              <span className="text-[rgba(30,50,90,0.9)] text-sm font-semibold tracking-wider uppercase text-[12px]">
                Protocol
              </span>
              <div className="text-[rgba(30,50,90,0.6)] text-sm hover:text-[rgba(30,50,90,0.9)] transition-colors flex flex-col gap-3 font-normal">
                <a href="#stats" className="hover:text-[rgba(30,50,90,0.9)]">Smart Vaults</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.9)]">Staking Pools</a>
                <a href="#stats" className="hover:text-[rgba(30,50,90,0.95)]">Fees & Tokenomics</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.95)]">Security Audits</a>
              </div>
            </div>

            {/* Column 2: Developers */}
            <div className="flex flex-col gap-4">
              <span className="text-[rgba(30,50,90,0.9)] text-sm font-semibold tracking-wider uppercase text-[12px]">
                Developers
              </span>
              <div className="text-[rgba(30,50,90,0.6)] text-sm hover:text-[rgba(30,50,90,0.9)] transition-colors flex flex-col gap-3 font-normal">
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.9)]">RIVR Core API</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.9)]">Documentation</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.95)]">Whitepaper</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.95)]">Github Repos</a>
              </div>
            </div>

            {/* Column 3: Community */}
            <div className="flex flex-col gap-4">
              <span className="text-[rgba(30,50,90,0.9)] text-sm font-semibold tracking-wider uppercase text-[12px]">
                Community
              </span>
              <div className="text-[rgba(30,50,90,0.6)] text-sm hover:text-[rgba(30,50,90,0.9)] transition-colors flex flex-col gap-3 font-normal">
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.9)]">Governance Forum</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.9)]">Discord Server</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.95)]">Twitter Feed</a>
                <a href="#ecosystem" className="hover:text-[rgba(30,50,90,0.95)]">Medium Blog</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[rgba(30,50,90,0.1)] pt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="text-xs text-[rgba(30,50,90,0.5)] font-normal">
            &copy; {new Date().getFullYear()} RIVR Protocol. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 border border-white/40 flex items-center justify-center text-[rgba(30,50,90,0.8)] transition-all transform hover:-translate-y-0.5"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 border border-white/40 flex items-center justify-center text-[rgba(30,50,90,0.8)] transition-all transform hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 border border-white/40 flex items-center justify-center text-[rgba(30,50,90,0.8)] transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

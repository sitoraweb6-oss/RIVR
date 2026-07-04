export interface VaultConfig {
  pair: string;
  tvl: string;
  apy: string;
  capacity: number; // percentage filled e.g. 78%
  risk: 'Low' | 'Medium' | 'High';
  isAutoCompounding: boolean;
  baseToken: string;
  quoteToken: string;
  network: 'Ethereum' | 'Solana' | 'Arbitrum' | 'Optimism';
}

export interface Proposal {
  id: string;
  title: string;
  status: 'Active' | 'Passed';
  votesFor: number;
  votesAgainst: number;
  endsIn: string;
  category: string;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Stats from './components/Stats';
import Vaults from './components/Vaults';
import Ecosystem from './components/Ecosystem';
import Footer from './components/Footer';
import CoreAttribution from './components/CoreAttribution';

export default function App() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] overflow-x-hidden selection:bg-[rgba(30,50,90,0.1)] selection:text-[rgba(30,50,90,0.9)]">
      {/* 1. Sleek Glassmorphism Hero Section */}
      <Hero />

      {/* 2. Protocol Stats Section */}
      <Stats />

      {/* 3. Smart Vaults Staking Section */}
      <Vaults />

      {/* 4. Ecosystem & How It Works Section */}
      <Ecosystem />

      {/* 5. Elegant Footer with Integrated Governance Forum */}
      <Footer />

      {/* 6. Brand Attribution Floating Badge */}
      <CoreAttribution />
    </main>
  );
}

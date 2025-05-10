import React from "react";
import './App.css';

export default function App() {
  return (
    <div className="bg-chaos min-h-screen text-white font-mono overflow-x-hidden">
      <section className="hero text-center py-20">
        <img src="/coin_bg.png" alt="BHABIT Coin" className="w-40 mx-auto animate-spin-slow mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold glitch-text">Embrace Your Bad Habits</h1>
        <p className="text-lg mt-4">Join the 13 Trillion Movement</p>
        <a href="#whitepaper" className="mt-6 inline-block bg-orange-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-full transition">Read the Whitepaper</a>
      </section>

      <section className="about px-6 py-16 bg-black bg-opacity-80">
        <h2 className="text-3xl font-bold mb-4">What is BHABIT?</h2>
        <p className="max-w-3xl mx-auto">BHABIT is the crypto rebellion for the flawed and the fearless. With 13 trillion coins and a taste for chaos, it's more than a meme — it's a movement.</p>
      </section>

      <section className="how-it-works px-6 py-16 bg-gradient-to-r from-purple-900 to-pink-700">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <ul className="list-disc list-inside max-w-2xl mx-auto space-y-2">
          <li>Buy BHABIT via DEXes</li>
          <li>Stake, burn, or hold</li>
          <li>Unlock NFTs, rewards & games</li>
        </ul>
      </section>

      <section className="tokenomics px-6 py-16 bg-black bg-opacity-90">
        <h2 className="text-3xl font-bold mb-4">The Coin</h2>
        <p>Total Supply: 13,000,000,000,000 BHT</p>
        <p>Burn Rate: 13% on each transaction</p>
        <p>Staking Rewards: 13%</p>
      </section>

      <section className="nfts px-6 py-16 bg-yellow-900 bg-opacity-80">
        <h2 className="text-3xl font-bold mb-4">Bad Habit NFTs</h2>
        <p>Collect NFT characters like The Procrastinator, Midnight Snacker, and more. Trade them or stake them to earn BHT!</p>
      </section>

      <section className="community px-6 py-16 bg-black bg-opacity-95">
        <h2 className="text-3xl font-bold mb-4">Join the 13 Trillion Revolution</h2>
        <p>Get on Discord, follow us on Twitter, and join the chaos.</p>
      </section>

      <section id="whitepaper" className="whitepaper px-6 py-16 bg-purple-950 bg-opacity-90">
        <h2 className="text-3xl font-bold mb-4">Whitepaper</h2>
        <iframe src="https://docs.google.com/document/d/1vj5hspib6QIECd-oKsLUFHAoPEIsK1dE-pyuRqOYP40/preview" width="100%" height="600" title="Whitepaper" />
      </section>

      <footer className="px-6 py-6 text-center text-sm bg-black bg-opacity-80">
        <p>© 2025 BHABIT. All rights reserved.</p>
      </footer>
    </div>
  );
}
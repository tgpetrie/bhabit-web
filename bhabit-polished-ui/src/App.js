import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <nav className="fixed w-full top-0 bg-black bg-opacity-80 backdrop-blur z-50 p-4">
        <ul className="flex justify-around text-neon-green uppercase font-bold tracking-widest">
          <li><a href="#hero" className="hover:text-orange">Home</a></li>
          <li><a href="#about" className="hover:text-orange">About</a></li>
          <li><a href="#tokenomics" className="hover:text-orange">Tokenomics</a></li>
          <li><a href="#nfts" className="hover:text-orange">NFTs</a></li>
          <li><a href="#whitepaper" className="hover:text-orange">Whitepaper</a></li>
        </ul>
      </nav>

      <section id="hero" className="grid place-items-center h-screen px-6 bg-center bg-cover" style={{ backgroundImage: 'url(/coin_bg.png)' }}>
        <div data-aos="zoom-in" className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-neon-orange">BHABIT</h1>
          <p className="mt-4 text-xl text-neon-green">Embrace Your Bad Habits</p>
          <a href="#whitepaper" className="mt-6 inline-block bg-neon-green text-black font-bold py-2 px-6 rounded-full transition hover:scale-110">Read the Whitepaper</a>
        </div>
      </section>

      <section id="about" className="px-6 py-20 grid place-items-center text-center bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4 text-neon-orange">About</h2>
          <p>BHABIT is the memecoin for rebels, artists, degenerates, and builders. It's a 13-trillion supply movement with attitude.</p>
        </div>
      </section>

      <section id="tokenomics" className="px-6 py-20 bg-black text-center">
        <div className="max-w-2xl mx-auto" data-aos="fade-right">
          <h2 className="text-4xl font-bold text-neon-orange mb-4">Tokenomics</h2>
          <ul className="space-y-2 text-neon-green font-mono">
            <li>Total Supply: 13,000,000,000,000 BHT</li>
            <li>Burn: 13% per TX</li>
            <li>Staking Rewards: 13%</li>
          </ul>
        </div>
      </section>

      <section id="nfts" className="px-6 py-20 bg-gradient-to-tr from-orange-900 to-yellow-600 text-black text-center">
        <div className="max-w-3xl mx-auto" data-aos="fade-left">
          <h2 className="text-4xl font-bold mb-4">NFTs</h2>
          <p>Own and stake bad habit characters. Earn with your vices. Trade limited-edition BHABIT NFTs.</p>
        </div>
      </section>

      <section id="whitepaper" className="px-6 py-20 bg-black bg-opacity-90 text-white text-left grid place-items-center">
        <div className="max-w-4xl p-6 bg-black bg-opacity-30 backdrop-blur rounded-xl" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-neon-orange mb-4">Whitepaper</h2>
          <p>BHABIT is a cultural coin built around collective chaos. Read the full protocol, token mechanics, and roadmap in the downloadable or linked whitepaper.</p>
        </div>
      </section>

      <footer className="text-center py-6 bg-black text-sm opacity-60">
        <p>© 2025 BHABIT. All rights reserved.</p>
      </footer>
    </div>
  );
}
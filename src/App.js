import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div className="bg-cover bg-center min-h-screen text-white" style={{ backgroundImage: 'url(/coin_bg.png)' }}>
      <header className="text-center p-10">
        <img src="/coin_bg.png" alt="BHABIT Coin" className="mx-auto w-40 animate-spin-slow" />
        <h1 className="text-5xl font-bold glitch-text" data-aos="fade-up">Embrace Your Bad Habits</h1>
        <h2 className="text-xl mt-4" data-aos="fade-up">Join the 13 Trillion Movement</h2>
        <a href="#whitepaper" className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-yellow-400 text-white font-bold rounded-full transition-all duration-300">Read the Whitepaper</a>
      </header>
    </div>
  );
}
import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import React, { useEffect, useState } from "react";


function useTypewriter(text: string, speed = 120) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index += 1;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}


const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          // src={heroBg}
          src="https://imgs.search.brave.com/Ut-1gJABIGxNM-BeanaQ75g43y9XgvZI9zZMh6JoDcs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I1LzEy/LzZlL2I1MTI2ZWZj/NWNjOTgwNTA3NzI1/NWExZGIzMDExMGIx/LmpwZw"
          alt=""
          className="w-full h-full object-cover opacity-100"
        />
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />

      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white  text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
          झीनी रे बीनी चदरिया
            <br />
            {/* <span className="text-gradient">Deserves to be Told</span> */}
          </h1>
          <p className="text-white  text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
          जैसी मिली थी, वैसी ही रखी बस शब्दों में संभाल ली
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a href="#stories" className="btn-hero inline-block">
              Start Reading
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-10 mt-5 bg-gradient-to-b from-black/30 via-white/50 to-white/100" />
    </section>
  );
};

export default HeroSection;

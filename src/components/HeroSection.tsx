import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden hero-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
            Every Story
            <br />
            <span className="text-gradient">Deserves to be Told</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover captivating tales, share your thoughts, and immerse yourself
            in the world of storytelling.
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

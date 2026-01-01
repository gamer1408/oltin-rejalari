import { motion } from "framer-motion";
import { TrendingUp, Truck, Shield, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-raspberry-field.jpg";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Raspberry field"
          className="w-full h-full object-cover opacity-70 light:opacity-90"
        />
        
        {/* Enhanced Overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80 light:from-background/30 light:via-background/10 light:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 light:from-background/20 light:via-transparent light:to-background/20" />
        
        {/* Accent overlay for warmth */}
        <div className="absolute inset-0 bg-accent/5" />
      </div>


      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-8 border border-accent/30"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-medium text-sm tracking-wide">3 YILLIK TAJRIBA • KAFOLATLANGAN SIFAT</span>
          </motion.div>

          {/* Main Headline */}
          <h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Malina Bilan</span>
            <br />
            <span className="text-gradient-gold">Boylik Yo'li</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed px-4"
          >
            1 yil ichida <span className="text-accent font-semibold">300% daromad</span> oling. 
            Premium navlar — O'zbekiston iqlimiga moslashtirilgan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col gap-4 justify-center mb-12 px-4"
          >
            <a href="#products" className="btn-premium relative z-10 py-4 text-lg">
              <span className="relative z-10">Hoziroq Buyurtma Bering</span>
            </a>
            <a href="#calculator" className="btn-secondary-premium py-4 text-lg">
              Daromadni Hisoblang
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="grid grid-cols-1 gap-4 max-w-4xl mx-auto px-4"
          >
            {[
              { icon: TrendingUp, title: "300%+", subtitle: "Yillik Daromad" },
              { icon: Truck, title: "BEPUL", subtitle: "1000+ niholga yetkazib berish" },
              { icon: Shield, title: "100%", subtitle: "Kafolat" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 border-2 border-accent/20 hover:border-accent/40 hover:glow-gold transition-all duration-500"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-secondary/40 flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-6 h-6 text-accent" />
                </motion.div>
                <div className="text-left">
                  <div className="text-xl font-bold text-accent">{item.title}</div>
                  <div className="text-sm text-foreground/80 font-medium">{item.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-accent/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

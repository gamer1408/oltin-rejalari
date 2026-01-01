import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      
      <div className="section-divider mb-12" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="font-serif text-3xl font-bold text-gradient-gold">Malina UZ</span>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 mb-8 text-muted-foreground"
          >
            <a href="#products" className="hover:text-accent transition-colors">Mahsulotlar</a>
            <a href="#calculator" className="hover:text-accent transition-colors">Kalkulyator</a>
            <a href="#order" className="hover:text-accent transition-colors">Buyurtma</a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            <p className="flex items-center justify-center gap-1">
              © 2024 Malina UZ. Barcha huquqlar himoyalangan.
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              O'zbekistonda <Heart className="w-4 h-4 text-primary fill-primary" /> bilan yaratildi
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

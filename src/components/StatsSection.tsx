import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Users, Leaf, MapPin, ChevronDown, Play, Image as ImageIcon } from "lucide-react";

const stats = [
  { 
    icon: TrendingUp, 
    value: 300, 
    suffix: "%", 
    label: "O'rtacha yillik daromad",
    details: {
      title: "Daromad Natijalari",
      description: "Bizning mijozlarimiz o'rtacha 300% yillik daromad olishmoqda. Bu raqam 1 gektar maydondan 1 yilda olingan sof foydani ko'rsatadi.",
      items: [
        "1 gektar: 150-200 million so'm yillik daromad",
        "12 sotix: 18-25 million so'm yillik daromad",
        "Investitsiya 6-8 oyda qaytadi"
      ]
    }
  },
  { 
    icon: Users, 
    value: 500, 
    suffix: "+", 
    label: "Mamnun mijozlar",
    details: {
      title: "Mijozlarimiz Fikrlari",
      description: "500 dan ortiq fermer va investorlar bizdan nihollar sotib olib, muvaffaqiyatli hosil olishmoqda.",
      items: [
        "Toshkent: 120+ mijoz",
        "Samarqand: 85+ mijoz",
        "Farg'ona vodiysi: 150+ mijoz",
        "Boshqa viloyatlar: 145+ mijoz"
      ]
    }
  },
  { 
    icon: Leaf, 
    value: 50000, 
    suffix: "+", 
    label: "Sotilgan nihollar",
    details: {
      title: "Sotilgan Nihollar",
      description: "3 yil davomida 50,000 dan ortiq premium sifatli malina nihollari sotildi va yetkazib berildi.",
      items: [
        "Maravilla: 30,000+ nihollar",
        "Enrasadera: 20,000+ nihollar",
        "100% tiriklik kafolati",
        "Professional qadoqlash"
      ]
    }
  },
  { 
    icon: MapPin, 
    value: 14, 
    suffix: "", 
    label: "Viloyatga yetkazib berish",
    details: {
      title: "Yetkazib Berish",
      description: "O'zbekistonning barcha 14 viloyatiga va Toshkent shahriga bepul yetkazib beramiz (1000+ niholga).",
      items: [
        "Toshkent shahri va viloyati",
        "Samarqand, Buxoro, Xorazm",
        "Farg'ona, Andijon, Namangan",
        "Qashqadaryo, Surxondaryo va boshqalar"
      ]
    }
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5" />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8 border-2 border-accent/30"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent font-semibold text-sm tracking-wide">ISBOTLANGAN NATIJALAR</span>
          </motion.div>
          
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Raqamlarda</span>{" "}
            <span className="text-gradient-gold">Natijalarimiz</span>
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            3 yillik tajriba, minglab mamnun mijozlar va <span className="text-accent font-semibold">kafolatlangan sifat</span>
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-accent text-lg mt-4 font-medium"
          >
            📊 Batafsil ma'lumot uchun bosing ↓
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative"
            >
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full glass-card rounded-3xl p-8 text-center group transition-all duration-500 cursor-pointer border-2 ${
                  expandedIndex === index 
                    ? 'border-accent glow-gold bg-gradient-to-br from-accent/10 to-secondary/10' 
                    : 'border-accent/20 hover:border-accent/40 hover:glow-gold'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/30 to-secondary/40 flex items-center justify-center shadow-lg"
                >
                  <stat.icon className="w-10 h-10 text-accent" />
                </motion.div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-3 leading-none">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-foreground/80 font-semibold text-lg">{stat.label}</div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  className="mt-6"
                >
                  <ChevronDown className="w-6 h-6 text-accent mx-auto" />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Expanded Details Panel */}
        <AnimatePresence>
          {expandedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-8 overflow-hidden"
            >
                <div className="glass-card rounded-3xl p-10 md:p-12 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-secondary/5">
                <div className="flex items-start gap-6 mb-8">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-secondary/40 flex items-center justify-center flex-shrink-0 shadow-lg"
                  >
                    {(() => {
                      const StatIcon = stats[expandedIndex].icon;
                      return <StatIcon className="w-8 h-8 text-accent" />;
                    })()}
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                      {stats[expandedIndex].details.title}
                    </h3>
                    <p className="text-foreground/70 text-lg leading-relaxed">
                      {stats[expandedIndex].details.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {stats[expandedIndex].details.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary/20 to-accent/10 border-2 border-secondary/30 hover:border-accent/40 transition-all duration-300"
                    >
                      <div className="w-3 h-3 rounded-full bg-accent shadow-lg" />
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#gallery"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent/20 to-accent/30 border-2 border-accent/40 text-accent hover:from-accent/30 hover:to-accent/40 transition-all duration-300 font-semibold"
                  >
                    <Play className="w-5 h-5" />
                    Video ko'rish
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#gallery"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/30 border-2 border-secondary/40 text-foreground hover:from-secondary/30 hover:to-secondary/40 transition-all duration-300 font-semibold"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Rasmlar galereyasi
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StatsSection;

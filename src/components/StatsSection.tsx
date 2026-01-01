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
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Raqamlarda</span>{" "}
            <span className="text-gradient-gold">Natijalarimiz</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            3 yillik tajriba, minglab mamnun mijozlar va kafolatlangan sifat
          </p>
          <p className="text-accent text-sm mt-2">Batafsil ma'lumot uchun bosing ↓</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`w-full glass-card rounded-3xl p-8 text-center group hover:glow-gold transition-all duration-500 cursor-pointer ${
                  expandedIndex === index ? 'ring-2 ring-accent glow-gold' : ''
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center"
                >
                  <stat.icon className="w-8 h-8 text-accent" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  className="mt-4"
                >
                  <ChevronDown className="w-5 h-5 text-accent mx-auto" />
                </motion.div>
              </button>
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
              <div className="glass-card rounded-3xl p-8 md:p-12 border border-accent/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const StatIcon = stats[expandedIndex].icon;
                      return <StatIcon className="w-7 h-7 text-accent" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {stats[expandedIndex].details.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {stats[expandedIndex].details.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {stats[expandedIndex].details.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-secondary/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Video ko'rish
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/20 border border-secondary/30 text-foreground hover:bg-secondary/30 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Rasmlar galereyasi
                  </a>
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

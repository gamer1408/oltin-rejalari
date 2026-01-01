import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator, TrendingUp, Wallet, Calendar, ChevronRight } from "lucide-react";

const CalculatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [plants, setPlants] = useState(1000);

  // Calculations based on realistic raspberry farming data
  const pricePerPlant = 15000; // UZS
  const yieldPerPlant = 4; // kg per year (average)
  const pricePerKg = 30000; // UZS market price
  const yearsToMature = 1;
  const productiveYears = 5;

  const investment = plants * pricePerPlant;
  const yearlyHarvest = plants * yieldPerPlant;
  const yearlyRevenue = yearlyHarvest * pricePerKg;
  const yearlyProfit = yearlyRevenue - (investment * 0.1); // 10% maintenance
  const roi = Math.round((yearlyProfit / investment) * 100);
  const paybackMonths = Math.round((investment / yearlyProfit) * 12);

  return (
    <section id="calculator" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Decorative Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 border border-accent/20"
          >
            <Calculator className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">DAROMAD KALKULYATORI</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Daromadingizni</span>{" "}
            <span className="text-gradient-gold">Hisoblang</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Nechta nihol ekilishini tanlang va bir yil ichida qancha foyda olishingizni ko'ring
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-accent/20"
          >
            {/* Slider */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-medium text-foreground">Nihollar soni:</label>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-accent">{plants.toLocaleString()}</span>
                  <span className="text-muted-foreground">ta</span>
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={plants}
                onChange={(e) => setPlants(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-muted"
                style={{
                  background: `linear-gradient(to right, hsl(45 90% 55%) 0%, hsl(45 90% 55%) ${(plants - 100) / 99}%, hsl(150 15% 15%) ${(plants - 100) / 99}%, hsl(150 15% 15%) 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>100</span>
                <span>5,000</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: Wallet, 
                  label: "Boshlang'ich sarmoya", 
                  value: `${(investment / 1000000).toFixed(1)}M`,
                  suffix: "so'm",
                  color: "text-foreground"
                },
                { 
                  icon: TrendingUp, 
                  label: "Yillik daromad", 
                  value: `${(yearlyRevenue / 1000000).toFixed(1)}M`,
                  suffix: "so'm",
                  color: "text-accent"
                },
                { 
                  icon: TrendingUp, 
                  label: "Sof foyda", 
                  value: `${(yearlyProfit / 1000000).toFixed(1)}M`,
                  suffix: "so'm",
                  color: "text-accent"
                },
                { 
                  icon: Calendar, 
                  label: "O'zini qoplash", 
                  value: paybackMonths,
                  suffix: "oy",
                  color: "text-accent"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="glass-card rounded-2xl p-6 text-center border border-border/50"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-4 text-accent/70" />
                  <div className={`text-3xl md:text-4xl font-bold ${item.color} mb-1`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.suffix}</div>
                  <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* ROI Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-10 text-center p-8 rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30"
            >
              <div className="text-muted-foreground mb-2">Yillik ROI (investitsiya qaytimi)</div>
              <div className="text-6xl md:text-7xl font-bold text-gradient-gold mb-4">{roi}%</div>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Bu degani har 100 ming so'm sarmoyaningiz {roi / 100} barobar foyda keltiradi. 
                Bank foizlari bilan solishtirib ko'ring!
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-10 text-center"
            >
              <a href="#order" className="btn-premium inline-flex items-center gap-3">
                <span className="relative z-10">Hoziroq Boshlang</span>
                <ChevronRight className="w-5 h-5 relative z-10" />
              </a>
              <p className="text-muted-foreground text-sm mt-4">
                * Hisob-kitoblar o'rtacha ko'rsatkichlarga asoslangan
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

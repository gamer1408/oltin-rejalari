import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator, TrendingUp, Wallet, Calendar, ChevronRight, Info } from "lucide-react";

const CalculatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [plants, setPlants] = useState(1000);
  const [showCalculation, setShowCalculation] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  // Calculations
  const initialCharge = plants * 30000;
  const harvest = plants * 1 * 65000; // Maravilla: 1kg × 65,000 so'm
  const plantSales = plants * 5 * 30000;
  const yearlyIncome = harvest + plantSales;
  const yearlyProfit = yearlyIncome - initialCharge;
  const profitPercent = Math.round((yearlyProfit / initialCharge) * 100);

  // Helper function to format display values
  const formatDisplayValue = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)} MLRD`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)} MLN`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)} MING`;
    }
    return num.toString();
  };

  // Helper function to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)} milliard`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)} million`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)} ming`;
    }
    return num.toString();
  };

  const calculations = [
    {
      label: "Boshlang'ich sarmoya",
      value: formatDisplayValue(initialCharge),
      suffix: "so'm",
      color: "text-foreground",
      formula: "N_P × 30,000 so'm",
      explanation: "Har bir nihol uchun 30,000 so'm to'lov",
      breakdown: [
        `Nihollar soni: ${plants.toLocaleString()}`,
        `Har bir nihol: 30 ming so'm`,
        `Jami: ${plants.toLocaleString()} × 30 ming = ${formatNumber(initialCharge)} so'm`
      ]
    },
    {
      label: "Yillik daromad",
      value: formatDisplayValue(yearlyIncome),
      suffix: "so'm",
      color: "text-accent",
      formula: "Hosil daromadi + Nihol sotish daromadi",
      explanation: "Meva sotish va nihol ko'paytirish daromadi",
      breakdown: [
        `Hosil daromadi: ${plants.toLocaleString()} × 1 kg × 65 ming = ${formatNumber(harvest)} so'm`,
        `Nihol sotish: ${plants.toLocaleString()} × 5 dona × 30 ming = ${formatNumber(plantSales)} so'm`,
        `Jami yillik daromad: ${formatNumber(harvest)} + ${formatNumber(plantSales)} = ${formatNumber(yearlyIncome)} so'm`
      ]
    },
    {
      label: "Sof foyda",
      value: formatDisplayValue(yearlyProfit),
      suffix: "so'm",
      color: "text-accent",
      formula: "Yillik daromad - Boshlang'ich sarmoya",
      explanation: "Birinchi yildagi sof foyda",
      breakdown: [
        `Yillik daromad: ${formatNumber(yearlyIncome)} so'm`,
        `Boshlang'ich sarmoya: ${formatNumber(initialCharge)} so'm`,
        `Sof foyda: ${formatNumber(yearlyIncome)} - ${formatNumber(initialCharge)} = ${formatNumber(yearlyProfit)} so'm`
      ]
    },
    {
      label: "Foyda foizi",
      value: profitPercent,
      suffix: "%",
      color: "text-accent",
      formula: "(Sof foyda ÷ Boshlang'ich sarmoya) × 100",
      explanation: "Investitsiya o'sish sur'ati",
      breakdown: [
        `Sof foyda: ${formatNumber(yearlyProfit)} so'm`,
        `Boshlang'ich sarmoya: ${formatNumber(initialCharge)} so'm`,
        `Foyda foizi: (${formatNumber(yearlyProfit)} ÷ ${formatNumber(initialCharge)}) × 100 = ${profitPercent}%`
      ]
    },
  ];

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
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    value={plants}
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(10000, Number(e.target.value) || 0));
                      setPlants(value);
                    }}
                    className="text-4xl font-bold text-accent bg-transparent border-2 border-accent/30 rounded-xl px-4 py-2 text-center w-48 focus:border-accent focus:outline-none hover:border-accent/50 transition-colors"
                  />
                  <span className="text-muted-foreground">ta</span>
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={Math.min(plants, 10000)}
                onChange={(e) => setPlants(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-muted"
                style={{
                  background: `linear-gradient(to right, hsl(45 90% 55%) 0%, hsl(45 90% 55%) ${(Math.min(plants, 10000) - 100) / 99}%, hsl(150 15% 15%) ${(Math.min(plants, 10000) - 100) / 99}%, hsl(150 15% 15%) 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>100</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className={`glass-card rounded-2xl p-6 text-center border border-border/50 cursor-pointer hover:border-accent/50 transition-all ${
                    selectedSquare === index ? 'border-accent bg-accent/5' : ''
                  }`}
                  onClick={() => setSelectedSquare(selectedSquare === index ? null : index)}
                >
                  <Info className="w-6 h-6 mx-auto mb-3 text-accent/70" />
                  <div className={`text-3xl md:text-4xl font-bold ${item.color} mb-1`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.suffix}</div>
                  <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
                  
                  {selectedSquare === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-background/50 rounded-lg text-left"
                    >
                      <div className="text-xs font-bold text-accent mb-2">
                        {item.formula}
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {item.explanation}
                      </div>
                      <div className="space-y-1">
                        {item.breakdown.map((line, i) => (
                          <div key={i} className="text-xs font-mono text-foreground/80">
                            {line}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>




            {/* Marketing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-orange-400/30 relative overflow-hidden"
            >
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  ⚡
                </motion.div>
                
                <div className="space-y-4 mb-8">
                  {plants < 500 ? (
                    <>
                      <p className="text-lg text-foreground leading-relaxed">
                        🎉 <span className="font-bold text-green-400">Ajoyib tanlov!</span> Sizning oilangiz 
                        <span className="font-bold text-accent">sog'lom va tabiiy malina</span> bilan ta'minlanadi. 
                        Bog'ingizda o'sadigan bu <span className="font-bold text-blue-400">premium mevalar</span> 
                        bolalaringiz uchun eng yaxshi tabiiy shirinlik bo'ladi!
                      </p>
                      
                      <p className="text-lg text-foreground leading-relaxed">
                        Bundan tashqari, yiliga <span className="font-bold text-accent">{yearlyIncome >= 1000000000 ? `${(yearlyIncome / 1000000000).toFixed(1)} milliard` : `${(yearlyIncome / 1000000).toFixed(0)} million`} so'm</span> 
                        qo'shimcha daromad ham olasiz. Bog'ingiz ham chiroyli, oilangiz ham sog'lom, 
                        moliyaviy holingiz ham yaxshi bo'ladi!
                      </p>
                    </>
                  ) : plants < 5000 ? (
                    <>
                      <p className="text-lg text-foreground leading-relaxed">
                        💼 <span className="font-bold text-blue-400">Eng yaxshi 2-chi daromad manbai!</span> 
                        Bu sizning asosiy ishingizga <span className="font-bold text-green-400">ajoyib qo'shimcha</span> bo'ladi. 
                        Yiliga <span className="font-bold text-accent">{yearlyIncome >= 1000000000 ? `${(yearlyIncome / 1000000000).toFixed(1)} milliard` : `${(yearlyIncome / 1000000).toFixed(0)} million`} so'm</span> 
                        barqaror qo'shimcha daromad olasiz!
                      </p>
                      
                      <p className="text-lg text-foreground leading-relaxed">
                        Bu <span className="font-bold text-blue-400">$500/oy</span> o'rtacha maosh bilan 
                        <span className="font-bold text-red-400 text-xl">{Math.ceil(yearlyIncome / 66000000)} yil</span> 
                        ishlashga teng. Lekin siz buni faqat <span className="font-bold text-green-400">1 yilda</span> olasiz!
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-foreground leading-relaxed">
                        Agar siz <span className="font-bold text-blue-400">O'zbekistonning o'rtacha maoshi</span> bilan ishlasangiz, 
                        masalan, <span className="font-bold text-green-400">$500/oy (≈ 5.5 million so'm)</span>, 
                        shu <span className="font-bold text-accent">{yearlyIncome >= 1000000000 ? `${(yearlyIncome / 1000000000).toFixed(1)} milliard` : `${(yearlyIncome / 1000000).toFixed(0)} million`} so'm</span> daromadga 
                        erishish uchun sizga <span className="font-bold text-red-400 text-2xl">≈ {Math.ceil(yearlyIncome / 66000000)} yil</span> mehnat qilish kerak bo'ladi.
                      </p>
                      
                      <p className="text-lg text-foreground leading-relaxed">
                        "Biz esa sizga shu <span className="font-bold text-blue-400">kalkulyator orqali 1 daqiqada</span> foydangizni nazorat qilish, 
                        <span className="font-bold text-red-400 text-xl"> {Math.ceil(yearlyIncome / 66000000)} yil</span> vaqtingizni tejash va 
                        shu pulni faqatgina <span className="font-bold text-green-400">1 yilda</span> topish imkoniyatini taqdim etmoqdamiz!"
                      </p>
                    </>
                  )}
                </div>

                <motion.a
                  href="#order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full max-w-md mx-auto sm:max-w-none sm:inline-flex sm:w-auto items-center justify-center gap-2 sm:gap-3 px-6 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold text-base sm:text-xl lg:text-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  {/* Mobile-optimized layout */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">🚀</span>
                    <span className="relative z-10 font-extrabold tracking-wide text-center flex-1 sm:flex-none">
                      HOZIROQ BOSHLANG!
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">💰</span>
                  </div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
                </motion.a>
                
                <p className="text-muted-foreground text-sm mt-6">
                  * Hisob-kitoblar 2xil nav uchun o'rtacha hisoblangan
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

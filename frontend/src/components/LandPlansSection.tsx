import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Target, Home, Banknote } from "lucide-react";

const landPlans = [
  {
    icon: TrendingUp,
    size: "1 Gektar",
    title: "Asosiy Daromad Manbai",
    description: "Daromadga aylantirish va asosiy yo'nalishga qo'yish",
    area: "100 sotix",
    plants: "9,000-12,000 nihollar",
    yearlyProfit: "800-900 million so'm",
    benefits: [
      "To'liq biznes sifatida",
      "Oilaning asosiy daromadi",
      "6-8 oyda investitsiya qaytadi",
      "Professional fermerlik"
    ],
    color: "accent",
    gradient: "from-accent/20 to-secondary/30"
  },
  {
    icon: Target,
    size: "10-15 Sotix",
    title: "2-chi Asosiy Daromad Manbai",
    description: "Qo'shimcha daromad va moliyaviy barqarorlik",
    area: "10-15 sotix",
    plants: "900-1,200 nihollar",
    yearlyProfit: "100+ million so'm",
    benefits: [
      "Asosiy ishga qo'shimcha",
      "Barqaror qo'shimcha daromad",
      "Kam vaqt talab qiladi",
      "Oson boshqarish"
    ],
    color: "secondary",
    gradient: "from-secondary/20 to-accent/20"
  },
  {
    icon: Home,
    size: "3-4 Sotix",
    title: "Bog' va Oila Uchun",
    description: "Shaxsiy ehtiyoj va oila uchun sog'lom mahsulot",
    area: "3-4 sotix",
    plants: "300-500 nihollar",
    yearlyProfit: "40+ million so'm",
    benefits: [
      "Oila uchun sog'lom meva",
      "Bolalar uchun tabiiy shirinlik",
      "Minimal parvarish",
      "Shaxsiy bog' sifatida"
    ],
    color: "emerald",
    gradient: "from-emerald-500/20 to-green-500/20"
  }
];

const LandPlansSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4">
        {/* Header */}
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
            <Banknote className="w-4 h-4 text-accent" />
            <span className="text-accent font-semibold text-sm tracking-wide">DAROMAD REJALARI</span>
          </motion.div>
          
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Sizga Mos</span>{" "}
            <span className="text-gradient-gold">Rejani Tanlang</span>
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Har xil maydon va maqsadlar uchun <span className="text-accent font-semibold">maxsus ishlab chiqilgan rejalar</span>
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {landPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`glass-card rounded-3xl p-8 h-full border-2 border-${plan.color}/20 hover:border-${plan.color}/40 hover:glow-gold transition-all duration-500 bg-gradient-to-br ${plan.gradient}`}
              >
                {/* Icon & Size */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <plan.icon className={`w-8 h-8 text-${plan.color === 'emerald' ? 'emerald-500' : plan.color}`} />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{plan.size}</h3>
                    <p className="text-sm text-foreground/60">{plan.area}</p>
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                  {plan.title}
                </h4>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                    <span className="text-foreground/70">Nihollar:</span>
                    <span className="font-semibold text-foreground">{plan.plants}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-accent/10">
                    <span className="text-foreground/70">Yillik foyda:</span>
                    <span className="font-bold text-accent text-lg">{plan.yearlyProfit}</span>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-foreground/90"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${plan.color === 'emerald' ? 'emerald-500' : plan.color}`} />
                      <span className="text-sm">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-8"
                >
                  <a
                    href="#order"
                    className={`block text-center py-3 px-6 rounded-xl border-2 border-${plan.color}/30 text-${plan.color === 'emerald' ? 'emerald-500' : plan.color} hover:bg-${plan.color}/10 transition-all duration-300 font-semibold`}
                  >
                    Bu Rejani Tanlash
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-secondary/5 max-w-4xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl mb-6"
            >
              ⏰
            </motion.div>
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Darhol Buyurtma Bering!
            </h3>
            <p className="text-lg text-foreground/80 mb-2">
              Bular hammasi — ekkan yilingiz ichida boʻladigan daromadlar.
            </p>
            <p className="text-xl text-accent font-bold mb-6">
              Vaqtni boy bermang, hozir eking va keyingi yil rohatini ko'ring!
            </p>
            
            <a
              href="#order"
              className="btn-premium inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              <span className="relative z-10">Hoziroq Boshlash</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandPlansSection;
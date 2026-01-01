import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Banknote, Clock, Heart, ShieldCheck, Sprout, Users } from "lucide-react";

const reasons = [
  {
    icon: Banknote,
    title: "Yuqori Daromad",
    description: "1 sotix yerdan yiliga 50+ million so'm sof foyda. Bank foizlaridan 10 baravar ko'p.",
  },
  {
    icon: Clock,
    title: "Tez Qaytim",
    description: "Birinchi yilyoq sarmoyangiz qaytadi. Ikkinchi yildan boshlab sof foyda.",
  },
  {
    icon: Sprout,
    title: "Oson Parvarish",
    description: "Maxsus bilim talab qilmaydi. Biz sizga to'liq ko'rsatma va qo'llab-quvvatlash beramiz.",
  },
  {
    icon: ShieldCheck,
    title: "100% Kafolat",
    description: "Har bir nihol tirik yetkazilishi kafolatlanadi. Nobud bo'lganlar almashtriladi.",
  },
  {
    icon: Heart,
    title: "Sog'liqqa Foyda",
    description: "Ekologik toza mahsulot. Bolalaringiz uchun eng sog'lom va tabiiy shirinlik.",
  },
  {
    icon: Users,
    title: "Oila Biznesi",
    description: "Butun oila birga ishlashi mumkin. Bolalaringizga boylik meros qoldiring.",
  },
];

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Nima Uchun</span>{" "}
            <span className="text-gradient-gold">Malina?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Moliyaviy erkinlik sari eng oson va ishonchli yo'l
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-8 h-full border border-border/50 group-hover:border-accent/30 group-hover:glow-gold transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center"
                >
                  <reason.icon className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;

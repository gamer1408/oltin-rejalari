import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bloomImage from "@/assets/raspberry-bloom.jpg";
import { Leaf, Sun, Droplets, Wind } from "lucide-react";

const features = [
  { icon: Sun, title: "Iyun-Iyul", desc: "Gullash davri" },
  { icon: Droplets, title: "Iyul-Sentabr", desc: "Birinchi hosil" },
  { icon: Leaf, title: "Sentabr-Oktabr", desc: "Ikkinchi hosil" },
  { icon: Wind, title: "Noyabr-Fevral", desc: "Dam olish davri" },
];

const BloomSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={bloomImage}
          alt="Raspberry bloom"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container relative z-10 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Gullab-Yashnagan</span>
              <br />
              <span className="text-gradient-raspberry">Malinazor</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Har bir nihol tabiatning mo'jizasi — gullashdan tortib to shirinlik bilan 
              to'lgan mevalargacha bo'lgan yo'lni biz bilan birga bosib o'ting
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center group hover:glow-emerald transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center"
                >
                  <feature.icon className="w-7 h-7 text-accent" />
                </motion.div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 border border-accent/20"
          >
            <p className="font-serif text-2xl md:text-3xl text-foreground italic mb-6">
              "Malina — eng kam mehnat talab qiladigan, lekin eng yuqori daromad beradigan meva. 
              Bir marta eking, 5-7 yil davomida foyda oling."
            </p>
            <footer className="text-accent font-medium">
              — 3 yillik tajribamiz xulosasi
            </footer>
          </motion.blockquote>
        </div>
      </motion.div>
    </section>
  );
};

export default BloomSection;

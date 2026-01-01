import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Star, Sparkles, TrendingUp } from "lucide-react";
import maravillaImage from "@/assets/maravilla-raspberry.jpg";
import enrasaderaImage from "@/assets/enrasadera-raspberry.jpg";

const products = [
  {
    name: "Maravilla",
    tagline: "Eng yuqori hosildor nav",
    image: maravillaImage,
    price: "15,000",
    originalPrice: "20,000",
    features: [
      "Yiliga 2 marta hosil beradi",
      "1 tup — 3-5 kg meva",
      "Sovuqqa chidamli (-25°C)",
      "Katta, shirali mevalar",
      "5 yil hosildorlik",
    ],
    roi: "350%",
    popular: true,
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  },
  {
    name: "Enrasadera",
    tagline: "Tirmaladigan nav — kam joy",
    image: enrasaderaImage,
    price: "12,000",
    originalPrice: "16,000",
    features: [
      "Vertikal o'sadi — joy tejaydi",
      "1 tup — 2-4 kg meva",
      "Issiqqa chidamli",
      "Kasalliklarga bardoshli",
      "7 yil hosildorlik",
    ],
    roi: "280%",
    popular: false,
    color: "from-secondary/30 to-secondary/5",
    borderColor: "border-secondary/30",
  },
];

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 -right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
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
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">PREMIUM NAVLAR</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Bizning</span>{" "}
            <span className="text-gradient-raspberry">Mahsulotlar</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Ispaniyadan keltirilgan, O'zbekiston iqlimiga 3 yil davomida sinab ko'rilgan 
            va ajoyib natija bergan navlar
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group`}
            >
              {/* Popular Badge */}
              {product.popular && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -top-4 right-6 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold text-sm shadow-lg"
                >
                  <Star className="w-4 h-4 fill-current" />
                  ENG OMMABOP
                </motion.div>
              )}

              <div className={`glass-card rounded-3xl overflow-hidden border ${product.borderColor} group-hover:glow-raspberry transition-all duration-500`}>
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color}`} />
                  
                  {/* ROI Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-accent/30">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold">{product.roi} ROI</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">{product.tagline}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3 text-foreground/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-4xl font-bold text-accent">{product.price}</span>
                    <span className="text-muted-foreground">so'm / nihal</span>
                    <span className="text-muted-foreground line-through ml-auto">{product.originalPrice}</span>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#order"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full btn-premium text-center"
                  >
                    <span className="relative z-10">Buyurtma Berish</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-accent/30 glow-gold">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6"
            >
              <span className="text-4xl">🚚</span>
            </motion.div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              1000+ Niholga <span className="text-gradient-gold">BEPUL YETKAZIB BERISH!</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              O'zbekistonning istalgan nuqtasiga — Toshkentdan Nukusgacha, Farg'onadan Xorazmgacha. 
              Har bir nihol ehtiyotkorlik bilan qadoqlangan holda yetkaziladi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

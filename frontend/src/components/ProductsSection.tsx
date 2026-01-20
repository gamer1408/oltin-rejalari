import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, Star, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import maravillaImage from "@/assets/maravilla-raspberry.jpg";
import enrasaderaImage from "@/assets/enrasadera-raspberry.jpg";

// Multiple images for each product (using same images rotated for demo - in production use real different images)
const products = [
  {
    name: "Maravilla",
    tagline: "O'rtacha hosildorlik",
    images: [maravillaImage, enrasaderaImage, maravillaImage, enrasaderaImage],
    price: "30,000",
    originalPrice: "45,000",
    features: [
      "5-6 oy hosildorlik",
      "1 tup — 1kg meva (<2kg)",
      "Meva og'irligi — 10g-14g",
      "Sovuqqa chidamli (-30°C)",
      "Katta, shirali mevalar",
      "10 yil hosildorlik",
      "Narxi — 65 ming so'm/kg",
      "Har yili 5ta ko'chat (<15)",
    ],
    roi: "350%",
    popular: false,
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
  },
  {
    name: "Enrasadira",
    tagline: "Hosildor",
    images: [enrasaderaImage, maravillaImage, enrasaderaImage, maravillaImage],
    price: "30,000",
    originalPrice: "45,000",
    features: [
      "6-7 oy hosil",
      "1 tup — 2kg meva (<3kg)",
      "Meva og'irligi — 7g-14g",
      "Sovuqqa chidamli (-30°C)",
      "Normal hajm, suvli, mazali",
      "10 yil hosildorlik",
      "Narxi — 50 ming so'm/kg",
      "Har yili 10ta ko'chat (<20)",
    ],
    roi: "280%",
    popular: true,
    color: "from-secondary/30 to-secondary/5",
    borderColor: "border-secondary/30",
  },
];

const ImageCarousel = ({ images, productName, color }: { images: string[]; productName: string; color: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64 overflow-hidden group">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`${productName} - ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
      <div className={`absolute inset-0 bg-gradient-to-t ${color}`} />
      
      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-accent w-4" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
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

              <div className={`glass-card rounded-2xl overflow-hidden border-2 ${product.borderColor} group-hover:border-accent/60 group-hover:shadow-2xl group-hover:shadow-accent/20 transition-all duration-500 bg-gradient-to-br ${product.color} backdrop-blur-xl`}>
                {/* Image Carousel */}
                <ImageCarousel images={product.images} productName={product.name} color={product.color} />
                
                {/* ROI Badge */}
                <div className="relative">
                  <div className="absolute -top-10 left-4 flex items-center gap-2 px-4 py-2 rounded-full glass-card border-2 border-accent/40 bg-accent/10 backdrop-blur-sm z-10">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold">{product.roi} ROI</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 pt-6">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">{product.tagline}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3 text-foreground/90"
                      >
                        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-sm md:text-base font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-end gap-3 mb-6 p-4 rounded-xl bg-background/50 border border-accent/20">
                    <span className="text-3xl md:text-4xl font-bold text-accent">{product.price}</span>
                    <span className="text-muted-foreground text-sm md:text-base font-medium">so'm / nihal</span>
                    <span className="text-muted-foreground line-through ml-auto text-sm md:text-base">{product.originalPrice}</span>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#order"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full btn-premium text-center py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10">Buyurtma Berish</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Choice Message & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-10 md:p-12 text-center border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-secondary/5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-6xl mb-6"
            >
              🍓
            </motion.div>
            
            <div className="space-y-4 mb-8">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                🍓 Maravilla yoki Enrasadera?
              </h3>
              <p className="text-xl text-accent font-semibold">
                💰 Narxi bir xil.
              </p>
              <p className="text-xl text-foreground/80">
                📈 Foydasi — strategiyaga bog'liq.
              </p>
              
              <div className="border-t border-accent/20 pt-6 mt-6">
                <p className="text-lg text-foreground font-medium mb-2">
                  Biz nav sotmaymiz.
                </p>
                <p className="text-xl text-accent font-bold">
                  Biz foyda yo'lini taklif qilamiz.
                </p>
              </div>
              
              <p className="text-lg text-foreground/70 mt-6">
                👇 Ariza qoldiring.
              </p>
            </div>

            <motion.a
              href="#order"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-accent via-accent to-secondary text-accent-foreground font-bold text-lg shadow-2xl hover:shadow-accent/25 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">✨ Buyurtma Yuborish</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Abdullayev Jamshid",
    location: "Samarqand",
    text: "2023 yilda 500 ta nihol oldim. Bu yil 15 million foyda ko'rdim. Keyingi yil yana 2000 ta olaman. Eng yaxshi qarorim!",
    plants: 500,
    profit: "15M",
    avatar: "👨‍🌾",
  },
  {
    name: "Karimova Dilnoza",
    location: "Farg'ona",
    text: "Hovlimda 200 ta Maravilla ekdim. Bolalarim juda xursand — har kuni yangi malina yeydilar. Qo'shnilar ham sotib olishyapti.",
    plants: 200,
    profit: "6M",
    avatar: "👩‍🌾",
  },
  {
    name: "Rahimov Botir",
    location: "Toshkent",
    text: "Investitsiya sifatida 5000 ta oldim. Birinchi yili sarmoya qaytdi, endi sof foyda. Bu biznes haqiqiy boylik yo'li!",
    plants: 5000,
    profit: "150M",
    avatar: "🧑‍💼",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Mijozlarimiz</span>{" "}
            <span className="text-gradient-raspberry">Fikrlari</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Haqiqiy mijozlar, haqiqiy natijalar
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-card rounded-3xl p-8 h-full border border-border/50 group-hover:border-accent/30 transition-all duration-500 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-accent" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground/90 leading-relaxed mb-6 text-lg italic">
                  "{testimonial.text}"
                </p>

                {/* Stats */}
                <div className="flex gap-6 mb-6 py-4 border-t border-b border-border/30">
                  <div>
                    <div className="text-2xl font-bold text-accent">{testimonial.plants}</div>
                    <div className="text-xs text-muted-foreground">nihal</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{testimonial.profit}</div>
                    <div className="text-xs text-muted-foreground">foyda</div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary/50 flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

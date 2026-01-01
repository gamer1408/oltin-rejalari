import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, MessageCircle, MapPin, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

const OrderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    plants: "",
    type: "maravilla",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Arizangiz qabul qilindi! Tez orada bog'lanamiz.", {
      description: "Rahmat, sizning ishonchingiz uchun!",
    });
    setFormData({ name: "", phone: "", region: "", plants: "", type: "maravilla", message: "" });
  };

  return (
    <section id="order" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Decorative Glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
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
            <span className="text-accent text-sm font-medium">BUYURTMA BERISH</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Hoziroq</span>{" "}
            <span className="text-gradient-gold">Boshlang</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Ariza qoldiring, mutaxassislarimiz 24 soat ichida siz bilan bog'lanadi
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10 border border-border/50">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ismingiz *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Viloyat *</label>
                  <input
                    type="text"
                    required
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="Masalan: Toshkent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nihollar soni *</label>
                  <input
                    type="number"
                    required
                    min="50"
                    value={formData.plants}
                    onChange={(e) => setFormData({ ...formData, plants: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="Minimum 50 ta"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Nav tanlang *</label>
                <div className="flex gap-4">
                  {[
                    { id: "maravilla", name: "Maravilla" },
                    { id: "enrasadera", name: "Enrasadera" },
                    { id: "both", name: "Ikkalasi" },
                  ].map((type) => (
                    <label
                      key={type.id}
                      className={`flex-1 text-center py-3 px-4 rounded-xl cursor-pointer border transition-all ${
                        formData.type === type.id
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border/50 text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.id}
                        checked={formData.type === type.id}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="sr-only"
                      />
                      {type.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">Qo'shimcha xabar</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="Savollaringiz yoki istaklaringiz..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-premium flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Ariza Yuborish</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Direct Contact */}
            <div className="glass-card rounded-3xl p-8 border border-border/50">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Bevosita Bog'laning
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+998901234567"
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">+998 90 123 45 67</div>
                    <div className="text-sm text-muted-foreground">Har kuni 9:00 - 21:00</div>
                  </div>
                </a>
                <a
                  href="https://t.me/malina_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Telegram: @malina_uz</div>
                    <div className="text-sm text-muted-foreground">Tez javob olish uchun</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Toshkent, Chilonzor tumani</div>
                    <div className="text-sm text-muted-foreground">Asosiy pitomnik</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="glass-card rounded-3xl p-8 border border-accent/20 glow-gold">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Bizning Kafolatlar
              </h3>
              <ul className="space-y-4">
                {[
                  "100% tirik nihollar kafolati",
                  "Bepul maslahat va qo'llanma",
                  "1000+ niholga bepul yetkazib berish",
                  "Nobud bo'lgan nihollar almashtiriladi",
                  "To'lov faqat qabul qilgandan keyin",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 text-foreground/90"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;

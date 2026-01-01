import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight, Maximize2, MapPin, Ruler } from "lucide-react";
import maravillaImage from "@/assets/maravilla-raspberry.jpg";
import enrasaderaImage from "@/assets/enrasadera-raspberry.jpg";
import raspberryBloomImage from "@/assets/raspberry-bloom.jpg";
import heroImage from "@/assets/hero-raspberry-field.jpg";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  area?: string;
};

const galleryItems: GalleryItem[] = [
  // Maravilla 1 Hectare
  {
    type: "video",
    src: "https://player.vimeo.com/video/824804225?autoplay=1&muted=1",
    thumbnail: maravillaImage,
    title: "Maravilla - 1 Gektar",
    description: "Tomchi sug'orish tizimi bilan jihozlangan 1 gektarlik Maravilla plantatsiyasi",
    category: "maravilla-1ha",
    area: "1 Gektar"
  },
  {
    type: "image",
    src: heroImage,
    thumbnail: heroImage,
    title: "Qatorlar - 1 Gektar",
    description: "Malina qatorlari orasidagi yo'laklar va tomchi sug'orish liniyalari",
    category: "maravilla-1ha",
    area: "1 Gektar"
  },
  {
    type: "image",
    src: maravillaImage,
    thumbnail: maravillaImage,
    title: "Hosil yig'ish",
    description: "Maravilla navidan hosil yig'ish jarayoni",
    category: "maravilla-1ha",
    area: "1 Gektar"
  },
  // Maravilla 12 Sotix
  {
    type: "video",
    src: "https://player.vimeo.com/video/824804225?autoplay=1&muted=1",
    thumbnail: raspberryBloomImage,
    title: "Maravilla - 12 Sotix",
    description: "Kichik fermer xo'jaligida 12 sotixlik Maravilla plantatsiyasi",
    category: "maravilla-12sotix",
    area: "12 Sotix"
  },
  {
    type: "image",
    src: raspberryBloomImage,
    thumbnail: raspberryBloomImage,
    title: "Gullash davri",
    description: "12 sotixlik maydonda gullash bosqichi",
    category: "maravilla-12sotix",
    area: "12 Sotix"
  },
  // Enrasadera 1 Hectare  
  {
    type: "video",
    src: "https://player.vimeo.com/video/824804225?autoplay=1&muted=1",
    thumbnail: enrasaderaImage,
    title: "Enrasadera - 1 Gektar",
    description: "Tirmaladigan Enrasadera navi bilan 1 gektarlik plantatsiya",
    category: "enrasadera-1ha",
    area: "1 Gektar"
  },
  {
    type: "image",
    src: enrasaderaImage,
    thumbnail: enrasaderaImage,
    title: "Vertikal o'sish",
    description: "Enrasadera navining vertikal o'sish tizimi",
    category: "enrasadera-1ha",
    area: "1 Gektar"
  },
  // Cultivation Process
  {
    type: "video",
    src: "https://player.vimeo.com/video/824804225?autoplay=1&muted=1",
    thumbnail: heroImage,
    title: "Tomchi sug'orish",
    description: "Uzun qatorlar bo'ylab tomchi sug'orish liniyalari",
    category: "cultivation",
    area: "Texnologiya"
  },
  {
    type: "image",
    src: maravillaImage,
    thumbnail: maravillaImage,
    title: "Tayanchlar va arqonlar",
    description: "Malina butalarining balandligi va shaklini saqlash uchun tayanchlar",
    category: "cultivation",
    area: "Texnologiya"
  },
  {
    type: "video",
    src: "https://player.vimeo.com/video/824804225?autoplay=1&muted=1",
    thumbnail: raspberryBloomImage,
    title: "Parvarishlash",
    description: "Kundalik parvarishlash jarayonlari",
    category: "cultivation",
    area: "Texnologiya"
  },
  // Results
  {
    type: "image",
    src: heroImage,
    thumbnail: heroImage,
    title: "Katta hosil",
    description: "Birinchi yilda olingan katta hosil",
    category: "results",
    area: "Natijalar"
  },
  {
    type: "image",
    src: enrasaderaImage,
    thumbnail: enrasaderaImage,
    title: "Sifatli mevalar",
    description: "Premium sifatli, katta va shirali mevalar",
    category: "results",
    area: "Natijalar"
  },
];

const categories = [
  { id: "all", label: "Barchasi" },
  { id: "maravilla-1ha", label: "Maravilla 1 Ga" },
  { id: "maravilla-12sotix", label: "Maravilla 12 Sotix" },
  { id: "enrasadera-1ha", label: "Enrasadera 1 Ga" },
  { id: "cultivation", label: "Etishtirish" },
  { id: "results", label: "Natijalar" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem, index: number) => {
    setLightboxItem(item);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" 
      ? (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      : (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(newIndex);
    setLightboxItem(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Bizning</span>{" "}
            <span className="text-gradient-raspberry">Plantatsiyalar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Haqiqiy rasmlar va videolar: qatorlar, tomchi sug'orish, tayanchlar va arqonlar bilan jihozlangan plantatsiyalarimiz
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "glass-card text-muted-foreground hover:text-foreground border border-border/30"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.category}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => openLightbox(item, index)}
            >
              <div className={`relative ${index % 5 === 0 ? "aspect-square" : "aspect-video"} overflow-hidden`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Video Icon */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-7 h-7 text-accent-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    {item.area && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/80 text-accent-foreground text-xs font-medium">
                        <Ruler className="w-3 h-3" />
                        {item.area}
                      </span>
                    )}
                  </div>
                  <h4 className="text-foreground font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-foreground/70 text-xs line-clamp-2">{item.description}</p>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 glass-card rounded-2xl p-6 border border-secondary/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                Bizning etishtirish usulimiz
              </h4>
              <p className="text-muted-foreground">
                Qatorlar orasida 2.5-3 metr masofa, tomchi sug'orish liniyalari, metal yoki yog'och tayanchlar,
                va arqonlar bilan butalarning balandligi va shaklini saqlash — bu bizning professional texnologiyamiz.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors z-10"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Content */}
          <div 
            className="max-w-5xl w-full max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.type === "video" ? (
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={lightboxItem.src}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
              />
            )}
            
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">{lightboxItem.title}</h3>
              <p className="text-muted-foreground">{lightboxItem.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;

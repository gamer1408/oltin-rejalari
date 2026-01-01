import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight, Maximize2, MapPin, Ruler } from "lucide-react";
import maravillaImage from "@/assets/maravilla-raspberry.jpg";
import enrasaderaImage from "@/assets/enrasadera-raspberry.jpg";
import raspberryBloomImage from "@/assets/raspberry-bloom.jpg";
import heroImage from "@/assets/hero-raspberry-field.jpg";
import enrasadira1 from "@/assets/enrasadira.jpg";
import enrasadira2 from "@/assets/enrasadira1.jpg";
import enrasadira3 from "@/assets/enrasadira2.jpg";
import enrasadira4 from "@/assets/enrasadira3.jpg";
import maravila1 from "@/assets/maravila.jpg";
import maravila2 from "@/assets/maravila.jpg1.jpg";
import maravila3 from "@/assets/marvila2.jpg";
import maravilla3 from "@/assets/maravilla3.jpg";

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
  // Maravilla
  {
    type: "image",
    src: heroImage,
    thumbnail: heroImage,
    title: "Maravilla qatorlari",
    description: "Malina qatorlari orasidagi yo'laklar va tomchi sug'orish liniyalari",
    category: "maravilla",
    area: "Maravilla"
  },
  {
    type: "image",
    src: maravillaImage,
    thumbnail: maravillaImage,
    title: "Maravilla hosili",
    description: "Maravilla navidan hosil yig'ish jarayoni",
    category: "maravilla",
    area: "Maravilla"
  },
  {
    type: "image",
    src: maravila1,
    thumbnail: maravila1,
    title: "Maravilla plantatsiyasi",
    description: "Maravilla navining o'sish jarayoni",
    category: "maravilla",
    area: "Maravilla"
  },
  {
    type: "image",
    src: maravila2,
    thumbnail: maravila2,
    title: "Maravilla mevasi",
    description: "Pishgan Maravilla mevalarining ko'rinishi",
    category: "maravilla",
    area: "Maravilla"
  },
  {
    type: "image",
    src: maravila3,
    thumbnail: maravila3,
    title: "Maravilla bog'i",
    description: "Maravilla plantatsiyasining umumiy ko'rinishi",
    category: "maravilla",
    area: "Maravilla"
  },
  {
    type: "image",
    src: maravilla3,
    thumbnail: maravilla3,
    title: "Maravilla hosildorligi",
    description: "Yuqori hosildor Maravilla tupi",
    category: "maravilla",
    area: "Maravilla"
  },
  // Enrasadira
  {
    type: "image",
    src: enrasaderaImage,
    thumbnail: enrasaderaImage,
    title: "Enrasadira o'sishi",
    description: "Enrasadira navining o'sish tizimi",
    category: "enrasadira",
    area: "Enrasadira"
  },
  {
    type: "image",
    src: enrasadira1,
    thumbnail: enrasadira1,
    title: "Enrasadira plantatsiyasi",
    description: "Enrasadira navining bog'dagi ko'rinishi",
    category: "enrasadira",
    area: "Enrasadira"
  },
  {
    type: "image",
    src: enrasadira2,
    thumbnail: enrasadira2,
    title: "Enrasadira mevasi",
    description: "Pishgan Enrasadira mevalarining rangi va shakli",
    category: "enrasadira",
    area: "Enrasadira"
  },
  {
    type: "image",
    src: enrasadira3,
    thumbnail: enrasadira3,
    title: "Enrasadira hosili",
    description: "Enrasadira navidan olingan hosil",
    category: "enrasadira",
    area: "Enrasadira"
  },
  {
    type: "image",
    src: enrasadira4,
    thumbnail: enrasadira4,
    title: "Enrasadira bog'i",
    description: "Enrasadira plantatsiyasining umumiy manzarasi",
    category: "enrasadira",
    area: "Enrasadira"
  },
];

const categories = [
  { id: "all", label: "Barchasi" },
  { id: "maravilla", label: "Maravilla" },
  { id: "enrasadira", label: "Enrasadira" },
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
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-card text-foreground hover:bg-accent/10 border border-border shadow-sm"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.category}-${index}`}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(item, index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs font-semibold text-accent-foreground shadow-sm">
                      {item.area}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-border">
                      <Maximize2 className="w-4 h-4 text-foreground" />
                    </div>
                  </div>

                  {/* Video Icon */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
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
                Qatorlar orasida 1.5-2 metr masofa, 0.5 metr qatorasiga, tomchi sug'orish liniyalari, metal yoki yog'och tayanchlar,
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

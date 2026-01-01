import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import CalculatorSection from "@/components/CalculatorSection";
import BloomSection from "@/components/BloomSection";
import WhySection from "@/components/WhySection";
import LandPlansSection from "@/components/LandPlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <GallerySection />
      <BloomSection />
      <WhySection />
      <LandPlansSection />
      <CalculatorSection />
      <TestimonialsSection />
      <OrderSection />
      <Footer />
    </main>
  );
};

export default Index;

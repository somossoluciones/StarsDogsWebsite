import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative h-[80vh] flex items-center justify-center bg-[#1A2A40]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1520038410233-7141be7e6f97')",
          opacity: 0.3
        }}
      />
      
      <motion.div
        className="relative text-center text-white z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-2xl mb-8">{t('hero.subtitle')}</p>
        <Link href="/puppies">
          <Button 
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B89530] text-white"
          >
            {t('hero.cta')}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

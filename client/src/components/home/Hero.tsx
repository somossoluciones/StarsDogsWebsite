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
      
      <div className="relative text-center text-white z-10">
        <motion.h1 
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p 
          className="text-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4
          }}
        >
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
    </div>
  );
}

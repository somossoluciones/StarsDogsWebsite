import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { motion } from "framer-motion";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <motion.nav
      className="bg-primary text-white py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-gold">StarsDogs</a>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="hover:text-[#D4AF37] transition-colors">{t('nav.home')}</a>
          </Link>
          <Link href="/puppies">
            <a className="hover:text-[#D4AF37] transition-colors">{t('nav.puppies')}</a>
          </Link>
          <Link href="/gallery">
            <a className="hover:text-[#D4AF37] transition-colors">{t('nav.gallery')}</a>
          </Link>
          <Link href="/contact">
            <a className="hover:text-[#D4AF37] transition-colors">{t('nav.contact')}</a>
          </Link>
          <LanguageSwitch />
        </div>
      </div>
    </motion.nav>
  );
}

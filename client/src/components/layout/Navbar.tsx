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
          <span className="text-2xl font-bold text-[#D4AF37] cursor-pointer">StarsDogs</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{t('nav.home')}</span>
          </Link>
          <Link href="/puppies">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{t('nav.puppies')}</span>
          </Link>
          <Link href="/gallery">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{t('nav.gallery')}</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{t('nav.contact')}</span>
          </Link>
          <LanguageSwitch />
        </div>
      </div>
    </motion.nav>
  );
}
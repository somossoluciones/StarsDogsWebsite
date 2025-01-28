import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { motion } from "framer-motion";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <motion.nav
      className="bg-primary text-white py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          <Link href="/">
            <span className="text-2xl font-bold text-[#D4AF37] cursor-pointer">StarsDogs</span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-8">
          {[
            { href: "/", text: t('nav.home') },
            { href: "/puppies", text: t('nav.puppies') },
            { href: "/gallery", text: t('nav.gallery') },
            { href: "/contact", text: t('nav.contact') }
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.3 + index * 0.1
              }}
            >
              <Link href={item.href}>
                <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  {item.text}
                </span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: 0.7
            }}
          >
            <LanguageSwitch />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

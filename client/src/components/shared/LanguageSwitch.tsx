import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="text-sm font-medium"
    >
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}

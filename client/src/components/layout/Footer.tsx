import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StarsDogs</h3>
            <p className="text-gray-300">Medellín, Colombia</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact.title')}</h3>
            <a 
              href="https://www.instagram.com/starsdogsmedellin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              Instagram: @starsdogsmedellin
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} StarsDogs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        puppies: "Puppies",
        gallery: "Gallery",
        contact: "Contact"
      },
      hero: {
        title: "StarsDogs",
        subtitle: "Premium Dachshund Puppies",
        cta: "View Available Puppies"
      },
      puppies: {
        title: "Our Puppies",
        available: "Available Puppies",
        contact: "Contact Us"
      },
      contact: {
        title: "Contact Us",
        whatsapp: "Chat on WhatsApp",
        form: {
          name: "Name",
          email: "Email",
          message: "Message",
          submit: "Send Message"
        }
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        puppies: "Cachorros",
        gallery: "Galería",
        contact: "Contacto"
      },
      hero: {
        title: "StarsDogs",
        subtitle: "Cachorros Teckel Premium",
        cta: "Ver Cachorros Disponibles"
      },
      puppies: {
        title: "Nuestros Cachorros",
        available: "Cachorros Disponibles",
        contact: "Contáctanos"
      },
      contact: {
        title: "Contáctanos",
        whatsapp: "Chatear por WhatsApp",
        form: {
          name: "Nombre",
          email: "Correo",
          message: "Mensaje",
          submit: "Enviar Mensaje"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const puppyImages = [
  "https://images.unsplash.com/photo-1550001632-fcfab51361ff",
  "https://images.unsplash.com/photo-1600606585687-c15e3de5725f",
  "https://images.unsplash.com/photo-1667257082085-9fc2162cc44a"
];

export function FeaturedPuppies() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('puppies.available')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {puppyImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-0">
                  <img
                    src={image}
                    alt="Dachshund puppy"
                    className="w-full h-64 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Dachshund Puppy</h3>
                    <p className="text-gray-600">8 weeks old</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

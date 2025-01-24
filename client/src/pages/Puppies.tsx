import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const puppies = [
  {
    image: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97",
    name: "Max",
    age: "8 weeks",
    color: "Red"
  },
  {
    image: "https://images.unsplash.com/photo-1550001632-fcfab51361ff",
    name: "Luna",
    age: "10 weeks",
    color: "Black & Tan"
  },
  {
    image: "https://images.unsplash.com/photo-1600606585687-c15e3de5725f",
    name: "Charlie",
    age: "12 weeks",
    color: "Chocolate"
  }
];

export default function Puppies() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">{t('puppies.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {puppies.map((puppy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <CardContent className="p-0">
                <img
                  src={puppy.image}
                  alt={puppy.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{puppy.name}</h2>
                  <p className="text-gray-600">{puppy.age}</p>
                  <p className="text-gray-600 mb-4">{puppy.color}</p>
                  <Button className="w-full bg-[#1A2A40] hover:bg-[#2A3A50]">
                    {t('contact.whatsapp')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

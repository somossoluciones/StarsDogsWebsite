import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "https://images.unsplash.com/photo-1520038410233-7141be7e6f97",
  "https://images.unsplash.com/photo-1550001632-fcfab51361ff",
  "https://images.unsplash.com/photo-1600606585687-c15e3de5725f",
  "https://images.unsplash.com/photo-1667257082085-9fc2162cc44a",
  "https://images.unsplash.com/photo-1663243765691-335589984744",
  "https://images.unsplash.com/photo-1653528333963-144345ef6cb2"
];

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-0">
                <img
                  src={image}
                  alt="Dachshund"
                  className="w-full h-64 object-cover rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

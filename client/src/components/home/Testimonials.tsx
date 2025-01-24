import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1699029969784-32d47f618b56",
    name: "John Smith",
    text: "We couldn't be happier with our Dachshund puppy from StarsDogs. The process was smooth and professional."
  },
  {
    image: "https://images.unsplash.com/photo-1596698338259-00c6169b63e2",
    name: "Maria Garcia",
    text: "Excelente experiencia con StarsDogs. Nuestro cachorro es hermoso y saludable."
  }
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      loading="lazy"
                    />
                    <h3 className="font-semibold">{testimonial.name}</h3>
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

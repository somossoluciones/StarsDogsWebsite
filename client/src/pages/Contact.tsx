import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { t } = useTranslation();
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              {t('contact.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  placeholder={t('contact.form.name')}
                  {...form.register('name')}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t('contact.form.email')}
                  {...form.register('email')}
                />
              </div>
              <div>
                <Textarea
                  placeholder={t('contact.form.message')}
                  className="min-h-[150px]"
                  {...form.register('message')}
                />
              </div>
              <Button type="submit" className="w-full">
                {t('contact.form.submit')}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">{t('contact.whatsapp')}</p>
              <Button
                variant="outline"
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => window.open('https://wa.me/573001234567', '_blank')}
              >
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

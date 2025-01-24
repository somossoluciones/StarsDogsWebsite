import { Hero } from "@/components/home/Hero";
import { FeaturedPuppies } from "@/components/home/FeaturedPuppies";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedPuppies />
      <Testimonials />
    </div>
  );
}

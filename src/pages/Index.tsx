import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { Amenities } from "@/components/home/Amenities";
import { Testimonials } from "@/components/home/Testimonials";
import { Location } from "@/components/home/Location";
import { CTA } from "@/components/home/CTA";

const Index = () => (
  <PageLayout>
    <Hero />
    <Stats />
    <FeaturedRooms />
    <Amenities />
    <Testimonials />
    <Location />
    <CTA />
  </PageLayout>
);

export default Index;

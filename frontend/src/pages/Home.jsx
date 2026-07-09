import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '@/features/properties/propertySlice';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HowItWorks from '@/components/home/HowItWorks';
import WhyRushkey from '@/components/home/WhyRushkey';
import MapSection from '@/components/home/MapSection';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties({ page: 1, limit: 6 }));
  }, [dispatch]);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <TrustSection />
      <FeaturedProperties />
      <HowItWorks />
      <WhyRushkey />
      <MapSection />
      <Testimonials />
      <CTASection />
    </main>
  );
}

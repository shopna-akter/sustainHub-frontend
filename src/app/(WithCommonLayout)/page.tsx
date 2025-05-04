import { HeroSection } from "@/components/modules/Hero";
import { IdeaSearchBar } from "@/components/modules/IdeaSearchBar";
import { TestimonialsSection } from "@/components/modules/Testimonial";


export default function HomePage() {
  const dummyIdeas = [
    { title: 'Eco Water Filters', description: 'Clean water with zero energy.', category: 'Environment' },
    { title: 'Smart Trash Sorter', description: 'AI-based waste separation.', category: 'Technology' },
    { title: 'Solar Charging Pods', description: 'Sustainable urban energy.', category: 'Energy' },
  ];

  return (
    <div>
      <HeroSection />
      <IdeaSearchBar />
      <TestimonialsSection ideas={dummyIdeas} />
    </div>
  );
}

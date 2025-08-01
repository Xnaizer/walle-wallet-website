// page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import ScrollProgress from "./components/utils/ScrollProgress";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Landing/HeroSection";
import ProblemSection from "./components/Landing/ProblemSection";
import SolutionSection from "./components/Landing/SolutionSection";
import CardDisplay from "./components/utils/CardDisplay";

// Lazy load heavier components
const HowItWorksSection = dynamic(() => import("./components/Landing/HowItWorksSection"), {
  loading: () => <SectionLoader />
});
const FeaturesSection = dynamic(() => import("./components/Landing/FeaturesSection"), {
  loading: () => <SectionLoader />
});
const RoadmapSection = dynamic(() => import("./components/Landing/RoadmapSection"), {
  loading: () => <SectionLoader />
});
const CTASection = dynamic(() => import("./components/Landing/CTASection"), {
  loading: () => <SectionLoader />
});
const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <SectionLoader />
});

// Improved loading component
const SectionLoader = () => (
  <div className="w-full h-80 flex items-center justify-center">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className=" min-h-screen ">
      {/* Global UI Components */}
      <ScrollProgress />
      {/* <AnimatedBackground /> */}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
    
        
        <ProblemSection />
        
        <SolutionSection />
        
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <RoadmapSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
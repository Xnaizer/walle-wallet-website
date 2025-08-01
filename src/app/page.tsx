// page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import ScrollProgress from "./components/utils/ScrollProgress";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Landing/HeroSection";
import ProblemSection from "./components/Landing/ProblemSection";
import SolutionSection from "./components/Landing/SolutionSection";

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

const SectionLoader = () => (
  <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-primary-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Section wrapper component for consistent styling and spacing
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className = "" }) => (
  <section 
    id={id} 
    className={`scroll-mt-24 ${className}`}
    style={{ scrollMarginTop: '6rem' }} // Account for navbar height
  >
    {children}
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Global UI Components */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <SectionWrapper id="hero">
          <HeroSection />
        </SectionWrapper>
        
        {/* Problem Section */}
        <SectionWrapper id="problem">
          <ProblemSection />
        </SectionWrapper>
        
        {/* Solution Section */}
        <SectionWrapper id="solution">
          <SolutionSection />
        </SectionWrapper>
        
        {/* How It Works Section */}
        <SectionWrapper id="how-it-works">
          <Suspense fallback={<SectionLoader />}>
            <HowItWorksSection />
          </Suspense>
        </SectionWrapper>
        
        {/* Features Section */}
        <SectionWrapper id="features">
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSection />
          </Suspense>
        </SectionWrapper>
        
        {/* Roadmap Section */}
        <SectionWrapper id="roadmap">
          <Suspense fallback={<SectionLoader />}>
            <RoadmapSection />
          </Suspense>
        </SectionWrapper>
        
        {/* CTA Section */}
        <SectionWrapper id="cta">
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </SectionWrapper>
      </main>
      
      {/* Footer */}
      <SectionWrapper id="footer">
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </SectionWrapper>
    </div>
  );
}
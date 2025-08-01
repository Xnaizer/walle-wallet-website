
import HeroSection from "./components/Landing/HeroSection";
import Navbar from "./components/Navbar";
import ProblemSection from "./components/Landing/ProblemSection";
import SolutionSection from "./components/Landing/SolutionSection";
import HowItWorksSection from "./components/Landing/HowItWorksSection";
import FeaturesSection from "./components/Landing/FeaturesSection";
import RoadmapSection from "./components/Landing/RoadmapSectiom";
import CTASection from "./components/Landing/CTASection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RoadmapSection />
      <CTASection />
      <Footer />
    </div>
  );
};




















export default App;






"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Problem {
  title: string;
  description: string;
  icon: string;
  impact: string;
  color: string;
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  const problems: Problem[] = [
    {
      title: "High Transaction Fees",
      description: "Traditional payment systems charge 2-5% in fees, significantly reducing profit margins for businesses and increasing costs for consumers.",
      icon: "💸",
      impact: "Up to 5% fees",
      color: "bg-primary-50 border-primary-200"
    },
    {
      title: "Slow Processing Times", 
      description: "Bank transfers and international payments take 2-5 business days to process, creating cash flow problems and poor user experience.",
      icon: "⏰",
      impact: "2-5 day delays",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Complex Crypto Setup",
      description: "Current cryptocurrency solutions require technical expertise, private key management, and understanding of blockchain technology.",
      icon: "🔧", 
      impact: "90% find it too complex",
      color: "bg-secondary-50 border-secondary-200"
    },
    {
      title: "Limited Global Access",
      description: "Cross-border payments face regulatory restrictions, high fees, and limited availability in developing countries.",
      icon: "🌐",
      impact: "1.7B people excluded",
      color: "bg-primary-50 border-primary-200"
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Static Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-blue-800 mb-6 leading-tight">
            Why Current Payment 
            <br />
            Systems <span className="text-secondary-500">Fail</span>
          </h2>
          
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            The existing financial infrastructure creates barriers, increases costs, and limits global commerce opportunities.
          </p>
        </div>

        {/* Problems Cards - NO TRANSITIONS */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border-2 ${problem.color} p-8`}
              style={{ 
                transition: 'none' // Matikan semua transition
              }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <div className="text-8xl">{problem.icon}</div>
              </div>
              
              {/* Content - NO TRANSITIONS */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{problem.icon}</div>
                  <div>
                    <p 
                      className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-blue-800 bg-clip-text text-transparent"
                      style={{ transition: 'none' }} // Pastikan title tidak transition
                    >
                      {problem.title}
                    </p>
                    <div 
                      className="inline-block mt-2 px-3 py-1 bg-white/70 text-blue-700 text-sm font-semibold rounded-full"
                      style={{ transition: 'none' }}
                    >
                      {problem.impact}
                    </div>
                  </div>
                </div>
                
                <p 
                  className="text-lg text-blue-700 leading-relaxed"
                  style={{ transition: 'none' }}
                >
                  {problem.description}
                </p>
              </div>
              
              {/* Optional: Hover Effect hanya untuk shadow */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: '0 0 0 rgba(0,0,0,0)',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
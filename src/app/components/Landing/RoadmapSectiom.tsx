"use client";
import React from "react";
import { motion} from "framer-motion";


interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: "current" | "upcoming" | "future";
}

export default function RoadmapSection () {
  const roadmapItems: RoadmapItem[] = [
    {
      quarter: "Q4 2025",
      title: "Core Infrastructure",
      description: "NFC Payment Card, EDC Merchant, Management App",
      status: "current",
    },
    {
      quarter: "Q1 2026",
      title: "Enhanced Features",
      description: "Onramp Feature, Wallet Transfer, Swap Crypto",
      status: "upcoming",
    },
    {
      quarter: "Q2 2026",
      title: "Mainnet Deployment",
      description: "Launch Development, Airdrop Incentive, Community Building",
      status: "upcoming",
    },
    {
      quarter: "Q3 2026",
      title: "Advanced Products",
      description: "Multiple Card Types, Money Management, New Features",
      status: "future",
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Development Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our journey to revolutionize the payment industry
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 to-purple-200 hidden md:block"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 md:pr-8">
                  <div
                    className={`${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    } text-center md:text-left`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                        item.status === "current"
                          ? "bg-blue-100 text-blue-800"
                          : item.status === "upcoming"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.quarter}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0 w-4 h-4 bg-white border-4 border-blue-500 rounded-full hidden md:block"></div>

                <div className="flex-1 md:pl-8"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
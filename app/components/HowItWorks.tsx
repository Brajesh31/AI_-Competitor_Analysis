"use client"
import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, DatabaseIcon, BarChartIcon, BriefcaseIcon } from 'lucide-react';
export const HowItWorks = () => {
  const steps = [{
    icon: <SearchIcon className="h-8 w-8 text-blue-600" />,
    title: 'AI-Powered Research',
    description: 'Scan the search result with Google Gemini to get more accurate results.'
  }, {
    icon: <DatabaseIcon className="h-8 w-8 text-blue-600" />,
    title: 'Data Analysis',
    description: 'Analyze available public data to identify which of your competitors have worked with your target accounts.'
  }, {
    icon: <BarChartIcon className="h-8 w-8 text-blue-600" />,
    title: 'Insight Generation',
    description: 'Receive detailed reports on the nature of competitor relationships with your target accounts.'
  }, {
    icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
    title: 'Strategic Advantage',
    description: 'Use these insights to tailor your sales approach and win more deals.'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How CompetitorSpy Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI platform does the heavy lifting so you don't have to spend
            hours on manual research
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }}>
          {steps.map((step, index) => <motion.div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow" variants={itemVariants} whileHover={{
          y: -5
        }}>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>)}
        </motion.div>
        <motion.div className="mt-16 bg-blue-50 p-8 rounded-xl" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Save Time & Gain Competitive Edge
              </h3>
              <p className="mt-2 text-gray-600">
                What used to take your team days of manual research now takes
                just minutes with our AI platform.
              </p>
            </div>
            <motion.button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              Schedule a Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>;
};
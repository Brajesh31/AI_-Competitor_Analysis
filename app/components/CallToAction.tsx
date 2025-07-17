"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ZapIcon } from 'lucide-react';
export const CallToAction = () => {
  const benefits = ['Save 20+ hours of manual research per week', 'Discover hidden competitor relationships', 'Gain strategic insights for sales pitches', 'Personalize your approach to target accounts', 'Stay ahead of your competition'];
  return <section className="py-20 px-4 md:px-6 lg:px-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <motion.h2 className="text-3xl md:text-4xl font-bold leading-tight" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2,
            duration: 0.8
          }}>
              Ready to Gain the Competitive Edge?
            </motion.h2>
            <motion.p className="mt-6 text-xl opacity-90 leading-relaxed" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.4,
            duration: 0.8
          }}>
              Stop spending hours on manual research. Let our AI do the work for
              you and uncover the competitive intelligence you need to win more
              deals.
            </motion.p>
            <motion.ul className="mt-8 space-y-4" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.6,
            duration: 0.8
          }}>
              {benefits.map((benefit, index) => <motion.li key={index} className="flex items-start" initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.6 + index * 0.1,
              duration: 0.5
            }}>
                  <CheckIcon className="h-6 w-6 text-blue-300 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>)}
            </motion.ul>
          </motion.div>
          <motion.div className="bg-white p-8 rounded-xl shadow-xl text-gray-900" initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input type="text" id="company" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" placeholder="Acme Inc." />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" placeholder="john@acme.com" />
              </div>
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Account
                </label>
                <input type="text" id="target" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" placeholder="e.g., Microsoft, Amazon, etc." />
              </div>
              <motion.button type="submit" className="w-full mt-6 px-6 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center" whileHover={{
              scale: 1.03
            }} whileTap={{
              scale: 0.97
            }}>
                <ZapIcon className="mr-2 h-5 w-5" />
                Get Your Competitive Intelligence Report
              </motion.button>
              <p className="text-xs text-gray-500 text-center mt-4">
                No credit card required. Get your first report free.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
};
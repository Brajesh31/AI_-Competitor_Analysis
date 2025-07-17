"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ZapIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter()

  return (
    <section id="home" className="pt-28 pb-20 px-4 md:px-6 lg:px-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2,
              duration: 0.8
            }}>
              Uncover Your Competitors'{' '}
              <span className="text-blue-600">Client Relationships</span>
            </motion.h1>
            <motion.p className="mt-6 text-xl text-gray-600 leading-relaxed" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4,
              duration: 0.8
            }}>
              Our AI-powered competitive intelligence platform reveals which of
              your competitors have worked with your target accounts, giving you
              the edge in your sales approach.
            </motion.p>
            <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6,
              duration: 0.8
            }}>
              <motion.button onClick={()=>router.push('/competitors')} className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 flex items-center justify-center" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                <ZapIcon className="mr-2 h-5 w-5" />
                Get Started
              </motion.button>
              <motion.button className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg border border-blue-200 hover:bg-blue-50 flex items-center justify-center" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                <SearchIcon className="mr-2 h-5 w-5" />
                See Demo
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div className="relative" initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
            <motion.div className="bg-white p-6 rounded-2xl shadow-xl" whileHover={{
              y: -5,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-bold text-gray-800">
                  Target Account Analysis
                </h3>
                <p className="text-gray-600 text-sm">Virgin Media</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Competitor Connections Found:
                </span>
                <span className="text-lg font-bold text-blue-600">7</span>
              </div>
              <div className="space-y-3">
                {['Accenture', 'TCS', 'Wipro'].map((company, index) => <motion.div key={company} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center" initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5
                }}>
                  <span className="font-medium">{company}</span>
                  <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                    Active
                  </span>
                </motion.div>)}
                <motion.div className="mt-4 text-center" whileHover={{
                  scale: 1.05
                }}>
                  <a href="#findings" className="text-blue-600 font-medium text-sm">
                    View all findings →
                  </a>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.8,
              duration: 0.5
            }} whileHover={{
              scale: 1.05
            }}>
              <p className="font-bold">Save 20+ hours</p>
              <p className="text-sm">of manual research per week</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
};
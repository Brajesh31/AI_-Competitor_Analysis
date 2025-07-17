"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, TwitterIcon, LinkedinIcon, FacebookIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <motion.div className="flex items-center mb-4" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <EyeIcon className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold text-white">
                CompetitorSpy
              </span>
            </motion.div>
            <p className="text-sm text-gray-400">
              AI-powered competitive intelligence to help you win more deals by
              understanding your competitors' client relationships.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                <TwitterIcon size={20} />
              </motion.a>
              <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                <LinkedinIcon size={20} />
              </motion.a>
              <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                <FacebookIcon size={20} />
              </motion.a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Case Studies', 'Testimonials', 'API'].map(item => <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Documentation', 'Support Center', 'FAQ', 'Webinars'].map(item => <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map(item => <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 CompetitorSpy. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-white mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
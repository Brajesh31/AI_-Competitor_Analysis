"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon, EyeIcon } from 'lucide-react';
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-10 py-4 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <motion.div className="flex items-center" onClick={()=>{window.location.href="/"}} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
        <EyeIcon className="h-8 w-8 text-blue-600 mr-2" />
        <span className="text-xl font-bold text-gray-900">CompetitorAnalysis</span>
      </motion.div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {['Home', 'How It Works', 'Findings', 'Contact'].map(item => <motion.a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-blue-600 font-medium" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
          {item}
        </motion.a>)}
      </nav>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} className="text-gray-600">
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </motion.button>
      </div>
    </div>
    {/* Mobile Menu */}
    {mobileMenuOpen && <motion.div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md" initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }}>
      <div className="flex flex-col py-4 px-6 space-y-4">
        {['Home', 'How It Works', 'Findings', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-blue-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
          {item}
        </a>)}
      </div>
    </motion.div>}
  </motion.header>;
};
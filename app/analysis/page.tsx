"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CompetitorFinder } from '../components/analysiscomp/CompetitorFinder'
import { TargetAnalysis } from '../components/analysiscomp/TargetAnalysis'



export default function page()  {
  const [analysisStep, setAnalysisStep] = useState(1)
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Competitive Intelligence Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your competitors and analyze their relationships with your
            target accounts
          </p>
        </motion.div>
        <div className="space-y-8">
          <TargetAnalysis/>
        </div>
      </div>
    </main>
  )
}

"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, BuildingIcon, LoaderIcon } from 'lucide-react'

interface CompetitorFinderProps {
  isActive: boolean
  onComplete: () => void
}
export const CompetitorFinder: React.FC<CompetitorFinderProps> = ({
  isActive,
  onComplete,
}) => {
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [competitors, setCompetitors] = useState<string[]>([])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCompetitors([
        'Accenture',
        'TCS',
        'Wipro',
        'Cognizant',
        'Capgemini',
        'HCL Technologies',
      ])
      setIsLoading(false)
    }, 2000)
  }
  return (
    <motion.section
      className={`bg-white rounded-xl shadow-lg p-8 ${!isActive && 'opacity-50'}`}
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
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <BuildingIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Find Your Competitors
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Company Name
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="e.g., Infosys"
            disabled={!isActive}
          />
        </div>
        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            disabled={!isActive}
          >
            <option value="">Select your industry</option>
            <option value="it">Information Technology</option>
            <option value="consulting">Consulting</option>
            <option value="software">Software Development</option>
            <option value="telecom">Telecommunications</option>
          </select>
        </div>
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={!isActive || isLoading}
        >
          {isLoading ? (
            <LoaderIcon className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <SearchIcon className="h-5 w-5 mr-2" />
              Find Competitors
            </>
          )}
        </motion.button>
      </form>
      <AnimatePresence>
        {competitors.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Main Competitors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitors.map((competitor) => (
                <motion.div
                  key={competitor}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                >
                  {competitor}
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={onComplete}
              className="mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 flex items-center justify-center mx-auto"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              Continue to Target Analysis
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

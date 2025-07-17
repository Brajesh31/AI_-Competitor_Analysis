"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, Building2, Loader2 } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCompetitorStore } from "../store/competitorStore"

interface Competitor {
  title: string,
  confidence: number
}

export default function CompetitorFinderPage() {
  const [company, setCompany] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Zustand store hooks
  const competitors = useCompetitorStore((state) => state.competitors)
  const setCompetitors = useCompetitorStore((state) => state.setCompetitors)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const compres = await axios.post("/api/getcomp", {
      "targetCompany": company
    })

    const data = compres.data.result
    console.log("Competitors data:", data)
    setCompetitors(data) // ✅ sets Zustand state

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <motion.section
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <div className="bg-blue-200 p-3 rounded-full mr-4">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Discover Your Competitors
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Your Company Name
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Infosys"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 flex items-center justify-center transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <SearchIcon className="h-5 w-5 mr-2" />
                Find Competitors
              </>
            )}
          </motion.button>

        </form>
          {competitors.length === 0 && (
            <motion.button
              className="mt-8 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 flex items-center justify-center mx-auto transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/analysis")}
            >
              Analyze with Custom Search
            </motion.button>
          )}

        <AnimatePresence>
          {competitors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-10"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Competitors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {competitors.map((competitor, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <strong>{competitor.title}</strong>
                    </div>
                    <p className="mt-2 text-gray-600">Confidence Metric: {(competitor.confidence * 100).toFixed(2)}%</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 flex items-center justify-center mx-auto transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/analysis")}
              >
                Continue to Target Analysis
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  )
}

"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence, convertOffsetToTimes } from 'framer-motion'
import {
  TargetIcon,
  LoaderIcon,
  ExternalLinkIcon,
  BrainCircuit,
} from 'lucide-react'
import axios from 'axios'
import ExportCSVButton from '@/app/analysis/exporttocsv'
import { useCompetitorStore } from '@/app/store/competitorStore'
import PaginatedResults from './paginatedComp'


interface AnalysisResult {
  title: string
  link: string
  confidence?: number
}

export const TargetAnalysis = () => {

  const competitors = useCompetitorStore((state) => state.competitors)
  const setCompetitors = useCompetitorStore((state) => state.setCompetitors)

  const [targetCompany, setTargetCompany] = useState('')
  const [competitorCompany, setCompetitorCompany] = useState('')
  const [searchScope, setSearchScope] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>([])

  const [ailoading, setailoading] = useState(false)

  const handleScope = async (
    targetCompany: string,
    competitorCompany: string,
    searchScope: number | string // Update type
  ): Promise<AnalysisResult[]> => {
    const endpoints: string[] = []
    console.log("searchScope", searchScope)
    if (searchScope === 'pdf') {
      console.log("PDF scraping")
      endpoints.push("/api/pdfscrape") // Your PDF scraping endpoint
    } else {
      const numericScope = parseInt(searchScope as string)
      if (numericScope >= 1) endpoints.push("/api/getcollabs")
      if (numericScope >= 2) endpoints.push("/api/gnewscrap")
      if (numericScope >= 3) endpoints.push("/api/apiscrape")
    }

    const requests = endpoints.map((url) =>
      axios.post(url, {
        targetCompany,
        competitorCompany,
      })
    )

    try {
      const responses = await Promise.all(requests)
      responses.forEach((res) => {
        console.log(`Response from ${res.config.url}:`, res.data.count)
      })
      const allResults = responses.flatMap((res) => res.data.results)
      return allResults
    } catch (error) {
      console.error("Error in fetching data from scope endpoints:", error)
      return []
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (searchScope === 'pdf') {
        console.log("PDF scraping")
        setResults([]) // Clear previous results
        const pdfResults = await handleScope(
          targetCompany,
          competitorCompany,
          searchScope
        )
        setResults(pdfResults)        
      }else{

        const combinedResults = await handleScope(
          targetCompany,
          competitorCompany,
          parseInt(searchScope)
        )
        setResults(combinedResults)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAIAnalysis = async () => {
    setailoading(true)
    console.log("results", results)
    const airesp = await axios.post('/api/aianalysis', {
      results: results,
    })
    console.log("airesp", airesp.data)
    airesp.data.result.sort((a: AnalysisResult, b: AnalysisResult) => {
      return (b.confidence || 0) - (a.confidence || 0)
    })
    console.log("sorted", airesp.data.result)
    setResults(airesp.data.result)
    setailoading(false)

  }

  return (
    <motion.section
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-start mb-8">
        <div className="flex flex-row items-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <TargetIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Target Company Analysis
          </h2>
        </div>

        <div>
          <strong>Your previous search includes</strong>
          {competitors.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {competitors.map((comp, index) => (
                <motion.span
                  key={index}
                  className="ml-2 px-4 py-2 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold cursor-pointer transition-colors hover:bg-purple-300"
                  onClick={() => {
                    setCompetitorCompany(comp.title)
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: '#D6B5F5', // Hover effect
                  }}
                  whileTap={{ scale: 0.95 }} // Slight scaling on click
                  initial={{ opacity: 0, y: 20 }} // Start hidden and below
                  animate={{ opacity: 1, y: 0 }} // Animate to visible position
                  transition={{ duration: 0.3, delay: index * 0.1 }} // Staggered fade-in
                >
                  {comp.title} ({(comp.confidence * 100).toFixed(2)}%)
                </motion.span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="target-company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Target Company
            </label>
            <input
              id="target-company"
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="e.g., Virgin Media"
              required
            />
          </div>

          <div>
            <label
              htmlFor="competitor-company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Competitor Company
            </label>
            <input
              id="competitor-company"
              type="text"
              value={competitorCompany}
              onChange={(e) => setCompetitorCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="e.g., BT Group"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="search-scope"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search Scope
          </label>
          <select
            id="search-scope"
            value={searchScope}
            onChange={(e) => setSearchScope(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            <option value="1">DuckDuckGo only</option>
            <option value="2">DuckDuckGo + GNews</option>
            <option value="3">DuckDuckGo + GNews + ScrapeAPI</option>
            <option value="pdf">PDF Files Only</option> {/* NEW */}
          </select>

        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <LoaderIcon className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <TargetIcon className="h-5 w-5 mr-2" />
              Analyze Target Company
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-10"
          >
            <div className='flex flex-row items-center justify-between mb-4'>
              <div className='flex flex-col mt-0'>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                All Results From Different Sources
              </h3>
              <p>Total Results: {results.length}</p>
              </div>
              {ailoading ? (
                <LoaderIcon className="h-5 w-5 animate-spin" />
              ) : (
                <button
                  onClick={handleAIAnalysis}
                  className="flex items-center gap-2 px-4 py-2 mb-3 bg-blue-500 text-white rounded-4xl hover:bg-blue-700 transition"
                >
                  <BrainCircuit className="" />
                  Run AI Analysis
                </button>
              )}
            </div>
            <div className="space-y-4">
              {/* {results.map((result, index) => (
                <motion.a
                  key={index}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded-lg shadow-sm transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-semibold text-purple-800 hover:underline">
                      {result.title}
                    </h4>
                    <ExternalLinkIcon className="h-4 w-4 text-purple-400 mt-1" />
                  </div>
                  <p className="text-sm text-gray-500 truncate">{result.link}</p>
                  {typeof result.confidence === 'number' && (
                    <p className="text-xs text-gray-700 mt-1 font-extrabold">
                      Confidence: {(result.confidence * 100).toFixed(2)}%
                    </p>
                  )}
                </motion.a>
              ))} */}
              <PaginatedResults results={results} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
      <div className="fixed bottom-4 right-4 z-50">
        <ExportCSVButton data={results} />
      </div>
    </motion.section>
  )
}

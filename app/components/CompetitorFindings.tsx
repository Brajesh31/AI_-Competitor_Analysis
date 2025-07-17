"use client";
import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLinkIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
export const CompetitorFindings = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const competitors = [{
    id: 1,
    name: 'Accenture',
    relationship: 'Active Partnership',
    description: 'Accenture has been working with Virgin Media since 2018 on digital transformation initiatives, including customer experience enhancement and IT infrastructure modernization.',
    source: 'https://newsroom.accenture.com/news/virgin-media-selects-accenture-for-digital-transformation.htm'
  }, {
    id: 2,
    name: 'TCS',
    relationship: 'Ongoing Project',
    description: "TCS is currently handling Virgin Media's cloud migration project and providing managed IT services for their customer service operations.",
    source: 'https://www.tcs.com/success-stories/virgin-media-cloud-transformation'
  }, {
    id: 3,
    name: 'Wipro',
    relationship: 'Past Engagement',
    description: 'Wipro completed a major network infrastructure upgrade for Virgin Media in 2020, focusing on improving network reliability and speed.',
    source: 'https://www.wipro.com/en-IN/telecommunications/case-studies/virgin-media-network-upgrade/'
  }, {
    id: 4,
    name: 'Cognizant',
    relationship: 'Active Partnership',
    description: "Cognizant is currently providing application development and maintenance services for Virgin Media's customer-facing applications.",
    source: 'https://www.cognizant.com/us/en/case-studies/telecommunications/virgin-media'
  }, {
    id: 5,
    name: 'Capgemini',
    relationship: 'Recent Contract',
    description: 'Capgemini signed a contract with Virgin Media in 2022 to implement a new CRM system and enhance data analytics capabilities.',
    source: 'https://www.capgemini.com/news/press-releases/virgin-media-selects-capgemini-for-crm-implementation/'
  }, {
    id: 6,
    name: 'HCL Technologies',
    relationship: 'Past Engagement',
    description: 'HCL Technologies provided DevOps transformation services to Virgin Media between 2019 and 2021, helping them adopt agile methodologies.',
    source: 'https://www.hcltech.com/success-stories/telecommunications/virgin-media-devops'
  }, {
    id: 7,
    name: 'Tech Mahindra',
    relationship: 'Active Partnership',
    description: "Tech Mahindra is currently managing Virgin Media's network operations center and providing 24/7 monitoring and support services.",
    source: 'https://www.techmahindra.com/en-in/success-stories/virgin-media-network-operations/'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        duration: 0.5
      }
    }
  };
  return <section id="findings" className="py-20 px-4 md:px-6 lg:px-10 bg-gray-50">
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
            Infosys Competitors Working with Virgin Media
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI has identified these competitors that have worked with or are
            currently working with Virgin Media
          </p>
        </motion.div>
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }}>
          {competitors.map(competitor => <motion.div key={competitor.id} className="bg-white rounded-xl shadow-md overflow-hidden" variants={itemVariants}>
              <div className="p-6 cursor-pointer" onClick={() => setExpandedId(expandedId === competitor.id ? null : competitor.id)}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {competitor.name}
                    </h3>
                    <div className="mt-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${competitor.relationship.includes('Active') ? 'bg-green-100 text-green-800' : competitor.relationship.includes('Recent') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {competitor.relationship}
                      </span>
                    </div>
                  </div>
                  <div>
                    {expandedId === competitor.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedId === competitor.id && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-600 mb-4">
                        {competitor.description}
                      </p>
                      <a href={competitor.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        View Source{' '}
                        <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>)}
        </motion.div>
        <motion.div className="mt-12 text-center" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }}>
          <p className="text-gray-600 mb-6">
            This intelligence was gathered by our AI in minutes, saving Infosys
            hours of manual research
          </p>
          <motion.button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            Try With Your Target Account
          </motion.button>
        </motion.div>
      </div>
    </section>;
};
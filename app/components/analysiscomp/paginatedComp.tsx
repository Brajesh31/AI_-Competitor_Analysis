import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLinkIcon } from "lucide-react";

interface Result {
  title: string;
  link: string;
  confidence?: number;
}

interface PaginatedResultsProps {
  results: Result[];
  itemsPerPage?: number;
}

const PaginatedResults: React.FC<PaginatedResultsProps> = ({
  results = [],
  itemsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {paginatedResults.map((result, index) => (
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
          {typeof result.confidence === "number" && (
            <p className="text-xs text-gray-700 mt-1 font-extrabold">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>
          )}
        </motion.a>
      ))}

      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-2 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedResults;

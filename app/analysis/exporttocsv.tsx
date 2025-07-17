import { Download } from "lucide-react"

type Result = {
  title: string
  link: string
  confidence?: number // Optional if not always present
}

interface ExportCSVProps {
  data: Result[]
}

export default function ExportCSVButton({ data }: ExportCSVProps) {
  const handleExport = () => {
    if (!data || data.length === 0) return

    // Construct CSV headers and rows
    const headers = ["Title", "Link", "Confidence"]
    const rows = data.map((item) => [
      `"${item.title}"`,
      `"${item.link}"`,
      item.confidence !== undefined ? item.confidence : "",
    ])

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "results.csv")
    link.click()
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-4xl hover:bg-green-700 transition"
    >
      <Download className="w-5 h-5" />
      Export to CSV
    </button>
  )
}

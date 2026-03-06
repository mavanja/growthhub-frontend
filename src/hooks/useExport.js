import { useCallback } from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function mapDataToColumns(data, columns) {
  return data.map((row) =>
    columns.reduce((acc, col) => ({
      ...acc,
      [col.label]: row[col.key] ?? '',
    }), {})
  )
}

export default function useExport() {
  const exportToCSV = useCallback((data, columns, filename) => {
    const mapped = mapDataToColumns(data, columns)
    const csv = Papa.unparse(mapped, { delimiter: ';' })
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    triggerDownload(blob, `${filename}.csv`)
  }, [])

  const exportToExcel = useCallback((data, columns, filename) => {
    const mapped = mapDataToColumns(data, columns)
    const worksheet = XLSX.utils.json_to_sheet(mapped)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daten')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    triggerDownload(blob, `${filename}.xlsx`)
  }, [])

  return { exportToCSV, exportToExcel }
}

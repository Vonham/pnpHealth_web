"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

export function HimssButton() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const leafletImages = [
    "/himss26-leaflet-p1.jpg",
    "/himss26-leaflet-p2.jpg",
  ]

  const pdfLinks = [
    "/himss26-leaflet-p1.pdf",
    "/himss26-leaflet-p2.pdf",
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-24 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 font-semibold text-sm animate-pulse hover:animate-none"
      >
        See us at HIMSS26
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 flex flex-col [&>button]:hidden">
          <DialogTitle className="sr-only">HIMSS26 Leaflet</DialogTitle>
          
          {/* Header - fixed */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/50 shrink-0">
            <h2 className="text-lg font-semibold">HIMSS26 Leaflet</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {leafletImages.length}
              </span>
              <a
                href={pdfLinks[currentPage - 1]}
                download
                className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Image content - scrollable */}
          <div className="flex-1 overflow-auto bg-muted min-h-0">
            <div className="flex items-center justify-center p-4">
              <Image
                src={leafletImages[currentPage - 1]}
                alt={`HIMSS26 Leaflet Page ${currentPage}`}
                width={800}
                height={1100}
                className="max-w-full h-auto shadow-lg rounded-sm"
                priority
              />
            </div>
          </div>

          {/* Footer with pagination - fixed */}
          <div className="flex items-center justify-center gap-4 p-4 border-t bg-muted/50 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

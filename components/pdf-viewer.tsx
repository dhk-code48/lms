"use client";
// components/PDFViewer.tsx
import React, { useEffect } from "react";
import pdfjs from "pdfjs-dist";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  useEffect(() => {
    // PDF.js worker
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

    const canvas = document.getElementById("pdfCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    // Load PDF
    pdfjs.getDocument(pdfUrl).promise.then((pdfDoc) => {
      // Render the first page
      pdfDoc.getPage(1).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page into canvas context
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          page.render(renderContext);
        }
      });
    });
  }, [pdfUrl]);

  return <canvas id="pdfCanvas" width="800" height="600"></canvas>;
};

export default PDFViewer;

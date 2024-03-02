"use client";
import { Button } from "@/components/ui/button";
import { Book } from "@prisma/client";
import { X } from "lucide-react";
import React, { FC, useState } from "react";

const PDFViewer: FC<{ book: Book }> = ({ book }) => {
  const [displayBookPdf, setDisplayBookPdf] = useState(false);
  const [displayAnswerKeyPdf, setDisplayAnswerKeyPdf] = useState(false);

  return (
    <div>
      <div className="flex gap-x-10">
        <div
          onClick={() => setDisplayBookPdf(true)}
          className="min-w-[400px] bg-muted p-4 rounded-xl cursor-pointer hover:scale-105"
        >
          <h1 className="font-bold text-2xl">Book</h1>
          <p className="mb-2 text-gray-500 font-semibold">Access version pdf of the book</p>
          <Button>Open PDF</Button>
        </div>
        <div
          onClick={() => setDisplayAnswerKeyPdf(true)}
          className="min-w-[400px] bg-muted p-4 rounded-xl cursor-pointer hover:scale-105"
        >
          <h1 className="font-bold text-2xl">Answer Key</h1>
          <p className="mb-2 text-gray-500 font-semibold">Access answer key pdf of the book</p>
          <Button>Open PDF</Button>
        </div>
      </div>
      <div
        className={`animate- fixed w-screen bg-blend-overlay bg-black/70 h-screen z-40 top-0 left-0 ${
          displayBookPdf ? `flex` : `hidden`
        }`}
      >
        <div className="fixed z-50 top-10 left-10">
          <Button className="font-bold" onClick={() => setDisplayBookPdf(false)}>
            <X size={17} />
          </Button>
        </div>
        <iframe
          className="w-screen h-screen"
          src={`https://docs.google.com/viewer?srcid=1BnbAiVvExe_H1p41JKxqi4LwXGSBNKtB&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
          width="1920px"
          height="1080px"
        ></iframe>
      </div>
      <div
        className={`animate- fixed w-screen bg-blend-overlay bg-black/70 h-screen z-40 top-0 left-0 ${
          displayAnswerKeyPdf ? `flex` : `hidden`
        }`}
      >
        <div className="fixed z-50 top-10 left-10">
          <Button className="font-bold" onClick={() => setDisplayAnswerKeyPdf(false)}>
            <X size={17} />
          </Button>
        </div>
        <iframe
          className="w-screen h-screen"
          src={`https://docs.google.com/viewer?srcid=1BnbAiVvExe_H1p41JKxqi4LwXGSBNKtB&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
          width="1920px"
          height="1080px"
        ></iframe>
      </div>
    </div>
  );
};

export default PDFViewer;

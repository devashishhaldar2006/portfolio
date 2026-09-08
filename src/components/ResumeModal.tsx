"use client";

import React, { useState, useEffect } from "react";
import { Download, ExternalLink, X, FileText, CheckCircle2, ShieldCheck, Eye } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-[#FFFFFF] rounded-2xl border border-[#E4E4E0] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E4E0] bg-[#F7F7F4]/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#111111] tracking-tight">
                  Devashish_Haldar_Resume.pdf
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  VERIFIED · 2026
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#5F6368]">
                B.Tech CSE (AI & ML) · PSIT · Full Stack & Systems Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <a
              href={pdfUrl}
              download="Devashish_Haldar_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-mono text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD PDF</span>
            </a>

            {/* Open in new tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4E4E0] hover:bg-[#F2F2EF] text-[#111111] font-mono text-xs font-semibold transition-all shadow-2xs"
              title="Open raw PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">NEW TAB</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#5F6368] hover:text-[#111111] hover:bg-[#EBEBE7] transition-colors ml-1"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embed / Object Viewer */}
        <div className="flex-1 w-full bg-[#525659] relative">
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full border-none"
          >
            <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center space-y-4">
              <FileText className="w-16 h-16 text-emerald-400 opacity-80" />
              <div className="max-w-md">
                <h4 className="text-lg font-bold font-mono">Devashish Haldar Resume</h4>
                <p className="text-xs text-[#E4E4E0] mt-1 font-mono">
                  Your browser does not support inline PDF previews. You can download or view it directly in a new tab.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  download="Devashish_Haldar_Resume.pdf"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 shadow-md inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD PDF
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  OPEN IN NEW TAB
                </a>
              </div>
            </div>
          </object>
        </div>

        {/* Modal Bottom Status */}
        <div className="px-5 py-2.5 bg-[#FFFFFF] border-t border-[#E4E4E0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#5F6368]">
          <div className="flex items-center gap-3">
            <span>Standard Letter 8.5" × 11"</span>
            <span>·</span>
            <span>1-Page Calibrated ATS Format</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">100% Verified Metrics</span>
          </div>
          <div className="text-[10px] text-[#888C90]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#F2F2EF] border border-[#E4E4E0] text-[#111111]">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}

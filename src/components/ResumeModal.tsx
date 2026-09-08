"use client";

import React, { useEffect } from "react";
import { 
  Download, 
  ExternalLink, 
  X, 
  FileText, 
  ShieldCheck, 
  Printer
} from "lucide-react";

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
      document.body.setAttribute("data-modal-open", "true");
      window.dispatchEvent(new CustomEvent("resume-modal-toggle"));
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-modal-open");
      window.dispatchEvent(new CustomEvent("resume-modal-toggle"));
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-modal-open");
      window.dispatchEvent(new CustomEvent("resume-modal-toggle"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl h-[94vh] bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E4E4E0] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E4E4E0] bg-[#F7F7F4]/95 backdrop-blur-sm gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm sm:text-base text-[#111111] tracking-tight">
                  Devashish_Haldar_Resume.pdf
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  VERIFIED · 2026
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#5F6368] hidden sm:block">
                B.Tech CSE (AI & ML) · PSIT · QuantFlow C++20 · AWS Solutions Architect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download="Devashish_Haldar_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-mono text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">DOWNLOAD PDF</span>
            </a>

            {/* Open Raw in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E4E4E0] hover:bg-[#F2F2EF] text-[#111111] font-mono text-xs font-semibold transition-all shadow-2xs"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">NEW TAB</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#5F6368] hover:text-[#111111] hover:bg-[#EBEBE7] transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Pure Vector PDF Reader */}
        <div className="flex-1 w-full bg-[#323639] relative overflow-hidden flex items-center justify-center">
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
            type="application/pdf"
            className="w-full h-full border-none"
          >
            <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center space-y-4">
              <FileText className="w-16 h-16 text-emerald-400 opacity-80" />
              <div className="max-w-md">
                <h4 className="text-lg font-bold font-mono">Devashish Haldar Resume</h4>
                <p className="text-xs text-[#E4E4E0] mt-1 font-mono">
                  Direct inline viewer ready. Download or view in new tab below.
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
            <span className="font-semibold text-[#111111]">ATS-Calibrated 1-Page Format</span>
            <span>·</span>
            <span>Letter 8.5" × 11"</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">100% Zero-Hallucination Metrics</span>
          </div>
          <div className="text-[10px] text-[#888C90]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#F2F2EF] border border-[#E4E4E0] text-[#111111]">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { 
  Download, 
  ExternalLink, 
  X, 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  Eye, 
  Layers, 
  FileCheck2,
  Maximize2
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

// 3D Canvas Mesh that displays the high-res resume document in full 3D space
function Detailed3DResumeDocument({
  interactive = true,
}: {
  interactive?: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load high-resolution texture of the actual resume
  const texture = useLoader(THREE.TextureLoader, "/resume-preview.png");
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  useFrame((state, delta) => {
    if (meshRef.current && interactive) {
      // Very gentle idle sway and react smoothly to cursor pointer
      const targetRotY = state.pointer.x * 0.35;
      const targetRotX = -state.pointer.y * 0.25;
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 6, delta);
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 6, delta);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Front Textured Resume Sheet */}
      <mesh position={[0, 0, 0.015]}>
        {/* Aspect ratio 1700 x 2200 -> ~ 1.7 x 2.2 */}
        <planeGeometry args={[2.2, 2.85]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Back Thick Paper Board with Subtle Bevel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.22, 2.87, 0.03]} />
        <meshStandardMaterial
          color="#F9FAFB"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle drop shadow backplane */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[2.4, 3.05]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"3d" | "flat">("3d");
  const [controlsKey, setControlsKey] = useState(0);

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

  const reset3DView = () => {
    setControlsKey((k) => k + 1);
  };

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
            {/* 3D vs Standard View Toggle */}
            <div className="flex items-center p-1 bg-white border border-[#E4E4E0] rounded-xl shadow-2xs font-mono text-xs font-bold">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  viewMode === "3d"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-[#5F6368] hover:text-[#111111]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D VIEW</span>
              </button>
              <button
                onClick={() => setViewMode("flat")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  viewMode === "flat"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-[#5F6368] hover:text-[#111111]"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>STANDARD PDF</span>
              </button>
            </div>

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

        {/* Content Body: 3D Spatial Canvas OR Standard PDF Reader */}
        <div className="flex-1 w-full bg-[#1A1D20] relative overflow-hidden flex items-center justify-center">
          {viewMode === "3d" ? (
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <Canvas
                key={controlsKey}
                camera={{ position: [0, 0, 3.8], fov: 48 }}
                className="w-full h-full"
              >
                <ambientLight intensity={1.5} />
                <directionalLight position={[4, 5, 5]} intensity={1.6} />
                <pointLight position={[-3, -3, 3]} intensity={0.4} color="#10B981" />
                <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                  <Detailed3DResumeDocument interactive={true} />
                </Float>
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  minDistance={2.0}
                  maxDistance={6.0}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>

              {/* 3D Viewport Controls & Hints */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>3D INTERACTIVE RESUME PREVIEW</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 font-mono text-[11px]">
                  DRAG TO ROTATE · SCROLL TO ZOOM
                </span>
              </div>

              {/* Reset 3D View Button */}
              <button
                onClick={reset3DView}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs font-mono font-medium transition-all shadow-md active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESET 3D CAMERA</span>
              </button>
            </div>
          ) : (
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              className="w-full h-full border-none bg-[#525659]"
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
          )}
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

"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Download, 
  ExternalLink, 
  X, 
  FileText, 
  ShieldCheck, 
  RotateCcw,
  Layers,
  FileCheck2,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  Navigation
} from "lucide-react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import * as THREE from "three";

// 3D Sheet Component with Anisotropic Filtering to eliminate shimmer & glittering
function Crisp3DResumeSheet() {
  const meshRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const texture = useLoader(THREE.TextureLoader, "/resume-preview.png");
  
  useEffect(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.needsUpdate = true;
    }
  }, [texture, gl]);

  // Letter paper ratio: 2550 x 3300 = 1.0 : 1.2941
  const width = 2.1;
  const height = 2.717;

  return (
    <group ref={meshRef}>
      {/* Front Face: High-res texture, 100% matte (no specular glare or glitter) */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial 
          map={texture} 
          toneMapped={false} 
          side={THREE.FrontSide} 
        />
      </mesh>

      {/* Solid Paper Core: Clean matte white board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.02, height + 0.02, 0.02]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Back Paper Face: Matte clean cardstock */}
      <mesh position={[0, 0, -0.012]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#F9F9F8" />
      </mesh>

      {/* Soft Drop Shadow beneath the sheet */}
      <mesh position={[0, -0.05, -0.06]}>
        <planeGeometry args={[width + 0.15, height + 0.15]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  initialMode?: "3d" | "flat";
}

export function ResumeModal({ isOpen, onClose, pdfUrl, initialMode = "3d" }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"3d" | "flat">(initialMode);
  const [cameraKey, setCameraKey] = useState(0);
  const controlsRef = useRef<OrbitControlsType>(null);

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewMode(initialMode);
    }
  }, [isOpen, initialMode]);

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

  const handleResetCamera = () => {
    setCameraKey((k) => k + 1);
  };

  const panTo = (targetY: number) => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, targetY, 0);
      controlsRef.current.update();
    }
  };

  const zoomDelta = (delta: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      if (camera) {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        camera.position.addScaledVector(dir, delta);
        controlsRef.current.update();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl h-[94vh] bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E4E4E0] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E4E4E0] bg-[#F7F7F4]/95 backdrop-blur-sm gap-3">
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
            {/* 3D vs Vector Toggle */}
            <div className="flex items-center p-1 bg-white border border-[#E4E4E0] rounded-xl shadow-2xs font-mono text-xs font-bold">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  viewMode === "3d"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-[#5F6368] hover:text-[#111111]"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>3D PREVIEW</span>
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
                <span>PDF DOCUMENT</span>
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

        {/* Content Body: 3D Canvas OR Vector PDF */}
        <div className="flex-1 w-full bg-[#181B1E] relative overflow-hidden flex items-center justify-center select-none">
          {viewMode === "3d" ? (
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <Canvas
                key={cameraKey}
                camera={{ position: [0, 0, 3.2], fov: 45 }}
                gl={{ 
                  antialias: true, 
                  powerPreference: "high-performance",
                  toneMapping: THREE.NoToneMapping
                }}
                className="w-full h-full"
              >
                {/* Clean, soft ambient light without glittering highlights */}
                <ambientLight intensity={1.0} />

                <React.Suspense fallback={null}>
                  <Crisp3DResumeSheet />
                </React.Suspense>

                {/* OrbitControls with full screen-space pan enabled so users can zoom anywhere */}
                <OrbitControls
                  ref={controlsRef}
                  enablePan={true}
                  panSpeed={1.5}
                  screenSpacePanning={true}
                  enableZoom={true}
                  zoomSpeed={1.2}
                  minDistance={0.5}
                  maxDistance={6.0}
                  maxPolarAngle={Math.PI / 1.7}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>

              {/* 3D UI Overlays */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INTERACTIVE 3D RESUME</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 font-mono text-[11px]">
                  LEFT DRAG: ROTATE · RIGHT/TWO-FINGER DRAG: PAN ANYWHERE · SCROLL: ZOOM
                </span>
              </div>

              {/* Quick Section Jump Bar (Top / Projects / Education / Skills / Experience / Bottom) */}
              <div className="absolute top-3 right-3 hidden md:flex items-center gap-1 p-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-mono">
                <span className="px-2 text-white/50 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-emerald-400" />
                  JUMP:
                </span>
                <button
                  onClick={() => panTo(0.9)}
                  className="px-2 py-1 rounded-lg hover:bg-white/15 transition-colors"
                  title="Header & Education"
                >
                  TOP
                </button>
                <button
                  onClick={() => panTo(0.35)}
                  className="px-2 py-1 rounded-lg hover:bg-white/15 transition-colors"
                  title="Technical Skills"
                >
                  SKILLS
                </button>
                <button
                  onClick={() => panTo(-0.2)}
                  className="px-2 py-1 rounded-lg hover:bg-white/15 transition-colors"
                  title="QuantFlow & Flagship Projects"
                >
                  PROJECTS
                </button>
                <button
                  onClick={() => panTo(-0.85)}
                  className="px-2 py-1 rounded-lg hover:bg-white/15 transition-colors"
                  title="Achievements & AWS Certifications"
                >
                  BOTTOM
                </button>
              </div>

              {/* 3D Floating Control Buttons */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => panTo(0.4)}
                  className="p-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs transition-all shadow-md active:scale-95 flex items-center gap-1 font-mono text-[11px]"
                  title="Pan Up"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">PAN UP</span>
                </button>
                <button
                  onClick={() => panTo(-0.4)}
                  className="p-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs transition-all shadow-md active:scale-95 flex items-center gap-1 font-mono text-[11px]"
                  title="Pan Down"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">PAN DOWN</span>
                </button>
                <button
                  onClick={() => zoomDelta(0.4)}
                  className="p-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs transition-all shadow-md active:scale-95"
                  title="Zoom In Close"
                >
                  <ZoomIn className="w-4 h-4 text-emerald-400" />
                </button>
                <button
                  onClick={() => zoomDelta(-0.4)}
                  className="p-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs transition-all shadow-md active:scale-95"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 text-emerald-400" />
                </button>
                <button
                  onClick={handleResetCamera}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white text-xs font-mono font-medium transition-all shadow-md active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          ) : (
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              type="application/pdf"
              className="w-full h-full border-none bg-[#323639]"
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

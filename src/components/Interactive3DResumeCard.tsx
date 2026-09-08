"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Download, Eye, FileText, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { ResumeModal } from "./ResumeModal";

// 3D Interactive Floating Resume Sheet with Crystal-Clear Real Text Texture
function ThreeDResumeSheet({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "/resume-preview.png");
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating physics with tilt towards mouse cursor
      const targetRotY = isHovered ? (state.pointer.x * 0.45) : (Math.sin(state.clock.elapsedTime * 1.2) * 0.15);
      const targetRotX = isHovered ? (-state.pointer.y * 0.35 + 0.1) : (Math.cos(state.clock.elapsedTime * 0.9) * 0.1 + 0.1);
      const targetScale = isHovered ? 1.08 : 1.0;

      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 8, delta);
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 8, delta);
      meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 6, delta));
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Front Textured Resume Sheet */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[1.7, 2.2]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Back Thick Paper Board with neutral matte color */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.72, 2.22, 0.025]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Top-Right Dog-Ear / Fold */}
      <mesh position={[0.73, 0.98, 0.02]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshBasicMaterial color="#E5E7EB" />
      </mesh>
    </group>
  );
}

interface Interactive3DResumeCardProps {
  variant?: "hero" | "card" | "compact";
}

export function Interactive3DResumeCard({ variant = "card" }: Interactive3DResumeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const pdfPath = "/Devashish_Haldar_Resume.pdf";

  const handleDownloadAndPreview = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 1. Programmatically trigger direct PDF download
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Devashish_Haldar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Open inline rich interactive 3D preview modal
    setModalOpen(true);
    setDownloadTriggered(true);
    setTimeout(() => setDownloadTriggered(false), 3000);
  };

  const handlePreviewOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  if (variant === "compact") {
    return (
      <>
        <button
          onClick={handleDownloadAndPreview}
          data-cursor="RESUME"
          className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] hover:border-[#111111] hover:bg-[#F2F2EF] text-[#111111] text-xs font-mono font-bold transition-all shadow-xs hover:shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform" />
          <span>RESUME PDF</span>
          <Download className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <ResumeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pdfUrl={pdfPath}
        />
      </>
    );
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group rounded-3xl border border-[#E4E4E0] bg-gradient-to-br from-[#FFFFFF] via-[#FBFBFA] to-[#F2F2EE] p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-600/60 transition-all duration-300 overflow-hidden"
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Interactive 3D Canvas with Real Texture */}
          <div 
            onClick={handlePreviewOnly}
            className="md:col-span-5 h-64 sm:h-72 relative rounded-2xl bg-[#1E2124] border border-[#E4E4E0]/80 overflow-hidden cursor-grab active:cursor-grabbing group/canvas shadow-inner"
          >
            <Canvas
              camera={{ position: [0, 0, 3.4], fov: 45 }}
              className="w-full h-full"
            >
              <ambientLight intensity={1.0} />
              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
                <ThreeDResumeSheet isHovered={isHovered} />
              </Float>
            </Canvas>

            {/* Floating 3D Badges */}
            <div className="absolute top-2.5 left-2.5 pointer-events-none">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white flex items-center gap-1 shadow-xs">
                <Layers className="w-3 h-3 text-emerald-400" />
                <span>REAL 3D SHEET</span>
              </span>
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="text-[9px] font-mono text-white/80 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                CLICK TO OPEN 3D PREVIEW
              </span>
              <span className="text-[9px] font-mono text-emerald-300 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                MOVE TO TILT
              </span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                  VERIFIED CANDIDATE DOSSIER
                </span>
                <span className="text-xs font-mono text-[#888C90]">
                  1-PAGE ATS COMPLIANT
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#111111]">
                Devashish Haldar · Resume
              </h3>

              <p className="text-xs sm:text-sm text-[#5F6368] font-sans mt-2 leading-relaxed">
                Full-Stack Systems & High-Frequency Engineer (B.Tech CSE AI/ML, PSIT 8.1 CGPA). Features QuantFlow C++20 (1.48M+ ticks/s), HackCentral, Career Connect, LeetCode 400+, CodeChef 3★ (1602 Peak), and AWS Solutions Architect cert.
              </p>
            </div>

            {/* Quick Specs Pill Badges */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111]">
                📄 Letter 8.5" × 11"
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#E4E4E0] text-[#111111]">
                ⚡ C++20 · Next.js · AWS
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                ✓ 100% Zero-Hallucination
              </span>
            </div>

            {/* Action Buttons: 1-Click Download & Interactive Preview */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadAndPreview}
                data-cursor="DOWNLOAD"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111111] hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-98 group/btn"
              >
                <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                <span>{downloadTriggered ? "DOWNLOADING & OPENING..." : "DOWNLOAD & PREVIEW PDF"}</span>
              </button>

              <button
                onClick={handlePreviewOnly}
                data-cursor="3D PREVIEW"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] hover:border-[#111111] hover:bg-[#F2F2EF] text-[#111111] font-mono text-xs font-semibold transition-all shadow-2xs"
              >
                <Eye className="w-4 h-4 text-emerald-700" />
                <span>OPEN 3D PREVIEW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <ResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={pdfPath}
      />
    </>
  );
}

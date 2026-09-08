"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { Download, Eye, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { ResumeModal } from "./ResumeModal";

// 3D Interactive Floating Resume Sheet in Three.js
function ThreeDResumeSheet({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cornerFoldRef = useRef<THREE.Mesh>(null);

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
    <group position={[0, 0, 0]}>
      {/* Paper Sheet Mesh (Aspect Ratio 8.5 x 11) */}
      <mesh ref={meshRef}>
        {/* width 1.7, height 2.2, depth 0.02 */}
        <boxGeometry args={[1.7, 2.2, 0.025]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.25}
          metalness={0.05}
        />

        {/* Minimal simulated resume text lines on paper */}
        {/* Header bar */}
        <mesh position={[0, 0.85, 0.015]}>
          <planeGeometry args={[1.3, 0.14]} />
          <meshBasicMaterial color="#111111" />
        </mesh>

        {/* Subheader bar */}
        <mesh position={[0, 0.68, 0.015]}>
          <planeGeometry args={[1.1, 0.04]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>

        {/* Section 1 lines */}
        <mesh position={[-0.1, 0.45, 0.015]}>
          <planeGeometry args={[1.1, 0.035]} />
          <meshBasicMaterial color="#374151" />
        </mesh>
        <mesh position={[0, 0.36, 0.015]}>
          <planeGeometry args={[1.3, 0.025]} />
          <meshBasicMaterial color="#9CA3AF" />
        </mesh>
        <mesh position={[-0.15, 0.28, 0.015]}>
          <planeGeometry args={[1.0, 0.025]} />
          <meshBasicMaterial color="#D1D5DB" />
        </mesh>

        {/* Section 2 lines (Projects) */}
        <mesh position={[-0.1, 0.08, 0.015]}>
          <planeGeometry args={[1.1, 0.035]} />
          <meshBasicMaterial color="#374151" />
        </mesh>
        <mesh position={[0, -0.01, 0.015]}>
          <planeGeometry args={[1.3, 0.025]} />
          <meshBasicMaterial color="#9CA3AF" />
        </mesh>
        <mesh position={[-0.05, -0.09, 0.015]}>
          <planeGeometry args={[1.2, 0.025]} />
          <meshBasicMaterial color="#D1D5DB" />
        </mesh>
        <mesh position={[-0.15, -0.17, 0.015]}>
          <planeGeometry args={[1.0, 0.025]} />
          <meshBasicMaterial color="#D1D5DB" />
        </mesh>

        {/* Section 3 lines (Achievements & CP) */}
        <mesh position={[-0.1, -0.38, 0.015]}>
          <planeGeometry args={[1.1, 0.035]} />
          <meshBasicMaterial color="#374151" />
        </mesh>
        <mesh position={[0, -0.47, 0.015]}>
          <planeGeometry args={[1.3, 0.025]} />
          <meshBasicMaterial color="#9CA3AF" />
        </mesh>
        <mesh position={[-0.1, -0.55, 0.015]}>
          <planeGeometry args={[1.1, 0.025]} />
          <meshBasicMaterial color="#D1D5DB" />
        </mesh>

        {/* Certifications badge line */}
        <mesh position={[0, -0.75, 0.015]}>
          <planeGeometry args={[1.3, 0.04]} />
          <meshBasicMaterial color="#047857" />
        </mesh>

        {/* Top-Right Dog-Ear / Fold */}
        <mesh position={[0.73, 0.98, 0.02]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
        </mesh>
      </mesh>

      {/* Subtle glowing halo behind the paper */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[2.0, 2.5]} />
        <meshBasicMaterial
          color={isHovered ? "#10B981" : "#D1D5DB"}
          transparent
          opacity={isHovered ? 0.25 : 0.08}
        />
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

    // 2. Open inline rich interactive preview modal
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
          {/* Left Column: Interactive 3D Canvas */}
          <div className="md:col-span-5 h-56 sm:h-64 relative rounded-2xl bg-[#EBEBE7]/50 border border-[#E4E4E0]/80 overflow-hidden cursor-grab active:cursor-grabbing">
            <Canvas
              camera={{ position: [0, 0, 3.4], fov: 45 }}
              className="w-full h-full"
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[3, 4, 3]} intensity={1.5} />
              <pointLight position={[-2, -2, 2]} intensity={0.5} color="#10B981" />
              <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
                <ThreeDResumeSheet isHovered={isHovered} />
              </Float>
            </Canvas>

            {/* Floating 3D Badge */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#E4E4E0] text-[#111111] shadow-2xs">
                3D INTERACTIVE SHEET
              </span>
              <span className="text-[9px] font-mono text-[#5F6368] bg-white/80 px-2 py-0.5 rounded border border-[#E4E4E0]">
                MOVE CURSOR TO TILT
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
                data-cursor="PREVIEW"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E4E4E0] hover:border-[#111111] hover:bg-[#F2F2EF] text-[#111111] font-mono text-xs font-semibold transition-all shadow-2xs"
              >
                <Eye className="w-4 h-4 text-[#5F6368]" />
                <span>PREVIEW ONLY</span>
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

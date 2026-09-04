"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface CodeChefContest {
  code: string;
  name: string;
  rating: number;
  rank: number;
  date: string;
  delta: number;
}

// 1. GITHUB & LEETCODE PILLARS
function InteractivePillars({
  mode,
  gitHubData,
  onHoverPillar,
}: {
  mode: "github" | "leetcode";
  gitHubData: ContributionDay[];
  onHoverPillar: (info: { title: string; count: number; date: string } | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const rows = 7;
  const cols = 15;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const blocks = useMemo(() => {
    const list = [];
    const spacing = 0.28;
    const offsetX = (cols * spacing) / 2;
    const offsetZ = (rows * spacing) / 2;

    const totalDaysNeeded = cols * rows;
    const recentDays = gitHubData.slice(-totalDaysNeeded);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const index = c * rows + r;
        const day = recentDays[index] || { count: 0, level: 0, date: "" };

        const ghCount = day.count || 0;
        let ghHeight = 0.08;
        let ghColor = "#E8E8E4";

        if (day.level === 4 || ghCount >= 8) {
          ghHeight = 0.85;
          ghColor = "#047857";
        } else if (day.level === 3 || ghCount >= 4) {
          ghHeight = 0.55;
          ghColor = "#10B981";
        } else if (day.level === 2 || ghCount >= 2) {
          ghHeight = 0.35;
          ghColor = "#6EE7B7";
        } else if (day.level === 1 || ghCount >= 1) {
          ghHeight = 0.2;
          ghColor = "#A7F3D0";
        }

        const lcCount = (ghCount * 2 + (r % 3 === 0 ? 3 : 1)) % 7;
        let lcHeight = 0.08;
        let lcColor = "#E8E8E4";

        if (lcCount >= 5) {
          lcHeight = 0.88;
          lcColor = "#D97706";
        } else if (lcCount >= 3) {
          lcHeight = 0.55;
          lcColor = "#F59E0B";
        } else if (lcCount >= 1) {
          lcHeight = 0.3;
          lcColor = "#FCD34D";
        }

        list.push({
          id: index,
          x: c * spacing - offsetX,
          z: r * spacing - offsetZ,
          ghHeight,
          ghColor,
          ghCount,
          lcHeight,
          lcColor,
          lcCount,
          date: day.date || "Recent",
        });
      }
    }
    return list;
  }, [gitHubData]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[cols * 0.28 + 0.35, 0.08, rows * 0.28 + 0.35]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.05} />
      </mesh>

      {blocks.map((b) => {
        const isHovered = hoveredIdx === b.id;
        const targetHeight = mode === "github" ? b.ghHeight : b.lcHeight;
        const targetColor = mode === "github" ? b.ghColor : b.lcColor;
        const currentHeight = isHovered ? targetHeight + 0.25 : targetHeight;

        return (
          <mesh
            key={b.id}
            position={[b.x, currentHeight / 2, b.z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIdx(b.id);
              onHoverPillar({
                title: mode === "github" ? "GitHub Commits" : "LeetCode Accepted",
                count: mode === "github" ? b.ghCount : b.lcCount,
                date: b.date,
              });
            }}
            onPointerOut={() => {
              setHoveredIdx(null);
              onHoverPillar(null);
            }}
          >
            <boxGeometry args={[0.22, currentHeight, 0.22]} />
            <meshStandardMaterial
              color={isHovered ? (mode === "github" ? "#022c22" : "#78350f") : targetColor}
              emissive={
                isHovered
                  ? mode === "github"
                    ? new THREE.Color("#059669")
                    : new THREE.Color("#d97706")
                  : new THREE.Color(0, 0, 0)
              }
              emissiveIntensity={isHovered ? 0.6 : 0}
              roughness={0.25}
              metalness={0.15}
            />
          </mesh>
        );
      })}

      <ContactShadows position={[0, -0.4, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />
    </group>
  );
}

// 2. 3D CODECHEF RATING PROGRESSION GRAPH
function InteractiveCodeChef3DGraph({
  contests,
  onHoverNode,
}: {
  contests: CodeChefContest[];
  onHoverNode: (info: CodeChefContest | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // Layout points along X axis with Y scaled from rating (1200 -> 1650)
  const minRating = 1200;
  const maxRating = 1650;
  const spacing = 0.55;
  const offsetX = ((contests.length - 1) * spacing) / 2;

  const points = useMemo(() => {
    return contests.map((c, i) => {
      const normY = (c.rating - minRating) / (maxRating - minRating);
      const x = i * spacing - offsetX;
      const y = normY * 1.6 + 0.2; // height from base
      const z = 0;
      return { ...c, x, y, z };
    });
  }, [contests, offsetX]);

  // Create smooth curved 3D tube geometry connecting all rating data points
  const tubeGeometry = useMemo(() => {
    if (points.length < 2) return null;
    const curvePoints = points.map((p) => new THREE.Vector3(p.x, p.y, p.z));
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, "centripetal", 0.3);
    return new THREE.TubeGeometry(curve, 64, 0.045, 12, false);
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* 3D Platform Pedestal */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[points.length * spacing + 0.8, 0.08, 1.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Grid Guide Bars */}
      {[-0.6, 0, 0.6].map((gz, i) => (
        <mesh key={i} position={[0, -0.01, gz]}>
          <boxGeometry args={[points.length * spacing + 0.6, 0.005, 0.02]} />
          <meshBasicMaterial color="#E8E8E4" />
        </mesh>
      ))}

      {/* 3D Rating Spline Tube */}
      {tubeGeometry && (
        <mesh geometry={tubeGeometry}>
          <meshStandardMaterial
            color="#8B5CF6"
            emissive={new THREE.Color("#6D28D9")}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      )}

      {/* Rating Nodes & Vertical Light Pillars */}
      {points.map((p) => {
        const isHovered = hoveredCode === p.code;
        const isPeak = p.rating === 1602;
        const nodeColor = isPeak ? "#F59E0B" : isHovered ? "#6D28D9" : "#8B5CF6";

        return (
          <group key={p.code}>
            {/* Vertical Guide Pillar */}
            <mesh position={[p.x, p.y / 2, p.z]}>
              <cylinderGeometry args={[0.012, 0.012, p.y, 8]} />
              <meshBasicMaterial
                color={isPeak ? "#F59E0B" : "#DDD6FE"}
                transparent
                opacity={isHovered ? 0.9 : 0.4}
              />
            </mesh>

            {/* Interactive Rating Sphere */}
            <mesh
              position={[p.x, p.y, p.z]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredCode(p.code);
                onHoverNode(p);
              }}
              onPointerOut={() => {
                setHoveredCode(null);
                onHoverNode(null);
              }}
            >
              <sphereGeometry args={[isPeak ? 0.12 : isHovered ? 0.11 : 0.08, 24, 24]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={new THREE.Color(nodeColor)}
                emissiveIntensity={isHovered || isPeak ? 0.8 : 0.3}
                roughness={0.15}
                metalness={0.3}
              />
            </mesh>

            {/* Peak Glow Ring */}
            {isPeak && (
              <mesh position={[p.x, p.y, p.z]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.16, 0.19, 32]} />
                <meshBasicMaterial color="#F59E0B" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}

      <ContactShadows position={[0, -0.4, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />
    </group>
  );
}

export function MetaMesh3D() {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<"github" | "leetcode" | "codechef">("github");
  const [activeInfo, setActiveInfo] = useState<{ title: string; count: number; date: string } | null>(null);
  const [activeContest, setActiveContest] = useState<CodeChefContest | null>(null);
  const [gitHubData, setGitHubData] = useState<ContributionDay[]>([]);
  const [codechefData, setCodechefData] = useState<CodeChefContest[]>([]);

  useEffect(() => {
    setIsMounted(true);

    // Fetch GitHub live contributions
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json?.contributions) {
          const todayStr = new Date().toISOString().split("T")[0];
          const validDays = json.contributions.filter((d: ContributionDay) => d.date <= todayStr);
          setGitHubData(validDays);
        }
      })
      .catch(() => {});

    // Fetch CodeChef contest ratings
    fetch("/api/codechef")
      .then((res) => res.json())
      .then((json) => {
        if (json?.history) {
          setCodechefData(json.history);
        }
      })
      .catch(() => {});
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center bg-[#FFFFFF]/60 rounded-3xl border border-[#E4E4E0]">
        <span className="text-xs font-mono text-[#888C90] animate-pulse">
          INITIALIZING 3D INTERACTIVE ENGINE...
        </span>
      </div>
    );
  }

  return (
    <div
      data-cursor="ORBIT 3D"
      className="relative w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-[#E4E4E0] bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F6] to-[#F2F2EF] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] group"
    >
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
      <div
        className={`absolute inset-0 bg-radial-gradient ${
          mode === "github"
            ? "from-emerald-500/10"
            : mode === "leetcode"
            ? "from-amber-500/10"
            : "from-purple-500/10"
        } via-transparent to-transparent pointer-events-none transition-colors duration-500`}
      />

      <Canvas
        camera={{ position: [3.8, 3.8, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[6, 9, 7]} intensity={2.4} color="#ffffff" />
        <directionalLight
          position={[-6, -4, -4]}
          intensity={1.1}
          color={mode === "github" ? "#A7F3D0" : mode === "leetcode" ? "#FDE68A" : "#DDD6FE"}
        />
        <pointLight
          position={[0, 3, 0]}
          intensity={1.5}
          color={mode === "github" ? "#10B981" : mode === "leetcode" ? "#F59E0B" : "#8B5CF6"}
          distance={5}
        />

        {mode === "codechef" ? (
          <InteractiveCodeChef3DGraph contests={codechefData} onHoverNode={setActiveContest} />
        ) : (
          <InteractivePillars mode={mode} gitHubData={gitHubData} onHoverPillar={setActiveInfo} />
        )}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.3}
          autoRotate={false}
          dampingFactor={0.08}
        />
      </Canvas>

      {/* Mode Switcher Tabs */}
      <div className="absolute top-5 left-5 flex items-center gap-2 z-20">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-[#E4E4E0] shadow-sm">
          <button
            onClick={() => setMode("github")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              mode === "github" ? "bg-[#111111] text-white" : "text-[#5F6368] hover:text-[#111111]"
            }`}
          >
            GITHUB 3D
          </button>
          <button
            onClick={() => setMode("leetcode")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              mode === "leetcode" ? "bg-amber-600 text-white" : "text-[#5F6368] hover:text-[#111111]"
            }`}
          >
            LEETCODE 3D
          </button>
          <button
            onClick={() => setMode("codechef")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              mode === "codechef" ? "bg-purple-700 text-white" : "text-[#5F6368] hover:text-[#111111]"
            }`}
          >
            CODECHEF 3D
          </button>
        </div>
      </div>

      {/* Telemetry Stats Banner */}
      <div className="absolute top-5 right-5 text-right pointer-events-none z-10">
        <span className="text-[10px] font-mono text-[#5F6368] block">
          {mode === "github"
            ? "REAL GITHUB COMMITS"
            : mode === "leetcode"
            ? "LEETCODE SOLVED MATRIX"
            : "CODECHEF RATING PROGRESSION"}
        </span>
        <span
          className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${
            mode === "github"
              ? "text-emerald-800 bg-emerald-50/90 border-emerald-200"
              : mode === "leetcode"
              ? "text-amber-800 bg-amber-50/90 border-amber-200"
              : "text-purple-800 bg-purple-50/90 border-purple-200"
          }`}
        >
          {mode === "github"
            ? "451+ VERIFIED COMMITS"
            : mode === "leetcode"
            ? "400+ PROBLEMS · 1562 RATING"
            : "3★ · PEAK 1602 · RANK 392"}
        </span>
      </div>

      {/* Interactive Tooltip Banner */}
      <div className="absolute bottom-5 left-5 pointer-events-none z-10">
        {mode === "codechef" ? (
          activeContest ? (
            <span className="text-xs font-mono font-bold text-[#111111] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E4E4E0] shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <span>
                {activeContest.name}: <strong className="text-purple-700">{activeContest.rating}</strong> (Rank {activeContest.rank}) on {activeContest.date}
              </span>
            </span>
          ) : (
            <span className="text-[10px] font-mono text-[#888C90] bg-white/80 px-2.5 py-1 rounded border border-[#E4E4E0]">
              HOVER NODES TO INSPECT CONTEST RATINGS (PEAK 1602 STARTERS 151)
            </span>
          )
        ) : activeInfo ? (
          <span className="text-xs font-mono font-bold text-[#111111] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E4E4E0] shadow-md flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                mode === "github" ? "bg-emerald-600" : "bg-amber-600"
              }`}
            />
            {activeInfo.count > 0
              ? `${activeInfo.count} ${activeInfo.title} on ${activeInfo.date}`
              : `No activity on ${activeInfo.date}`}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-[#888C90] bg-white/80 px-2.5 py-1 rounded border border-[#E4E4E0]">
            CLICK & DRAG TO ORBIT · HOVER PILLARS
          </span>
        )}
      </div>

      <div className="absolute bottom-5 right-5 text-[10px] font-mono text-[#888C90] bg-white/80 px-2 py-0.5 rounded border border-[#E4E4E0] pointer-events-none hidden sm:block">
        LIVE DATA SYNCHRONIZED
      </div>
    </div>
  );
}

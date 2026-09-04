import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { QuantFlowShowcase } from "@/components/QuantFlowShowcase";
import { Architecture } from "@/components/Architecture";
import { CurrentlyBuildingAndLab } from "@/components/CurrentlyBuildingAndLab";
import { AboutAndExperience } from "@/components/AboutAndExperience";
import { GitHubSection } from "@/components/GitHubSection";
import { RecruiterTerminalChat } from "@/components/RecruiterTerminalChat";
import { ContactAndFooter } from "@/components/ContactAndFooter";
import { Background3D } from "@/components/Background3D";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F4] tech-grid-bg text-[#111111] overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Dynamic 3D Scroll Background */}
      <Background3D />

      {/* Desktop Contextual Dot Cursor */}
      <CustomCursor />

      {/* Floating Dynamic Application Navbar */}
      <Navbar />

      <main className="relative z-10 flex flex-col">
        {/* 1. HERO & QUANTITATIVE PIPELINE VISUAL */}
        <Hero />

        {/* 2. SELECTED WORK (HACKCENTRAL & CAREER CONNECT) */}
        <SelectedWork />

        {/* 3. QUANTFLOW FLAGSHIP RESEARCH & BACKTESTING ENGINE */}
        <QuantFlowShowcase />

        {/* 4. UNDER THE HOOD - SYSTEM ARCHITECTURE DIAGRAM */}
        <Architecture />

        {/* 5. CURRENTLY BUILDING & THE LAB (EXPERIMENTS) */}
        <CurrentlyBuildingAndLab />

        {/* 6. ABOUT PHILOSOPHY & CHRONOLOGICAL EXPERIENCE/ACHIEVEMENTS */}
        <AboutAndExperience />

        {/* 7. DUAL GITHUB & LEETCODE ACTIVITY MATRICES */}
        <GitHubSection />

        {/* 8. INTERACTIVE 3D RECRUITER TERMINAL CHATBOT (MISTRAL AI) */}
        <RecruiterTerminalChat />

        {/* 9. STATEMENT CONTACT & FOOTER */}
        <ContactAndFooter />
      </main>
    </div>
  );
}

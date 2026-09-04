import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;

    // Comprehensive factual profile knowledge base
    const facts = {
      name: "Devashish Haldar",
      role: "Software Engineer · Quant Developer · Builder",
      location: "Lucknow, Uttar Pradesh, India 226012 (UTC+5:30)",
      email: "workfordevashishhaldar2006@gmail.com",
      phone: "+91 9336009951",
      github: "https://github.com/devashishhaldar2006",
      linkedin: "https://www.linkedin.com/in/devashish-haldar-dev/",
      college: "Pranveer Singh Institute of Technology (PSIT), Kanpur",
      degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
      timeline: "Sep 2024 — Apr 2028 (Currently in 2nd year)",
      gpa: "8.1 / 10.0 Cumulative GPA",
      birthYear: "2006 (approx. 19-20 years old)",
      languages: "C++20, C, Python, TypeScript, JavaScript, SQL, HTML5, CSS3",
      frameworks: "Next.js 16, React 19, Node.js, Express.js, Tailwind CSS, LangGraph, Socket.IO, Prisma ORM, Recharts",
      cloudAndTools: "Docker, AWS (EC2, S3), Supabase (PostgreSQL), Redis, CMake, Git, GitHub, Vercel",
      quantflow: {
        title: "QuantFlow (Jul 2026 — Sep 2026)",
        desc: "High-frequency quantitative research and backtesting platform.",
        engine: "C++20 zero-heap execution engine processing 1.48M+ ticks/sec on AWS EC2 via contiguous memory buffers.",
        tests: "197 / 197 GoogleTest cases passed.",
        ai: "LangGraph multi-agent system with Mistral AI using cyclic state reflection to iteratively tune Sharpe ratio and drawdown.",
        safety: "Eliminates look-ahead bias via timestamp order execution and conservative intrabar stop-loss rules across 7 strategy models.",
        storage: "Virtualized tick datasets via Supabase S3; subscription checkout secured by HMAC SHA-256 Razorpay webhooks.",
        url: "https://quantflow.hackcentral.me",
      },
      hackcentral: {
        title: "HackCentral (Mar 2026 — Jun 2026)",
        desc: "Event discovery, real-time collaboration, and automated hackathon evaluation platform.",
        perf: "Sub-200ms API response times and a 95+ Google Lighthouse score.",
        db: "Optimized MongoDB Atlas with compound indexes on {userId, eventId} and lean aggregation queries.",
        realtime: "Real-time bidirectional messaging via Socket.IO.",
        ai: "Google Gemini API with structured JSON output parsing to automate submission evaluation.",
        security: "httpOnly cookie JWT session management and isolated RBAC; multi-stage Docker build deployed on AWS EC2 CI/CD.",
        url: "https://hackcentral.me",
      },
      careerconnect: {
        title: "Career Connect (Dec 2025)",
        desc: "Real-time collaborative technical interview platform.",
        media: "Stream.io WebRTC video conferencing & live chat with sub-100ms latency and automated reconnection.",
        editor: "Monaco Editor with Piston API sandboxed compilation across 10+ languages with 5s timeout.",
        automation: "Clerk authentication + Inngest background jobs reducing coordination overhead by 60%.",
        url: "https://career-connect-4gbj.onrender.com",
      },
      competitive: {
        deviathon: "1st Place Winner at Deviathon National Hackathon (GLA University) for an AI-powered meeting analysis platform.",
        leetcode: "400+ problems solved with a contest rating of 1562.",
        codechef: "3-Star rated programmer (Peak Rating: 1602, Best Global Rank: 392).",
        certs: "IBM Generative AI & LLMs (100% Grade, Coursera), Physics Wallah Decode C++ with DSA.",
      },
    };

    const systemPrompt = `You are "DEVASHISH-CORE v2.4", the official interactive AI intelligence for Devashish Haldar's engineering portfolio.
You are speaking directly with recruiters, engineering managers, CTOs, and technical collaborators.
Answer all questions conversationally, accurately, with high technical sophistication and zero generic fluff.

FACTUAL DOSSIER:
- Identity: Devashish Haldar (born 2006, ~19-20 yrs old). Student software engineer, quant developer, and systems builder.
- Education: Pursuing B.Tech in CSE (AI & ML) at PSIT Kanpur (2024-2028), CGPA 8.1 / 10.0.
- Location: Lucknow, India (Available for global SWE / Quant Dev roles, on-site or remote).
- Phone: +91 9336009951 | Email: workfordevashishhaldar2006@gmail.com | GitHub: devashishhaldar2006 | LinkedIn: devashish-haldar-dev
- QuantFlow: C++20 engine executing 1.48M+ ticks/sec on AWS EC2 (c6i.2xlarge), zero runtime heap allocations, 197 GoogleTests, LangGraph multi-agent cyclic reflection with Mistral AI tuning Sharpe and drawdown, 0 look-ahead bias, Supabase S3, Razorpay HMAC SHA-256. Live: quantflow.hackcentral.me
- HackCentral: Sub-200ms API, 95+ Lighthouse, Socket.IO, Gemini structured JSON grading, MongoDB compound indexes, Docker EC2 CI/CD. Live: hackcentral.me
- Career Connect: Stream.io WebRTC <100ms latency, Monaco + Piston sandbox 10+ languages, Inngest background jobs. Live: career-connect-4gbj.onrender.com
- Competitive: Deviathon 1st Place National Hackathon Winner, LeetCode 400+ (Rating 1562), CodeChef 3-Star (Peak 1602, Rank 392), IBM GenAI 100%.

GUIDELINES:
- Directly answer whatever the user asks (e.g. age, tech stack, why hire him, low-level details, benchmarks).
- Keep replies concise, punchy, elegant, and formatted with clean bullet points or short paragraphs.`;

    // Attempt live Mistral AI call if key is provided
    if (apiKey) {
      try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const mistralData = await response.json();
          const reply = mistralData.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, model: "mistral-small-2506-live" });
          }
        }
      } catch (err) {
        // Fall through to local intelligence engine on network / rate-limit issues
      }
    }

    // High-precision conversational intent engine (handles arbitrary recruiter questions)
    const q = message.toLowerCase().trim();

    // 1. Age / Birthday / Personal
    if (q.includes("age") || q.includes("old") || q.includes("born") || q.includes("birth")) {
      return NextResponse.json({
        reply: `Devashish Haldar was born in 2006 and is currently 19–20 years old. He is pursuing his undergraduate degree (B.Tech in CSE specializing in AI & ML, Class of 2028) at PSIT Kanpur with an 8.1 CGPA.`,
        model: "devashish-core-v2.4",
      });
    }

    // 2. Who is Devashish / Overview
    if (q.includes("who is") || q.includes("about") || q.includes("summary") || q.includes("introduce")) {
      return NextResponse.json({
        reply: `Devashish Haldar is a Software Engineer, Quant Developer, and Systems Builder based in Lucknow, India.

Key Highlights:
• Core Systems: Low-latency C++20 execution engines, LangGraph autonomous AI loops, and real-time distributed platforms.
• Flagship Product: QuantFlow — engineered in C++20 processing 1.48M+ ticks/sec with zero runtime heap allocations and 197 GoogleTest cases.
• Education: B.Tech in CSE (AI & ML) at PSIT Kanpur (Sep 2024 — Apr 2028, 8.1 CGPA).
• Competitive: Deviathon 1st Place National Hackathon Winner, LeetCode 400+ (1562 rating), CodeChef 3-Star (Rank 392).`,
        model: "devashish-core-v2.4",
      });
    }

    // 3. Why hire Devashish
    if (q.includes("why hire") || q.includes("hire") || q.includes("strengths") || q.includes("value")) {
      return NextResponse.json({
        reply: `Why hire Devashish Haldar:
1. Low-Level Systems Mastery: Unlike typical full-stack developers, Devashish builds from memory mechanics up—writing zero-heap contiguous buffer allocators in C++20 to eliminate cache misses and achieve 1.48M+ ticks/sec.
2. Production AI Agent Orchestration: Deep practical experience engineering cyclic multi-agent loops in LangGraph with Mistral AI, enforcing strict validation boundaries against hallucinations.
3. Proven Execution Speed: Built and deployed 3 substantial platforms (QuantFlow, HackCentral, Career Connect) and won 1st Place in the national Deviathon hackathon.
4. Strong Algorithmic Foundation: 400+ problems solved on LeetCode with consistent competitive ratings on CodeChef (Peak 1602).`,
        model: "devashish-core-v2.4",
      });
    }

    // 4. QuantFlow specific
    if (q.includes("quantflow") || q.includes("quant") || q.includes("c++") || q.includes("backtest") || q.includes("ticks") || q.includes("speed")) {
      return NextResponse.json({
        reply: `[QUANTFLOW PLATFORM ARCHITECTURE]
• Core Execution: Engineered in C++20 utilizing contiguous memory buffers and zero runtime heap allocations during execution loops, delivering 1.48M+ ticks/sec on AWS EC2 (c6i.2xlarge).
• Verification: 197 / 197 GoogleTest unit and integration cases passed.
• AI Strategy Tuning: Multi-agent cyclic state reflection in LangGraph with Mistral AI parsing natural language strategies and optimizing Sharpe ratio and maximum drawdown.
• Anti-Bias Execution: Strict timestamp priority ordering and conservative intrabar stop-loss rules across 7 strategy models.
• Storage & Commerce: Supabase S3 virtualized tick dataset streaming + HMAC SHA-256 Razorpay webhook security.
• Live Platform: https://quantflow.hackcentral.me`,
        model: "devashish-core-v2.4",
      });
    }

    // 5. HackCentral
    if (q.includes("hackcentral") || q.includes("event") || q.includes("socket") || q.includes("gemini")) {
      return NextResponse.json({
        reply: `[HACKCENTRAL EVENT PLATFORM]
• Latency & Performance: Sub-200ms API response times and a 95+ Google Lighthouse performance score.
• Database Optimization: MongoDB Atlas with compound indexes on {userId, eventId} and lean aggregations.
• AI Evaluation Pipeline: Google Gemini API integrated with structured JSON output parsing to automate hackathon submission review.
• Real-time & Security: Bi-directional messaging via Socket.IO, httpOnly cookie JWT sessions, and isolated role-based access control (RBAC).
• Deployment: Containerized multi-stage Docker build deployed to AWS EC2.
• Live Platform: https://hackcentral.me`,
        model: "devashish-core-v2.4",
      });
    }

    // 6. Career Connect
    if (q.includes("career") || q.includes("interview") || q.includes("webrtc") || q.includes("monaco") || q.includes("piston")) {
      return NextResponse.json({
        reply: `[CAREER CONNECT PLATFORM]
• Video Conferencing: Stream.io WebRTC delivering sub-100ms latency audio/video with automated reconnection and state recovery.
• Code Sandboxing: Integrated Monaco code editor with Piston API execution, enforcing 5-second compilation timeouts across 10+ programming languages.
• Automation: Event-driven interview tracking with Clerk authentication and Inngest background queues, reducing recruiter coordination overhead by 60%.
• Live Platform: https://career-connect-4gbj.onrender.com`,
        model: "devashish-core-v2.4",
      });
    }

    // 7. Education & GPA
    if (q.includes("education") || q.includes("college") || q.includes("psit") || q.includes("gpa") || q.includes("degree") || q.includes("university")) {
      return NextResponse.json({
        reply: `[EDUCATION & ACADEMICS]
• Degree: B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning).
• Institution: Pranveer Singh Institute of Technology (PSIT), Kanpur, Uttar Pradesh (Sep 2024 — Apr 2028).
• Cumulative GPA: 8.1 / 10.0.
• Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, System Design, Operating Systems, Computer Architecture, and Machine Learning.`,
        model: "devashish-core-v2.4",
      });
    }

    // 8. Competitive Programming & LeetCode
    if (q.includes("leetcode") || q.includes("codechef") || q.includes("dsa") || q.includes("rating") || q.includes("contest")) {
      return NextResponse.json({
        reply: `[COMPETITIVE PROGRAMMING & DSA]
• LeetCode: 400+ problems solved (168 Easy, 204 Medium, 40 Hard) with a contest rating of 1562.
• CodeChef: 3-Star rated programmer with a peak rating of 1602 and a best global rank of 392.
• Hackathons: 1st Place Category Winner at Deviathon National Hackathon (GLA University) for AI meeting analysis platform.
• Certifications: IBM Generative AI & LLMs (Coursera - 100% grade), Physics Wallah Decode C++ with DSA.`,
        model: "devashish-core-v2.4",
      });
    }

    // 9. Contact / Hiring
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("linkedin") || q.includes("available") || q.includes("location")) {
      return NextResponse.json({
        reply: `[CONTACT & AVAILABILITY]
Devashish is available for Software Engineering, Quant Developer, and High-Performance Systems opportunities.

• Email: workfordevashishhaldar@gmail.com
• Phone: +91 9336009951
• LinkedIn: https://www.linkedin.com/in/devashish-haldar-dev/
• GitHub: https://github.com/devashishhaldar2006
• Location: Lucknow, Uttar Pradesh, India 226012 (Open to relocation and remote positions).`,
        model: "devashish-core-v2.4",
      });
    }

    // 10. Default conversational response
    return NextResponse.json({
      reply: `Devashish Haldar is a Software Engineer, Quant Developer, and Builder pursuing B.Tech in CSE (AI & ML) at PSIT (8.1 CGPA).
He specializes in C++20 high-frequency systems (QuantFlow: 1.48M+ ticks/sec), LangGraph multi-agent AI loops, and full-stack real-time platforms (HackCentral & Career Connect).

Feel free to ask specific questions:
• "What is his age and current year?"
• "How does QuantFlow's C++20 zero-heap engine work?"
• "Tell me about his LeetCode and competitive programming stats"
• "How to get in touch with Devashish for hiring?"`,
      model: "devashish-core-v2.4",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

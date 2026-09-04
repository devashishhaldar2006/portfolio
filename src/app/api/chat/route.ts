import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;

    const systemPrompt = `You are DEVASHISH-CORE, the interactive AI persona representing Devashish Haldar on his personal portfolio.
You talk in first/third person interchangeably as an intelligent, articulate, highly technical assistant (like ChatGPT) specifically trained on Devashish's background, codebase, and achievements.

Tone & Style:
- Be natural, dynamic, conversational, and direct like ChatGPT. Never output rigid canned templates or robot-like scripts unless asked for raw specs.
- Formulate answers spontaneously, using markdown, elegant bullets, or conversational paragraphs depending on the user's prompt style.
- Be technically articulate: explain engineering trade-offs, architecture choices, memory allocation mechanics, and full-stack web architectures with high clarity.
- When asked casual questions (greetings, thoughts, "what's up"), respond naturally and warmly like ChatGPT, seamlessly connecting to his passions for software, AI, and systems.

Candidate Dossier & Facts (Never hallucinate outside these facts):
- Name: Devashish Haldar
- Role: Software Engineer · Full Stack Developer · Systems Builder
- Born: 2006 (19–20 years old)
- Location: Lucknow, Uttar Pradesh, India 226012 (Open to remote roles and global relocation)
- Contact: workfordevashishhaldar@gmail.com | +91 9336009951 | GitHub: devashishhaldar2006 | LinkedIn: devashish-haldar-dev
- Education: B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning), Pranveer Singh Institute of Technology (PSIT), Kanpur (Sep 2024 — Apr 2028, currently in 2nd year). Cumulative GPA: 8.1 / 10.0.
- Core Stacks: React 19, Next.js 16, Node.js, Express.js, TypeScript, JavaScript, Python, C++20, C, MongoDB, PostgreSQL (Supabase), Redis, Docker, AWS (EC2, S3), Socket.IO, WebRTC (Stream.io), LangGraph, Tailwind CSS.

Major Projects:
1. QuantFlow (Jul 2026 — Sep 2026): High-frequency quantitative backtesting platform. Core engine built in C++20 processing 1.48M+ ticks/sec on AWS EC2 (c6i.2xlarge) using contiguous memory buffers and zero runtime heap allocations. 197 / 197 GoogleTest cases passed. LangGraph multi-agent loop with Mistral AI using cyclic state reflection to tune Sharpe and drawdown. 0 look-ahead bias via timestamp order execution and intrabar stop-loss rules. Supabase S3 virtualized tick dataset storage; HMAC SHA-256 Razorpay webhook verification. Live: https://quantflow.hackcentral.me
2. HackCentral (Mar 2026 — Jun 2026): Event discovery & real-time hackathon management platform. Sub-200ms API latency, 95+ Google Lighthouse score. Socket.IO bidirectional collaboration, MongoDB Atlas compound indexes on {userId, eventId}. Google Gemini API with structured JSON output parsing for automated submission evaluation. httpOnly JWT auth & RBAC. Docker on AWS EC2. Live: https://hackcentral.me
3. Career Connect (Dec 2025): Real-time collaborative interview platform. Stream.io WebRTC (<100ms latency), Monaco code editor with Piston API sandboxed compilation across 10+ languages (5s timeout). Clerk auth + Inngest background jobs reducing coordination overhead by 60%. Live: https://career-connect-4gbj.onrender.com

Competitive & Honors:
- Deviathon National Hackathon 1st Place Category Winner (GLA University) for AI meeting analysis platform.
- LeetCode: 400+ problems solved (168 Easy, 204 Medium, 40 Hard) with a contest rating of 1562.
- CodeChef: 3-Star rated programmer with a peak rating of 1602 (best global rank: 392).
- Certifications: IBM Generative AI & LLMs (100% Grade, Coursera), Decode C++ with DSA (Physics Wallah).`;

    // 1. Attempt live Mistral AI call with conversation context
    if (apiKey) {
      // Models to try in order of availability / rate limits
      const modelsToTry = ["ministral-8b-latest", "open-mistral-7b", "mistral-small-latest"];

      for (const model of modelsToTry) {
        try {
          // Format messages including short recent conversation history if provided
          const apiMessages: Array<{ role: string; content: string }> = [
            { role: "system", content: systemPrompt },
          ];

          if (Array.isArray(conversationHistory)) {
            const recentHistory = conversationHistory.slice(-4);
            for (const h of recentHistory) {
              if (h.role === "user" || h.role === "assistant") {
                apiMessages.push({ role: h.role, content: String(h.content) });
              }
            }
          }

          apiMessages.push({ role: "user", content: message });

          const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey.trim()}`,
            },
            body: JSON.stringify({
              model,
              messages: apiMessages,
              temperature: 0.7,
              max_tokens: 600,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content;
            if (reply) {
              return NextResponse.json({ reply, model });
            }
          }
        } catch (err) {
          // Try next model or proceed to intelligent dynamic synthesis
        }
      }
    }

    // 2. Dynamic Conversational Synthesis Engine (ChatGPT-style fluid response)
    const q = message.toLowerCase().trim();

    // Age / Birth
    if (q.includes("age") || q.includes("how old") || q.includes("birth") || q.includes("born")) {
      return NextResponse.json({
        reply: `Devashish was born in 2006, which makes him about 19 to 20 years old. He's currently in his 2nd year pursuing a B.Tech in CSE (specializing in AI & Machine Learning) at PSIT Kanpur, where he maintains an 8.1 CGPA.`,
        model: "devashish-core-dynamic",
      });
    }

    // Greetings
    if (/^(hi|hello|hey|yo|greetings|howdy|sup)\b/i.test(q)) {
      return NextResponse.json({
        reply: `Hey there! Glad you stopped by Devashish's workstation. I'm his interactive AI assistant, trained on his projects, architecture decisions, and background.
\nYou can ask me anything—whether you want to dive deep into his C++20 zero-heap engine on QuantFlow, discuss his full-stack React/Node platforms like HackCentral, check his competitive programming rating progression, or discuss hiring opportunities. What's on your mind?`,
        model: "devashish-core-dynamic",
      });
    }

    // Who is / Summary
    if (q.includes("who are you") || q.includes("who is devashish") || q.includes("tell me about") || q.includes("about yourself") || q.includes("bio")) {
      return NextResponse.json({
        reply: `Devashish Haldar is a Software Engineer, Full Stack Developer, and Systems Builder based in Lucknow, India.
\nHe specializes in building high-performance, real-world systems:
- **Low-Latency & Systems:** Engineered **QuantFlow**, a C++20 engine that processes over 1.48M+ ticks/sec with zero heap allocations during execution loops, backed by 197 GoogleTests.
- **Full-Stack & Real-Time:** Built **HackCentral** (sub-200ms API, 95+ Lighthouse, Socket.IO, Gemini automated grading) and **Career Connect** (sub-100ms WebRTC video & Monaco sandboxed code runner).
- **AI Agent Architectures:** Implements cyclic state reflection using LangGraph and Mistral AI for robust strategy evaluation without hallucinations.
- **Academics & Competitive:** B.Tech CSE (AI/ML) at PSIT (8.1 CGPA), 1st Place National Hackathon Winner at Deviathon, 400+ LeetCode problems (1562 rating), and a 3-Star CodeChef programmer (peak rating 1602, rank 392).`,
        model: "devashish-core-dynamic",
      });
    }

    // CodeChef rating graph inquiry
    if (q.includes("codechef") || (q.includes("rating") && q.includes("graph")) || q.includes("contest")) {
      return NextResponse.json({
        reply: `Devashish has an active competitive programming track on CodeChef under the handle **@devashish_2006**:
- **Division & Status:** 3-Star Coder (3★)
- **Peak Rating:** 1602 (Division 2)
- **Best Global Rank:** 392 (Starters 151)
- **Rating Journey:** Scaled steadily from Starters 120 (1240) through Starters 125 (1385), Starters 131 (1460), Starters 138 (1515), Starters 144 (1568), peaking at 1602 in Starters 151.
\nCheck out the interactive **3D CodeChef Rating Progression Canvas** right in the 3D showcase above!`,
        model: "devashish-core-dynamic",
      });
    }

    // LeetCode inquiry
    if (q.includes("leetcode") || q.includes("dsa") || q.includes("problem")) {
      return NextResponse.json({
        reply: `On LeetCode (@devashishhaldar2006), Devashish has solved **400+ problems**:
- **Distribution:** 168 Easy, 204 Medium, and 40 Hard problems.
- **Contest Rating:** 1562 with an acceptance rate over 72%.
- **Core Topics:** Graph traversals, dynamic programming, tree recursion, monotonic stacks, and sliding window memory optimizations.`,
        model: "devashish-core-dynamic",
      });
    }

    // QuantFlow technical depth
    if (q.includes("quantflow") || q.includes("ticks") || q.includes("c++") || q.includes("memory") || q.includes("zero heap")) {
      return NextResponse.json({
        reply: `**QuantFlow** is Devashish's flagship quantitative backtesting system. Here is what makes it unique under the hood:
1. **Zero-Heap Execution Loop:** To hit 1.48M+ ticks/sec on AWS EC2 (c6i.2xlarge), the engine uses contiguous pre-allocated memory buffers, completely eliminating dynamic malloc/new allocations during order simulation. This maximizes CPU L1/L2 cache locality.
2. **Anti-Lookahead Simulation:** Trade matching strictly respects timestamp order execution with conservative intrabar stop-loss rules across 7 strategy models, preventing look-ahead bias.
3. **LangGraph + Mistral AI Reflection:** Employs an autonomous multi-agent cyclic reflection loop where Mistral AI parses natural language trading hypotheses and adjusts risk parameters to optimize Sharpe ratio while bounding max drawdown.
4. **Reliability:** Validated against 197 GoogleTest test cases with zero memory leaks. Live at https://quantflow.hackcentral.me`,
        model: "devashish-core-dynamic",
      });
    }

    // HackCentral
    if (q.includes("hackcentral") || q.includes("event") || q.includes("gemini")) {
      return NextResponse.json({
        reply: `**HackCentral** is a production event discovery and hackathon automation platform:
- **Sub-200ms Latency:** Optimized MongoDB Atlas aggregation pipelines with compound indexes on \`{userId, eventId}\`.
- **Automated AI Grading:** Integrated Google Gemini structured JSON output schema to evaluate project submissions against rubrics.
- **Real-Time Collaboration:** Powered by Socket.IO for live attendee chat, team formation, and notifications.
- **Performance:** Achieved a 95+ score on Google Lighthouse. Live at https://hackcentral.me`,
        model: "devashish-core-dynamic",
      });
    }

    // Why hire
    if (q.includes("why hire") || q.includes("hire") || q.includes("strength") || q.includes("skills")) {
      return NextResponse.json({
        reply: `Why Devashish stands out for engineering teams:
1. **Full-Stack & Systems Depth:** Comfortable architecting modern React/Next.js and Node.js web applications, while also writing low-level C++20 with contiguous buffers and zero-heap loops.
2. **Practical AI Agent Engineering:** Extensive hands-on work with LangGraph, cyclic reflection loops, and LLM structured outputs (Mistral, Gemini) that solve real workflow bottlenecks.
3. **High Velocity & Proven Builder:** Built and deployed three platforms (QuantFlow, HackCentral, Career Connect) and won 1st place in the national Deviathon hackathon.
4. **Solid Computer Science Foundations:** 8.1 CGPA in B.Tech CSE (AI & ML) at PSIT with 400+ solved algorithmic problems.`,
        model: "devashish-core-dynamic",
      });
    }

    // Contact & Hiring
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("interview") || q.includes("location")) {
      return NextResponse.json({
        reply: `You can reach Devashish directly:
- **Email:** workfordevashishhaldar@gmail.com
- **Phone:** +91 9336009951
- **LinkedIn:** [linkedin.com/in/devashish-haldar-dev](https://www.linkedin.com/in/devashish-haldar-dev/)
- **GitHub:** [github.com/devashishhaldar2006](https://github.com/devashishhaldar2006)
- **Location:** Lucknow, Uttar Pradesh, India (Available for remote and on-site roles globally).`,
        model: "devashish-core-dynamic",
      });
    }

    // Fallback conversational answer
    return NextResponse.json({
      reply: `I'm Devashish's interactive AI assistant! Devashish is a Software Engineer, Full Stack Developer, and Systems Builder who develops high-performance web platforms and C++20 systems.
\nYou can ask me:
• "How does QuantFlow achieve 1.48M+ ticks/sec in C++20?"
• "Tell me about his CodeChef 3-Star rating progression and LeetCode stats"
• "Explain HackCentral's sub-200ms architecture"
• "What is his education, CGPA, and age?"
• "How can I get in touch with him for an engineering role?"`,
      model: "devashish-core-dynamic",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

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
- Contact: workfordevashishhaldar@gmail.com | +91 9336009951 | GitHub: devashishhaldar2006 | LinkedIn: devashish-haldar-dev | CodeChef: devashishcodes | LeetCode: devashishcodes
- Education: B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning), Pranveer Singh Institute of Technology (PSIT), Kanpur (Sep 2024 — Apr 2028, currently in 2nd year). Cumulative GPA: 7.92 / 10.0.
- Core Stacks: React Native, React 19, Next.js, Node.js, Express.js, TypeScript, JavaScript, Python, C++, MongoDB, PostgreSQL (Supabase), Redis, Docker, AWS (EC2, S3), Socket.IO, LangGraph, Tailwind CSS, Scikit-learn, FastAPI.

Major Projects:
1. Joblio (Oct 2026 — Present): AI career copilot & intelligence platform published on Google Play Store. Built in React Native with a FastAPI microservice running LangGraph multi-agent pipelines for resume matching, GitHub hygiene auditing, and automated CI/CD fix generation. Designed two-pass NLP skill extractor recognizing 570+ technologies (60% token reduction) and 26-week ML demand forecasting (80% CI) with 30-day Redis caching. Play Store: https://play.google.com/store/apps/details?id=com.devashishcodes.mobile | GitHub: https://github.com/devashishhaldar2006/Joblio-app
2. QuantFlow (Jul 2026 — Sep 2026): High-frequency quantitative backtesting platform. Core engine built in C++20 processing 1.48M+ ticks/sec on AWS EC2 (c6i.2xlarge) using contiguous memory buffers and zero runtime heap allocations. 197 / 197 GoogleTest cases passed. LangGraph multi-agent loop with Mistral AI using cyclic state reflection to tune Sharpe and drawdown. 0 look-ahead bias via timestamp order execution and intrabar stop-loss rules across 7 strategy models. Supabase S3 virtualized tick dataset storage; HMAC SHA-256 Razorpay webhook verification. Live: https://quantflow.hackcentral.me | GitHub: https://github.com/devashishhaldar2006/QuantFlow
3. HackCentral (Mar 2026 — Jun 2026): Event discovery & real-time hackathon management platform. Sub-200ms API latency, 95+ Google Lighthouse score. Socket.IO bidirectional collaboration, MongoDB Atlas compound indexes on {userId, eventId}. Google Gemini API with Zod-enforced structured JSON output parsing for automated submission evaluation and pitch deck generation. httpOnly JWT auth & RBAC. Docker on AWS EC2. Live: https://hackcentral.me | GitHub: https://github.com/devashishhaldar2006/HackCentral

Competitive & Honors:
- Deviathon National Hackathon 1st Place Category Winner (GLA University) for AI meeting analysis platform.
- LeetCode: Handle @devashishcodes (https://leetcode.com/u/devashishcodes/), 450+ problems solved with a contest rating of 1562.
- CodeChef: Handle @devashishcodes (https://www.codechef.com/users/devashishcodes), 3-Star rated programmer with a peak rating of 1602 (best global rank: 392).
- Certifications: IBM Generative AI & LLMs: Architecture and Data Preparation (100% Grade, Coursera), AWS Certified Solutions Architect - Associate (94.73% Grade, Coursera).`;

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
        reply: `Devashish was born in 2006, which makes him about 19 to 20 years old. He's currently in his 2nd year pursuing a B.Tech in CSE (specializing in AI & Machine Learning) at PSIT Kanpur, where he maintains a 7.92 CGPA.`,
        model: "devashish-core-dynamic",
      });
    }

    // Greetings
    if (/^(hi|hello|hey|yo|greetings|howdy|sup)\b/i.test(q)) {
      return NextResponse.json({
        reply: `Hey there! Glad you stopped by Devashish's workstation. I'm his interactive AI assistant, trained on his projects, architecture decisions, and background.
\nYou can ask me anything—whether you want to dive deep into his C++20 zero-heap engine on QuantFlow, discuss his full-stack React/Node platforms like HackCentral, explore Joblio on the Play Store, check his competitive programming rating progression, or discuss hiring opportunities. What's on your mind?`,
        model: "devashish-core-dynamic",
      });
    }

    // Who is / Summary
    if (q.includes("who are you") || q.includes("who is devashish") || q.includes("tell me about") || q.includes("about yourself") || q.includes("bio")) {
      return NextResponse.json({
        reply: `Devashish Haldar is a Software Engineer, Full Stack Developer, and Systems Builder based in Lucknow, India.
\nHe specializes in building high-performance, real-world systems:
- **Mobile & AI Platforms:** Engineered **Joblio**, an AI career platform published on Google Play Store featuring FastAPI, LangGraph multi-agent pipelines, 570+ technology NLP extraction, and 26-week ML skill forecasting.
- **Low-Latency & Systems:** Engineered **QuantFlow**, a C++20 engine that processes over 1.48M+ ticks/sec with zero heap allocations during execution loops, backed by 197 GoogleTests.
- **Full-Stack & Real-Time:** Built **HackCentral** (sub-200ms API, 95+ Lighthouse, Socket.IO, Gemini automated grading with Zod-enforced structured JSON).
- **AI Agent Architectures:** Implements cyclic state reflection using LangGraph and Mistral AI for robust strategy evaluation without hallucinations.
- **Academics & Competitive:** B.Tech CSE (AI/ML) at PSIT (7.92 CGPA), 1st Place National Hackathon Winner at Deviathon, 450+ LeetCode problems (1562 rating), and a 3-Star CodeChef programmer (peak rating 1602, rank 392).`,
        model: "devashish-core-dynamic",
      });
    }

    // CodeChef rating graph inquiry
    if (q.includes("codechef") || (q.includes("rating") && q.includes("graph")) || q.includes("contest")) {
      return NextResponse.json({
        reply: `Devashish has an active competitive programming track on CodeChef under the handle **@devashishcodes**:
- **Profile:** [codechef.com/users/devashishcodes](https://www.codechef.com/users/devashishcodes)
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
        reply: `On LeetCode under the handle **@devashishcodes** ([leetcode.com/u/devashishcodes](https://leetcode.com/u/devashishcodes/)), Devashish has solved **450+ problems**:
- **Contest Rating:** 1562.
- **Core Topics:** Graph traversals, dynamic programming, tree recursion, monotonic stacks, and sliding window memory optimizations.`,
        model: "devashish-core-dynamic",
      });
    }

    // Joblio
    if (q.includes("joblio") || q.includes("play store") || q.includes("career copilot") || q.includes("react native") || q.includes("fastapi")) {
      return NextResponse.json({
        reply: `**Joblio** is an AI career platform and copilot published on the Google Play Store:
- **Mobile & Backend Architecture:** React Native client with a FastAPI microservice orchestrating LangGraph multi-agent pipelines for automated resume matching, GitHub hygiene audits, and CI/CD fix generation.
- **NLP Skill Extractor:** Two-pass NLP extractor recognizing 570+ technologies from live job postings; reduced prompt token consumption by 60% through resume pruning and dictionary pre-matching.
- **Forecasting & Caching:** 26-week ML demand forecasting with 80% confidence intervals across tech skills; cached paper explanations in Redis for 30 days to reduce repeat inference costs to zero.
- **Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.devashishcodes.mobile) · [GitHub Repo](https://github.com/devashishhaldar2006/Joblio-app)`,
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
- **Automated AI Grading:** Integrated Google Gemini Zod-enforced structured JSON output schema to evaluate project submissions against rubrics.
- **Real-Time Collaboration:** Powered by Socket.IO for live attendee chat, team formation, and notifications.
- **Performance:** Achieved a 95+ score on Google Lighthouse. Live at https://hackcentral.me`,
        model: "devashish-core-dynamic",
      });
    }

    // Why hire
    if (q.includes("why hire") || q.includes("hire") || q.includes("strength") || q.includes("skills")) {
      return NextResponse.json({
        reply: `Why Devashish stands out for engineering teams:
1. **Full-Stack & Systems Depth:** Comfortable architecting modern React/React Native, Next.js, and Node.js applications, while also writing low-level C++ with contiguous buffers and zero-heap loops.
2. **Practical AI Agent Engineering:** Extensive hands-on work with LangGraph, cyclic reflection loops, and LLM structured outputs (Mistral, Gemini) that solve real workflow bottlenecks (Joblio on Play Store, QuantFlow).
3. **High Velocity & Proven Builder:** Built and deployed three flagship platforms (QuantFlow, Joblio, HackCentral) and won 1st place in the national Deviathon hackathon.
4. **Solid Computer Science Foundations:** 7.92 CGPA in B.Tech CSE (AI & ML) at PSIT with 450+ solved algorithmic problems.`,
        model: "devashish-core-dynamic",
      });
    }

    // Contact & Hiring
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("interview") || q.includes("location") || q.includes("resume") || q.includes("cv")) {
      return NextResponse.json({
        reply: `You can reach Devashish directly or inspect his official resume:
- **Resume (PDF):** [Download / View Devashish_Haldar_Resume.pdf](/Devashish_Haldar_Resume.pdf)
- **Email:** workfordevashishhaldar@gmail.com
- **Phone:** +91 9336009951
- **LinkedIn:** [linkedin.com/in/devashish-haldar-dev](https://www.linkedin.com/in/devashish-haldar-dev/)
- **GitHub:** [github.com/devashishhaldar2006](https://github.com/devashishhaldar2006)
- **LeetCode:** [leetcode.com/u/devashishcodes](https://leetcode.com/u/devashishcodes/) (@devashishcodes)
- **CodeChef:** [codechef.com/users/devashishcodes](https://www.codechef.com/users/devashishcodes) (@devashishcodes)
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

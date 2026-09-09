import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter page size: 8.5 x 11 inches = 612 x 792 points
  const pageWidth = 612;
  const pageHeight = 792;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

  const black = rgb(0.08, 0.08, 0.08);
  const darkGray = rgb(0.25, 0.25, 0.25);
  const mediumGray = rgb(0.4, 0.4, 0.4);
  const lineGray = rgb(0.75, 0.75, 0.75);
  const blueColor = rgb(0.0, 0.35, 0.75);

  let y = pageHeight - 38;
  const leftMargin = 38;
  const rightMargin = pageWidth - 38;
  const contentWidth = rightMargin - leftMargin;

  // 1. NAME HEADING
  const name = "Devashish Haldar";
  const nameSize = 22;
  const nameWidth = fontBold.widthOfTextAtSize(name, nameSize);
  page.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: nameSize,
    font: fontBold,
    color: black,
  });

  y -= 14;

  // Location
  const loc = "Lucknow, Uttar Pradesh, India 226012";
  const locSize = 9.5;
  const locWidth = fontRegular.widthOfTextAtSize(loc, locSize);
  page.drawText(loc, {
    x: (pageWidth - locWidth) / 2,
    y: y,
    size: locSize,
    font: fontRegular,
    color: darkGray,
  });

  y -= 13;

  // Contact links line
  const contacts = [
    { text: "+91 9336009951", label: "Tel" },
    { text: "workfordevashishhaldar@gmail.com", label: "Email" },
    { text: "Portfolio", label: "Portfolio" },
    { text: "GitHub", label: "GitHub" },
    { text: "LinkedIn", label: "LinkedIn" }
  ];
  const contactText = "+91 9336009951   |   workfordevashishhaldar@gmail.com   |   Portfolio   |   GitHub   |   LinkedIn";
  const contactSize = 8.5;
  const contactWidth = fontRegular.widthOfTextAtSize(contactText, contactSize);
  page.drawText(contactText, {
    x: (pageWidth - contactWidth) / 2,
    y: y,
    size: contactSize,
    font: fontRegular,
    color: blueColor,
  });

  y -= 14;

  function drawSectionHeader(title: string) {
    y -= 5;
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: black,
    });
    y -= 3;
    page.drawLine({
      start: { x: leftMargin, y: y },
      end: { x: rightMargin, y: y },
      thickness: 0.8,
      color: black,
    });
    y -= 9;
  }

  function drawBullet(textSegments: Array<{ text: string; bold?: boolean; oblique?: boolean; color?: any }>, bulletChar = "•") {
    const bulletSize = 8;
    const textSize = 8.5;
    page.drawText(bulletChar, {
      x: leftMargin + 8,
      y: y,
      size: bulletSize,
      font: fontBold,
      color: black,
    });

    let curX = leftMargin + 18;
    const maxWidth = rightMargin - curX;

    for (const seg of textSegments) {
      const font = seg.bold && seg.oblique ? fontBoldOblique : seg.bold ? fontBold : seg.oblique ? fontOblique : fontRegular;
      const color = seg.color || darkGray;
      
      const words = seg.text.split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? " " : "");
        const wordWidth = font.widthOfTextAtSize(word, textSize);
        
        if (curX + wordWidth > rightMargin) {
          y -= 11.5;
          curX = leftMargin + 18;
        }

        page.drawText(word, {
          x: curX,
          y: y,
          size: textSize,
          font: font,
          color: color,
        });
        curX += wordWidth;
      }
    }
    y -= 12.5;
  }

  // ----------- EDUCATION -----------
  drawSectionHeader("Education");

  // College
  page.drawText("Pranveer Singh Institute of Technology, Kanpur, Uttar Pradesh", {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  const psitDate = "Sep 2024 -- Apr 2028";
  page.drawText(psitDate, {
    x: rightMargin - fontRegular.widthOfTextAtSize(psitDate, 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;

  page.drawText("B.Tech. in Computer Science and Engineering (Artificial Intelligence and Machine Learning)", {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: darkGray,
  });
  y -= 10.5;

  page.drawText("Cumulative GPA: ", {
    x: leftMargin + 10,
    y: y,
    size: 8.5,
    font: fontBold,
    color: darkGray,
  });
  page.drawText("8.1 / 10.0", {
    x: leftMargin + 10 + fontBold.widthOfTextAtSize("Cumulative GPA: ", 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 13;

  // School
  page.drawText("Vishwanath Academy, Lucknow, Uttar Pradesh", {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  const vaDate = "Apr 2023 -- Mar 2024";
  page.drawText(vaDate, {
    x: rightMargin - fontRegular.widthOfTextAtSize(vaDate, 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;

  page.drawText("Senior Secondary (Class XII), CBSE -- Science Stream", {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: darkGray,
  });
  y -= 10.5;

  page.drawText("Percentage: ", {
    x: leftMargin + 10,
    y: y,
    size: 8.5,
    font: fontBold,
    color: darkGray,
  });
  page.drawText("88.2%", {
    x: leftMargin + 10 + fontBold.widthOfTextAtSize("Percentage: ", 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 13;

  // ----------- TECHNICAL SKILLS -----------
  drawSectionHeader("Technical Skills");

  function drawSkillLine(category: string, list: string) {
    page.drawText(category, {
      x: leftMargin,
      y: y,
      size: 8.5,
      font: fontBold,
      color: black,
    });
    const catWidth = fontBold.widthOfTextAtSize(category, 8.5);
    page.drawText(list, {
      x: leftMargin + catWidth + 4,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: darkGray,
    });
    y -= 11.5;
  }

  drawSkillLine("Languages: ", "C++20, C, Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3");
  drawSkillLine("Frameworks & Libraries: ", "Next.js 16, React 19, Node.js, Express.js, Tailwind CSS, LangGraph, Socket.IO, Prisma ORM, Recharts");
  drawSkillLine("Developer Tools & Cloud: ", "Git, GitHub, Docker, AWS (EC2, S3), Supabase (PostgreSQL), MongoDB Atlas, Redis, CMake, Vercel");
  drawSkillLine("Core Concepts: ", "Data Structures & Algorithms, Object-Oriented Programming, System Design, REST APIs, WebSockets, CI/CD");

  y -= 4;

  // ----------- PROJECTS -----------
  drawSectionHeader("Projects");

  // Project 1: QuantFlow
  page.drawText("QuantFlow", {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  let p1CurX = leftMargin + fontBold.widthOfTextAtSize("QuantFlow", 9.5) + 6;
  const p1Tech = "|  C++20, Next.js, LangGraph, Mistral AI, AWS EC2  |  GitHub  |  quantflow.hackcentral.me";
  page.drawText(p1Tech, {
    x: p1CurX,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: darkGray,
  });
  const p1Date = "Jul 2026 -- Sep 2026";
  page.drawText(p1Date, {
    x: rightMargin - fontRegular.widthOfTextAtSize(p1Date, 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11.5;

  drawBullet([
    { text: "Engineered a quantitative backtesting engine in " },
    { text: "C++20", bold: true },
    { text: " processing " },
    { text: "1.48M+ ticks/sec", bold: true },
    { text: " on AWS EC2 via contiguous memory buffers and zero runtime heap allocations during execution loops; verified by " },
    { text: "197 GoogleTest cases", bold: true },
    { text: "." },
  ]);

  drawBullet([
    { text: "Architected a " },
    { text: "LangGraph multi-agent system", bold: true },
    { text: " with Mistral AI using cyclic state reflection to parse natural language strategies, validate parameter bounds, and iteratively tune Sharpe and drawdown before memo synthesis." }
  ]);

  drawBullet([
    { text: "Eliminated look-ahead bias via timestamp order execution and conservative intrabar stop-loss rules across " },
    { text: "7 strategy models", bold: true },
    { text: "; virtualized tick datasets via Supabase S3 and secured checkout with " },
    { text: "HMAC SHA-256 Razorpay webhooks", bold: true },
    { text: "." }
  ]);

  y -= 4;

  // Project 2: HackCentral
  page.drawText("HackCentral", {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  let p2CurX = leftMargin + fontBold.widthOfTextAtSize("HackCentral", 9.5) + 6;
  const p2Tech = "|  React, Node.js, Express, MongoDB, Socket.IO, AWS EC2  |  GitHub  |  hackcentral.me";
  page.drawText(p2Tech, {
    x: p2CurX,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: darkGray,
  });
  const p2Date = "Mar 2026 -- Jun 2026";
  page.drawText(p2Date, {
    x: rightMargin - fontRegular.widthOfTextAtSize(p2Date, 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11.5;

  drawBullet([
    { text: "Architected an event discovery platform delivering " },
    { text: "sub-200ms API response times", bold: true },
    { text: " and a " },
    { text: "95+ Google Lighthouse score", bold: true },
    { text: "; optimized database performance using compound indexing on {userId, eventId} and lean aggregation queries." }
  ]);

  drawBullet([
    { text: "Implemented real-time bidirectional messaging via " },
    { text: "Socket.IO", bold: true },
    { text: " and integrated Gemini API with structured JSON output parsing to automate hackathon submission evaluation and code quality analysis." }
  ]);

  drawBullet([
    { text: "Engineered secure RBAC session management with " },
    { text: "httpOnly cookies, JWT, and Google OAuth", bold: true },
    { text: ", containerizing micro-services with multi-stage Docker builds and deploying automated CI/CD pipelines to an AWS EC2 instance." }
  ]);

  y -= 4;

  // Project 3: Career Connect
  page.drawText("Career Connect", {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  let p3CurX = leftMargin + fontBold.widthOfTextAtSize("Career Connect", 9.5) + 6;
  const p3Tech = "|  React 19, Stream.io, Clerk, Monaco Editor, Piston API  |  GitHub  |  career-connect-4gbj.onrender.com";
  page.drawText(p3Tech, {
    x: p3CurX,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: darkGray,
  });
  const p3Date = "Dec 2025";
  page.drawText(p3Date, {
    x: rightMargin - fontRegular.widthOfTextAtSize(p3Date, 8.5),
    y: y,
    size: 8.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11.5;

  drawBullet([
    { text: "Built a real-time collaborative coding platform with " },
    { text: "WebRTC video conferencing", bold: true },
    { text: " and live chat via Stream.io with " },
    { text: "sub-100ms latency", bold: true },
    { text: ", featuring automated reconnection and state recovery logic." }
  ]);

  drawBullet([
    { text: "Integrated an interactive " },
    { text: "Monaco code editor with Piston API execution", bold: true },
    { text: ", enforcing 5s execution timeouts to sandbox compilation across " },
    { text: "10+ programming languages", bold: true },
    { text: " with regex error line mapping." }
  ]);

  drawBullet([
    { text: "Engineered event-driven interview tracking workflows using Clerk authentication and Inngest background jobs, automating post-interview score recording and reducing manual coordination overhead by " },
    { text: "60%", bold: true },
    { text: "." }
  ]);

  y -= 4;

  // ----------- ACHIEVEMENTS -----------
  drawSectionHeader("Achievements & Competitive Programming");

  drawBullet([
    { text: "Deviathon National Hackathon Winner: ", bold: true },
    { text: "Secured 1st place in the problem statement category at Deviathon (GLA University) for developing an AI-powered meeting analysis platform." }
  ]);

  drawBullet([
    { text: "LeetCode (@devashishcodes): ", bold: true },
    { text: "Solved " },
    { text: "400+", bold: true },
    { text: " Data Structures & Algorithms problems with a contest rating of " },
    { text: "1562", bold: true },
    { text: "." }
  ]);

  drawBullet([
    { text: "CodeChef (@devashishcodes): ", bold: true },
    { text: "Achieved " },
    { text: "3-Star", bold: true },
    { text: " rating with a peak rating of " },
    { text: "1602", bold: true },
    { text: " and a best global rank of " },
    { text: "392", bold: true },
    { text: "." }
  ]);

  y -= 4;

  // ----------- CERTIFICATIONS -----------
  drawSectionHeader("Certifications");

  drawBullet([
    { text: "Generative AI and LLMs: Architecture and Data Preparation -- IBM (Coursera)", bold: true, color: blueColor },
    { text: " -- Specialized in Transformer architectures, LLM tokenization, and NLP pipelines with a 100% grade." }
  ]);

  drawBullet([
    { text: "AWS Certified Solutions Architect - Associate -- AWS (Coursera)", bold: true, color: blueColor },
    { text: " -- Completed training in AWS architecture, VPC design, IAM security, and resilient systems with a 94.73% grade." }
  ]);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'Devashish_Haldar_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Resume successfully generated at:', outputPath, 'Bytes:', pdfBytes.length);
}

generateResume().catch(console.error);

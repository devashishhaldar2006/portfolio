import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

// Ultra-sharp 4K print-grade resolution: 2550 x 3300 (Standard 8.5 x 11 at 300 DPI)
const width = 2550;
const height = 3300;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Pure paper background
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, width, height);

// Margins calibrated for crisp readability
const leftMargin = 140;
const rightMargin = width - 140;

let y = 160;

// Header Name
ctx.fillStyle = '#0F172A';
ctx.font = 'bold 84px "Segoe UI", Arial, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Devashish Haldar', width / 2, y);

y += 56;
ctx.font = '38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#334155';
ctx.fillText('Lucknow, Uttar Pradesh, India 226012', width / 2, y);

y += 50;
ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#1D4ED8';
const contactStr = '+91 9336009951   |   workfordevashishhaldar@gmail.com   |   github.com/devashishhaldar2006   |   linkedin.com/in/devashish-haldar-dev';
ctx.fillText(contactStr, width / 2, y);

y += 60;

function drawSectionHeader(title: string) {
  y += 20;
  ctx.textAlign = 'left';
  ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(title.toUpperCase(), leftMargin, y);
  
  y += 14;
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(leftMargin, y);
  ctx.lineTo(rightMargin, y);
  ctx.stroke();
  y += 42;
}

function drawBullet(segments: Array<{ text: string; bold?: boolean; italic?: boolean; color?: string }>) {
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
  ctx.fillText('•', leftMargin + 24, y);

  let curX = leftMargin + 60;
  const maxW = rightMargin;

  for (const seg of segments) {
    const fontWeight = seg.bold ? 'bold' : 'normal';
    const fontStyle = seg.italic ? 'italic' : 'normal';
    ctx.font = `${fontStyle} ${fontWeight} 34px "Segoe UI", Arial, sans-serif`;
    ctx.fillStyle = seg.color || '#1E293B';

    const words = seg.text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i] + (i < words.length - 1 ? ' ' : '');
      const wordWidth = ctx.measureText(word).width;

      if (curX + wordWidth > maxW) {
        y += 48;
        curX = leftMargin + 60;
      }
      ctx.fillText(word, curX, y);
      curX += wordWidth;
    }
  }
  y += 54;
}

// 1. EDUCATION
drawSectionHeader('Education');

ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('Pranveer Singh Institute of Technology, Kanpur, Uttar Pradesh', leftMargin, y);

ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
const d1 = 'Sep 2024 -- Apr 2028';
ctx.fillText(d1, rightMargin - ctx.measureText(d1).width, y);
y += 44;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillText('B.Tech. in Computer Science and Engineering (Artificial Intelligence and Machine Learning)', leftMargin, y);
y += 42;

ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
ctx.fillText('Cumulative GPA: ', leftMargin + 30, y);
const gpaW = ctx.measureText('Cumulative GPA: ').width;
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText('8.1 / 10.0', leftMargin + 30 + gpaW, y);
y += 56;

ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('Vishwanath Academy, Lucknow, Uttar Pradesh', leftMargin, y);

ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
const d2 = 'Apr 2023 -- Mar 2024';
ctx.fillText(d2, rightMargin - ctx.measureText(d2).width, y);
y += 44;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillText('Senior Secondary (Class XII), CBSE -- Science Stream', leftMargin, y);
y += 42;

ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
ctx.fillText('Percentage: ', leftMargin + 30, y);
const perW = ctx.measureText('Percentage: ').width;
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText('88.2%', leftMargin + 30 + perW, y);
y += 56;

// 2. TECHNICAL SKILLS
drawSectionHeader('Technical Skills');

function drawSkill(cat: string, items: string) {
  ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(cat, leftMargin, y);
  const w = ctx.measureText(cat).width;
  ctx.font = '34px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = '#1E293B';
  ctx.fillText(items, leftMargin + w + 14, y);
  y += 48;
}

drawSkill('Languages: ', 'C++20, C, Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3');
drawSkill('Frameworks & Libraries: ', 'Next.js 16, React 19, Node.js, Express.js, Tailwind CSS, LangGraph, Socket.IO, Prisma ORM, Recharts');
drawSkill('Developer Tools & Cloud: ', 'Git, GitHub, Docker, AWS (EC2, S3), Supabase (PostgreSQL), MongoDB Atlas, Redis, CMake, Vercel');
drawSkill('Core Concepts: ', 'Data Structures & Algorithms, Object-Oriented Programming, System Design, REST APIs, WebSockets, CI/CD');

y += 18;

// 3. PROJECTS
drawSectionHeader('Projects');

// QuantFlow
ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('QuantFlow', leftMargin, y);
const qfW = ctx.measureText('QuantFlow').width;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
ctx.fillText(' |  C++20, Next.js, LangGraph, Mistral AI, AWS EC2  |  GitHub  |  quantflow.hackcentral.me', leftMargin + qfW, y);

const qfDate = 'Jul 2026 -- Sep 2026';
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText(qfDate, rightMargin - ctx.measureText(qfDate).width, y);
y += 46;

drawBullet([
  { text: 'Engineered a quantitative backtesting engine in ' },
  { text: 'C++20', bold: true },
  { text: ' processing ' },
  { text: '1.48M+ ticks/sec', bold: true },
  { text: ' on AWS EC2 via contiguous memory buffers and zero runtime heap allocations during execution loops; verified by ' },
  { text: '197 GoogleTest cases', bold: true },
  { text: '.' }
]);

drawBullet([
  { text: 'Architected a ' },
  { text: 'LangGraph multi-agent system', bold: true },
  { text: ' with Mistral AI using cyclic state reflection to parse natural language strategies, validate parameter bounds, and iteratively tune Sharpe and drawdown before memo synthesis.' }
]);

drawBullet([
  { text: 'Eliminated look-ahead bias via timestamp order execution and conservative intrabar stop-loss rules across ' },
  { text: '7 strategy models', bold: true },
  { text: '; virtualized tick datasets via Supabase S3 and secured checkout with ' },
  { text: 'HMAC SHA-256 Razorpay webhooks', bold: true },
  { text: '.' }
]);

y += 18;

// HackCentral
ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('HackCentral', leftMargin, y);
const hcW = ctx.measureText('HackCentral').width;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
ctx.fillText(' |  React, Node.js, Express, MongoDB, Socket.IO, AWS EC2  |  GitHub  |  hackcentral.me', leftMargin + hcW, y);

const hcDate = 'Mar 2026 -- Jun 2026';
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText(hcDate, rightMargin - ctx.measureText(hcDate).width, y);
y += 46;

drawBullet([
  { text: 'Architected an event discovery platform delivering ' },
  { text: 'sub-200ms API response times', bold: true },
  { text: ' and a ' },
  { text: '95+ Google Lighthouse score', bold: true },
  { text: '; optimized database performance using compound indexing on {userId, eventId} and lean aggregation queries.' }
]);

drawBullet([
  { text: 'Implemented real-time bidirectional messaging via ' },
  { text: 'Socket.IO', bold: true },
  { text: ' and integrated Gemini API with structured JSON output parsing to automate hackathon submission evaluation and code quality analysis.' }
]);

drawBullet([
  { text: 'Engineered secure RBAC session management with ' },
  { text: 'httpOnly cookies, JWT, and Google OAuth', bold: true },
  { text: ', containerizing micro-services with multi-stage Docker builds and deploying automated CI/CD pipelines to an AWS EC2 instance.' }
]);

y += 18;

// Career Connect
ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('Career Connect', leftMargin, y);
const ccW = ctx.measureText('Career Connect').width;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
ctx.fillText(' |  React 19, Stream.io, Clerk, Monaco Editor, Piston API  |  GitHub  |  career-connect-4gbj.onrender.com', leftMargin + ccW, y);

const ccDate = 'Dec 2025';
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText(ccDate, rightMargin - ctx.measureText(ccDate).width, y);
y += 46;

drawBullet([
  { text: 'Built a real-time collaborative coding platform with ' },
  { text: 'WebRTC video conferencing', bold: true },
  { text: ' and live chat via Stream.io with ' },
  { text: 'sub-100ms latency', bold: true },
  { text: ', featuring automated reconnection and state recovery logic.' }
]);

drawBullet([
  { text: 'Integrated an interactive ' },
  { text: 'Monaco code editor with Piston API execution', bold: true },
  { text: ', enforcing 5s execution timeouts to sandbox compilation across ' },
  { text: '10+ programming languages', bold: true },
  { text: ' with regex error line mapping.' }
]);

drawBullet([
  { text: 'Engineered event-driven interview tracking workflows using Clerk authentication and Inngest background jobs, automating post-interview score recording and reducing manual coordination overhead by ' },
  { text: '60%', bold: true },
  { text: '.' }
]);

y += 18;

// 4. ACHIEVEMENTS
drawSectionHeader('Achievements & Competitive Programming');

drawBullet([
  { text: 'Deviathon National Hackathon Winner: ', bold: true },
  { text: 'Secured 1st place in the problem statement category at Deviathon (GLA University) for developing an AI-powered meeting analysis platform.' }
]);

drawBullet([
  { text: 'LeetCode (@devashishcodes): ', bold: true },
  { text: 'Solved ' },
  { text: '400+', bold: true },
  { text: ' Data Structures & Algorithms problems with a contest rating of ' },
  { text: '1562', bold: true },
  { text: '.' }
]);

drawBullet([
  { text: 'CodeChef (@devashishcodes): ', bold: true },
  { text: 'Achieved ' },
  { text: '3-Star', bold: true },
  { text: ' rating with a peak rating of ' },
  { text: '1602', bold: true },
  { text: ' and a best global rank of ' },
  { text: '392', bold: true },
  { text: '.' }
]);

y += 18;

// 5. CERTIFICATIONS
drawSectionHeader('Certifications');

drawBullet([
  { text: 'Generative AI and LLMs: Architecture and Data Preparation -- IBM (Coursera)', bold: true, color: '#1D4ED8' },
  { text: ' -- Specialized in Transformer architectures, LLM tokenization, and NLP pipelines with a 100% grade.' }
]);

drawBullet([
  { text: 'AWS Certified Solutions Architect - Associate -- AWS (Coursera)', bold: true, color: '#1D4ED8' },
  { text: ' -- Completed training in AWS architecture, VPC design, IAM security, and resilient systems with a 94.73% grade.' }
]);

// Write 4K texture image
const buffer = canvas.toBuffer('image/png');
const outPath = path.join(process.cwd(), 'public', 'resume-preview.png');
fs.writeFileSync(outPath, buffer);
console.log('Ultra-sharp 4K preview texture generated at:', outPath, 'Bytes:', buffer.length);

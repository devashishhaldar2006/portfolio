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
const contactStr = '+91 9336009951   |   workfordevashishhaldar@gmail.com   |   Portfolio   |   GitHub   |   LinkedIn';
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
ctx.fillText('7.92 / 10.0', leftMargin + 30 + gpaW, y);
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
  y += 46;
}

drawSkill('Languages: ', 'C++, Python, JavaScript, TypeScript, SQL');
drawSkill('Frameworks & Libraries: ', 'Next.js, React, React Native, Node.js, Express.js, Tailwind CSS, Socket.IO, Prisma ORM');
drawSkill('Developer Tools & Cloud: ', 'Git, GitHub, Docker, AWS (EC2, S3), Supabase (PostgreSQL), MongoDB, Redis');
drawSkill('AI & Machine Learning: ', 'LangGraph, Scikit-learn, NumPy, Pandas, Matplotlib');
drawSkill('Core Concepts: ', 'Data Structures & Algorithms, Low Level Design, Database Management Systems, Operating Systems');

y += 14;

// 3. PROJECTS
drawSectionHeader('Projects');

// QuantFlow
ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('QuantFlow', leftMargin, y);
const qfW = ctx.measureText('QuantFlow').width;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
ctx.fillText(' |  C++, Next.js, LangGraph, Mistral AI, AWS EC2  |  GitHub  |  quantflow.hackcentral.me', leftMargin + qfW, y);

const qfDate = 'Jul 2026 -- Sep 2026';
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText(qfDate, rightMargin - ctx.measureText(qfDate).width, y);
y += 44;

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
  { text: ' with Mistral AI using cyclic state reflection to parse natural language strategies, validate parameter bounds, and iteratively tune Sharpe ratio and maximum drawdown before memo synthesis.' }
]);

drawBullet([
  { text: 'Eliminated look-ahead bias via timestamp-ordered execution and conservative intrabar stop-loss rules across ' },
  { text: '7 strategy models', bold: true },
  { text: '; virtualized tick datasets via Supabase S3 and secured checkout with ' },
  { text: 'HMAC SHA-256 Razorpay webhooks', bold: true },
  { text: '.' }
]);

y += 14;

// Joblio
ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#0F172A';
ctx.fillText('Joblio', leftMargin, y);
const jbW = ctx.measureText('Joblio').width;

ctx.font = 'italic 34px "Segoe UI", Arial, sans-serif';
ctx.fillStyle = '#475569';
ctx.fillText(' |  React Native, LangGraph, Groq, MongoDB, Redis  |  GitHub  |  Google Play Store', leftMargin + jbW, y);

const jbDate = 'Oct 2026 -- Present';
ctx.font = '34px "Segoe UI", Arial, sans-serif';
ctx.fillText(jbDate, rightMargin - ctx.measureText(jbDate).width, y);
y += 44;

drawBullet([
  { text: 'Published on Google Play Store', bold: true },
  { text: '; built a full-stack AI career platform in React Native with a FastAPI microservice running ' },
  { text: 'LangGraph multi-agent pipelines', bold: true },
  { text: ' for resume matching, GitHub hygiene auditing, and automated CI/CD fix generation.' }
]);

drawBullet([
  { text: 'Designed a two-pass NLP skill extractor recognizing ' },
  { text: '570+ technologies', bold: true },
  { text: ' from live job listings; reduced prompt token consumption by ' },
  { text: '60%', bold: true },
  { text: ' via resume pruning and deterministic dictionary lookups before LLM inference.' }
]);

drawBullet([
  { text: 'Built ' },
  { text: '26-week ML demand forecasting', bold: true },
  { text: ' with ' },
  { text: '80% confidence intervals', bold: true },
  { text: ' across tech skills; cached paper explanations in Redis for ' },
  { text: '30 days', bold: true },
  { text: ', cutting repeat inference costs to zero.' }
]);

y += 14;

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
y += 44;

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
  { text: ' and integrated Gemini API with ' },
  { text: 'Zod-enforced', bold: true },
  { text: ' structured JSON output to automate hackathon submission evaluation and pitch deck generation.' }
]);

drawBullet([
  { text: 'Engineered secure Role-Based Access Control (RBAC) with ' },
  { text: 'httpOnly cookies, JWT, and Google OAuth', bold: true },
  { text: '; containerized microservices with multi-stage Docker builds and deployed automated CI/CD pipelines to AWS EC2.' }
]);

y += 14;

// 4. ACHIEVEMENTS
drawSectionHeader('Achievements & Competitive Programming');

drawBullet([
  { text: 'Deviathon National Hackathon Winner: ', bold: true },
  { text: 'Secured 1st place in the problem statement category at Deviathon (GLA University) for developing an AI-powered meeting analysis platform.' }
]);

drawBullet([
  { text: 'LeetCode: ', bold: true },
  { text: 'Solved ' },
  { text: '450+', bold: true },
  { text: ' Data Structures & Algorithms problems with a contest rating of ' },
  { text: '1562', bold: true },
  { text: '.' }
]);

drawBullet([
  { text: 'CodeChef: ', bold: true },
  { text: 'Achieved ' },
  { text: '3-Star', bold: true },
  { text: ' rating with a peak rating of ' },
  { text: '1602', bold: true },
  { text: ' and a best global rank of ' },
  { text: '392', bold: true },
  { text: '.' }
]);

y += 14;

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

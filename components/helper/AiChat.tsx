/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * AiChatPremium.tsx — Bright Horizon Institute AI Course Advisor v2
 * ─────────────────────────────────────────────────────────────────
 * Premium upgrade: Full-screen, conversational, career-dashboard UI
 *
 * CHANGES FROM v1:
 * - Full-screen overlay experience (not widget)
 * - Conversational intake (AI asks progressive questions)
 * - Career Dashboard results with salary, demand, timeline
 * - Streaming chat responses with typing effect
 * - Dynamic follow-up suggestions
 * - Dark/light mode, glassmorphism, micro-interactions
 * - Trust signals, testimonials, CTAs
 * - Expandable course cards with "Day in the life"
 *
 * SETUP: Same /api/chat route as v1 (OpenAI or Anthropic)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import {
  HiX, HiSparkles, HiChevronRight, HiRefresh, HiChevronDown,
  HiChevronUp, HiDownload, HiPhone, HiLightningBolt,
  HiCheck, HiTrendingUp, HiClock, HiStar, HiBriefcase,
  HiAcademicCap, HiMoon, HiSun,
} from "react-icons/hi";

// ─── Course Catalog (unchanged from v1, extended with salary/demand) ──────────

export interface BHICourse {
  id: string;
  title: string;
  category: "healthcare" | "it" | "business" | "hospitality" | "technical";
  duration: string;
  credential: string;
  description: string;
  careers: string[];
  skills: string[];
  salaryRange: { min: number; max: number };
  jobDemand: "High" | "Medium" | "Growing";
  weeklyHours: number;
  placementRate: number;
  whatYouLearn: string[];
  dayInLife: string;
}

export const BHI_COURSES: BHICourse[] = [
  {
    id: "medical-assistant",
    title: "Medical Assistant",
    category: "healthcare",
    duration: "9 months",
    credential: "Certificate",
    description: "Train to assist physicians with clinical and administrative tasks in healthcare settings.",
    careers: ["Medical Assistant", "Clinical Coordinator", "Healthcare Admin"],
    skills: ["Patient care", "Vital signs", "EHR software", "Phlebotomy", "Medical terminology"],
    salaryRange: { min: 36000, max: 52000 },
    jobDemand: "High",
    weeklyHours: 20,
    placementRate: 91,
    whatYouLearn: ["Patient intake & vitals", "EHR documentation", "Phlebotomy", "Medical coding basics", "Clinical procedures"],
    dayInLife: "You start your shift greeting patients, recording vitals, and updating charts. Mid-morning, you assist the physician during exams. Afternoons involve scheduling follow-ups and coordinating lab results. No two days are exactly the same — it's fast-paced and deeply rewarding.",
  },
  {
    id: "medical-billing-coding",
    title: "Medical Billing & Coding",
    category: "healthcare",
    duration: "6 months",
    credential: "CPC Certificate",
    description: "Master medical coding systems (ICD-10, CPT) and insurance billing workflows.",
    careers: ["Medical Coder", "Billing Specialist", "Revenue Cycle Analyst"],
    skills: ["ICD-10", "CPT coding", "Insurance billing", "HIPAA compliance", "EHR systems"],
    salaryRange: { min: 38000, max: 58000 },
    jobDemand: "High",
    weeklyHours: 15,
    placementRate: 88,
    whatYouLearn: ["ICD-10-CM coding", "CPT procedure codes", "Insurance claims processing", "HIPAA compliance", "Denial management"],
    dayInLife: "You review patient records, assign the correct diagnostic and procedure codes, and submit clean claims to insurers. You investigate denials and resolve billing disputes. Most roles are remote-friendly — a great option for those who prefer working from home.",
  },
  {
    id: "web-design",
    title: "Web Design",
    category: "it",
    duration: "6 months",
    credential: "Certificate",
    description: "Build modern, responsive websites using HTML, CSS, JavaScript and design tools.",
    careers: ["Web Designer", "Frontend Developer", "UI/UX Designer", "Freelancer"],
    skills: ["HTML/CSS", "JavaScript", "Figma", "Responsive design", "WordPress"],
    salaryRange: { min: 42000, max: 75000 },
    jobDemand: "Growing",
    weeklyHours: 18,
    placementRate: 85,
    whatYouLearn: ["HTML5 & CSS3", "JavaScript fundamentals", "Responsive design", "Figma prototyping", "SEO basics"],
    dayInLife: "You open your laptop and review a client's wireframe feedback. You spend the morning coding a landing page, then the afternoon tweaking animations and testing cross-browser compatibility. Freelance work means flexibility — you set your own hours.",
  },
  {
    id: "patient-care-technician",
    title: "Patient Care Technician",
    category: "healthcare",
    duration: "4 months",
    credential: "PCT Certificate",
    description: "Provide direct patient care under nursing supervision in hospitals and clinics.",
    careers: ["Patient Care Tech", "Nursing Assistant", "CNA"],
    skills: ["Patient care", "Vital monitoring", "EKG", "Phlebotomy", "BLS/CPR"],
    salaryRange: { min: 32000, max: 46000 },
    jobDemand: "High",
    weeklyHours: 20,
    placementRate: 93,
    whatYouLearn: ["Vital signs monitoring", "EKG interpretation basics", "Phlebotomy", "Patient hygiene & mobility", "BLS/CPR certification"],
    dayInLife: "You're on the floor taking vitals, drawing blood, and making sure patients are comfortable. You work alongside nurses and report changes in patient status. It's physically active, emotionally fulfilling work — you're a crucial part of the care team.",
  },
  {
    id: "home-health-aide",
    title: "Home Health Aide",
    category: "healthcare",
    duration: "3 months",
    credential: "HHA Certificate",
    description: "Provide personal care and support to patients in home and community settings.",
    careers: ["Home Health Aide", "Personal Care Aide", "Companion Caregiver"],
    skills: ["Personal care", "Medication reminders", "Mobility assistance", "Safety protocols"],
    salaryRange: { min: 28000, max: 40000 },
    jobDemand: "High",
    weeklyHours: 12,
    placementRate: 96,
    whatYouLearn: ["Personal hygiene assistance", "Medication reminders", "Mobility & transfer techniques", "Nutrition & meal prep", "Safety & fall prevention"],
    dayInLife: "You visit 2–3 clients a day, helping with bathing, meals, light housekeeping, and companionship. You build genuine relationships with the people you care for. Many aides describe this as the most meaningful work they've ever done.",
  },
  {
    id: "comptia-aplus",
    title: "CompTIA A+",
    category: "it",
    duration: "4 months",
    credential: "CompTIA A+ Cert",
    description: "Earn the industry-standard IT certification covering hardware, software and troubleshooting.",
    careers: ["IT Support Specialist", "Help Desk Tech", "Systems Admin", "Field Tech"],
    skills: ["Hardware", "Networking", "Operating systems", "Troubleshooting", "Security basics"],
    salaryRange: { min: 40000, max: 62000 },
    jobDemand: "High",
    weeklyHours: 15,
    placementRate: 87,
    whatYouLearn: ["PC hardware assembly & repair", "Windows & Linux OS", "Network fundamentals", "Security protocols", "Remote troubleshooting"],
    dayInLife: "Your ticket queue has 12 open issues. You resolve a printer problem via remote access, walk someone through resetting their password, and diagnose a slow laptop in person. IT support is a stable, always-in-demand field that can launch a full tech career.",
  },
  {
    id: "pharmacy-technician",
    title: "Pharmacy Technician",
    category: "healthcare",
    duration: "6 months",
    credential: "CPhT Prep",
    description: "Assist licensed pharmacists in dispensing medications and managing pharmacy operations.",
    careers: ["Pharmacy Technician", "Pharmacy Clerk", "Compounding Tech"],
    skills: ["Medication dispensing", "Drug classifications", "Pharmacy law", "Customer service"],
    salaryRange: { min: 34000, max: 50000 },
    jobDemand: "Medium",
    weeklyHours: 16,
    placementRate: 84,
    whatYouLearn: ["Drug names & classifications", "Prescription processing", "Compounding basics", "Pharmacy law & ethics", "Insurance adjudication"],
    dayInLife: "You process prescriptions, count medications, verify insurance, and counsel patients on pickup. Retail pharmacy is fast-paced; hospital pharmacy is more clinical. Both offer stability and advancement paths.",
  },
  {
    id: "medical-office-admin",
    title: "Medical Office Administration",
    category: "business",
    duration: "5 months",
    credential: "Certificate",
    description: "Manage front-office operations, scheduling, billing and patient communications.",
    careers: ["Medical Receptionist", "Office Manager", "Patient Coordinator"],
    skills: ["Scheduling", "Medical records", "Insurance verification", "Communication"],
    salaryRange: { min: 33000, max: 49000 },
    jobDemand: "High",
    weeklyHours: 14,
    placementRate: 89,
    whatYouLearn: ["Appointment scheduling", "Insurance verification", "Medical records management", "Patient communication", "Front-desk operations"],
    dayInLife: "You're the first face patients see. You greet them, verify insurance, collect copays, and keep the schedule running smoothly. You're the backbone of the practice — when you're organized, everyone works better.",
  },
  {
    id: "hvac",
    title: "HVAC Technician",
    category: "technical",
    duration: "9 months",
    credential: "EPA 608 + Certificate",
    description: "Install, maintain and repair heating, ventilation and air conditioning systems.",
    careers: ["HVAC Technician", "Maintenance Tech", "HVAC Installer"],
    skills: ["Refrigerant handling", "Electrical systems", "Blueprint reading", "EPA 608"],
    salaryRange: { min: 48000, max: 72000 },
    jobDemand: "Growing",
    weeklyHours: 25,
    placementRate: 92,
    whatYouLearn: ["Refrigerant handling & EPA 608", "Electrical & mechanical systems", "Blueprint & schematic reading", "HVAC installation", "Preventive maintenance"],
    dayInLife: "You arrive at a commercial building for a scheduled maintenance check, then get dispatched to a residential emergency — a family's AC is out in summer heat. You diagnose, repair, and leave a satisfied customer. Demand is surging. So is pay.",
  },
  {
    id: "business-admin",
    title: "Business Administration",
    category: "business",
    duration: "12 months",
    credential: "Diploma",
    description: "Build core business skills in management, finance, marketing and operations.",
    careers: ["Office Manager", "Operations Coordinator", "Business Analyst", "Admin Assistant"],
    skills: ["Management", "Accounting basics", "Marketing", "MS Office", "Communication"],
    salaryRange: { min: 38000, max: 60000 },
    jobDemand: "Medium",
    weeklyHours: 18,
    placementRate: 82,
    whatYouLearn: ["Business communications", "Accounting fundamentals", "Marketing strategy", "Project management", "MS Office suite"],
    dayInLife: "You run the weekly ops meeting, review budget reports, coordinate with vendors, and draft a proposal for a new workflow. Business admin roles exist in every industry — giving you the flexibility to work wherever your interests lie.",
  },
  {
    id: "hospitality-management",
    title: "Hospitality Management",
    category: "hospitality",
    duration: "8 months",
    credential: "Certificate",
    description: "Train for careers in hotels, restaurants and event management.",
    careers: ["Hotel Manager", "Front Desk Supervisor", "Event Coordinator", "Restaurant Manager"],
    skills: ["Guest services", "Event planning", "Food & beverage", "Leadership"],
    salaryRange: { min: 38000, max: 62000 },
    jobDemand: "Growing",
    weeklyHours: 20,
    placementRate: 86,
    whatYouLearn: ["Guest experience management", "Food & beverage operations", "Event coordination", "Hotel front office", "Leadership & HR basics"],
    dayInLife: "No two days look alike. You might be coordinating a wedding venue setup in the morning and handling a VIP guest complaint by noon. Hospitality rewards personality, organization, and the ability to stay calm under pressure.",
  },
  {
    id: "network-plus",
    title: "CompTIA Network+",
    category: "it",
    duration: "5 months",
    credential: "CompTIA Network+ Cert",
    description: "Master networking concepts, protocols and infrastructure for IT careers.",
    careers: ["Network Technician", "IT Support", "Network Administrator"],
    skills: ["TCP/IP", "Network security", "Wireless", "Troubleshooting", "Cloud basics"],
    salaryRange: { min: 48000, max: 70000 },
    jobDemand: "High",
    weeklyHours: 18,
    placementRate: 86,
    whatYouLearn: ["TCP/IP & network protocols", "Network security fundamentals", "Wireless technologies", "Cloud infrastructure basics", "Network troubleshooting"],
    dayInLife: "You monitor the company network for performance issues, configure a new wireless access point for an office expansion, and help a remote employee troubleshoot their VPN. Networking is foundational to every modern business.",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "entry" | "chat-intake" | "analyzing" | "results" | "advisor-chat";

interface AnalysisResult {
  summary: string;
  topCourses: Array<{ course: BHICourse; matchScore: number; reason: string; confidenceLevel: "Excellent" | "Strong" | "Good" }>;
  careerPaths: Array<{ title: string; outlook: string; matchedCourse: string; avgSalary: string }>;
  userProfile: string;
  userName?: string;
  userGoal?: string;
}

interface ChatMsg { role: "user" | "assistant"; content: string }

// ─── Constants ────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: "Mariana T.", course: "Medical Assistant", quote: "I went from retail to a hospital job in 10 months. BHI changed my life.", rating: 5 },
  { name: "Devon K.", course: "CompTIA A+", quote: "Had zero IT experience. Now I'm a help desk tech making $48K. Worth every penny.", rating: 5 },
  { name: "Priya S.", course: "Med Billing & Coding", quote: "I work from home now. Flexible, well-paying, and I actually enjoy my job.", rating: 5 },
];

const STATS = [
  { value: "91%", label: "Job placement rate" },
  { value: "8 mo", label: "Avg time to employment" },
  { value: "12+", label: "Accredited programs" },
  { value: "4,200+", label: "Graduates placed" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtSalary(n: number) {
  return `$${(n / 1000).toFixed(0)}K`;
}

function getDemandColor(d: "High" | "Medium" | "Growing") {
  return d === "High" ? "#16a34a" : d === "Growing" ? "#d97706" : "#6366f1";
}

function getConfidenceColor(c: "Excellent" | "Strong" | "Good") {
  return c === "Excellent" ? "#16a34a" : c === "Strong" ? "#2563eb" : "#9333ea";
}

// ─── Prompt builders ──────────────────────────────────────────────────────────

function buildAnalysisPrompt(transcript: string): string {
  const catalog = BHI_COURSES.map(c =>
    `ID: ${c.id} | ${c.title} (${c.category}, ${c.duration}, ${c.credential}, salary: $${c.salaryRange.min}-$${c.salaryRange.max})\n  Careers: ${c.careers.join(", ")}`
  ).join("\n");
  return `You are an AI advisor for Bright Horizon Institute (BHI). Analyze this intake conversation and recommend courses.

INTAKE CONVERSATION:
${transcript}

BHI COURSES:
${catalog}

Respond ONLY with valid JSON, no markdown:
{
  "userName": "first name if mentioned, else null",
  "userGoal": "one sentence summary of their main goal",
  "summary": "2-sentence warm, personalized summary referencing their specific background",
  "topCourses": [
    { "courseId": "exact-id", "matchScore": 94, "reason": "Specific to their background", "confidenceLevel": "Excellent" }
  ],
  "careerPaths": [
    { "title": "Career title", "outlook": "Job market note", "matchedCourse": "BHI course", "avgSalary": "$45K–$62K" }
  ],
  "userProfile": "Full context for ongoing advisor chat: background, goals, matches, why"
}
Rules: topCourses = 3 items, confidenceLevel = Excellent/Strong/Good, courseId from: ${BHI_COURSES.map(c => c.id).join(", ")}`;
}

function buildAdvisorSystemPrompt(userProfile: string): string {
  const catalog = BHI_COURSES.map(c =>
    `• ${c.title} (${c.duration}, $${c.salaryRange.min}–$${c.salaryRange.max}/yr, ${c.placementRate}% placement)`
  ).join("\n");
  return `You are Alex, a warm, knowledgeable career advisor at Bright Horizon Institute. You're talking with a prospective student.

STUDENT PROFILE:
${userProfile}

BHI PROGRAMS:
${catalog}

Tone: Warm, encouraging, honest. Like a mentor who genuinely wants this person to succeed.
Format: 3–5 sentences. End with a natural follow-up question when appropriate.
When comparing courses: be specific about salary, timeline, and fit for THEIR background.
When asked about enrollment: next cohort starts soon — encourage them to act while spots are available.
Never make up courses BHI doesn't offer. Always redirect to the closest BHI option.`;
}

function buildIntakeSystemPrompt(): string {
  return `You are a friendly intake advisor for Bright Horizon Institute, a vocational school. Your job is to learn about a prospective student through quick tap-to-answer questions — NO long typing required.

CRITICAL RULES:
- Ask ONE short question at a time (max 12 words)
- Always provide 3–4 short tap options the user can select (max 5 words each)
- Also allow a free-text fallback labelled "Something else..."
- Gather across 4 questions: current situation, career interest area, main goal/motivation, time availability
- Keep your message warm, brief, encouraging

RESPONSE FORMAT — always respond with valid JSON only, no markdown:
{
  "message": "Short warm question here?",
  "options": ["Option A", "Option B", "Option C", "Something else..."]
}

Question sequence to follow:
Q1: Current situation — options like: "Working full-time", "Part-time / freelance", "Stay-at-home parent", "Recently unemployed", "Recent graduate"
Q2: Interest area — options like: "Healthcare & medical", "IT & computers", "Business & admin", "Skilled trades", "Not sure yet"
Q3: Main motivation — options like: "Higher salary", "Job security", "Help people", "Work from home", "Career change"
Q4: Time available — options like: "Full-time (days)", "Evenings only", "Weekends", "Very flexible"

After receiving 4 answers, respond with this exact structure (no options needed):
{
  "message": "INTAKE_COMPLETE",
  "options": [],
  "summary": "NAME: Unknown\\nBACKGROUND: [their situation]\\nINTERESTS: [area they chose]\\nGOALS: [motivation]\\nCONSTRAINTS: [time availability]"
}`;
}

// ─── CSS & Theme ──────────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  .bhi-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .bhi-root { font-family: 'DM Sans', sans-serif; }

  @keyframes bhi-fadeUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes bhi-fadeIn   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes bhi-pulse    { 0%,100% { opacity: 0.4; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }
  @keyframes bhi-spin     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes bhi-shimmer  { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes bhi-float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes bhi-bounce   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .bhi-fade-up  { animation: bhi-fadeUp .35s ease both; }
  .bhi-fade-in  { animation: bhi-fadeIn .3s ease both; }

  .bhi-scroll::-webkit-scrollbar       { width: 4px; }
  .bhi-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,.3); border-radius: 4px; }

  .bhi-card-hover {
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .bhi-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,.12) !important;
  }

  .bhi-btn-primary {
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 13px 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all .2s ease;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.01em;
  }
  .bhi-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(29,78,216,.35);
  }
  .bhi-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .bhi-btn-ghost {
    background: transparent;
    border: 1.5px solid rgba(148,163,184,.4);
    border-radius: 10px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .bhi-input {
    width: 100%;
    border: 1.5px solid rgba(148,163,184,.3);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color .15s;
  }
  .bhi-input:focus { border-color: #1d4ed8; }

  /* Dark mode overrides */
  .bhi-dark .bhi-input { background: rgba(255,255,255,.07); color: #f1f5f9; border-color: rgba(255,255,255,.15); }
  .bhi-dark .bhi-input::placeholder { color: rgba(255,255,255,.35); }
  .bhi-dark .bhi-btn-ghost { color: #e2e8f0; border-color: rgba(255,255,255,.2); }
  .bhi-dark .bhi-btn-ghost:hover { background: rgba(255,255,255,.08); }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
      {[0, 150, 300].map(d => (
        <span key={d} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "rgba(148,163,184,.6)",
          display: "inline-block",
          animation: `bhi-pulse 1.2s ease infinite`,
          animationDelay: `${d}ms`,
        }} />
      ))}
    </div>
  );
}

function CourseCard({ course, matchScore, reason, confidenceLevel, dark, rank }: {
  course: BHICourse;
  matchScore: number;
  reason: string;
  confidenceLevel: "Excellent" | "Strong" | "Good";
  dark: boolean;
  rank: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"learn" | "day">("learn");

  const catColors: Record<string, { bg: string; color: string }> = {
    healthcare:  { bg: "#dcfce7", color: "#15803d" },
    it:          { bg: "#dbeafe", color: "#1d4ed8" },
    business:    { bg: "#fef9c3", color: "#854d0e" },
    hospitality: { bg: "#fce7f3", color: "#9d174d" },
    technical:   { bg: "#ede9fe", color: "#7e22ce" },
  };
  const cat = catColors[course.category] ?? { bg: "#f1f5f9", color: "#64748b" };

  const cardBg = dark
    ? rank === 0 ? "rgba(29,78,216,.18)" : "rgba(255,255,255,.06)"
    : rank === 0 ? "#f0f7ff" : "#fff";
  const borderColor = rank === 0 ? "#1d4ed8" : dark ? "rgba(255,255,255,.1)" : "#e2e8f0";

  return (
    <div
      className="bhi-card-hover bhi-fade-up"
      style={{
        background: cardBg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 16,
        padding: "16px",
        position: "relative",
        animationDelay: `${rank * 0.1}s`,
        cursor: "pointer",
      }}
      onClick={() => setExpanded(e => !e)}
    >
      {rank === 0 && (
        <div style={{
          position: "absolute", top: -10, left: 14,
          background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
          color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "3px 12px", borderRadius: 20, letterSpacing: "0.05em",
        }}>
          ⭐ BEST MATCH
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#f1f5f9" : "#0f172a", marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>
            {course.title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            <span style={{ fontSize: 10, background: cat.bg, color: cat.color, padding: "3px 9px", borderRadius: 20, fontWeight: 600 }}>
              {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
            </span>
            <span style={{ fontSize: 10, background: dark ? "rgba(255,255,255,.1)" : "#f1f5f9", color: dark ? "#cbd5e1" : "#475569", padding: "3px 9px", borderRadius: 20, fontWeight: 500 }}>
              {course.duration}
            </span>
            <span style={{ fontSize: 10, color: getConfidenceColor(confidenceLevel), background: dark ? "rgba(255,255,255,.07)" : "#f8fafc", padding: "3px 9px", borderRadius: 20, fontWeight: 600, border: `1px solid ${getConfidenceColor(confidenceLevel)}30` }}>
              {confidenceLevel} fit
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: matchScore >= 90 ? "#16a34a" : matchScore >= 80 ? "#2563eb" : "#d97706", fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
            {matchScore}%
          </div>
          <div style={{ fontSize: 10, color: dark ? "#94a3b8" : "#64748b", marginTop: 2 }}>match</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { icon: "💰", label: "Salary", val: `${fmtSalary(course.salaryRange.min)}–${fmtSalary(course.salaryRange.max)}` },
          { icon: "📈", label: "Demand", val: course.jobDemand, color: getDemandColor(course.jobDemand) },
          { icon: "✅", label: "Placed", val: `${course.placementRate}%` },
        ].map(s => (
          <div key={s.label} style={{ background: dark ? "rgba(255,255,255,.05)" : "#f8fafc", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 14 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color ?? (dark ? "#f1f5f9" : "#0f172a"), fontFamily: "'Outfit', sans-serif" }}>{s.val}</div>
            <div style={{ fontSize: 10, color: dark ? "#94a3b8" : "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: dark ? "#cbd5e1" : "#475569", lineHeight: 1.6, marginBottom: 10 }}>{reason}</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
          <HiClock style={{ fontSize: 12 }} /> ~{course.weeklyHours} hrs/week
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#1d4ed8", fontSize: 11, fontWeight: 500 }}>
          {expanded ? "Less" : "See details"}
          {expanded ? <HiChevronUp style={{ fontSize: 14 }} /> : <HiChevronDown style={{ fontSize: 14 }} />}
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div style={{ marginTop: 14, borderTop: `1px solid ${dark ? "rgba(255,255,255,.1)" : "#e2e8f0"}`, paddingTop: 14 }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {(["learn", "day"] as const).map(t => (
              <button key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  background: tab === t ? "#1d4ed8" : dark ? "rgba(255,255,255,.1)" : "#f1f5f9",
                  color: tab === t ? "#fff" : dark ? "#cbd5e1" : "#64748b",
                  transition: "all .15s",
                }}>
                {t === "learn" ? "What you'll learn" : "Day in the life"}
              </button>
            ))}
          </div>

          {tab === "learn" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {course.whatYouLearn.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: dark ? "#cbd5e1" : "#475569" }}>
                  <HiCheck style={{ color: "#16a34a", marginTop: 2, flexShrink: 0, fontSize: 13 }} />
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: dark ? "#cbd5e1" : "#475569", lineHeight: 1.7, fontStyle: "italic" }}>
              "{course.dayInLife}"
            </p>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button className="bhi-btn-primary" style={{ flex: 1, padding: "10px", fontSize: 12 }}>
              Apply to This Program
            </button>
            <button className="bhi-btn-ghost" style={{ padding: "10px 14px", fontSize: 12, color: dark ? "#e2e8f0" : "#334155" }}>
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Entry Screen ─────────────────────────────────────────────────────────────

function EntryScreen({ dark, onStart }: { dark: boolean; onStart: () => void }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const tm = TESTIMONIALS[testimonialIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }} className="bhi-scroll">
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #7c3aed 100%)",
        padding: "40px 32px 36px",
        textAlign: "center",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 48, marginBottom: 12, display: "inline-block", animation: "bhi-float 3s ease infinite" }}>🎓</div>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>
          Find the Career Path<br />Built for You
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.8)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 24px" }}>
          Our AI advisor analyzes your background and matches you with the BHI program most likely to get you hired — fast.
        </p>
        <button className="bhi-btn-primary bhi-fade-up" onClick={onStart} style={{ margin: "0 auto", padding: "14px 32px", fontSize: 15, background: "#fff", color: "#1d4ed8" }}>
          <HiSparkles /> Start My Free Assessment
        </button>
        <div style={{ marginTop: 14, fontSize: 11, color: "rgba(255,255,255,.55)" }}>Takes 2 minutes · No signup required</div>
      </div>

      {/* Stats
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: dark ? "rgba(255,255,255,.08)" : "#e2e8f0", flexShrink: 0 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: dark ? "#1e293b" : "#fff", padding: "16px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#1d4ed8" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div> */}

      {/* Testimonial */}
      <div style={{ padding: "20px 24px", flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          What our graduates say
        </div>
        <div key={testimonialIdx} className="bhi-fade-in" style={{
          background: dark ? "rgba(255,255,255,.06)" : "#f8fafc",
          border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "#e2e8f0"}`,
          borderRadius: 14, padding: "16px",
        }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
            {[...Array(tm.rating)].map((_, i) => <HiStar key={i} style={{ color: "#f59e0b", fontSize: 14 }} />)}
          </div>
          <p style={{ fontSize: 13, color: dark ? "#e2e8f0" : "#334155", lineHeight: 1.6, fontStyle: "italic", marginBottom: 10 }}>
            "{tm.quote}"
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#94a3b8" : "#64748b" }}>{tm.name}</div>
            <div style={{ fontSize: 10, color: "#1d4ed8", fontWeight: 500 }}>via {tm.course}</div>
          </div>
        </div>
      </div>

      {/* Urgency */}
      <div style={{ margin: "0 24px 24px", background: "linear-gradient(135deg,#fef3c7,#fde68a)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>⏰</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>Next cohort starts soon</div>
          <div style={{ fontSize: 11, color: "#b45309" }}>Limited seats available — reserve yours today</div>
        </div>
      </div>
    </div>
  );
}

// ─── Conversational Intake (tap-first, zero typing required) ─────────────────

interface IntakeMsg {
  role: "user" | "assistant";
  content: string;
  options?: string[];      // quick-reply chips shown below assistant bubble
  chosen?: string;         // which chip the user tapped (locks that message)
}

// Fallback questions if API fails
const FALLBACK_FLOW: Array<{ message: string; options: string[] }> = [
  { message: "What's your current situation?", options: ["Working full-time", "Part-time / freelance", "Stay-at-home parent", "Recently unemployed", "Recent graduate"] },
  { message: "Which area interests you most?", options: ["Healthcare & medical", "IT & computers", "Business & admin", "Skilled trades", "Not sure yet"] },
  { message: "What's driving your decision?", options: ["Higher salary", "Job security", "Help people", "Work from home", "Career change"] },
  { message: "How much time can you commit?", options: ["Full-time (days)", "Evenings only", "Weekends", "Very flexible"] },
];

function IntakeChatScreen({ dark, onComplete }: { dark: boolean; onComplete: (profile: string) => void }) {
  const [msgs, setMsgs] = useState<IntakeMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [freeTextFor, setFreeTextFor] = useState<number | null>(null); // index of msg showing free input
  const [freeInput, setFreeInput] = useState("");
  const [fullHistory, setFullHistory] = useState<ChatMsg[]>([]);
  const [fallbackIdx, setFallbackIdx] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading, freeTextFor]);

  // Parse AI JSON response safely
  const parseAIResponse = (raw: string): { message: string; options: string[]; summary?: string } | null => {
    try {
      const clean = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(clean);
    } catch { return null; }
  };

  // Boot: get first question
  useEffect(() => {
    const boot = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemPrompt: buildIntakeSystemPrompt(),
            messages: [{ role: "user", content: "start" }],
          }),
        });
        const data = await res.json();
        const parsed = parseAIResponse(data.reply?.content ?? "");
        if (parsed && parsed.message !== "INTAKE_COMPLETE") {
          setMsgs([{ role: "assistant", content: parsed.message, options: parsed.options }]);
          setFullHistory([
            { role: "user", content: "start" },
            { role: "assistant", content: data.reply?.content ?? "" },
          ]);
        } else {
          throw new Error("bad parse");
        }
      } catch {
        // Use fallback flow
        setUseFallback(true);
        const first = FALLBACK_FLOW[0];
        setMsgs([{ role: "assistant", content: first.message, options: first.options }]);
        setFallbackIdx(1);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  const handleAnswer = async (msgIndex: number, answer: string) => {
    if (loading) return;
    // Lock the chosen option on that message
    setMsgs(prev => prev.map((m, i) => i === msgIndex ? { ...m, options: undefined, chosen: answer } : m));
    // Add user bubble
    const userBubble: IntakeMsg = { role: "user", content: answer };
    setMsgs(prev => [...prev, userBubble]);
    setFreeTextFor(null);
    setFreeInput("");

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Fallback mode: step through preset questions
    if (useFallback) {
      if (fallbackIdx < FALLBACK_FLOW.length) {
        setLoading(true);
        await new Promise(r => setTimeout(r, 700)); // simulate thinking
        const next = FALLBACK_FLOW[fallbackIdx];
        setMsgs(prev => [...prev, { role: "assistant", content: next.message, options: next.options }]);
        setFallbackIdx(i => i + 1);
        setLoading(false);
      } else {
        // Done — build profile from answers
        const [situation, interest, motivation, time] = newAnswers;
        const summary = `NAME: Unknown\nBACKGROUND: ${situation}\nINTERESTS: ${interest}\nGOALS: ${motivation}\nCONSTRAINTS: ${time}`;
        onComplete(`Student answered:\n1. ${situation}\n2. ${interest}\n3. ${motivation}\n4. ${time}\n\nSUMMARY:\n${summary}`);
      }
      return;
    }

    // AI mode
    setLoading(true);
    const newHistory: ChatMsg[] = [...fullHistory, { role: "user", content: answer }];
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt: buildIntakeSystemPrompt(), messages: newHistory }),
      });
      const data = await res.json();
      const parsed = parseAIResponse(data.reply?.content ?? "");

      if (!parsed) throw new Error("parse fail");

      if (parsed.message === "INTAKE_COMPLETE" && parsed.summary) {
        const transcript = newHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");
        onComplete(transcript + "\n\nSUMMARY:\n" + parsed.summary);
      } else {
        setMsgs(prev => [...prev, { role: "assistant", content: parsed.message, options: parsed.options }]);
        setFullHistory([...newHistory, { role: "assistant", content: data.reply?.content ?? "" }]);
      }
    } catch {
      // Fall through to next fallback question
      if (fallbackIdx < FALLBACK_FLOW.length) {
        const next = FALLBACK_FLOW[fallbackIdx];
        setMsgs(prev => [...prev, { role: "assistant", content: next.message, options: next.options }]);
        setFallbackIdx(i => i + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFreeText = (msgIndex: number) => {
    const ans = freeInput.trim();
    if (!ans) return;
    handleAnswer(msgIndex, ans);
  };

  const progressPct = Math.min(100, Math.round((answers.length / 4) * 100));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Progress header */}
      <div style={{ padding: "12px 20px 10px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#f1f5f9"}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Quick questions — just tap!
          </div>
          <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8", fontWeight: 600 }}>
            {answers.length}/4
          </div>
        </div>
        <div style={{ height: 4, background: dark ? "rgba(255,255,255,.1)" : "#f1f5f9", borderRadius: 4 }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg,#1d4ed8,#7c3aed)", borderRadius: 4, transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
        </div>
      </div>

      {/* Messages */}
      <div className="bhi-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {msgs.map((m, i) => (
          <div key={i} className="bhi-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
            {/* Bubble row */}
            <div style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: m.role === "assistant" && (m.options || freeTextFor === i) ? 10 : 0 }}>
              {m.role === "assistant" && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 2 }}>
                  <FaRobot style={{ color: "#fff", fontSize: 12 }} />
                </div>
              )}
              <div style={{
                maxWidth: "78%",
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                fontSize: 14,
                lineHeight: 1.55,
                fontWeight: m.role === "assistant" ? 500 : 400,
                background: m.role === "user"
                  ? "linear-gradient(135deg,#1d4ed8,#7c3aed)"
                  : dark ? "rgba(255,255,255,.09)" : "#f1f5f9",
                color: m.role === "user" ? "#fff" : dark ? "#e2e8f0" : "#1e293b",
              }}>
                {m.content}
              </div>
            </div>

            {/* Quick-reply chips — only on latest unanswered assistant msg */}
            {m.role === "assistant" && m.options && !m.chosen && (
              <div style={{ paddingLeft: 36, display: "flex", flexDirection: "column", gap: 7 }}>
                {m.options.map((opt, oi) => {
                  const isSomethingElse = opt.toLowerCase().includes("something else") || opt.toLowerCase().includes("other");
                  return (
                    <button
                      key={oi}
                      onClick={() => isSomethingElse ? setFreeTextFor(freeTextFor === i ? null : i) : handleAnswer(i, opt)}
                      disabled={loading}
                      style={{
                        textAlign: "left",
                        background: freeTextFor === i && isSomethingElse
                          ? (dark ? "rgba(29,78,216,.3)" : "#dbeafe")
                          : (dark ? "rgba(255,255,255,.07)" : "#fff"),
                        border: `1.5px solid ${freeTextFor === i && isSomethingElse ? "#1d4ed8" : dark ? "rgba(255,255,255,.15)" : "#e2e8f0"}`,
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: dark ? "#e2e8f0" : "#1e293b",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all .15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        opacity: loading ? 0.5 : 1,
                      }}
                      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.borderColor = "#1d4ed8"; }}
                      onMouseLeave={e => { if (!loading && !(freeTextFor === i && isSomethingElse)) (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "rgba(255,255,255,.15)" : "#e2e8f0"; }}
                    >
                      <span>{opt}</span>
                      <HiChevronRight style={{ fontSize: 14, color: dark ? "#64748b" : "#94a3b8", flexShrink: 0 }} />
                    </button>
                  );
                })}

                {/* Free text row (shown when "Something else" tapped) */}
                {freeTextFor === i && (
                  <div className="bhi-fade-in" style={{ display: "flex", gap: 8, marginTop: 2 }}>
                    <input
                      className="bhi-input"
                      autoFocus
                      value={freeInput}
                      onChange={e => setFreeInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleFreeText(i)}
                      placeholder="Type your answer..."
                      style={{ fontSize: 13, padding: "10px 14px" }}
                    />
                    <button
                      className="bhi-btn-primary"
                      onClick={() => handleFreeText(i)}
                      disabled={!freeInput.trim()}
                      style={{ padding: "10px 14px", borderRadius: 12, flexShrink: 0 }}
                    >
                      <HiChevronRight />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chosen answer badge (after selection, chips replaced by this) */}
            {m.role === "assistant" && m.chosen && (
              <div style={{ paddingLeft: 36 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: dark ? "rgba(29,78,216,.2)" : "#eff6ff", border: `1px solid ${dark ? "rgba(29,78,216,.4)" : "#bfdbfe"}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, color: dark ? "#93c5fd" : "#1d4ed8", fontWeight: 500 }}>
                  <HiCheck style={{ fontSize: 13 }} />
                  {m.chosen}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaRobot style={{ color: "#fff", fontSize: 12 }} />
            </div>
            <div style={{ background: dark ? "rgba(255,255,255,.08)" : "#f1f5f9", borderRadius: "4px 18px 18px 18px" }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Subtle footer hint */}
      <div style={{ padding: "10px 20px", borderTop: `1px solid ${dark ? "rgba(255,255,255,.06)" : "#f8fafc"}`, textAlign: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: dark ? "#334155" : "#94a3b8" }}>
          Tap an option — or choose "Something else" to type
        </span>
      </div>
    </div>
  );
}

// ─── Analyzing Screen ─────────────────────────────────────────────────────────

function AnalyzingScreen({ dark }: { dark: boolean }) {
  const steps = [
    "Reading your conversation...",
    "Matching to BHI programs...",
    "Analyzing career paths & salary data...",
    "Building your personalized plan...",
  ];
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(p => Math.min(p + 1, steps.length - 1)), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px 32px", textAlign: "center" }}>
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 28 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HiSparkles style={{ color: "#fff", fontSize: 32 }} />
        </div>
        <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#1d4ed8", animation: "bhi-spin 1.2s linear infinite" }} />
      </div>

      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: dark ? "#f1f5f9" : "#0f172a", marginBottom: 8 }}>
        Analyzing your profile
      </h2>
      <p style={{ fontSize: 13, color: dark ? "#94a3b8" : "#64748b", marginBottom: 28 }}>
        Our AI is cross-referencing 12+ programs with your unique background
      </p>

      <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: i > cur ? 0.25 : 1, transition: "opacity .4s", textAlign: "left" }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
              background: i < cur ? "#16a34a" : i === cur ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : dark ? "rgba(255,255,255,.1)" : "#e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .4s",
            }}>
              {i < cur
                ? <HiCheck style={{ color: "#fff", fontSize: 13 }} />
                : i === cur
                  ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", animation: "bhi-pulse 1s infinite" }} />
                  : null}
            </div>
            <span style={{ fontSize: 13, color: dark ? "#e2e8f0" : "#334155", fontWeight: i === cur ? 500 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Results Dashboard ────────────────────────────────────────────────────────

function ResultsDashboard({ result, dark, onChat }: { result: AnalysisResult; dark: boolean; onChat: () => void }) {
  return (
    <div className="bhi-scroll" style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Profile hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #7c3aed 100%)",
        padding: "24px 24px 20px",
        flexShrink: 0,
      }}>
        <div className="bhi-fade-up" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
            Career Dashboard for
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            {result.userName ? `${result.userName}'s Path` : "Your Personalized Path"}
          </h2>
          {result.userGoal && (
            <div style={{ marginTop: 8, background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "rgba(255,255,255,.9)" }}>
              🎯 Goal: {result.userGoal}
            </div>
          )}
        </div>

        <div className="bhi-fade-up" style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "rgba(255,255,255,.9)", lineHeight: 1.6, animationDelay: ".1s" }}>
          {result.summary}
        </div>
      </div>

      <div style={{ padding: "20px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Recommended courses */}
        <div className="bhi-fade-up" style={{ animationDelay: ".15s" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Recommended Programs · Tap to expand
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {result.topCourses.map((item, i) => (
              <CourseCard key={item.course.id} {...item} dark={dark} rank={i} />
            ))}
          </div>
        </div>

        {/* Career paths */}
        <div className="bhi-fade-up" style={{ animationDelay: ".25s" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Career Paths You Can Unlock
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {result.careerPaths.map((cp, i) => (
              <div key={cp.title} className="bhi-card-hover" style={{
                background: dark ? "rgba(255,255,255,.06)" : "#fff",
                border: `1.5px solid ${dark ? "rgba(255,255,255,.1)" : "#e2e8f0"}`,
                borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: ["#dbeafe","#dcfce7","#ede9fe"][i], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HiBriefcase style={{ fontSize: 16, color: ["#1d4ed8","#16a34a","#7c3aed"][i] }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "#f1f5f9" : "#0f172a" }}>{cp.title}</div>
                  <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b", marginTop: 2 }}>{cp.outlook}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", fontFamily: "'Outfit', sans-serif" }}>{cp.avgSalary}</div>
                  <div style={{ fontSize: 10, color: dark ? "#64748b" : "#94a3b8" }}>avg salary</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="bhi-fade-up" style={{ animationDelay: ".35s", display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="bhi-btn-primary" onClick={onChat} style={{ width: "100%", padding: "14px", fontSize: 14 }}>
            <HiSparkles /> Chat with Your AI Advisor
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button className="bhi-btn-ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: dark ? "#e2e8f0" : "#334155", padding: "10px 0" }}>
              <HiPhone style={{ fontSize: 14 }} /> Talk to Advisor
            </button>
            <button className="bhi-btn-ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: dark ? "#e2e8f0" : "#334155", padding: "10px 0" }}>
              <HiDownload style={{ fontSize: 14 }} /> Career Plan PDF
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", padding: "8px 0" }}>
            <span style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8" }}>⏰ Next cohort starts soon · </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#d97706" }}>Limited seats available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Advisor Chat ─────────────────────────────────────────────────────────────

const INITIAL_SUGGESTIONS = [
  "How do I enroll?",
  "What's the fastest program?",
  "Compare top 2 courses",
  "Is financial aid available?",
];

function AdvisorChat({ systemPrompt, dark, result }: { systemPrompt: string; dark: boolean; result: AnalysisResult | null }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content: `Great news${result?.userName ? `, ${result.userName}` : ""}! I've matched you with the best BHI programs for your goals. 🎉 I'm Alex, your personal advisor — ask me anything about the courses, enrollment, financial aid, or career outcomes. What's on your mind?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState("");
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading, streamingMsg]);

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setSuggestions([]);

    const next: ChatMsg[] = [...msgs, { role: "user", content: msg }];
    setMsgs(next);
    setLoading(true);
    setStreamingMsg("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, systemPrompt }),
      });
      const data = await res.json();
      const reply: string = data.reply?.content ?? "";

      // Simulate streaming
      let i = 0;
      const chunk = Math.max(1, Math.floor(reply.length / 40));
      const interval = setInterval(() => {
        i += chunk;
        setStreamingMsg(reply.slice(0, i));
        if (i >= reply.length) {
          clearInterval(interval);
          setStreamingMsg("");
          setMsgs(p => [...p, { role: "assistant", content: reply }]);
          setLoading(false);

          // Generate dynamic suggestions based on context
          const topicSugs: Record<string, string[]> = {
            enroll:    ["When does the next cohort start?", "What documents do I need?", "Can I enroll part-time?"],
            salary:    ["What's the job demand like?", "How long until I'm job-ready?", "Which course pays most?"],
            compare:   ["Which is faster?", "Which has better job placement?", "Which fits my schedule?"],
            financial: ["Do you offer payment plans?", "Are there scholarships?", "Can I use financial aid?"],
          };
          const keyword = ["enroll","salary","compare","financial"].find(k => reply.toLowerCase().includes(k)) ?? "";
          setSuggestions(topicSugs[keyword] ?? ["Tell me more", "What's next?", "Can I apply now?", "Talk to a human advisor"]);
        }
      }, 30);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Sorry, I had a connection issue. Please try again." }]);
      setLoading(false);
    }
  }, [input, msgs, loading, systemPrompt]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages */}
      <div className="bhi-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} className="bhi-fade-up" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animationDelay: `${i * 0.02}s` }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 4 }}>
                <FaRobot style={{ color: "#fff", fontSize: 12 }} />
              </div>
            )}
            <div style={{
              maxWidth: "80%", padding: "11px 15px",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
              fontSize: 14, lineHeight: 1.6,
              background: m.role === "user"
                ? "linear-gradient(135deg,#1d4ed8,#7c3aed)"
                : dark ? "rgba(255,255,255,.08)" : "#f1f5f9",
              color: m.role === "user" ? "#fff" : dark ? "#e2e8f0" : "#1e293b",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Streaming */}
        {loading && streamingMsg && (
          <div style={{ display: "flex" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 4 }}>
              <FaRobot style={{ color: "#fff", fontSize: 12 }} />
            </div>
            <div style={{ maxWidth: "80%", padding: "11px 15px", borderRadius: "4px 18px 18px 18px", fontSize: 14, lineHeight: 1.6, background: dark ? "rgba(255,255,255,.08)" : "#f1f5f9", color: dark ? "#e2e8f0" : "#1e293b" }}>
              {streamingMsg}<span style={{ display: "inline-block", width: 2, height: 14, background: "#1d4ed8", marginLeft: 2, animation: "bhi-pulse .7s infinite", verticalAlign: "middle" }} />
            </div>
          </div>
        )}

        {loading && !streamingMsg && (
          <div style={{ display: "flex" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 4 }}>
              <FaRobot style={{ color: "#fff", fontSize: 12 }} />
            </div>
            <div style={{ background: dark ? "rgba(255,255,255,.08)" : "#f1f5f9", borderRadius: "4px 18px 18px 18px" }}>
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !loading && (
        <div style={{ padding: "0 16px 10px", display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{
              fontSize: 11, padding: "6px 12px", borderRadius: 20, cursor: "pointer",
              border: `1.5px solid ${dark ? "rgba(255,255,255,.2)" : "#dbeafe"}`,
              background: dark ? "rgba(29,78,216,.2)" : "#eff6ff",
              color: dark ? "#93c5fd" : "#1d4ed8",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all .15s",
            }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "10px 16px 14px", borderTop: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#f1f5f9"}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="bhi-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask Alex anything about BHI..."
            disabled={loading}
          />
          <button
            className="bhi-btn-primary"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ padding: "12px 18px", flexShrink: 0, borderRadius: 12 }}
          >
            <HiChevronRight />
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: dark ? "#475569" : "#94a3b8" }}>
          Alex · BHI AI Advisor · Usually responds instantly
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AiChatPremium() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("entry");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [chatPrompt, setChatPrompt] = useState("");
  const [dark, setDark] = useState(false);

  const handleIntakeComplete = useCallback(async (transcript: string) => {
    setStep("analyzing");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a JSON-only API. Respond only with valid JSON. No markdown, no backticks.",
          messages: [{ role: "user", content: buildAnalysisPrompt(transcript) }],
        }),
      });
      const data = await res.json();
      const raw = (data.reply?.content ?? "").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);

      const topCourses = (parsed.topCourses ?? []).map((item: { courseId: string; matchScore: number; reason: string; confidenceLevel: "Excellent" | "Strong" | "Good" }) => ({
        course: BHI_COURSES.find(c => c.id === item.courseId) ?? BHI_COURSES[0],
        matchScore: item.matchScore,
        reason: item.reason,
        confidenceLevel: item.confidenceLevel ?? "Strong",
      }));

      const analysisResult: AnalysisResult = {
        summary: parsed.summary,
        topCourses,
        careerPaths: parsed.careerPaths ?? [],
        userProfile: parsed.userProfile,
        userName: parsed.userName,
        userGoal: parsed.userGoal,
      };

      setResult(analysisResult);
      setChatPrompt(buildAdvisorSystemPrompt(parsed.userProfile));
      setStep("results");
    } catch {
      // Graceful fallback
      const fallback: AnalysisResult = {
        summary: "Based on our conversation, we've identified some excellent BHI programs that align well with your background and career goals.",
        topCourses: BHI_COURSES.slice(0, 3).map((course, i) => ({
          course,
          matchScore: 90 - i * 5,
          reason: "This program aligns with your stated interests and offers strong local job placement rates.",
          confidenceLevel: (["Excellent", "Strong", "Good"] as const)[i],
        })),
        careerPaths: [
          { title: "Healthcare Professional", outlook: "High demand, growing field nationwide", matchedCourse: "Medical Assistant", avgSalary: "$36K–$52K" },
          { title: "IT Support Specialist", outlook: "Strong entry-level market, remote options", matchedCourse: "CompTIA A+", avgSalary: "$40K–$62K" },
          { title: "Office Administrator", outlook: "Stable roles across all industries", matchedCourse: "Business Administration", avgSalary: "$38K–$60K" },
        ],
        userProfile: "Prospective BHI student interested in vocational training.",
      };
      setResult(fallback);
      setChatPrompt(buildAdvisorSystemPrompt(fallback.userProfile));
      setStep("results");
    }
  }, []);

  const reset = () => { setStep("entry"); setResult(null); setChatPrompt(""); };

  const STEP_LABELS: Record<Step, string> = {
    entry: "BHI Advisor",
    "chat-intake": "Getting to know you",
    analyzing: "Analyzing...",
    results: "Your Career Dashboard",
    "advisor-chat": "AI Advisor · Alex",
  };

  const PROGRESS: Record<Step, string> = {
    entry: "0%",
    "chat-intake": "35%",
    analyzing: "65%",
    results: "85%",
    "advisor-chat": "100%",
  };

  return (
    <div className="bhi-root">
      <style>{GLOBAL_STYLES}</style>

      {/* Floating button */}
      {!open && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open BHI Course Advisor"
            style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
              color: "#fff", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, boxShadow: "0 8px 32px rgba(29,78,216,.4)",
              animation: "bhi-bounce 3s ease infinite",
              transition: "transform .2s ease",
            }}
          >
            <FaRobot />
          </button>
          <div style={{
            position: "absolute", bottom: "calc(100% + 10px)", right: 0,
            background: "#1e293b", color: "#fff", fontSize: 12,
            padding: "6px 12px", borderRadius: 10, whiteSpace: "nowrap",
            fontWeight: 500, pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          }}>
            Find your BHI program ✨
          </div>
        </div>
      )}

      {/* Full panel */}
      {open && (
        <div className={dark ? "bhi-dark" : ""} style={{
          position: "fixed",
          bottom: 24, right: 24,
          width: 420,
          height: 680,
          background: dark ? "#0f172a" : "#fff",
          borderRadius: 24,
          boxShadow: "0 24px 80px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.06)",
          border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)"}`,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "bhi-fadeUp .25s ease",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#f1f5f9"}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexShrink: 0,
            background: dark ? "rgba(255,255,255,.03)" : "#fafafa",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaRobot style={{ color: "#fff", fontSize: 15 }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: dark ? "#f1f5f9" : "#0f172a", fontFamily: "'Outfit', sans-serif" }}>
                  {STEP_LABELS[step]}
                </div>
                <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8", marginTop: 1, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Bright Horizon Institute
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={() => setDark(d => !d)}
                style={{ background: dark ? "rgba(255,255,255,.1)" : "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: dark ? "#e2e8f0" : "#64748b", display: "flex" }}>
                {dark ? <HiSun style={{ fontSize: 15 }} /> : <HiMoon style={{ fontSize: 15 }} />}
              </button>
              {step !== "entry" && (
                <button onClick={reset}
                  style={{ background: dark ? "rgba(255,255,255,.1)" : "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: dark ? "#e2e8f0" : "#64748b", display: "flex" }}>
                  <HiRefresh style={{ fontSize: 15 }} />
                </button>
              )}
              <button onClick={() => setOpen(false)}
                style={{ background: dark ? "rgba(255,255,255,.1)" : "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: dark ? "#e2e8f0" : "#64748b", display: "flex" }}>
                <HiX style={{ fontSize: 15 }} />
              </button>
            </div>
          </div>

          {/* Progress */}
          <div style={{ height: 2, background: dark ? "rgba(255,255,255,.06)" : "#f1f5f9", flexShrink: 0 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#1d4ed8,#7c3aed)", width: PROGRESS[step], transition: "width .6s cubic-bezier(.4,0,.2,1)" }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {step === "entry"         && <EntryScreen dark={dark} onStart={() => setStep("chat-intake")} />}
            {step === "chat-intake"   && <IntakeChatScreen dark={dark} onComplete={handleIntakeComplete} />}
            {step === "analyzing"     && <AnalyzingScreen dark={dark} />}
            {step === "results"       && result && <ResultsDashboard result={result} dark={dark} onChat={() => setStep("advisor-chat")} />}
            {step === "advisor-chat"  && <AdvisorChat systemPrompt={chatPrompt} dark={dark} result={result} />}
          </div>

          {/* Footer */}
          <div style={{ padding: "8px 16px", borderTop: `1px solid ${dark ? "rgba(255,255,255,.06)" : "#f8fafc"}`, textAlign: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: dark ? "#334155" : "#94a3b8" }}>
              Bright Horizon Institute · 12+ Accredited Programs · {new Date().getFullYear()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/*
═══════════════════════════════════════════════════════════════
API ROUTE: /api/chat/route.ts
═══════════════════════════════════════════════════════════════
Unchanged from v1. Ensure it accepts { messages, systemPrompt }
and returns { reply: { content: string } }.

Example with OpenAI:
───────────────────
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json();
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
  });
  const reply = completion.choices[0].message;
  return Response.json({ reply });
}

Example with Anthropic:
───────────────────────
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json();
  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });
  const reply = { role: "assistant", content: msg.content[0].type === "text" ? msg.content[0].text : "" };
  return Response.json({ reply });
}
═══════════════════════════════════════════════════════════════
*/
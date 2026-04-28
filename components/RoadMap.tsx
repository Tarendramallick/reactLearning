"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─── step data ─────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    lines: ["JavaScript", "Fundamentals"],
    circleFill: "#78350f99",
    circleStroke: "rgba(217,119,6,0.55)",
    // rendered as a pure SVG group – no foreignObject
    renderIcon: (cx: number, cy: number) => (
      <g>
        <rect x={cx - 18} y={cy - 18} width="36" height="36" rx="8" fill="#fbbf24" />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fill="#000"
          fontSize="13"
          fontWeight="800"
          fontFamily="monospace"
        >
          JS
        </text>
      </g>
    ),
  },
  {
    num: "02",
    lines: ["React", "Fundamentals"],
    circleFill: "#0d1b3e",
    circleStroke: "rgba(6,182,212,0.55)",
    renderIcon: (cx: number, cy: number) => (
      <g>
        <ellipse cx={cx} cy={cy} rx="18" ry="7" stroke="#22d3ee" strokeWidth="1.8" fill="none" />
        <ellipse cx={cx} cy={cy} rx="18" ry="7" stroke="#22d3ee" strokeWidth="1.8" fill="none" transform={`rotate(60 ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx="18" ry="7" stroke="#22d3ee" strokeWidth="1.8" fill="none" transform={`rotate(120 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r="3.5" fill="#22d3ee" />
      </g>
    ),
  },
  {
    num: "03",
    lines: ["Components", "& Props"],
    circleFill: "#1a0d3e",
    circleStroke: "rgba(139,92,246,0.55)",
    renderIcon: (cx: number, cy: number) => (
      <g stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={`M${cx + 14} ${cy - 5} L${cx} ${cy - 12} L${cx - 14} ${cy - 5} L${cx - 14} ${cy + 7} L${cx} ${cy + 14} L${cx + 14} ${cy + 7}Z`} />
        <line x1={cx - 14} y1={cy - 5} x2={cx + 14} y2={cy - 5} />
        <line x1={cx} y1={cy + 14} x2={cx} y2={cy + 2} />
      </g>
    ),
  },
  {
    num: "04",
    lines: ["State &", "Events"],
    circleFill: "#2d0d1e",
    circleStroke: "rgba(244,114,182,0.55)",
    renderIcon: (cx: number, cy: number) => (
      <g stroke="#f472b6" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <circle cx={cx} cy={cy} r="13" />
        <circle cx={cx} cy={cy} r="5" />
        <line x1={cx} y1={cy - 13} x2={cx} y2={cy - 8} />
        <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 13} />
        <line x1={cx - 13} y1={cy} x2={cx - 8} y2={cy} />
        <line x1={cx + 8} y1={cy} x2={cx + 13} y2={cy} />
      </g>
    ),
  },
  {
    num: "05+",
    lines: ["Advanced", "Topics"],
    circleFill: "#0d2d1e",
    circleStroke: "rgba(52,211,153,0.55)",
    renderIcon: (cx: number, cy: number) => (
      <g stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={`M${cx - 10} ${cy + 8} c-4 3-5 10-5 10 s7-1 10-5 c2-2 2-5 0-7 a4 4 0 0 0-5 2z`} />
        <path d={`M${cx} ${cy + 2} l-5-5 a18 18 0 0 1 3-6 A14 14 0 0 1 ${cx + 10} ${cy - 10} c0 4-1 9-8 14a18 18 0 0 1-5 3z`} />
      </g>
    ),
  },
];

/* ─── layout constants ───────────────────────────────────── */
// SVG viewBox: 0 0 520 180
// 5 circle centres — alternating high/low like screenshot
// LOW = y:110 (steps 0,2,4), HIGH = y:50 (steps 1,3)
const VB_W = 520;
const VB_H = 180;
const CX = [52, 182, 312 - 26, 312 + 26 + 78, 468]; // approx even spacing
const REAL_CX = [52, 177, 302, 392, 468];
// re-space evenly
const EVEN_CX = [52, 177, 302, 390, 468];
const CY_LOW = 110;
const CY_HIGH = 50;
const CY = [CY_LOW, CY_HIGH, CY_LOW, CY_HIGH, CY_LOW];
const R = 34; // circle radius

function buildPath() {
  let d = `M ${EVEN_CX[0]} ${CY[0]}`;
  for (let i = 0; i < 4; i++) {
    const x1 = EVEN_CX[i], y1 = CY[i];
    const x2 = EVEN_CX[i + 1], y2 = CY[i + 1];
    const mx = (x1 + x2) / 2;
    d += ` C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  return d;
}

export default function RoadmapCTA() {
  const wavyPath = buildPath();
  const router = useRouter();
  return (
    <section className="w-full bg-[#050816] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* ══ ROADMAP CARD ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col lg:flex-row items-center gap-8 bg-[#0b1120] border border-white/10 rounded-2xl px-10 pt-10 pb-6 overflow-hidden"
        >
          {/* glow blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />

          {/* LEFT TEXT */}
          <div className="lg:w-[210px] flex-shrink-0 z-10">
            <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-3">
              Learning Path
            </p>
            <h2 className="text-[22px] font-extrabold leading-tight mb-4">
              Your Complete<br />React Roadmap
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              From JavaScript fundamentals to advanced state management,
              we've got you covered at every step.
            </p>
            <button onClick={() => router.push("/roadmap")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition text-sm font-semibold">
              Explore Roadmap <ArrowRight size={14} />
            </button>
          </div>

          {/* SVG ROADMAP */}
          <div className="flex-1 z-10 w-full min-w-0">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              width="100%"
              style={{ overflow: "visible", display: "block" }}
              fill="none"
            >
              {/* dashed wavy connector */}
              <path
                d={wavyPath}
                stroke="rgba(139,92,246,0.5)"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
                fill="none"
              />

              {steps.map((s, i) => {
                const cx = EVEN_CX[i];
                const cy = CY[i];
                const labelY = cy + R + 16;

                return (
                  <g key={i}>
                    {/* circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={R}
                      fill={s.circleFill}
                      stroke={s.circleStroke}
                      strokeWidth="1.5"
                    />

                    {/* icon — pure SVG, no foreignObject */}
                    {s.renderIcon(cx, cy)}

                    {/* step number */}
                    <text
                      x={cx}
                      y={labelY}
                      textAnchor="middle"
                      fill="rgba(156,163,175,1)"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="ui-sans-serif,system-ui,sans-serif"
                    >
                      {s.num}
                    </text>

                    {/* label lines */}
                    {s.lines.map((line, li) => (
                      <text
                        key={li}
                        x={cx}
                        y={labelY + 14 + li * 14}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="ui-sans-serif,system-ui,sans-serif"
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* ══ CTA BANNER ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden py-14 px-6"
          style={{
            background:
              "linear-gradient(135deg,#2d1fa3 0%,#3b30c4 30%,#4f46e5 60%,#1d4ed8 100%)",
          }}
        >
          {/* star dots */}
          {[
            { top: "12%", left: "4%" },
            { top: "35%", left: "9%" },
            { top: "62%", left: "5%" },
            { top: "78%", left: "17%" },
            { top: "18%", right: "5%" },
            { top: "42%", right: "8%" },
            { top: "68%", right: "4%" },
            { top: "82%", right: "19%" },
          ].map((pos, idx) => (
            <div
              key={idx}
              className="absolute w-1 h-1 rounded-full bg-white/50"
              style={{ ...pos }}
            />
          ))}

          {/* ROCKET – left */}
          <div className="absolute left-0 bottom-0 w-52 h-52 pointer-events-none select-none">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <ellipse cx="85" cy="178" rx="26" ry="15" fill="rgba(180,160,255,0.35)" />
              <ellipse cx="74" cy="191" rx="20" ry="11" fill="rgba(180,160,255,0.25)" />
              <ellipse cx="98" cy="193" rx="15" ry="9" fill="rgba(180,160,255,0.18)" />
              <rect x="72" y="82" width="30" height="68" rx="15" fill="#a5b4fc" />
              <path d="M72 97 Q87 52 102 97Z" fill="#818cf8" />
              <circle cx="87" cy="107" r="9" fill="#1e1b4b" />
              <circle cx="87" cy="107" r="6" fill="#312e81" />
              <circle cx="84" cy="104" r="2" fill="white" opacity="0.6" />
              <path d="M72 140 L54 167 L72 157Z" fill="#6366f1" />
              <path d="M102 140 L120 167 L102 157Z" fill="#6366f1" />
              <ellipse cx="87" cy="157" rx="9" ry="13" fill="#fbbf24" opacity="0.9" />
              <ellipse cx="87" cy="162" rx="6" ry="9" fill="#f97316" opacity="0.85" />
            </svg>
          </div>

          {/* REACT ATOM – right */}
          <div className="absolute right-6 bottom-4 w-44 h-44 opacity-25 pointer-events-none select-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#93c5fd" strokeWidth="2.5" fill="none" />
              <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#93c5fd" strokeWidth="2.5" fill="none" transform="rotate(60 50 50)" />
              <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#93c5fd" strokeWidth="2.5" fill="none" transform="rotate(120 50 50)" />
              <circle cx="50" cy="50" r="6" fill="#93c5fd" />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3 relative z-10">
            Ready to start your React journey?
          </h2>
          <p className="text-blue-200 text-base mb-8 relative z-10">
            Join thousands of developers and build the future with React.
          </p>
          <button 
          onClick={() => router.push("login")}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-base hover:bg-blue-50 transition relative z-10 shadow-lg">
            Start Learning Now 🚀
          </button>
        </motion.div>

      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050816] text-white overflow-hidden flex items-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_80%_65%,rgba(139,92,246,0.22),transparent_45%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

        {/* ── LEFT SIDE ── */}
        <div className="max-w-[480px]">

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[54px] font-extrabold leading-[1.1] tracking-tight"
          >
            Master React. <br />
            Build{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Anything.
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-gray-400 text-[15px] leading-relaxed"
          >
            Learn React from zero to advanced with hands-on projects, real-world
            examples, and a structured roadmap designed for success.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex gap-4 mt-8 flex-wrap"
          >
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-85 transition font-bold text-[15px]">
              Start Learning <Rocket size={17} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-600 hover:bg-gray-800 transition font-bold text-[15px]">
              View Roadmap <BookOpen size={17} />
            </button>
          </motion.div>

          {/* REVIEWS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-4 mt-10"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt={`user-${i}`}
                  width={38}
                  height={38}
                  className="rounded-full border-2 border-[#050816] -ml-2.5 first:ml-0"
                />
              ))}
            </div>
            <div>
              <p className="text-yellow-400 text-base font-bold">
                ★★★★★ <span className="text-white ml-1.5">4.9/5</span>
              </p>
              <p className="text-gray-400 text-sm mt-0.5">
                Loved by 10,000+ learners
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT SIDE — ORBIT ── */}
        <div className="relative w-[440px] h-[440px] flex items-center justify-center flex-shrink-0">

          {/* AMBIENT GLOW */}
          <div className="absolute w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,rgba(139,92,246,0.18)_50%,transparent_70%)] blur-[18px]" />

          {/* OUTER ORBIT RING */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-white/10" />

          {/* INNER RING */}
          <div className="absolute w-[290px] h-[290px] rounded-full border border-white/[0.05]" />

          {/* ROTATING ORBIT — only dots, no cards */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute w-[380px] h-[380px]"
          >
            {/* TOP DOT */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            </div>

            {/* BOTTOM DOT */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
            </div>

            {/* LEFT DOT */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
            </div>

            {/* RIGHT DOT */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
            </div>
          </motion.div>

          {/* FLOATING ICON BADGES — static, not rotating */}
          {/* {} badge — left */}
          <div
            className="absolute left-1 top-[48%] w-[54px] h-[54px] rounded-[14px] flex items-center justify-center border border-white/15"
            style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)", animation: "float 4s ease-in-out infinite" }}
          >
            <span style={{ fontFamily: "monospace", fontSize: 18, color: "#a78bfa", fontWeight: 700 }}>{"{}"}</span>
          </div>

          {/* </> badge — bottom right */}
          <div
            className="absolute bottom-[10%] right-[6%] w-[54px] h-[54px] rounded-[14px] flex items-center justify-center border border-white/15"
            style={{ background: "linear-gradient(135deg,#0f2d40,#0c4a6e)", animation: "float 4s ease-in-out infinite 1s" }}
          >
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#38bdf8", fontWeight: 700 }}>{"</>"}</span>
          </div>

          {/* TOP-RIGHT code panel */}
          <div className="absolute top-[4%] right-[-2%] w-[130px] bg-[#0d1b2e] border border-white/10 rounded-xl p-3">
            <div className="flex gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="h-[5px] rounded-full bg-gradient-to-r from-pink-400 to-pink-600 opacity-80 mb-1.5 w-[80%]" />
            <div className="h-[5px] rounded-full bg-gradient-to-r from-violet-400 to-purple-600 opacity-80 mb-1.5 w-[60%]" />
            <div className="h-[5px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80 mb-1.5 w-[90%]" />
            <div className="h-[5px] rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-70 mb-1.5 w-[50%]" />
            <div className="h-[5px] rounded-full bg-gradient-to-r from-violet-400 to-purple-600 opacity-80 w-[70%]" />
          </div>

          {/* BOTTOM-RIGHT table card */}
          <div className="absolute bottom-[5%] right-0 w-[130px] bg-[#0d1b2e] border border-white/10 rounded-xl p-3">
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="h-[5px] rounded-full bg-[#1e3a5f]" />
              <div className="h-[5px] rounded-full bg-[#1e3a5f]" />
            </div>
            {[
              ["bg-cyan-700", "bg-[#1e3a5f]"],
              ["bg-[#0e2b42]", "bg-[#0e2b42]"],
              ["bg-[#0c3547]", "bg-[#0c3547]"],
            ].map(([a, b], idx) => (
              <div key={idx} className="grid grid-cols-2 gap-1.5 mt-1.5">
                <div className={`h-[18px] rounded ${a} opacity-70`} />
                <div className={`h-[18px] rounded ${b} opacity-70`} />
              </div>
            ))}
          </div>

          {/* CENTER — REVOLVING REACT LOGO */}
          <div className="absolute flex items-center justify-center">
            {/* soft bg glow */}
            <div className="absolute w-[200px] h-[200px] rounded-[20px] bg-cyan-500/[0.07] blur-[20px]" />

            {/* React logo revolves on its own axis */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="relative z-10"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                width={160}
                height={160}
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* KEYFRAME for floating badges — injected as global style */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
      `}</style>
    </section>
  );
}
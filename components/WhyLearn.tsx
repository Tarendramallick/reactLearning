"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Box, Users, Zap, Monitor, Star } from "lucide-react";

const stats = [
  {
    icon: <BookOpen size={28} className="text-violet-400" />,
    iconBg: "bg-violet-900/60",
    value: "18+",
    label: "Modules",
    border: "border-r border-white/10",
  },
  {
    icon: <Code2 size={28} className="text-emerald-400" />,
    iconBg: "bg-emerald-900/60",
    value: "100+",
    label: "Lessons",
    border: "border-r border-white/10",
  },
  {
    icon: <Box size={28} className="text-amber-400" />,
    iconBg: "bg-amber-900/60",
    value: "20+",
    label: "Projects",
    border: "border-r border-white/10",
  },
  {
    icon: <Users size={28} className="text-pink-400" />,
    iconBg: "bg-pink-900/60",
    value: "10K+",
    label: "Happy Learners",
    border: "",
  },
];

const features = [
  {
    icon: <BookOpen size={30} className="text-violet-400" />,
    iconBg: "bg-violet-700/30",
    iconRing: "bg-violet-600/20",
    title: "Structured Roadmap",
    desc: "Step-by-step path from basics to advanced concepts.",
  },
  {
    icon: <Zap size={30} className="text-emerald-400" />,
    iconBg: "bg-emerald-700/30",
    iconRing: "bg-emerald-600/20",
    title: "Hands-on Projects",
    desc: "Build real-world projects and strengthen your portfolio.",
  },
  {
    icon: <Monitor size={30} className="text-pink-400" />,
    iconBg: "bg-pink-700/30",
    iconRing: "bg-pink-600/20",
    title: "Practical Learning",
    desc: "Learn by doing with interactive examples and exercises.",
  },
  {
    icon: <Star size={30} className="text-amber-400" />,
    iconBg: "bg-amber-700/30",
    iconRing: "bg-amber-600/20",
    title: "Industry Relevant",
    desc: "Curriculum designed based on real-world industry needs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function WhyLearn() {
  return (
    <section className="w-full bg-[#050816] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between border border-white/10 rounded-2xl bg-[#0b1120] divide-y sm:divide-y-0 sm:divide-x divide-white/10 mb-20"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 flex-1 px-8 py-7"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-3xl font-extrabold leading-none">{s.value}</p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-extrabold mb-12"
        >
          Why{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Learn
          </span>{" "}
          With Us?
        </motion.h2>

        {/* ── FEATURE CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-[#0b1120] border border-white/10 rounded-2xl p-7 flex flex-col gap-6 hover:border-white/20 transition-colors"
            >
              {/* ICON CIRCLE */}
              <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center ${f.iconRing}`}>
                <div className={`w-[58px] h-[58px] rounded-full flex items-center justify-center ${f.iconBg}`}>
                  {f.icon}
                </div>
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
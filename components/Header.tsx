"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [show, setShow] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY

      if (current > lastScroll && current > 80) {
        // 🔽 scrolling down
        setShow(false)
      } else {
        // 🔼 scrolling up
        setShow(true)
      }

      setLastScroll(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-center px-4 z-50 pointer-events-none transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >

      {/* 🌫️ GLOBAL BACK GLOW */}
      <div
        className="absolute top-0 w-[70%] h-[120px] rounded-full pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg,#ff00ff,#00ffff,#6366f1,#ff00ff)",
          filter: "blur(70px)",
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      {/* 🧊 WRAPPER */}
      <div className="relative w-full max-w-7xl rounded-2xl mt-6 pointer-events-auto">

        {/* 🔥 OUTER GLOW */}
        <div
          className="absolute -inset-[2px] rounded-2xl animate-borderGlow pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg,#ff00ff,#00ffff,#6366f1,#ff00ff)",
            backgroundSize: "400% 400%",
            filter: "blur(10px)",
            opacity: 0.35,
            zIndex: 0,
          }}
        />

        {/* 🌈 BORDER */}
        <div
          className="absolute inset-0 rounded-2xl animate-borderGlow pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg,#ff00ff,#00ffff,#6366f1,#ff00ff)",
            backgroundSize: "400% 400%",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            opacity: 0.8,
            zIndex: 1,
          }}
        />

        {/* 🧊 MAIN HEADER */}
        <div className="
          relative z-20
          rounded-2xl px-6 py-4
          flex items-center justify-between
          bg-[#0b0b0f]
          border border-black
          shadow-[0_30px_80px_rgba(0,0,0,0.9)]
        ">

          {/* LEFT */}
          <div className="flex items-center gap-10">
            <div className="text-white font-bold text-2xl">
              Kreeda Studios
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              {["Home", "Roadmap", "Courses", "Resources", "About"].map((item) => (
                <a key={item} href="#" className="text-white">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Globe size={18} className="text-white" />
            </button>

            <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              Login
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
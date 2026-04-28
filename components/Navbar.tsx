'use client';

import { useEffect, useState } from "react";
import { Globe, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ───────── Scroll Hide / Show ───────── */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Roadmap", path: "/roadmap" },
    { label: "Courses", path: "/courses" },
    { label: "Tracker", path: "/tracker" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-center px-4 z-50 pointer-events-none transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      {/* 🌈 BACK GLOW */}
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

      {/* WRAPPER */}
      <div className="relative w-full max-w-7xl rounded-2xl mt-6 pointer-events-auto">

        {/* OUTER GLOW */}
        <div
          className="absolute -inset-[2px] rounded-2xl animate-pulse pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg,#ff00ff,#00ffff,#6366f1,#ff00ff)",
            filter: "blur(10px)",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        {/* MAIN */}
        <div className="relative z-20 rounded-2xl px-6 py-4 flex items-center justify-between bg-[#0b0b0f] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">

          {/* LEFT */}
          <div className="flex items-center gap-10">

            <div
              onClick={() => router.push("/")}
              className="text-white font-bold text-xl cursor-pointer"
            >
              React Learning
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="hover:text-white transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Globe size={18} className="text-white" />
            </button>

            {/* AUTH */}
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-white/70 text-sm">
                  {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:scale-105 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:scale-105 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/signup")}
                  className="hidden sm:block px-5 py-2 rounded-xl border border-white/20 text-white text-sm hover:bg-white/10 transition"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* MOBILE MENU */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileOpen && (
          <div className="md:hidden mt-3 bg-[#0b0b0f] border border-white/10 rounded-xl p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                className="block text-white/80 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
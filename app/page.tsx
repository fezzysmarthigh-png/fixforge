"use client";

import Link from "next/link";
import Image from "next/image";
import { Theme } from "@/components/Theme";
import { 
  FaLightbulb, 
  FaTerminal, 
  FaCodeBranch, 
  FaCheckCircle, 
  FaSearch, 
  FaBug, 
  FaArrowRight 
} from "react-icons/fa";

export default function HomeChoiceB() {
  const highlights = [
    {
      title: "Log & Standardize",
      desc: "Capture reproduction steps, parameters, and error traces cleanly without messy notes.",
      icon: <FaBug className="text-2xl" />,
    },
    {
      title: "Isolate Root Causes",
      desc: "Track hypotheses systematically and eliminate false leads step-by-step.",
      icon: <FaSearch className="text-2xl" />,
    },
    {
      title: "Document Solutions",
      desc: "Build a permanent personal knowledge base so you never fix the same bug twice.",
      icon: <FaCodeBranch className="text-2xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* Existing Amber Nav Bar */}

      {/* Hero Section with Live Code / Dashboard Preview */}
      <main className="min-h-dvh bg-[url('/bg.jfif')] bg-no-repeat bg-center bg-cover">
        <section className="bg-black/80 min-h-dvh flex items-center justify-center py-16">
          <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700 w-fit text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-neutral-300 font-mono">FixForge v1.0 • Developer-First Debugging</span>
              </div>

              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight">
                Find the Bug. <br />
                <span style={{ color: Theme.primary }}>Forge the Fix.</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                FixForge is a developer-focused platform that makes debugging simpler and more organized. 
                Report bugs, track investigations, document solutions, and learn from past errors—all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/Get-started"
                  style={{ backgroundColor: Theme.primary }}
                  className="text-black font-bold px-8 py-3.5 text-lg rounded-full hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
                >
                  Get Started Free <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  href="#features"
                  className="font-semibold px-8 py-3.5 text-lg rounded-full flex items-center gap-2 border border-neutral-300/40 hover:bg-white/10 transition-all"
                >
                  Explore Features <FaLightbulb style={{ color: Theme.primary }} />
                </Link>
              </div>
            </div>

            {/* Right Hero Interactive Code / UI Card */}
            <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 shadow-2xl font-mono text-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                </div>
                <span className="text-xs text-neutral-500 flex items-center gap-1">
                  <FaTerminal /> investigation_log.ts
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-red-400">
                  <span className="text-neutral-500">[ERROR]</span> TypeError: Cannot read property 'id' of undefined
                </div>
                <div className="text-neutral-400 pl-4 border-l-2 border-neutral-800">
                  at handleRequest (api/auth.ts:42)
                </div>

                <div className="pt-2">
                  <span className="text-amber-400 font-bold">// FixForge Investigation</span>
                  <div className="text-emerald-400 flex items-center gap-2 mt-1">
                    <FaCheckCircle /> Root Cause Identified: Null JWT Payload
                  </div>
                  <div className="text-neutral-300 mt-1">
                    <span className="text-neutral-500">Fix:</span> Added optional chaining & null fallback guard.
                  </div>
                </div>

                <div className="mt-4 p-3 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs flex justify-between items-center">
                  <span>Status: Resolved & Archived</span>
                  <span className="bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded text-[10px]">SAVED</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Grid Features Section */}
      <section id="features" className="py-20 px-5 md:px-10 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase">
              Built For <span style={{ color: Theme.primary }}>Developers & Teams</span>
            </h2>
            <p className="text-neutral-400 mt-3 text-lg max-w-2xl mx-auto">
              Everything you need to turn chaotic bug logs into structured engineering intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/70 border border-neutral-800 p-8 rounded-xl hover:border-amber-400/60 transition-all flex flex-col gap-4 group"
              >
                <div 
                  className="p-3 rounded-lg w-fit transition-colors group-hover:bg-amber-400 group-hover:text-black text-amber-400 bg-neutral-800"
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works workflow */}
      <section id="how-it-works" className="py-20 px-5 md:px-10 bg-black border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase">
                Workflow <span style={{ color: Theme.primary }}>Simplified</span>
              </h2>
              <p className="text-neutral-400 mt-2 text-lg">Three steps to systematic problem solving.</p>
            </div>
            <Link 
              href="/Get-started" 
              className="text-amber-400 font-semibold flex items-center gap-2 hover:underline"
            >
              Start debugging now <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-amber-400 font-mono text-xl font-bold">01 / LOG</span>
              <h4 className="text-xl font-bold mt-2 mb-2">Capture the Issue</h4>
              <p className="text-neutral-400 text-sm">Store reproduction steps, logs, and parameters in structured entries.</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-amber-400 font-mono text-xl font-bold">02 / TRACK</span>
              <h4 className="text-xl font-bold mt-2 mb-2">Investigate</h4>
              <p className="text-neutral-400 text-sm">Test hypotheses methodically and eliminate wrong assumptions.</p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-amber-400 font-mono text-xl font-bold">03 / FORGE</span>
              <h4 className="text-xl font-bold mt-2 mb-2">Document & Learn</h4>
              <p className="text-neutral-400 text-sm">Save code solutions and share insights across your team or projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section matching Amber Nav Color */}
      <section className="py-16 px-5 bg-amber-300 text-black text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
            Ready to Forge Better Code?
          </h2>
          <p className="text-lg font-medium max-w-2xl">
            Start organizing your debugging workflow in minutes. Whether you are building solo or with a team.
          </p>
          <Link
            href="/Get-started"
            className="bg-black text-white font-bold px-8 py-3.5 text-lg rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 py-10 px-5 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Fix Forge"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-white">Fix Forge</span>
          </div>

          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Home</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Fix Forge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
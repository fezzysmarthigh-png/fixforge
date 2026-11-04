"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { Theme } from "@/components/Theme";
import { 
  FaTerminal, 
  FaRocket, 
  FaUsers, 
  FaBullseye, 
  FaCode, 
  FaHeart 
} from "react-icons/fa";

export default function AboutPage() {
  const values = [
    {
      icon: <FaBullseye className="text-2xl" />,
      title: "Clarity over Chaos",
      description:
        "Debugging shouldn't feel like searching in the dark. We turn unstructured logs into clear, actionable steps.",
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Developer-First Focus",
      description:
        "We build clean, fast tools designed for how developers actually think and work—free of bloat.",
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Continuous Learning",
      description:
        "Every resolved bug is a lesson. FixForge ensures you capture solutions so you and your team keep growing.",
    },
  ];

  const stats = [
    { label: "Developer Bugs Solved", value: "10,000+" },
    { label: "Active Project Logs", value: "2,500+" },
    { label: "Time Saved Debugging", value: "40%" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        

        {/* Header / Hero Section */}
        <section className="relative py-20 px-5 md:px-10 bg-[url('/bg.jfif')] bg-no-repeat bg-center bg-cover border-b border-neutral-800">
          <div className="absolute inset-0 bg-black/85"></div>
          
          <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-mono">
              <FaTerminal style={{ color: Theme.primary }} />
              <span className="text-neutral-300">About FixForge</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Forging Confidence in <br />
              <span style={{ color: Theme.primary }}>Every Line of Code</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 max-w-3xl font-light leading-relaxed">
              FixForge was created to solve a universal software problem: debugging is hard, but tracking and learning from your fixes shouldn't be.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-5 md:px-10 bg-neutral-950">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase">
                Our <span style={{ color: Theme.primary }}>Mission</span>
              </h2>
              
              <p className="text-neutral-300 leading-relaxed text-base">
                FixForge is a developer-focused platform that makes debugging simpler and more organized. Report bugs, track investigations, document solutions, and learn from past errors—all in one place.
              </p>
              
              <p className="text-neutral-400 leading-relaxed text-sm">
                Whether you're a student fixing your first stack trace, an independent developer juggling multiple projects, or part of a small engineering team, FixForge provides the structure needed to conquer technical challenges efficiently.
              </p>
            </div>

            {/* Terminal Style Mission Card */}
            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-xl p-6 font-mono text-sm shadow-xl">
              <div className="text-xs text-neutral-500 pb-3 mb-3 border-b border-neutral-800 flex justify-between items-center">
                <span>fixforge_manifesto.md</span>
                <span className="text-emerald-400">● LIVE</span>
              </div>
              <div className="space-y-3 text-xs leading-relaxed">
                <p className="text-amber-400"># Our Core Beliefs</p>
                <p className="text-neutral-300">1. Mistakes are natural; lost knowledge is preventable.</p>
                <p className="text-neutral-300">2. Systematic tracking beats guesswork every time.</p>
                <p className="text-neutral-300">3. Better debugging tools create happier developers.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 bg-neutral-900 border-y border-neutral-800 px-5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span 
                  className="text-3xl md:text-4xl font-extrabold font-mono"
                  style={{ color: Theme.primary }}
                >
                  {stat.value}
                </span>
                <span className="text-neutral-400 text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-5 md:px-10 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
                What Drives <span style={{ color: Theme.primary }}>FixForge</span>
              </h2>
              <p className="text-neutral-400 mt-2 text-base">The core values shaping our platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div 
                  key={idx}
                  className="bg-neutral-900/80 border border-neutral-800 p-8 rounded-xl flex flex-col gap-4 hover:border-amber-400/50 transition-all"
                >
                  <div className="p-3 rounded-lg w-fit bg-neutral-800 text-amber-400">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold">{val.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-5 bg-amber-300 text-black text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              Start Debugging Smarter Today
            </h2>
            <p className="text-lg font-medium max-w-xl">
              Turn confusing error screens into structured, reusable knowledge with FixForge.
            </p>
            <Link
              href="/Get-started"
              className="bg-black text-white font-bold px-8 py-3.5 text-lg rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </div>

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
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Fix Forge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
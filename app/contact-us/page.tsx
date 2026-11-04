"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { Theme } from "@/components/Theme";
import { 
  FaTerminal, 
  FaEnvelope, 
  FaGithub, 
  FaDiscord, 
  FaTwitter, 
  FaPaperPlane,
  FaCheckCircle
} from "react-icons/fa";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bug Report / Feedback",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Insert your API call or form submission handler here
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-xl" style={{ color: Theme.primary }} />,
      title: "Direct Email",
      value: "support@fixforge.dev",
      href: "mailto:support@fixforge.dev",
    },
    {
      icon: <FaGithub className="text-xl" style={{ color: Theme.primary }} />,
      title: "GitHub Discussions",
      value: "github.com/fixforge/community",
      href: "https://github.com",
    },
    {
      icon: <FaDiscord className="text-xl" style={{ color: Theme.primary }} />,
      title: "Developer Community",
      value: "discord.gg/fixforge",
      href: "https://discord.com",
    },
    {
      icon: <FaTwitter className="text-xl" style={{ color: Theme.primary }} />,
      title: "X / Twitter",
      value: "@FixForgeDev",
      href: "https://twitter.com",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        {/* Sticky Amber Navigation */}
     

        {/* Header Banner */}
        <section className="relative py-16 px-5 md:px-10 bg-[url('/bg.jfif')] bg-no-repeat bg-center bg-cover border-b border-neutral-800">
          <div className="absolute inset-0 bg-black/85"></div>

          <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-mono">
              <FaTerminal style={{ color: Theme.primary }} />
              <span className="text-neutral-300">Contact & Support</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Get in Touch with <br />
              <span style={{ color: Theme.primary }}>FixForge Team</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-300 max-w-2xl font-light">
              Have questions, feature requests, or technical feedback? Drop us a message or connect through our developer community channels.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold uppercase mb-2">
                Send a <span style={{ color: Theme.primary }}>Message</span>
              </h2>
              <p className="text-neutral-400 text-sm mb-6">
                Fill out the form below and our core team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-neutral-950 border border-emerald-500/40 p-8 rounded-lg text-center flex flex-col items-center gap-3 my-8">
                  <FaCheckCircle className="text-4xl text-emerald-400" />
                  <h3 className="text-xl font-bold">Message Transmitted</h3>
                  <p className="text-neutral-400 text-sm max-w-md">
                    Thank you for reaching out! We have received your query and will reply via email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-mono underline text-amber-400 hover:text-amber-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-neutral-400">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-neutral-400">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="dev@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-neutral-400">Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-neutral-300"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bug Report / Feedback">Bug Report / Feedback</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Partnership">Partnership / Team Plan</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-neutral-400">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Describe your query or suggestion..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-neutral-950 border border-neutral-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ backgroundColor: Theme.primary }}
                    className="text-black font-bold py-3.5 px-6 rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Send Message <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Community & Support Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Community Cards */}
              <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-xl flex flex-col gap-4">
                <h3 className="text-xl font-bold uppercase tracking-wide">
                  Developer <span style={{ color: Theme.primary }}>Channels</span>
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Connect with other independent developers, share debugging workflows, or talk to core maintainers.
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  {contactMethods.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-amber-400/50 transition-all group"
                    >
                      <div className="p-2.5 rounded-md bg-neutral-900 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 font-mono">{item.title}</span>
                        <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {item.value}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Terminal System Status Widget */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3 text-neutral-500">
                  <span>system_status.sh</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Operational
                  </span>
                </div>
                <div className="space-y-1.5 text-neutral-400">
                  <p><span className="text-amber-400">$</span> ping api.fixforge.dev</p>
                  <p className="text-neutral-500">64 bytes: icmp_seq=1 ttl=117 time=14.2 ms</p>
                  <p className="text-emerald-400">All systems online. API response time: ~14ms</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 px-5 bg-amber-300 text-black text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase">
              Need immediate access?
            </h2>
            <p className="text-sm md:text-base font-medium max-w-xl">
              Set up your free workspace and start documenting your software bugs in less than 2 minutes.
            </p>
            <Link
              href="/Get-started"
              className="bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-md text-base"
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
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          </div>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Fix Forge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
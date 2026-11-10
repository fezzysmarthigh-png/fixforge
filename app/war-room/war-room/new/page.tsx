"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Theme } from "@/components/Theme";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  FaBug, 
  FaTerminal, 
  FaCode, 
  FaUser, 
  FaArrowRight, 
  FaLayerGroup,
  FaArrowLeft,
  FaSpinner
} from "react-icons/fa";

export default function NewWarRoomIssuePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [issueDescription, setIssueDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const languages = [
    "JavaScript", 
    "TypeScript", 
    "Python", 
    "React / Next.js", 
    "Node.js", 
    "PostgreSQL / SQL", 
    "HTML / Tailwind", 
    "Docker / DevOps", 
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Structure the document payload for Firestore
      const payload = {
        title: issueDescription ? issueDescription.slice(0, 60) + "..." : `${language} Code Roadblock`,
        username: username.trim() || "Anonymous Dev",
        category: language,
        description: issueDescription || "No description provided. Inspect code snippet below.",
        codeSnippet: codeSnippet,
        status: "Open",
        createdAt: serverTimestamp(),
      };

      // Push document to Firestore collection
      await addDoc(collection(db, "war_room_issues"), payload);

      // Redirect back to the War Room queue after successful publish
      router.push("/war-room");
    } catch (err: any) {
      console.error("Error publishing to War Room:", err);
      setErrorMsg(err.message || "Failed to publish issue. Please check your network or Firestore rules.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between">
      <div>
        <main className="py-12 px-5 md:px-10 max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/war-room" 
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors mb-6"
          >
            <FaArrowLeft /> Back to War Room Queue
          </Link>

          {/* Form Header */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-t-xl p-6 md:p-8 border-b-0">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-mono w-fit mb-3">
              <FaBug style={{ color: Theme.primary }} />
              <span className="text-neutral-300">Dispatch Code Roadblock</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
              Post to <span style={{ color: Theme.primary }}>War Room</span>
            </h1>
            <p className="text-sm text-neutral-400 mt-1 font-light">
              Drop your code snippet, specify your language, and let the community help debug your roadblock.
            </p>
          </div>

          {/* Submission Form Body */}
          <form onSubmit={handleSubmit} className="bg-neutral-900/60 border border-neutral-800 rounded-b-xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
            
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-xs font-mono">
                {errorMsg}
              </div>
            )}

            {/* Username & Language Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center gap-1.5">
                  <FaUser className="text-amber-400 text-[11px]" /> Your Name / Handle *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., DevWizard"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder-neutral-600"
                />
              </div>

              {/* Language / Tech Stack */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center gap-1.5">
                  <FaLayerGroup className="text-amber-400 text-[11px]" /> Language / Framework *
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Optional Issue Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center gap-1.5">
                <FaBug className="text-amber-400 text-[11px]" /> Issue Description (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe what error you are getting or what you want this code to do..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm focus:outline-none focus:border-amber-400 transition-colors text-white placeholder-neutral-600 resize-y"
              ></textarea>
            </div>

            {/* Code Workspace Box */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                <FaCode className="text-amber-400 text-[11px]" /> Code Workspace *
              </label>
              <textarea
                rows={7}
                required
                placeholder="// Paste your buggy code or snippet here..."
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 font-mono text-xs text-amber-200 focus:outline-none focus:border-amber-400 transition-colors placeholder-neutral-700 resize-y"
              ></textarea>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-800">
              <Link
                href="/war-room"
                className="px-6 py-3 rounded-md text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: Theme.primary }}
                className="text-black font-bold px-8 py-3 rounded-md text-sm hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" /> Publishing...
                  </>
                ) : (
                  <>
                    Publish to War Room <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </div>

          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-500 border-t border-neutral-800 py-6 px-5 text-center text-xs">
        <p>© {new Date().getFullYear()} Fix Forge. Built for software developers.</p>
      </footer>
    </div>
  );
}
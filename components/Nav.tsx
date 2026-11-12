"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Theme } from "@/components/Theme";
import { FaUser, FaSignOutAlt, FaBug, FaArchive } from "react-icons/fa";

interface NavProps {
  session?: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

export default function Nav({ session }: NavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return "FF";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-neutral-950 border-b border-neutral-800 text-white py-4 px-6 md:px-10 flex items-center justify-between relative z-50">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800">
          <Image src="/favicon.ico" alt="FixForge Logo" width={24} height={24} className="w-6 h-6" />
        </div>
        <span className="font-extrabold tracking-tight text-lg uppercase">
          Fix<span style={{ color: Theme.primary }}>Forge</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wide uppercase text-neutral-400">
        <Link href="/war-room" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <FaBug className="text-amber-400" /> War Room
        </Link>
        <Link href="/explore" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <FaArchive className="text-amber-400" /> Forge Archive
        </Link>
        <Link href="/about" className="hover:text-amber-400 transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-amber-400 transition-colors">
          Contact
        </Link>
      </div>

      {/* User Auth Avatar / Actions */}
      <div className="flex items-center gap-4">
        {session?.user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border border-neutral-800 hover:border-amber-400 rounded-full p-1 transition-all cursor-pointer bg-neutral-900"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-neutral-950 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-neutral-800">
                  {getInitials(session.user.name)}
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 flex flex-col font-mono text-xs z-50">
                <div className="px-4 py-2 border-b border-neutral-800">
                  <p className="text-white font-bold truncate">{session.user.name || "Developer"}</p>
                  <p className="text-neutral-500 text-[10px] truncate">{session.user.email}</p>
                </div>

                {/* Profile Link */}
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="px-4 py-2.5 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 flex items-center gap-2 transition-colors"
                >
                  <FaUser className="text-amber-400" /> View / Edit Profile
                </Link>

                {/* Direct Client-Side Sign Out */}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2.5 hover:bg-neutral-800 text-red-400 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/signin"
            style={{ backgroundColor: Theme.primary }}
            className="text-black font-bold px-4 py-2 rounded-md text-xs font-mono hover:opacity-90 transition-all cursor-pointer shadow-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}